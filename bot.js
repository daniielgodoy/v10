import makeWASocket, { useMultiFileAuthState, DisconnectReason } from "@whiskeysockets/baileys"
import mysql from "mysql2/promise"
import fetch from "node-fetch"
import { exec } from "child_process"
import path from "path"
import { fileURLToPath } from "url"
import fs from "fs"
import os from "os"

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// ================= Banco de dados =================
const db = await mysql.createPool({
  host: "localhost",
  user: "root",
  password: "",
  database: "telasdb"
})

// ================= Clientes (números permitidos) =================
let clientes = {}
let numerosPermitidos = []
import { buscarNoBanco } from './src/db-search.js'


async function carregarClientes() {
  try {
    const [rows] = await db.query("SELECT numero, nome FROM clientes")
    clientes = {}
    numerosPermitidos = []
    rows.forEach(r => {
      clientes[r.numero] = r.nome
      numerosPermitidos.push(r.numero)
    })
    console.log("📒 Clientes carregados:", numerosPermitidos.length)
  } catch (err) {
    console.error("❌ Erro ao carregar clientes:", err)
  }
}


const numeroAtendente =   "5512997377620@s.whatsapp.net"

// ================= Helpers =================
function escapeRegex(s) {
  return s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")
}
function labelNomeModelo(r, fallback = "") {
  const nome = String(r.nome || "").trim()
  const modelo = String(r.modelo || "").trim()

  if (nome && modelo) {
    const ln = nome.toLowerCase()
    const lm = modelo.toLowerCase()

    // evita duplicar (quando um já contém o outro)
    if (ln.includes(lm)) return nome
    if (lm.includes(ln)) return modelo

    // 👇 aqui mudou: modelo vai em parênteses
    return `${nome} (${modelo})`
  }

  return nome || modelo || fallback
}


// Constrói regex que casa o token como PALAVRA/TOKEN inteiro, permitindo espaço entre letras e números.
// Ex.: "g10" casa "g10" ou "g 10", mas NÃO casa "g100".
function tokenBoundaryRegex(token) {
  const t = escapeRegex(String(token || ""))
    .replace(/([a-z]+)(\d+)/gi, "$1\\s*$2")
    .replace(/(\d+)([a-z]+)/gi, "$1\\s*$2")
  return new RegExp(`(?:^|\\s)${t}(?:\\s|$)`, "i")
}

// Constrói regex para token “power”/“fp” como palavra inteira.
function plainTokenRegex(token) {
  const t = escapeRegex(String(token || ""))
  return new RegExp(`(?:^|\\s)${t}(?:\\s|$)`, "i")
}

function normalizarTexto(s) {
  return String(s ?? "")
    .normalize("NFD").replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, " ")
    .replace(/\s+/g, " ")
    .trim()
}

function saudacaoAtual() {
  const h = new Date().getHours()
  if (h >= 5 && h < 12) return "Bom dia ☀️"
  if (h >= 12 && h < 18) return "Boa tarde 🌤️"
  return "Boa noite 🌙"
}

function detalheItem(i) {
  if (i.qualidade && i.qualidade.trim() !== "" && i.qualidade !== "todas") return i.qualidade
  if (i.modelo && i.modelo.trim() !== "") return i.modelo
  return ""
}

function formatarNome(item) {
const mapaTipos = {
  tela: "Tela",
  bateria: "Bateria",
  conector: "Conector",
  alto_falante: "Alto Falante",
  lente_camera: "Lente Câmera",
  flex_sub: "Flex Sub",
  flex_power: "Flex Power",
  flex_digital: "Flex Digital",
  auricular: "Auricular",
  camera_frontal: "Câmera Frontal",
  camera_traseira: "Câmera Traseira",
  microfone: "Microfone",
  tampa: "Tampa",
  wifi: "Wi-Fi"
}



  const tipo = mapaTipos[item.tipo?.toLowerCase()] || "Peça"
  const nome = item.nome
    ? item.nome.toUpperCase()
    : (item.modelo ? item.modelo.toUpperCase() : "DESCONHECIDO")

  return `${tipo} ${nome}`
}


function extrairTexto(msg) {
  const m = msg.message || {}
  return (
    m.conversation ||
    m.extendedTextMessage?.text ||
    m.imageMessage?.caption ||
    m.videoMessage?.caption ||
    m.buttonsResponseMessage?.selectedDisplayText ||
    m.listResponseMessage?.title ||
    m.templateButtonReplyMessage?.selectedId ||
    m.interactiveResponseMessage?.body?.text ||
    ""
  )
}

function ehSaudacaoSimples(texto) {
  const n = normalizarTexto(texto)
    .replace(/\b(tudo bem|td bem|beleza|blz|como vai|tranqs|de boa)\b/g, "")
    .trim()
  return /^((oi|ola|olá|salve|e ai|eai|ea?i|bom dia|boa tarde|boa noite)([!.,\s])?)+$/.test(n)
}

function dataYMD(d = new Date()) {
  const y = d.getFullYear()
  const m = String(d.getMonth() + 1).padStart(2, "0")
  const dia = String(d.getDate()).padStart(2, "0")
  return `${y}-${m}-${dia}`
}

// ===== Helpers de qualidade/modelo =====
const QUALITY_SYNONYMS = {
  "com aro": ["com aro", "aro", "comaro"],
  "nacional": ["nacional", "nac"],
  "original": ["original", "orig"],
  "premium": ["premium", "prem"],
  "standard": ["standard", "standart", "std"],
  "generica": ["generica", "genérica", "generico", "genérico", "comum"]
}
// Números por extenso → inteiros (PT-BR)
const QTY_WORDS = {
  "um":1, "uma":1,
  "dois":2, "duas":2,
  "tres":3, "três":3,
  "quatro":4, "cinco":5, "seis":6, "sete":7, "oito":8, "nove":9, "dez":10,
  "onze":11, "doze":12, "treze":13, "catorze":14, "quatorze":14, "quinze":15,
  "dezesseis":16, "dezessete":17, "dezoito":18, "dezenove":19, "vinte":20,
  "trinta":30
}
const QTY_WORDS_RE = new RegExp(`\\b(${Object.keys(QTY_WORDS).join("|")})\\b`, "i")

// Palavras de enchimento que não fazem parte do modelo
const FILLER_WORDS = [
  "eu","quero","queria","preciso","procuro","procurando","busco","buscando",
  "tenho","trocar","comprar","orçamento","orcamento","valor","valores","preco","preço",
  "só","so","apenas","por","favor","por favor","pf","pfv",
  "uma","um","umas","uns","meu","minha","seu","sua","dele","dela","nosso","nossa",
  "eh","é","opa","olá","ola","oi" 
]



// ================= Atalhos de modelos =================
const MODEL_SHORTCUTS = {
  // iPhones
  "i1": "iphone 1",
  "i2": "iphone 2",
  "i3": "iphone 3",
  "i4": "iphone 4",
  "i5": "iphone 5",
  "i6": "iphone 6",
  "i7": "iphone 7",
  "i8": "iphone 8",
  "i9": "iphone 9",
  "i10": "iphone x",
  "ix": "iphone x",
  "i11": "iphone 11",
  "i12": "iphone 12",
  "i13": "iphone 13",
  "i14": "iphone 14",
  "i16": "iphone 16",
  "i17": "iphone 17",
  "i18": "iphone 18",
  "i19": "iphone 19",
  "i20": "iphone 20",
  "i21": "iphone 21",
  "i22": "iphone 22",
  "i23": "iphone 23",
  "i24": "iphone 24",
}

// aplica substituições de atalhos no texto
function aplicarAtalhos(texto) {
  let resultado = texto.toLowerCase()

  // Atalho para iPhone: aceita i, ip ou iphon seguido de número
  resultado = resultado.replace(/\b(i|ip|iph|iphone)\s?(\d{1,2})\b/g, "iphone $2")

  // Atalho para iPhone X
  resultado = resultado.replace(/\b(i|ip|iph|iphone)\s?(x|xs|xr|se)\b/g, "iphone $2")

  // Mantém sua lista fixa (se quiser continuar aceitando variações personalizadas)
  for (const [atalho, modelo] of Object.entries(MODEL_SHORTCUTS)) {
    const regex = new RegExp(`\\b${atalho}\\b`, "gi")
    resultado = resultado.replace(regex, modelo)
  }

  return resultado
}



function normalizarQualidade(q) {
  const n = normalizarTexto(q || "")
  for (const [canon, list] of Object.entries(QUALITY_SYNONYMS)) {
    if (list.includes(n)) return canon
  }
  return n || "todas"
}

function stripQualityWords(s) {
  let out = ` ${normalizarTexto(s)} `
  for (const list of Object.values(QUALITY_SYNONYMS)) {
    for (const q of list) {
      out = out.replace(new RegExp(`\\b${q}\\b`, "g"), " ")
    }
  }
  return out.replace(/\s+/g, " ").trim()
}

// Palavras que NÃO podem ser consideradas como parte do modelo
const STOP_TOKENS = new Set([
  // tipos genéricos
  "tela","frontal",
  "bateria","bat","bt",
  "conector","conec","c","c c","conector de carga",
  "flex","power","fp","sub","digital",
  "alto","falante","alto-falante","speaker","fone","caixa","som",
  "lente","camera","câmera",

  // enchimento
  ...FILLER_WORDS,

  // números por extenso
  ...Object.keys(QTY_WORDS),

  // termos soltos que costumam aparecer
  "peca","peça","do","da","de","pra","para","qtd"
])

function tokensFromModelo(modelStr) {
  return stripQualityWords(modelStr).split(" ").filter(t => t && !STOP_TOKENS.has(t))
}

function matchModeloTokens(row, modeloTexto) {
  const tokens = tokensFromModelo(modeloTexto)
  const nomeNorm = normalizarTexto(row.nome || row.modelo || "")
  const hay = " " + nomeNorm + " "
  return tokens.every(tok => tokenBoundaryRegex(tok).test(hay))
}



function matchModeloExato(row, modeloTexto) {
  const nomeNorm = normalizarTexto(row.nome || row.modelo || "")
  const modeloNorm = normalizarTexto(stripQualityWords(modeloTexto || ""))
  return nomeNorm === modeloNorm
}

function casarRotulo(rotNorm, opcoesNorm) {
  const n = normalizarQualidade(rotNorm)
  let opt = opcoesNorm.find(o => normalizarQualidade(o.__rotulo) === n)
  if (!opt) opt = opcoesNorm.find(o => o.__rotulo.includes(n))
  if (!opt) opt = opcoesNorm.find(o => n.includes(o.__rotulo))
  return opt
}

// ================= Estados =================
const carrinhos = {}
const aguardandoQualidade = {}
const filaPedidos = {}
const saudacoesEnviadas = {}
const timeouts = {}
const atendenteAtivo = {} // controla se o cliente está em atendimento humano


// ================= Helpers Carrinho =================
function adicionarAoCarrinho(numero, item, qtd = 1) {
  if (!carrinhos[numero]) carrinhos[numero] = []
  const idx = carrinhos[numero].findIndex(c =>
    c.tipo === item.tipo &&
    normalizarTexto(c.nome) === normalizarTexto(item.nome) &&
    normalizarQualidade(c.qualidade) === normalizarQualidade(item.qualidade)
  )
  if (idx >= 0) {
    carrinhos[numero][idx].quantidade += qtd
  } else {
    carrinhos[numero].push({
      ...item,
      quantidade: qtd
    })
  }
}

// ================= Reset =================
// ================= Reset =================
async function resetCliente(sock, numero, msg = null) {
  carrinhos[numero] = []
  filaPedidos[numero] = []
  aguardandoQualidade[numero] = null
  delete saudacoesEnviadas[numero]
  delete atendenteAtivo[numero] // <-- limpa estado de atendimento humano também

  if (timeouts[numero]) {
    Object.values(timeouts[numero]).forEach(clearTimeout)
    delete timeouts[numero]
  }

  if (msg) await sock.sendMessage(numero, { text: msg })
}


// ================= Mostrar carrinho =================
async function mostrarCarrinho(sock, numero) {
  if (!carrinhos[numero] || carrinhos[numero].length === 0) return
  let resposta = "🛒 *Carrinho atualizado:*\n\n"
  let total = 0
  carrinhos[numero].forEach(i => {
    const detalhe = detalheItem(i)
    const subtotal = parseFloat(i.preco) * i.quantidade
    resposta += `• *${i.quantidade}x* *${formatarNome(i)}*${detalhe ? " ("+detalhe+")" : ""} → R$ ${subtotal.toFixed(2)}\n`
    total += subtotal
  })
  resposta += `\n💰 *Total:* R$ ${total.toFixed(2)}\n\nDigite a próxima peça.\n\n*finalizar* para concluir\n*cancelar* para encerrar o atendimento`
  await sock.sendMessage(numero, { text: resposta })
}

// ================= IA =================
async function interpretarMensagem(texto) {
  // 🔹 Atalhos de modelos (iPhones etc)
  let entrada = aplicarAtalhos(texto)

  // ---------- Helpers ----------
  const norm = s => normalizarTexto(s || "")

  // Detectores de tipo
// detectores básicos
const hasTela         = n => /\btela\b/.test(n)
const hasBateria      = n => /\bbateria|bat|bt\b/.test(n)
const hasConector     = n => /\bconector|c\/c|conec\b/.test(n)
const hasFlexPower    = n => /\bflex power\b/.test(n) || /^power\b/.test(n)
const hasFlexSub = n => /\b(flex\s*sub|sub)\b/.test(n)
const hasFlexDigital = n => /\b(flex\s*digital|digital)\b/.test(n)
const hasAltoFalante  = n => /\balto ?falante|alto ?falantes|falantes|speaker|falante\b/.test(n)
const hasLente  = n => /\blente\b/.test(n) || (/\b(camera|câmera)\b/.test(n) && !/\b(frontal|selfie|traseira|principal)\b/.test(n))
const hasAuricular     = n => /\bauricular|earpiece|ear|fone superior\b/.test(n)
const hasCameraFrontal = n => /\b(camera|câmera)\b.*\b(frontal|selfie)\b/.test(n)
const hasCameraTraseira= n => /\b(camera|câmera)\b.*\b(traseira|principal)\b/.test(n)
const hasMicrofone     = n => /\bmicrofone|mic\b/.test(n)
const hasTampa         = n => /\btampa|back|carca[cç]a|traseira\b/.test(n)
const hasWifi          = n => /\bwifi|wi-fi|wi fi|antena\b/.test(n)
const hasGaveta        = n => /\bgaveta|bandeja|tray|slot\b/.test(n)




  // Remove só as palavras do tipo indicado (não mexe em "power" quando é tela!)
function limparModeloParaBusca(modelo, tipo) {
  let n = " " + normalizarTexto(modelo) + " "

  const rm = (arr) => {
    arr.forEach(w => {
      n = n.replace(new RegExp(`\\b${w}\\b`, "g"), " ")
    })
  }

  // comuns (enchimento)
rm(["do","da","de","pra","para","p","qtd"])
  rm(FILLER_WORDS)

  // por tipo (use SEMPRE o identificador do tipo, com underscore)
  if (tipo === "tela")          rm(["tela","frontal"])
  if (tipo === "bateria")       rm(["bateria","bat","bt"])
  if (tipo === "conector")      rm(["conector","conector de carga","c","c c","conec"])
  if (tipo === "flex_power")    rm(["flex","power","flex power","power flex","fp"])
  if (tipo === "flex_sub")      rm(["flex","sub","flex sub"])
  if (tipo === "flex_digital")  rm(["flex","digital","flex digital"])
  if (tipo === "alto_falante")  rm(["alto","falante","alto falante","alto-falante","speaker","fone","caixa","som"])
  if (tipo === "lente_camera")  rm(["lente","lentecamera","camera","câmera"])
  if (tipo === "auricular")     rm(["auricular","earpiece","ear","fone","fone superior","ear speaker"])
  if (tipo === "camera_frontal")  rm(["camera","câmera","frontal","selfie"])
  if (tipo === "camera_traseira") rm(["camera","câmera","traseira","principal"])
  if (tipo === "microfone")     rm(["microfone","mic"])
  if (tipo === "tampa")         rm(["tampa","back","back cover","carcaca","carcaça","traseira"])
  if (tipo === "wifi")          rm(["wifi","wi-fi","wi","fi","antena"])
  if (tipo === "gaveta")        rm(["gaveta","bandeja","tray","slot"])
  n = n.replace(/\b(pro|pra)\s+(?=[a-z]?\d)/g, " ")
  n = n.replace(/\s+/g, " ").trim()
  return n || String(modelo).trim() // se limpar tudo, volta ao original
}




  // ---------- PARSER DETERMINÍSTICO (prioriza isso e só cai na IA se nada for achado) ----------
  function parserDeterministico(texto) {
    const res = {
      telas: [], baterias: [], conector: [],
      alto_falante: [], lente_camera: [],
      flex_sub: [], flex_power: [], flex_digital: []
    }

    // separa por , ; / quebra-linha
// Quebra por vírgula, ;, /, +, quebra-linha e o conector "e" isolado
// Quebra só em vírgula, ponto e vírgula, barra, +, quebra-linha ou " e " (isolado entre espaços)
const partes = texto
  .replace(/\s{2,}/g, " ")
  .split(/\s*(?:,|;|\/|\+|\n|\se\s)\s*/gi)
  .map(p => p.trim())
  .filter(Boolean)


const add = (tipo, modelo, qtd = 1, qualidade) => {
  if (!modelo) return
  const q = Math.max(1, +qtd || 1)

  if (tipo === "tela") {
    res.telas.push({ modelo, quantidade: q, tipo: "tela", qualidade: normalizarQualidade(qualidade || "todas") })
    return
  }
  if (tipo === "bateria") {
    res.baterias.push({ modelo, quantidade: q, tipo: "bateria" })
    return
  }
  if (tipo === "conector") {
    res.conector.push({ modelo, quantidade: q, tipo: "conector" })
    return
  }
  if (tipo === "alto_falante") {
    res.alto_falante.push({ modelo, quantidade: q, tipo: "alto_falante" })
    return
  }
  if (tipo === "lente_camera") {
    res.lente_camera.push({ modelo, quantidade: q, tipo: "lente_camera" })
    return
  }
  if (tipo === "flex_sub") {
    res.flex_sub.push({ modelo, quantidade: q, tipo: "flex_sub" })
    return
  }
  if (tipo === "flex_power") {
    res.flex_power.push({ modelo, quantidade: q, tipo: "flex_power" })
    return
  }
  if (tipo === "flex_digital") {
    res.flex_digital.push({ modelo, quantidade: q, tipo: "flex_digital" })
    return
  }
}


    for (let parte of partes) {
// quantidade (ex.: "2x ...", "3 und ...", ou "três ...")
let qtd = 1
let resto = parte
const parteNorm = norm(parte)

// 2a) dígitos no começo: "3x ...", "2 und ...", etc.
const mQtdIni = parteNorm.match(/^(\d+)\s*(x|un|und|unid)?\s+(.*)$/)
if (mQtdIni) {
  qtd = Math.max(1, parseInt(mQtdIni[1], 10) || 1)
  // usa o texto original correspondente à parte após a qtd (pra não perder maiúsculas/nome)
  resto = parte.substring(parte.toLowerCase().indexOf(mQtdIni[3]))
} else {
  // 2b) número por extenso em qualquer posição: "três flex ...", "duas lentes ..."
  const mWord = parteNorm.match(QTY_WORDS_RE)
  if (mWord) {
    const kw = mWord[1] // palavra que casou
    const qtdWord = QTY_WORDS[kw] || 1
    qtd = Math.max(1, qtdWord)

    // remove só ESSA ocorrência da palavra-quantidade do texto original
    // (case-insensitive, preserva acentuação se houver)
    try {
      const reRm = new RegExp(`\\b${kw}\\b`, "i")
      resto = parte.replace(reRm, " ").trim()
    } catch {
      // fallback: remove na versão normalizada e segue
      resto = parte
    }
  }
}

const nResto = norm(resto)


      // 1) TELAS têm prioridade se citadas
      if (hasTela(nResto)) {
        const modelo = limparModeloParaBusca(resto, "tela")
        add("tela", modelo, qtd)
        continue
      }

      // 2) FLEX POWER: só se "flex power" ou "power" no INÍCIO (ex.: "power g10")
// 2) FLEX POWER (mais robusto):
//    - "flex power <modelo>"
//    - ou "power ... <modelo>" (power ANTES do modelo → flex_power)
//    - "<modelo> power" continua sendo TELA (tratado logo abaixo)
{
  // regex de modelo (normalizado): cobre "moto g10", "iphone 11", "g10", "e7", "a20", etc.
  const MODEL_RE = "(?:moto\\s*g\\s*\\d+|moto\\s*[a-z]*\\s*\\d+|iphone\\s*(?:\\d+|x|xs|xr|se)|[a-z]+\\s*\\d+)"
  const reFlexPowerThenModel = new RegExp(`\\bflex\\s*power\\b[\\s\\w]*?\\b(${MODEL_RE})\\b`, "i")
  const rePowerThenModel     = new RegExp(`(?:^|\\s)power\\b[\\s\\w]*?\\b(${MODEL_RE})\\b`, "i")
 const reModelThenPower     = new RegExp(`\\b(${MODEL_RE})\\b\\s*power(?:\\s+(lite|plus|max|prime))?\\b`, "i")

  // 2a) "flex power <modelo>" → flex_power
  let m = reFlexPowerThenModel.exec(nResto)
  if (m) {
    const modeloCap = m[1]
    add("flex_power", limparModeloParaBusca(modeloCap, "flex_power"), qtd)
    continue
  }

  // 2b) "power ... <modelo>" → flex_power
  m = rePowerThenModel.exec(nResto)
  if (m) {
    const modeloCap = m[1]
    add("flex_power", limparModeloParaBusca(modeloCap, "flex_power"), qtd)
    continue
  }

// 2c) "<modelo> power"
m = reModelThenPower.exec(nResto)
if (m) {
const extra = m[2] ? " " + m[2] : ""
const modeloCap = m[1] + " power" + extra
if (!(hasAltoFalante(nResto) || hasLente(nResto) || hasConector(nResto) || hasFlexSub(nResto) || hasFlexDigital(nResto))) {
add("tela", limparModeloParaBusca(modeloCap, "tela"), qtd)
continue
 }}}


 
if (hasFlexSub(nResto)) {
  add("flex_sub", limparModeloParaBusca(resto, "flex_sub"), qtd)
  continue
}
if (hasFlexDigital(nResto)) {
  add("flex_digital", limparModeloParaBusca(resto, "flex_digital", "digital"), qtd)
  continue
}
  if (hasFlexPower(nResto)) {
    add("flex_power", limparModeloParaBusca(resto, "flex power"), qtd)
    continue
  }

  if (hasCameraFrontal(nResto)) {
    add("camera_frontal", limparModeloParaBusca(resto, "camera frontal"), qtd)
    continue
  }
  if (hasCameraTraseira(nResto)) {
    add("camera_traseira", limparModeloParaBusca(resto, "camera traseira"), qtd)
    continue
  }

  if (hasAuricular(nResto)) {
    add("auricular", limparModeloParaBusca(resto, "auricular"), qtd)
    continue
  }
  if (hasMicrofone(nResto)) {
    add("microfone", limparModeloParaBusca(resto, "microfone"), qtd)
    continue
  }
  if (hasTampa(nResto)) {
    add("tampa", limparModeloParaBusca(resto, "tampa"), qtd)
    continue
  }
  if (hasWifi(nResto)) {
    add("wifi", limparModeloParaBusca(resto, "wifi"), qtd)
    continue
  }
  if (hasGaveta(nResto)) {
    add("gaveta", limparModeloParaBusca(resto, "gaveta"), qtd)
    continue
  }

  if (hasBateria(nResto)) {
    add("bateria", limparModeloParaBusca(resto, "bateria"), qtd)
    continue
  }
  if (hasConector(nResto)) {
    add("conector", limparModeloParaBusca(resto, "conector"), qtd)
    continue
  }
if (hasAltoFalante(nResto)) {
  add("alto_falante", limparModeloParaBusca(resto, "alto_falante"), qtd)
  continue
}
if (hasLente(nResto)) {
  add("lente_camera", limparModeloParaBusca(resto, "lente_camera"), qtd)
  continue
}
  if (hasTela(nResto)) {
    add("tela", limparModeloParaBusca(resto, "tela"), qtd, "todas")
    continue
  }


     // 9) Sem pista → só assume TELAS se realmente for algo genérico (tipo só "g10")
// Se a parte tiver palavras-chave conhecidas (camera, flex, etc.) e não casou, não força tela
if (
  !hasAltoFalante(nResto) &&
  !hasLente(nResto) &&
  !hasFlexSub(nResto) &&
  !hasFlexDigital(nResto) &&
  !hasAuricular(nResto) &&
  !hasCameraFrontal(nResto) &&
  !hasCameraTraseira(nResto) &&
  !hasMicrofone(nResto) &&
  !hasTampa(nResto) &&
  !hasWifi(nResto) &&
  !hasGaveta(nResto)
) {
  if (nResto && /^[a-z0-9\s]+$/.test(nResto) && nResto.length > 1) {
    const modeloTela = limparModeloParaBusca(resto, "tela")
    if (modeloTela.trim() !== "") {
      add("tela", modeloTela, qtd)
    }
  }
}


    }

    const total = Object.values(res).reduce((a, arr) => a + (arr?.length || 0), 0)
    return total > 0 ? res : null
  }

  const deterministico = parserDeterministico(entrada)
  if (deterministico) {
    return deterministico
  }

  // ---------- Se o parser não achou nada, cai no LLM como antes ----------
const prompt = `
Você é um atendente de peças para celular.
Transforme pedidos em JSON válido.
Responda SOMENTE com JSON puro.

Formato:
{
  "telas": [{ "marca": "string", "modelo": "string", "quantidade": number, "qualidade": "todas|original|premium|generica|com aro|nacional|standard" }],
  "baterias": [{ "marca": "string|null", "modelo": "string", "quantidade": number }],
  "conector": [{ "marca": "string|null", "modelo": "string", "quantidade": number }],
  "alto_falante": [{ "marca": "string|null", "modelo": "string", "quantidade": number }],
  "lente_camera": [{ "marca": "string|null", "modelo": "string", "quantidade": number }],
  "flex_sub": [{ "marca": "string|null", "modelo": "string", "quantidade": number }],
  "flex_power": [{ "marca": "string|null", "modelo": "string", "quantidade": number }],
  "flex_digital": [{ "marca": "string|null", "modelo": "string", "quantidade": number }],
  "auricular": [{ "marca": "string|null", "modelo": "string", "quantidade": number }],
  "camera_frontal": [{ "marca": "string|null", "modelo": "string", "quantidade": number }],
  "camera_traseira": [{ "marca": "string|null", "modelo": "string", "quantidade": number }],
  "microfone": [{ "marca": "string|null", "modelo": "string", "quantidade": number }],
  "tampa": [{ "marca": "string|null", "modelo": "string", "quantidade": number }],
  "wifi": [{ "marca": "string|null", "modelo": "string", "quantidade": number }],
  "gaveta": [{ "marca": "string|null", "modelo": "string", "quantidade": number }],
}

Regras de classificação:
- "tela" → classifique em "telas" (ex.: "g10 power" continua sendo tela com modelo "g10 power").
- "bateria", "bat", "bt" → classifique em "baterias".
- "conector", "conector de carga", "c/c", "conec" → classifique em "conector".
- "flex power" (exato) → classifique em "flex_power" e o modelo é o que vem depois.
- Se a frase começar com "power" (ex.: "power g10") → classifique em "flex_power".
- Se "power" vier depois do modelo:
   - Se a frase mencionar "tela" → "telas".
   - Se mencionar "bateria" → "baterias".
   - Se mencionar "conector" → "conector".
   - Se mencionar "câmera frontal" ou "selfie" → "camera_frontal".
   - Se mencionar "câmera traseira" ou "principal" → "camera_traseira".
   - Se mencionar "câmera" ou "lente" → "lente_camera".
   - Se mencionar "alto falante", "speaker" ou "falante" → "alto_falante".
   - Se mencionar "auricular", "earpiece" ou "fone superior" → "auricular".
   - Se mencionar "microfone" ou "mic" → "microfone".
   - Se mencionar "tampa", "back cover" ou "tampa traseira" → "tampa".
   - Se mencionar "wifi", "wi-fi", "wi fi" ou "antena" → "wifi".
   - Se mencionar "gaveta", "bandeja", "slot" ou "tray" → "gaveta".
   - Se mencionar "flex sub" ou "sub" → "flex_sub".
   - Se mencionar "flex digital", "digital" → "flex_digital".
   - Caso contrário → "telas".
- "alto falante"/"speaker" → "alto_falante".
- "lente" → "lente_camera".
- Se aparecer "flex sub", sempre classifique como "flex_sub".
- "flex digital" → "flex_digital".
- "auricular", "earpiece", "ear speaker", "fone superior" → "auricular".
- "câmera frontal" ou "selfie" → "camera_frontal".
- "câmera traseira" ou "principal" → "camera_traseira".
- "microfone", "mic" → "microfone".
- "tampa", "back cover", "carcaça", "carcaca", "traseira" → "tampa".
- "wifi", "wi-fi", "wi fi", "antena wifi" → "wifi".
- "gaveta", "bandeja chip", "slot sim", "tray" → "gaveta".
- "digital" (sem "flex") → "digital".
- Se não houver indicação clara, não classifique nada (deixe a lista vazia).
- Não invente tipos fora do formato.
`


  const response = await fetch("http://localhost:11434/api/generate", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ model: "mistral", prompt: prompt + "\n\nEntrada: " + entrada })
  })

  let raw = ""
  for await (const chunk of response.body) raw += chunk.toString("utf8")

  let saida = ""
  raw.split("\n").forEach(line => {
    try { const obj = JSON.parse(line); if (obj.response) saida += obj.response } catch {}
  })

  saida = saida.trim().replace(/```json/g, "").replace(/```/g, "").trim()
  const match = saida.match(/\{[\s\S]*\}/)

  let parsed = {}
  if (match) {
    try { parsed = JSON.parse(match[0]) } catch { parsed = {} }
  }

  function corrigirQuantidades(lista) {
    return (lista || []).map(item => {
      let qtd = parseInt(item.quantidade, 10) || 1
      return { ...item, quantidade: (qtd > 0 ? qtd : 1) }
    })
  }

let resultado = {
  telas: corrigirQuantidades(parsed.telas || []).map(t => ({ ...t, tipo: "tela", qualidade: normalizarQualidade(t.qualidade) })),
  baterias: corrigirQuantidades(parsed.baterias || []).map(b => ({ ...b, tipo: "bateria" })),
  conector: corrigirQuantidades(parsed.conector || []).map(c => ({ ...c, tipo: "conector" })),
  alto_falante: corrigirQuantidades(parsed.alto_falante || []).map(a => ({ ...a, tipo: "alto_falante" })),
  lente_camera: corrigirQuantidades(parsed.lente_camera || []).map(l => ({ ...l, tipo: "lente_camera" })),
  flex_sub: corrigirQuantidades(parsed.flex_sub || []).map(f => ({ ...f, tipo: "flex_sub" })),
  flex_power: corrigirQuantidades(parsed.flex_power || []).map(f => ({ ...f, tipo: "flex_power" })),
  flex_digital: corrigirQuantidades(parsed.flex_digital || []).map(f => ({ ...f, tipo: "flex_digital" })),
  auricular: corrigirQuantidades(parsed.auricular || []).map(f => ({ ...f, tipo: "auricular" })),
  camera_frontal: corrigirQuantidades(parsed.camera_frontal || []).map(f => ({ ...f, tipo: "camera_frontal" })),
  camera_traseira: corrigirQuantidades(parsed.camera_traseira || []).map(f => ({ ...f, tipo: "camera_traseira" })),
  microfone: corrigirQuantidades(parsed.microfone || []).map(f => ({ ...f, tipo: "microfone" })),
  tampa: corrigirQuantidades(parsed.tampa || []).map(f => ({ ...f, tipo: "tampa" })),
  wifi: corrigirQuantidades(parsed.wifi || []).map(f => ({ ...f, tipo: "wifi" })),
  gaveta: corrigirQuantidades(parsed.gaveta || []).map(f => ({ ...f, tipo: "gaveta" })),

}


  // Se mesmo assim vier vazio, último recurso: trata cada pedaço como tela
  const totalItens = Object.values(resultado).reduce((acc, arr) => acc + arr.length, 0)
if (totalItens === 0) {
  // Não forçar tela, deixar vazio
  return {
    telas: [],
    baterias: [],
    conector: [],
    alto_falante: [],
    lente_camera: [],
    flex_sub: [],
    flex_power: [],
    flex_digital: []
  }
}


  return resultado
}



// ================= Processar pedidos =================
// ================= Processar pedidos =================
async function processarProximoPedido(sock, numero) {
  if (!filaPedidos[numero] || filaPedidos[numero].length === 0) return
  const pedido = filaPedidos[numero].shift()
  console.log("🔎 Pedido enviado para processarProximoPedido:", JSON.stringify(pedido, null, 2))

  const modeloTexto = stripQualityWords(pedido.modelo || "")
  const qualSolicitada = normalizarQualidade(pedido.qualidade)

  // Mapeamento dos tipos para suas tabelas
const tabelaPorTipo = {
  tela: "telas",
  bateria: "baterias",
  conector: "conector",
  alto_falante: "alto_falante",
  lente_camera: "lente_camera",
  flex_sub: "flex_sub",
  flex_power: "flex_power",
  flex_digital: "flex_digital",
  auricular: "auricular",
  camera_frontal: "camera_frontal",
  camera_traseira: "camera_traseira",
  microfone: "microfone",
  tampa: "tampa",
  wifi: "wifi",
  gaveta: "gaveta"
}


  const tabela = tabelaPorTipo[pedido.tipo]
  if (!tabela) {
    await sock.sendMessage(numero, { text: `⚠️ Tipo de item não suportado: ${pedido.tipo}` })
    return
  }

  let rowsAll = []
  try {
    rowsAll = await buscarNoBanco(pedido.tipo, pedido.modelo, pedido.qualidade || "todas", 20, db)
  } catch (err) {
    console.error("❌ Erro no banco:", err)
    await sock.sendMessage(numero, { text: "⚠️ Problema temporário no servidor, tente novamente mais tarde." })
    return processarProximoPedido(sock, numero) // continua a fila sem travar
  }

  // ================= TELAS e BATERIAS (com lógica de qualidade) =================
  if (pedido.tipo === "tela" || pedido.tipo === "bateria") {
    const candidatosPorTokens = rowsAll.filter(r => matchModeloTokens(r, modeloTexto))
    const candidatosModelo = candidatosPorTokens.filter(r => matchModeloExato(r, modeloTexto))

    if (candidatosModelo.length === 0) {
      await sock.sendMessage(numero, {
        text: `⚠️ Não encontrei nenhuma ${pedido.tipo} para ${modeloTexto.toUpperCase()}.`
      })
      return processarProximoPedido(sock, numero)
    }

    if (qualSolicitada === "todas") {
const opcoes = candidatosModelo.map((r, i) => {
  const tipo = pedido.tipo === "tela" ? "Tela" : "Bateria"
  const marcaTxt = r.marca ? `${r.marca} ` : ""
  const nomeBase = labelNomeModelo(r, modeloTexto)   // 👈 usa os dois campos
  const detalhe = r.qualidade || ""                  // qualidade vai no parêntese
  return `*${i + 1} • ${tipo} ${marcaTxt}${nomeBase.toUpperCase()}*${detalhe ? " (" + detalhe + ")" : ""} → R$ ${r.preco}`
}).join("\n")


      aguardandoQualidade[numero] = {
        ...pedido,
        modelo: modeloTexto,
        opcoes: candidatosModelo.map(o => ({
          ...o,
          __rotulo: normalizarTexto(o.qualidade || o.modelo || "")
        }))
      }

      await sock.sendMessage(numero, {
        text: `📒 *Para ${formatarNome({ ...pedido, modelo: modeloTexto })} encontrei:*\n\n${opcoes}\n\n👉 Selecione a opção para adicionar ao carrinho\n\nDigite *voltar* para cancelar.`
      })
      return
    }

    // 🔹 Se o cliente pediu qualidade específica
    const qualNorm = qualSolicitada
    let filtradas = candidatosModelo.filter(r =>
      matchModeloExato(r, modeloTexto) &&
      normalizarQualidade(r.qualidade) === qualNorm
    )

    if (filtradas.length === 0) {
      filtradas = candidatosModelo.filter(r =>
        matchModeloExato(r, modeloTexto) &&
        normalizarTexto(r.nome || "").includes(qualNorm)
      )
    }

    if (filtradas.length === 0) {
      const opcoes = candidatosModelo.map((r, i) => {
        const detalhe = r.qualidade || r.modelo || ""
        const nomeBanco = r.nome || r.modelo || modeloTexto
        const tipo = pedido.tipo === "tela" ? "Tela" : "Bateria"
        const marcaTxt = r.marca ? `${r.marca} ` : ""
        return `${i + 1}. ${tipo} ${marcaTxt}${nomeBanco.toUpperCase()}${detalhe ? " (" + detalhe + ")" : ""} → R$ ${r.preco}`
      }).join("\n")

      aguardandoQualidade[numero] = {
        ...pedido,
        modelo: modeloTexto,
        opcoes: candidatosModelo.map(o => ({
          ...o,
          __rotulo: normalizarTexto(o.qualidade || o.modelo || "")
        }))
      }

      await sock.sendMessage(numero, {
        text: `📒 Para ${pedido.tipo.toUpperCase()} encontrei:\n\n${opcoes}\n\n👉 Selecione a opção para adicionar ao carrinho\n\n↩️ Digite *voltar* para cancelar.`
      })
      return
    }

    // Adiciona ao carrinho
    const qtd = (Number(pedido.quantidade) > 0 ? Number(pedido.quantidade) : 1)
    filtradas.forEach(r => {
      if (!matchModeloExato(r, modeloTexto)) return
      adicionarAoCarrinho(numero, {
        ...r,
        tipo: pedido.tipo,
        nome: r.nome || r.modelo || modeloTexto
      }, qtd)
    })

    await mostrarCarrinho(sock, numero)
    if (filaPedidos[numero].length > 0) {
      await processarProximoPedido(sock, numero)
    }
    return
  }

  // ================= OUTROS TIPOS (sem qualidade) =================
  let candidatos = []

  if (pedido.tipo === "flex_power") {
    const modeloNorm = normalizarTexto(modeloTexto)
    const modeloTokens = modeloNorm.split(/\s+/).filter(Boolean)

    candidatos = rowsAll.filter(r => {
      const nomeNorm = normalizarTexto(r.nome || r.modelo || "")
      const hay = " " + nomeNorm + " "
      return modeloTokens.length > 0 && modeloTokens.every(tok => tokenBoundaryRegex(tok).test(hay))
    })

    if (candidatos.length === 0) {
      const variacoes = [
        `${modeloNorm} power`,
        `power ${modeloNorm}`,
        `flex power ${modeloNorm}`,
        `${modeloNorm} flex power`,
        `fp ${modeloNorm}`,
        `${modeloNorm} fp`
      ].map(v => normalizarTexto(v).split(/\s+/).filter(Boolean))

      candidatos = rowsAll.filter(r => {
        const nomeNorm = normalizarTexto(r.nome || r.modelo || "")
        const hay = " " + nomeNorm + " "
        return variacoes.some(seq => seq.every(tok => tokenBoundaryRegex(tok).test(hay)))
      })
    }
  } else {
    candidatos = rowsAll.filter(r => matchModeloExato(r, modeloTexto))
    if (candidatos.length === 0) {
      candidatos = rowsAll.filter(r => matchModeloTokens(r, modeloTexto))
    }
  }

  if (candidatos.length === 0) {
    await sock.sendMessage(numero, {
      text: `⚠️ Não encontrei nenhum ${pedido.tipo} para ${modeloTexto.toUpperCase()}.`
    })
    return processarProximoPedido(sock, numero)
  }

const opcoes = candidatos.map((r, i) => {
  const marcaTxt = r.marca ? `${r.marca} ` : ""
  const nomeBase = labelNomeModelo(r, modeloTexto)  // 👈 combina nome+modelo
  return `${i + 1}. ${pedido.tipo.toUpperCase()} ${marcaTxt}${nomeBase.toUpperCase()} → R$ ${r.preco}`
}).join("\n")


  aguardandoQualidade[numero] = {
    ...pedido,
    modelo: modeloTexto,
    opcoes: candidatos.map(o => ({
      ...o,
      __rotulo: normalizarTexto(o.nome || o.modelo || "")
    }))
  }

  await sock.sendMessage(numero, {
    text: `📒 Para ${pedido.tipo.toUpperCase()} encontrei:\n\n${opcoes}\n\n👉 Selecione a opção para adicionar ao carrinho\n\n↩️ Digite *voltar* para cancelar.`
  })
}



async function tratarQualidade(sock, numero, textoOriginal) {
  const ctx = aguardandoQualidade[numero]
  if (!ctx) return false

  try {
    console.log("🎯 tratarQualidade -> ctx.tipo:", ctx.tipo,
                "qtd:", ctx.quantidade,
                "opcoes:", (ctx.opcoes || []).length,
                "texto:", textoOriginal)

    const entradaRaw = String(textoOriginal ?? "").trim()
    const entradaNorm = normalizarTexto(entradaRaw)

    const opcoesNorm = (ctx.opcoes || []).map(o => {
      const base = (o.qualidade && o.qualidade.trim() !== "")
        ? o.qualidade
        : (o.modelo || o.nome || "")
      return {
        ...o,
        __rotulo: normalizarTexto(base),
        __nomeNorm: normalizarTexto(o.nome || base || "")
      }
    })

    const qtdPadrao = Number(ctx.quantidade) > 0 ? Number(ctx.quantidade) : 1

    const getByIndex = (idx) => {
      const i = Number(idx)
      if (!Number.isInteger(i)) return null
      if (i < 1 || i > opcoesNorm.length) return null
      return opcoesNorm[i - 1]
    }

    const getByLabel = (labelNorm) => {
      return casarRotulo(labelNorm, opcoesNorm) ||
             opcoesNorm.find(o => o.__nomeNorm.includes(labelNorm)) ||
             null
    }

    // VOLTAR
    if (entradaNorm === "voltar") {
      delete aguardandoQualidade[numero]
      await sock.sendMessage(numero, { text: "↩️ Escolha cancelada." })
      if (filaPedidos[numero]?.length) await processarProximoPedido(sock, numero)
      return true
    }

    // NÚMERO PURO (1, 2, 3…)
    if (/^\d+$/.test(entradaNorm)) {
      const opt = getByIndex(entradaNorm)
      if (!opt) {
await sock.sendMessage(numero, {
  text: `📒 Para ${pedido.tipo.toUpperCase()} encontrei:\n\n${opcoes}\n\n👉 *Digite o número da opção* (ex.: 1)\n↩️ Digite *voltar* para cancelar.`
})
        return true
      }

      adicionarAoCarrinho(numero, { ...opt, tipo: ctx.tipo }, qtdPadrao)
      delete aguardandoQualidade[numero]
      await mostrarCarrinho(sock, numero)
      if (filaPedidos[numero]?.length) await processarProximoPedido(sock, numero)
      return true
    }

    // MÚLTIPLAS ESCOLHAS E QUANTIDADES
    const partes = entradaRaw
      .replace(/\s*x\s*/gi, "x")
      .split(/\s*(?:,|;|\/|\+|\be\b)\s*/gi)
      .map(p => p.trim())
      .filter(Boolean)

    const escolhidosExplicitos = [] // {opt,qtd}
    const escolhidosSemQtd = []

    for (const parte of partes) {
      const pNorm = normalizarTexto(parte)

      // número isolado
      if (/^\d+$/.test(pNorm)) {
        const opt = getByIndex(pNorm)
        if (opt) escolhidosSemQtd.push(opt)
        continue
      }

      // 2x premium | 3x 1 | 2 nacional
      const mQtd = pNorm.match(/^(\d+)\s*x?\s*(.+)$/i)
      if (mQtd) {
        const qtd = Math.max(1, parseInt(mQtd[1], 10))
        const resto = mQtd[2].trim()

        if (/^\d+$/.test(resto)) {
          const opt = getByIndex(resto)
          if (opt) {
            escolhidosExplicitos.push({ opt, qtd })
            continue
          }
        }

        const opt = getByLabel(resto)
        if (opt) {
          escolhidosExplicitos.push({ opt, qtd })
          continue
        }
      }

      // rótulo puro
      const opt = getByLabel(pNorm)
      if (opt) {
        escolhidosSemQtd.push(opt)
        continue
      }
    }

    if (escolhidosExplicitos.length === 0 && escolhidosSemQtd.length === 0) {
await sock.sendMessage(numero, {
  text: `📒 Para ${pedido.tipo.toUpperCase()} encontrei:\n\n${opcoes}\n\n👉 *Digite o número da opção* (ex.: 1)\n↩️ Digite *voltar* para cancelar.`
})
      return true
    }

    if (escolhidosExplicitos.length > 0) {
      for (const { opt, qtd } of escolhidosExplicitos) {
        adicionarAoCarrinho(numero, { ...opt, tipo: ctx.tipo }, qtd)
      }
    } else {
      const qtdTotal = qtdPadrao
      const qtdPorItem = Math.max(1, Math.floor(qtdTotal / escolhidosSemQtd.length))
      const resto = qtdTotal % escolhidosSemQtd.length
      escolhidosSemQtd.forEach((opt, idx) => {
        const q = qtdPorItem + (idx < resto ? 1 : 0)
        adicionarAoCarrinho(numero, { ...opt, tipo: ctx.tipo }, q)
      })
    }

    delete aguardandoQualidade[numero]
    await mostrarCarrinho(sock, numero)
    if (filaPedidos[numero]?.length) await processarProximoPedido(sock, numero)
    return true

  } catch (err) {
    console.error("❌ tratarQualidade erro:", err)
    await sock.sendMessage(numero, { text: "⚠️ Não consegui registrar a escolha agora. Tente enviar o *número* da opção novamente (ex.: *1*)." })
    return true
  }
}


// ================= Bot =================
async function startBot() {
  await carregarClientes() // 🔹 carrega clientes do banco antes de iniciar

  const { state, saveCreds } = await useMultiFileAuthState("auth")
  const sock = makeWASocket({ auth: state })

  sock.ev.on("connection.update", (u) => {
    const { connection, lastDisconnect } = u
    if (connection === "close") {
      const shouldReconnect = (lastDisconnect.error?.output?.statusCode) !== DisconnectReason.loggedOut
      if (shouldReconnect) startBot()
    } else if (connection === "open") {
      console.log("✅ Bot conectado!")
    }
  })
  sock.ev.on("creds.update", saveCreds)

sock.ev.on("messages.upsert", async ({ messages }) => {
  const msg = messages[0]
  if (!msg.message || msg.key.fromMe) return
  const numero = msg.key.remoteJid
    // Bloquear tudo que não for texto
  const msgType = Object.keys(msg.message)[0]
  if (msgType !== "conversation" && msgType !== "extendedTextMessage") {
    return
  }

  const remetente = msg.key.participant || numero // 🔹 quem enviou (em grupo vem diferente)

  const textoRaw = extrairTexto(msg) || ""
  const texto = textoRaw.trim().toLowerCase()

  console.log("📩 Mensagem recebida de:", numero, "texto:", texto)

  // ================== Vincular grupo a cliente ==================
const numeroDono = "5512997377620@s.whatsapp.net"

if (numero.endsWith("@g.us")) {
  if (texto === "/setgrupo") {

    // 🔒 Só permite se a mensagem veio do dono
    const autor = msg.key.participant || ""
    if (autor !== numeroDono) {
      await sock.sendMessage(numero, { text: "⚠️ Apenas o administrador pode usar este comando." })
      return
    }

    try {
      const metadata = await sock.groupMetadata(numero)
      const nomeGrupo = metadata.subject || ""
      console.log("📂 Nome do grupo:", nomeGrupo)

      // Exemplo: grupo chamado "Pedidos Daniel"
      const nomeCliente = nomeGrupo.replace(/^pedidos\s*/i, "").trim()

      const [rows] = await db.query("SELECT id FROM clientes WHERE nome LIKE ?", [nomeCliente + "%"])
      if (rows.length === 0) {
        await sock.sendMessage(numero, { text: "⚠️ Cliente não encontrado no banco. Verifique o nome do grupo." })
      } else {
        const clienteId = rows[0].id
        await db.query(
          "INSERT INTO grupos_pedidos (cliente_id, grupo_jid) VALUES (?, ?) ON DUPLICATE KEY UPDATE grupo_jid = VALUES(grupo_jid)",
          [clienteId, numero]
        )
        await sock.sendMessage(numero, { text: `✅ Grupo vinculado ao cliente *${nomeCliente}*.` })
      }
    } catch (err) {
      console.error("❌ Erro ao processar /setgrupo:", err)
      await sock.sendMessage(numero, { text: "⚠️ Erro ao vincular grupo. Veja os logs." })
    }
  }
  return // 🔹 grupos não caem no fluxo normal
}


  // ================== CONTATOS PRIVADOS ==================
  if (!numerosPermitidos.includes(numero)) return // 🔹 só responde clientes permitidos




  // ================== Atendimento humano ==================
  if (atendenteAtivo[numero]) {
    // Se atendente encerrar manualmente (#fim)
    if (numero === numeroAtendente && texto.startsWith("#fim")) {
      delete atendenteAtivo[numero]
      await resetCliente(sock, numero, "✅ Atendimento encerrado pelo atendente.")
      return
    }

    // Se cliente falar → só reseta timer de 3min
    if (timeouts[numero]) {
      clearTimeout(timeouts[numero].fimCliente)
      timeouts[numero].fimCliente = setTimeout(async () => {
        if (atendenteAtivo[numero]) {
          delete atendenteAtivo[numero]
          await resetCliente(sock, numero, "⌛ Atendimento encerrado por inatividade do cliente.")
        }
      }, 180000)
    }

    return // Bot não interfere durante o atendimento humano
  }

  // Se cliente pedir atendimento humano
  if (/(atendente|humano|falar com atendente)/i.test(texto)) {
    atendenteAtivo[numero] = true
    await sock.sendMessage(numero, { text: "📞 Você está falando com um atendente humano. Aguarde resposta." })

    await sock.sendMessage(numeroAtendente, { 
      text: `📢 O cliente ${clientes[numero] || numero} entrou em atendimento humano.\nÚltima mensagem: "${textoRaw}"`
    })

    // ================== Timeout automático ==================
// sempre reseta aviso + fim a cada mensagem nova do cliente
if (timeouts[numero]) {
  clearTimeout(timeouts[numero].aviso)
  clearTimeout(timeouts[numero].fim)
}
timeouts[numero] = {}

timeouts[numero].aviso = setTimeout(async () => {
  // só avisa se ainda não foi resetado
  if (timeouts[numero]) {
    await sock.sendMessage(numero, { text: "⚠️ Sua conversa será encerrada em 30 segundos por inatividade." })
  }
}, 150000)

timeouts[numero].fim = setTimeout(async () => {
  if (timeouts[numero]) {
    await resetCliente(sock, numero, "⌛ Conversa encerrada por inatividade. Tudo foi resetado.")
  }
}, 180000)


    // Atendente inativo 10min → encerra
    timeouts[numero].fimAtendente = setTimeout(async () => {
      if (atendenteAtivo[numero]) {
        delete atendenteAtivo[numero]
        await resetCliente(sock, numero, "⌛ Atendimento encerrado (sem resposta do atendente).")
      }
    }, 600000)

    return
  }

    if (aguardandoQualidade[numero]) {
      await tratarQualidade(sock, numero, textoRaw)
      return
    }

    if (ehSaudacaoSimples(texto)) {
      const hoje = dataYMD()
      if (saudacoesEnviadas[numero] !== hoje) {
        saudacoesEnviadas[numero] = hoje
        const nome = (clientes[numero] || "").split(" ")[0] || ""
        await sock.sendMessage(numero, { text: `${saudacaoAtual()}${nome ? `, ${nome}` : ""}! Como posso ajudar hoje?` })
      }
      return
    }

    if (texto === "cancelar" || texto === "sair") {
      await resetCliente(sock, numero, "❌ Pedido cancelado e conversa encerrada.")
      return
    }

if (texto === "finalizar") {
  if (carrinhos[numero]?.length > 0) {
    let resposta = "✅ Pedido finalizado!\n\n"
    let total = 0

    const clienteNome = clientes[numero] || numero
    const [result] = await db.query(
      "INSERT INTO pedidos (cliente_nome, cliente_numero) VALUES (?, ?)",
      [clienteNome, numero]
    )
    const pedidoId = result.insertId
    carrinhos[numero].pedidoId = pedidoId

    for (const i of carrinhos[numero]) {
      const subtotal = parseFloat(i.preco) * i.quantidade
      await db.query(
        `INSERT INTO pedido_itens (pedido_id, tipo, modelo, qualidade, quantidade, preco)
         VALUES (?, ?, ?, ?, ?, ?)`,
        [
          pedidoId,
          i.tipo,
          i.nome || i.modelo || "DESCONHECIDO",
          i.qualidade || null,
          i.quantidade,
          i.preco
        ]
      )

      const detalhe = detalheItem(i)
      resposta += `- ${i.quantidade}x ${formatarNome(i)}${detalhe ? " ("+detalhe+")" : ""} → R$ ${subtotal.toFixed(2)}\n`
      total += subtotal
    }

    resposta += `\n💰 Total: R$ ${total.toFixed(2)}\n`

    // 🔹 Geração automática do PDF
    const pdfPath = path.join(__dirname, `pedido_${pedidoId}.pdf`)
    const pdfPublicPath = path.join(__dirname, "pedidos", `pedido_${pedidoId}.pdf`)
    const carrinhoSafe = carrinhos[numero].map(i => ({
  ...i,
  modelo: i.modelo ?? "",
  qualidade: i.qualidade ?? "",
  nome: i.nome ?? ""
}))


    const pythonCode = `
from reportlab.platypus import SimpleDocTemplate, Table, TableStyle, Spacer, Image, Paragraph
from reportlab.lib import colors
from reportlab.lib.units import cm
from reportlab.lib.styles import getSampleStyleSheet
from reportlab.lib.enums import TA_CENTER
import os

carrinho = ${JSON.stringify(carrinhos[numero], null, 2).replace(/null/g, "None")}
cliente_nome = "${clienteNome}"
output_path = r"${pdfPath}"

doc = SimpleDocTemplate(output_path, pagesize=(8*cm, 25*cm))
elements, styles = [], getSampleStyleSheet()

from datetime import datetime
data_str = datetime.now().strftime("%d/%m/%Y %H:%M")

style_nome = styles['Heading2']
style_nome.alignment = TA_CENTER

style_data = styles['Normal']
style_data.fontSize = 8
style_data.alignment = TA_CENTER

logo_esq = None
logo_path = "v10.jpg"
if os.path.exists(logo_path):
    logo_esq = Image(logo_path, width=2*cm, height=2*cm)
else:
    logo_esq = ""

header_nome_data = Table(
    [[logo_esq, Paragraph(cliente_nome, style_nome), Paragraph(data_str, style_data)]],
    colWidths=[2*cm, 4*cm, 2*cm]
)
header_nome_data.setStyle(TableStyle([
    ('VALIGN', (0,0), (-1,-1), 'MIDDLE')
]))
elements.append(header_nome_data)
elements.append(Spacer(1,12))

data = [["Qtd","Produto","Valor"]]
total = 0

mapa_tipos = {
    "tela": "Tela",
    "bateria": "Bateria",
    "conector": "Conector",
    "alto_falante": "Alto Falante",
    "lente_camera": "Lente Câmera",
    "flex_sub": "Flex Sub",
    "flex_power": "Flex Power",
    "flex_digital": "Flex Digital"
}

ordem_tipos = ["tela","bateria","conector","alto_falante","lente_camera","flex_sub","flex_power","flex_digital"]

carrinho_ordenado = sorted(carrinho, key=lambda x: ordem_tipos.index(x.get("tipo", "").lower()) if x.get("tipo", "").lower() in ordem_tipos else 999)

for item in carrinho_ordenado:
    detalhe = ""
    if item.get("qualidade") and item.get("qualidade") not in ("", "todas"):
        detalhe = item.get("qualidade")
    elif item.get("modelo"):
        detalhe = item.get("modelo")

    tipo = mapa_tipos.get(item.get("tipo", "").lower(), "Peça")
    nome = f"{tipo} {(item.get('nome') or item.get('modelo') or 'DESCONHECIDO').upper()}"

    qtd = int(item.get("quantidade", 1))
    subtotal = float(item["preco"]) * qtd
    data.append([str(qtd), nome + ((" ("+detalhe+")") if detalhe else ""), "R$ %.2f" % subtotal])
    total += subtotal

data.append(["", "Valor total", "R$ %.2f" % total])

t = Table(data, colWidths=[1.2*cm, 4.8*cm, 2*cm])
t.setStyle(TableStyle([
    ('GRID',(0,0),(-1,-2),0.5,colors.black),
    ('ALIGN',(0,0),(-1,-2),'CENTER'),
    ('BACKGROUND',(0,0),(-1,0),colors.lightgrey),
    ('FONTNAME',(0,0),(-1,0),'Helvetica-Bold'),
    ('LINEABOVE',(0,-1),(-1,-1),0.5,colors.black),
    ('LINEBELOW',(0,-1),(-1,-1),0.5,colors.black),
    ('LINEBEFORE',(2,-1),(2,-1),0.5,colors.black),
    ('LINEAFTER',(2,-1),(2,-1),0.5,colors.black),
    ('ALIGN',(2,-1),(2,-1),'RIGHT'),
]))
elements.append(t)
doc.build(elements)
`

    const pyFile = path.join(os.tmpdir(), `gerar_pdf_${Date.now()}.py`)
    fs.writeFileSync(pyFile, pythonCode)

    exec(`python "${pyFile}"`, async (err) => {
      if (err) {
        console.error("❌ Erro ao gerar PDF:", err)
        await sock.sendMessage(numero, { text: "⚠️ Não consegui gerar o PDF do pedido." })
        return
      }
      try {
        const buffer = fs.readFileSync(pdfPath)

        const [grp] = await db.query(
          "SELECT grupo_jid FROM grupos_pedidos WHERE cliente_id = (SELECT id FROM clientes WHERE nome = ? LIMIT 1)",
          [clienteNome]
        )

        let destino = numero
        if (grp.length > 0 && grp[0].grupo_jid) {
          destino = grp[0].grupo_jid
        }

        await sock.sendMessage(destino, {
          document: buffer,
          fileName: `pedido_${clienteNome}.pdf`,
          mimetype: "application/pdf"
        })

        if (!fs.existsSync(path.join(__dirname, "pedidos"))) {
          fs.mkdirSync(path.join(__dirname, "pedidos"))
        }
        fs.copyFileSync(pdfPath, pdfPublicPath)
        console.log(`📂 PDF salvo em ./pedidos/pedido_${pedidoId}.pdf`)
      } catch (e) {
        console.error("❌ Erro ao anexar PDF:", e)
        await sock.sendMessage(numero, { text: "⚠️ PDF gerado, mas não consegui anexar." })
      }
      await resetCliente(sock, numero, "✅ Pedido finalizado! PDF gerado e enviado para o grupo.\n\nAguarde para retirada na loja.")
    })
  } else {
    await sock.sendMessage(numero, { text: "Seu carrinho está vazio. Diga o que precisa (ex.: *tela do g10*, *bateria iphone 11*)." })
  }
  return
}


    let pedido = await interpretarMensagem(texto)
    console.log("🟢 Saída interpretarMensagem:", JSON.stringify(pedido, null, 2))

// junta todos os itens retornados pela IA em uma lista só
// Prioridade (flex e peças mais específicas antes de genéricos)
const todosPedidos = [
  ...(pedido.telas || []),
  ...(pedido.baterias || []),
  ...(pedido.conector || []),
  ...(pedido.alto_falante || []),
  ...(pedido.lente_camera || []),
  ...(pedido.flex_sub || []),
  ...(pedido.flex_power || []),
  ...(pedido.flex_digital || []),
  ...(pedido.auricular || []),
  ...(pedido.camera_frontal || []),
  ...(pedido.camera_traseira || []),
  ...(pedido.microfone || []),
  ...(pedido.tampa || []),
  ...(pedido.wifi || []),
  ...(pedido.gaveta || [])

]


// Remover duplicados por (tipo, modelo normalizado)
const todosPedidosUnicos = []
const seen = new Set()
for (const item of todosPedidos) {
  const key = `${item.tipo}-${normalizarTexto(item.modelo)}`
  if (!seen.has(key)) {
    seen.add(key)
    todosPedidosUnicos.push(item)
  }
}

if (todosPedidosUnicos.length === 0) {
  await sock.sendMessage(numero, { text: "📒 Não encontrei nenhuma peça." })
  return
}

if (!carrinhos[numero]) carrinhos[numero] = []
if (!filaPedidos[numero]) filaPedidos[numero] = []

todosPedidosUnicos.forEach(item => filaPedidos[numero].push(item))

// Opção A (sequencial): processa apenas o próximo; os demais ficam na fila
if (filaPedidos[numero].length > 0) {
  await processarProximoPedido(sock, numero)
}




    // limpa timers antigos
if (timeouts[numero]) {
  clearTimeout(timeouts[numero].aviso)
  clearTimeout(timeouts[numero].fim)
}

timeouts[numero] = {}

// aviso em 2min30s
timeouts[numero].aviso = setTimeout(async () => {
  await sock.sendMessage(numero, { text: "⚠️ Sua conversa será encerrada em 30 segundos por inatividade." })
}, 150000) // 2min30s

// encerramento em 3min
timeouts[numero].fim = setTimeout(async () => {
  await resetCliente(sock, numero, "⌛ Conversa encerrada por inatividade. Tudo foi resetado.")
}, 180000) // 3min

  })
}

startBot()
