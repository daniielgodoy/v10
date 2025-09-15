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

// ================= Clientes =================
const clientes = {
  "5512997377620@s.whatsapp.net": "Daniel Godoy",
  "5512997918228@s.whatsapp.net": "Alfredo Godoy"
}
const numerosPermitidos = Object.keys(clientes)

// ================= Helpers =================
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
  const tipo = item.tipo?.toLowerCase() === "tela" ? "Tela" : "Bateria"
  const nome = item.nome ? item.nome.toUpperCase() : (item.modelo ? item.modelo.toUpperCase() : "DESCONHECIDO")
  return `${tipo} ${nome}`
}

function casarRotulo(rotNorm, opcoesNorm) {
  if (["aro","com aro","comaro"].includes(rotNorm)) rotNorm = "com aro"
  if (["nac","nacional"].includes(rotNorm)) rotNorm = "nacional"
  if (["orig","original"].includes(rotNorm)) rotNorm = "original"
  if (["prem","premium"].includes(rotNorm)) rotNorm = "premium"
  if (["standart","standard"].includes(rotNorm)) rotNorm = "standard"

  let opt = opcoesNorm.find(o => o.__rotulo === rotNorm)
  if (!opt) opt = opcoesNorm.find(o => o.__rotulo.includes(rotNorm))
  if (!opt) opt = opcoesNorm.find(o => rotNorm.includes(o.__rotulo))
  return opt
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

// ================= Estados =================
const carrinhos = {}
const aguardandoQualidade = {}
const filaPedidos = {}
const saudacoesEnviadas = {}
const timeouts = {}

// ================= Reset =================
async function resetCliente(sock, numero, msg = null) {
  carrinhos[numero] = []
  filaPedidos[numero] = []
  aguardandoQualidade[numero] = null
  delete saudacoesEnviadas[numero]
  if (timeouts[numero]) clearTimeout(timeouts[numero])
  delete timeouts[numero]
  if (msg) await sock.sendMessage(numero, { text: msg })
}

// ================= Mostrar carrinho =================
async function mostrarCarrinho(sock, numero) {
  if (!carrinhos[numero] || carrinhos[numero].length === 0) return
  let resposta = "🛒 Carrinho atualizado:\n"
  let total = 0
  carrinhos[numero].forEach(i => {
    const detalhe = detalheItem(i)
    resposta += `- ${formatarNome(i)}${detalhe ? " ("+detalhe+")" : ""} → R$ ${i.preco}\n`
    total += parseFloat(i.preco)
  })
  resposta += `\n💰 Total: R$ ${total}\n\nDeseja continuar adicionando peças ou prefere finalizar? (digite: finalizar ou cancelar)`
  await sock.sendMessage(numero, { text: resposta })
}

// ================= IA =================
async function interpretarMensagem(texto) {
  const prompt = `
Você é um atendente de peças para celular.
Transforme pedidos em JSON válido.
Responda SOMENTE com JSON puro.

Formato:
{
  "telas": [{ "modelo": "string", "quantidade": number, "qualidade": "todas|original|premium|genérica|com aro|nacional|standard" }],
  "baterias": [{ "modelo": "string", "quantidade": number, "qualidade": "todas|original|premium|genérica|standard" }]
}`

  const response = await fetch("http://localhost:11434/api/generate", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ model: "mistral", prompt: prompt + "\n\nEntrada: " + texto })
  })

  let raw = ""
  for await (const chunk of response.body) raw += chunk.toString("utf8")

  let saida = ""
  raw.split("\n").forEach(line => {
    try { const obj = JSON.parse(line); if (obj.response) saida += obj.response } catch {}
  })

  saida = saida.trim().replace(/```json/g, "").replace(/```/g, "").trim()
  const match = saida.match(/\{[\s\S]*\}/)

  let parsed = { telas: [], baterias: [] }
  if (match) {
    try { parsed = JSON.parse(match[0]) } 
    catch { parsed = { telas: [], baterias: [] } }
  }

  function corrigirQuantidades(lista) {
    return (lista || []).map(item => {
      let qtd = parseInt(item.quantidade, 10) || 1
      const modeloNorm = normalizarTexto(item.modelo || "")
      if (qtd > 1 && modeloNorm.includes(String(qtd))) {
        return { ...item, quantidade: 1 }
      }
      return { ...item, quantidade: (qtd > 0 ? qtd : 1) }
    })
  }

  return {
    telas: corrigirQuantidades(parsed.telas || []).map(t => ({ ...t, tipo: "tela", qualidade: t.qualidade || "todas" })),
    baterias: corrigirQuantidades(parsed.baterias || []).map(b => ({ ...b, tipo: "bateria", qualidade: b.qualidade || "todas" }))
  }
}

// ================= Processar pedidos =================
async function processarProximoPedido(sock, numero) {
  if (!filaPedidos[numero] || filaPedidos[numero].length === 0) return
  const pedido = filaPedidos[numero].shift()

  const [rows] = await db.query(
    pedido.tipo === "tela"
      ? "SELECT * FROM telas WHERE nome LIKE ?"
      : "SELECT * FROM baterias WHERE nome LIKE ?",
    [`%${pedido.modelo}%`]
  )

  if (rows.length === 0) {
    await sock.sendMessage(numero, { text: `⚠️ Não encontrei nenhuma ${pedido.tipo} para ${pedido.modelo.toUpperCase()}.` })
    return processarProximoPedido(sock, numero)
  }

  if (pedido.qualidade === "todas") {
    const opcoes = rows.map((r, i) => {
      const detalhe = r.qualidade || r.modelo || ""
      const nomeBanco = r.nome || r.modelo || pedido.modelo
      const tipo = pedido.tipo === "tela" ? "Tela" : "Bateria"
      return `${i+1}. ${tipo} ${nomeBanco.toUpperCase()}${detalhe ? " ("+detalhe+")" : ""} → R$ ${r.preco}`
    }).join("\n")

    aguardandoQualidade[numero] = {
      ...pedido,
      opcoes: rows.map(o => ({ ...o, __rotulo: normalizarTexto(o.qualidade || o.modelo || "") }))
    }

    await sock.sendMessage(numero, { text: `📒 Para ${formatarNome(pedido)} encontrei:\n${opcoes}\n\n👉 Qual opção deseja?\n\nDigite *voltar* para cancelar.` })
  } else {
    const pedidoQualidade = normalizarTexto(pedido.qualidade || "")
    const filtradas = rows.filter(r => normalizarTexto(r.qualidade || r.modelo || r.nome || "") === pedidoQualidade)

    filtradas.forEach(r => {
      for (let i = 0; i < pedido.quantidade; i++) {
        carrinhos[numero].push({ ...r, tipo: pedido.tipo, nome: r.nome || r.modelo || pedido.modelo })
      }
    })
    await mostrarCarrinho(sock, numero)
    if (filaPedidos[numero].length > 0) {
      await processarProximoPedido(sock, numero)
    }
  }
}

// ================= Escolha de qualidade =================
async function tratarQualidade(sock, numero, textoOriginal) {
  const ctx = aguardandoQualidade[numero]
  if (!ctx) return false

  const entradaRaw = String(textoOriginal ?? "").toLowerCase().trim()
  if (entradaRaw === "voltar") {
    delete aguardandoQualidade[numero]
    await sock.sendMessage(numero, { text: "↩️ Escolha cancelada." })
    return processarProximoPedido(sock, numero)
  }

  const opcoesNorm = ctx.opcoes.map(o => {
    const base = (o.qualidade && o.qualidade.trim() !== "")
      ? o.qualidade
      : (o.modelo || o.nome || "")
    return { ...o, __rotulo: normalizarTexto(base), __nomeNorm: normalizarTexto(o.nome || base || "") }
  })

  const entradaNorm = normalizarTexto(entradaRaw)

  const candidatosInteiro = opcoesNorm.filter(o =>
    o.__rotulo.includes(entradaNorm) || o.__nomeNorm.includes(entradaNorm)
  )
  if (candidatosInteiro.length === 1) {
    carrinhos[numero].push({ ...candidatosInteiro[0], tipo: ctx.tipo })
    delete aguardandoQualidade[numero]
    await mostrarCarrinho(sock, numero)
    if (filaPedidos[numero]?.length) return processarProximoPedido(sock, numero)
    return true
  }

  const partes = entradaRaw.split(/\s*(?:,|;|\/|\+|\be\b)\s*/gi).map(p => p.trim()).filter(Boolean)
  const MODEL_HINTS = new Set(["pro","max","plus","mini","ultra","edge","note","galaxy","iphone","s","a","g"])

  const escolhasQtd = []
  const selecionadas = []

  for (const parte of partes) {
    const parteNorm = normalizarTexto(parte)
    if (/^\d+$/.test(parteNorm)) {
      const idx = parseInt(parteNorm, 10)
      if (idx >= 1 && idx <= opcoesNorm.length) selecionadas.push(opcoesNorm[idx - 1])
      continue
    }

    const m = parteNorm.match(/^(\d+)\s*(x)?\s*(.+)$/)
    if (m) {
      const qtd = Math.max(1, parseInt(m[1], 10))
      const temX = !!m[2]
      const resto = m[3].trim()
      const primeiroToken = (resto.split(/\s+/)[0] || "")
      if (temX || !MODEL_HINTS.has(primeiroToken)) {
        const opt = casarRotulo(resto, opcoesNorm) || opcoesNorm.find(o => o.__nomeNorm.includes(resto))
        if (opt) {
          for (let i = 0; i < qtd; i++) escolhasQtd.push(opt)
          continue
        }
      }
    }

    const opt = casarRotulo(parteNorm, opcoesNorm) || opcoesNorm.find(o => o.__nomeNorm.includes(parteNorm))
    if (opt) selecionadas.push(opt)
  }

  let finais = []
  if (escolhasQtd.length > 0) finais = escolhasQtd
  else if (selecionadas.length > 0) finais = [...new Set(selecionadas)]

  if (finais.length === 0) {
    await sock.sendMessage(numero, { text: "⚠️ Não entendi a escolha. Exemplo: *2 premium*, *1 nacional* ou *12 pro max*. Digite *voltar* para cancelar." })
    return true
  }

  finais.forEach(sel => carrinhos[numero].push({ ...sel, tipo: ctx.tipo }))
  delete aguardandoQualidade[numero]
  await mostrarCarrinho(sock, numero)
  if (filaPedidos[numero]?.length) return processarProximoPedido(sock, numero)
  return true
}

// ================= Bot =================
async function startBot() {
  const { state, saveCreds } = await useMultiFileAuthState("auth")
  const sock = makeWASocket({ auth: state })

  sock.ev.on("connection.update", (u) => {
    const { connection, lastDisconnect } = u
    if (connection === "close") {
      const shouldReconnect = (lastDisconnect.error?.output?.statusCode) !== DisconnectReason.loggedOut
      if (shouldReconnect) startBot()
    } else if (connection === "open") console.log("✅ Bot conectado!")
  })
  sock.ev.on("creds.update", saveCreds)

  sock.ev.on("messages.upsert", async ({ messages }) => {
    const msg = messages[0]
    if (!msg.message || msg.key.fromMe) return
    const numero = msg.key.remoteJid
    if (!numerosPermitidos.includes(numero)) return

    const textoRaw = extrairTexto(msg)
    if (!textoRaw || !textoRaw.trim()) return
    const texto = textoRaw.toLowerCase().trim()

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

    // finalizar
    if (texto === "finalizar") {
      if (carrinhos[numero]?.length > 0) {
        let resposta = "✅ Pedido finalizado!\n\n"
        let total = 0
        carrinhos[numero].forEach(i => {
          const detalhe = detalheItem(i)
          resposta += `- ${formatarNome(i)}${detalhe ? " ("+detalhe+")" : ""} → R$ ${i.preco}\n`
          total += parseFloat(i.preco)
        })
        resposta += `\n💰 Total: R$ ${total}\n\nPagamento: *na loja* ou *link*?`
        await sock.sendMessage(numero, { text: resposta })
      }
      return
    }

    // pagamento
    if (texto.includes("loja") || texto.includes("link")) {
      if (carrinhos[numero]?.length > 0) {
        let total = carrinhos[numero].reduce((a, i) => a + parseFloat(i.preco), 0)
        const clienteNome = clientes[numero] || numero
        const pdfPath = path.join(__dirname, `pedido_${clienteNome.replace(/ /g,"_")}.pdf`)

        const pythonCode = `
from reportlab.platypus import SimpleDocTemplate, Table, TableStyle, Spacer, Image, Paragraph
from reportlab.lib import colors
from reportlab.lib.units import cm
from reportlab.lib.styles import getSampleStyleSheet
from reportlab.lib.enums import TA_CENTER
import os

carrinho = ${JSON.stringify(carrinhos[numero], null, 2)}
cliente_nome = "${clienteNome}"
output_path = r"${pdfPath}"

doc = SimpleDocTemplate(output_path, pagesize=(8*cm, 25*cm))
elements, styles = [], getSampleStyleSheet()

logo_path = "logo_v10.png"
if os.path.exists(logo_path):
    img_esq = Image(logo_path, width=2*cm, height=2*cm)
    img_dir = Image(logo_path, width=2*cm, height=2*cm)
    header = Table([[img_esq, "", img_dir]], colWidths=[2*cm, 4*cm, 2*cm])
    elements.append(header)
    elements.append(Spacer(1,12))

style_nome = styles['Heading2']
style_nome.alignment = TA_CENTER
elements.append(Paragraph(cliente_nome, style_nome))
elements.append(Spacer(1,12))

data = [["Qtd","Produto","Valor"]]
total = 0
for item in carrinho:
    detalhe = ""
    if item.get("qualidade") and item.get("qualidade") not in ("", "todas"):
        detalhe = item.get("qualidade")
    elif item.get("modelo"):
        detalhe = item.get("modelo")
    tipo = "Tela" if item.get("tipo") == "tela" else "Bateria"
    nome = f"{tipo} {(item.get('nome') or item.get('modelo') or 'DESCONHECIDO').upper()}"
    data.append([str(1), nome + ((" ("+detalhe+")") if detalhe else ""), "R$ %.2f" % float(item["preco"])])
    total += float(item["preco"])
data.append(["","Valor total","R$ %.2f" % total])

t = Table(data, colWidths=[1.2*cm, 4.8*cm, 2*cm])
t.setStyle(TableStyle([
    ('GRID',(0,0),(-1,-1),0.5,colors.black),
    ('ALIGN',(0,0),(-1,-1),'CENTER'),
    ('BACKGROUND',(0,0),(-1,0),colors.lightgrey),
    ('FONTNAME',(0,0),(-1,0),'Helvetica-Bold'),
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
          await sock.sendMessage(numero, {
            document: fs.readFileSync(pdfPath),
            fileName: `pedido_${clienteNome}.pdf`,
            mimetype: "application/pdf"
          })
        })

        await resetCliente(sock, numero, "✅ Pedido finalizado! PDF gerado e conversa encerrada.")
      }
      return
    }

    // IA interpreta
    let pedido = await interpretarMensagem(texto)
    if (pedido.telas.length===0 && pedido.baterias.length===0){
      await sock.sendMessage(numero,{text:"📒 Não encontrei nenhuma peça."})
      return
    }
    if (!carrinhos[numero]) carrinhos[numero]=[]
    if (!filaPedidos[numero]) filaPedidos[numero]=[]
    pedido.telas.forEach(t=>filaPedidos[numero].push(t))
    pedido.baterias.forEach(b=>filaPedidos[numero].push(b))
    if (filaPedidos[numero].length>0) await processarProximoPedido(sock, numero)

    if (timeouts[numero]) clearTimeout(timeouts[numero])
    timeouts[numero] = setTimeout(async () => {
      await resetCliente(sock, numero, "⌛ Conversa encerrada por inatividade. Tudo foi resetado.")
    }, 180000)
  })
}

startBot()
