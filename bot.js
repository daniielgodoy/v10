import makeWASocket, { useMultiFileAuthState, DisconnectReason } from "@whiskeysockets/baileys"
import { Boom } from "@hapi/boom"
import qrcode from "qrcode-terminal"
import mysql from "mysql2/promise"
import PDFDocument from "pdfkit"
import fs from "fs"

// ================= Configurações =================
const NUMERO_PERMITIDO = "5512997377620@s.whatsapp.net"

const db = await mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'telasDB'
})

const pedidos = {}
const saudacoesEnviadas = {}

// Saudação automática
function saudacaoAtual() {
    const hora = new Date().getHours()
    if (hora >= 5 && hora < 12) return "Bom dia "
    if (hora >= 12 && hora < 18) return "Boa tarde "
    return "Boa noite "
}

// ================= Bot =================
async function startBot() {
    const { state, saveCreds } = await useMultiFileAuthState('auth')
    const sock = makeWASocket({ auth: state })

    sock.ev.on('creds.update', saveCreds)

    sock.ev.on('connection.update', (update) => {
        const { connection, lastDisconnect, qr } = update
        if (qr) qrcode.generate(qr, { small: true })
        if (connection === 'close') {
            const shouldReconnect =
                (lastDisconnect.error = new Boom(lastDisconnect.error))?.output?.statusCode !== DisconnectReason.loggedOut
            console.log('❌ Conexão fechada. Tentando reconectar:', shouldReconnect)
            if (shouldReconnect) startBot()
        } else if (connection === 'open') {
            console.log('✅ Bot conectado!')
        }
    })

    sock.ev.on('messages.upsert', async (m) => {
        const msg = m.messages[0]
        if (!msg.message || msg.key.fromMe) return

        const jid = msg.key.remoteJid
        let texto = msg.message.conversation?.toLowerCase() || ""

        // ================= Bloqueio de outros números =================
        if (jid !== NUMERO_PERMITIDO) return

        // ================= Inicializa pedido =================
        if (!pedidos[jid]) {
            pedidos[jid] = { itens: [], total: 0, estado: 'buscando', itemAtual: null }
        }
        const pedido = pedidos[jid]

        // ================= DETECTAR SAUDAÇÃO =================
        const saudacoes = ["bom dia", "boa tarde", "boa noite"]
        if (saudacoes.some(s => texto.includes(s))) {
            const hoje = new Date().toLocaleDateString()
            if (!saudacoesEnviadas[jid] || saudacoesEnviadas[jid] !== hoje) {
                await sock.sendMessage(jid, { text: `${saudacaoAtual()}, como podemos te ajudar?` })
                saudacoesEnviadas[jid] = hoje
            }
            // não interrompe caso o usuário tenha pedido junto
            texto = texto.replace(/bom dia|boa tarde|boa noite/g, "").trim()
            if (!texto) return
        }

        // ================= CANCELAR =================
        if (texto === "cancelar") {
            pedidos[jid] = { itens: [], total: 0, estado: 'buscando', itemAtual: null }
            delete saudacoesEnviadas[jid]
            await sock.sendMessage(jid, { text: "❌ Pedido cancelado com sucesso." })
            return
        }

        // ================= FINALIZAR =================
        if (texto === "finalizar") {
            if (pedido.itens.length === 0) {
                await sock.sendMessage(jid, { text: "⚠️ Seu pedido está vazio." })
                return
            }

            // Agrupar itens iguais por nome + qualidade
            const itensAgrupados = []
            pedido.itens.forEach(item => {
                const encontrado = itensAgrupados.find(i => i.nome === item.nome && i.qualidade === item.qualidade)
                if (encontrado) {
                    encontrado.quantidade += item.quantidade
                } else {
                    itensAgrupados.push({ ...item })
                }
            })

            let resumo = "🛒 Pedido finalizado!\n\nItens:\n"
            itensAgrupados.forEach((item, i) => {
                const totalItem = item.quantidade * parseFloat(item.preco)
                resumo += `${i + 1}. ${item.tipo} ${item.nome}${item.qualidade ? ` (${item.qualidade})` : ""}  |  Quantidade: ${item.quantidade} | Unitário: R$ ${parseFloat(item.preco).toFixed(2)} | Total: R$ ${totalItem.toFixed(2)}\n`
            })
            const totalGeral = itensAgrupados.reduce((sum, i) => sum + i.quantidade * parseFloat(i.preco), 0)
            resumo += `\nTotal geral: R$ ${totalGeral.toFixed(2)}\n\nEscolha:\n 1. Pagar na loja\n  2. Enviar link de pagamento`
            await sock.sendMessage(jid, { text: resumo })
            pedido.estado = 'pagamento'
            return
        }

        // ================= PAGAMENTO =================
        if (pedido.estado === 'pagamento') {
            let mensagemPagamento = ""
            if (texto === "1") mensagemPagamento = "🏬 Você escolheu pagar na loja!"
            else if (texto === "2") mensagemPagamento = "🔗 Você escolheu pagar com link de pagamento!"
            else {
                await sock.sendMessage(jid, { text: "❌ Opção inválida." })
                return
            }
            await sock.sendMessage(jid, { text: mensagemPagamento })

            // Gera PDF
            const doc = new PDFDocument()
            const dirPath = './pedidos'
            if (!fs.existsSync(dirPath)) fs.mkdirSync(dirPath)
            const filePath = `${dirPath}/pedido_${jid.replace('@s.whatsapp.net','')}_${Date.now()}.pdf`
            const stream = fs.createWriteStream(filePath)
            doc.pipe(stream)
            doc.fontSize(20).text('Pedido de Peças', { align: 'center' })
            doc.moveDown()

            const itensAgrupados = []
            pedido.itens.forEach(item => {
                const encontrado = itensAgrupados.find(i => i.nome === item.nome && i.qualidade === item.qualidade)
                if (encontrado) {
                    encontrado.quantidade += item.quantidade
                } else {
                    itensAgrupados.push({ ...item })
                }
            })

            let totalGeral = 0
            itensAgrupados.forEach((item, i) => {
                const totalItem = item.quantidade * parseFloat(item.preco)
                totalGeral += totalItem
                doc.fontSize(14).text(`${i + 1}. ${item.tipo} ${item.nome}${item.qualidade ? ` (${item.qualidade})` : ""}`)
                doc.fontSize(12).text(`   Quantidade: ${item.quantidade}  |  Valor Unitário: R$ ${parseFloat(item.preco).toFixed(2)}  |  Total: R$ ${totalItem.toFixed(2)}`)
            })
            doc.moveDown()
            doc.fontSize(16).text(`Total geral: R$ ${totalGeral.toFixed(2)}`, { align: 'right' })
            doc.end()

            stream.on('finish', async () => {
                const buffer = fs.readFileSync(filePath)
                await sock.sendMessage(jid, { document: buffer, fileName: filePath.split('/').pop(), mimetype: 'application/pdf' })
            })

            pedidos[jid] = { itens: [], total: 0, estado: 'buscando', itemAtual: null }
            delete saudacoesEnviadas[jid]
            return
        }

        // ================= SELEÇÃO DE QUALIDADE =================
        if (pedido.estado === 'selecionando_qualidade') {
            if (!pedido.itemAtual || !pedido.itemAtual.opcoes || pedido.itemAtual.opcoes.length === 0) {
                pedido.estado = 'buscando'
                pedido.itemAtual = null
                await sock.sendMessage(jid, { text: "❌ Ocorreu um erro. Vamos reiniciar o pedido. Por favor, escolha a peça novamente." })
                return
            }

            if (texto.toLowerCase() === 'cancelar') {
                pedidos[jid] = { itens: [], total: 0, estado: 'buscando', itemAtual: null }
                await sock.sendMessage(jid, { text: "❌ Pedido cancelado com sucesso." })
                return
            }

            if (texto.toLowerCase() === 'nenhum') {
                pedido.estado = 'buscando'
                pedido.itemAtual = null
                await sock.sendMessage(jid, { text: "Ok, peça não adicionada. Digite outra peça para fazer a consulta, 'finalizar' para concluir ou 'cancelar' para encerrar." })
                return
            }

            const escolha = parseInt(texto) - 1
            const opcao = pedido.itemAtual.opcoes[escolha]
            if (!opcao) {
                await sock.sendMessage(jid, { text: "❌ Opção inválida. Digite um número válido, 'nenhum' ou 'cancelar'." })
                return
            }

            pedido.estado = 'definindo_quantidade'
            pedido.itemAtual.selecionado = opcao
            await sock.sendMessage(jid, { text: `Quantas unidades de ${pedido.itemAtual.tipo} ${pedido.itemAtual.nome}${opcao.qualidade ? ` (${opcao.qualidade})` : ""} você deseja? (Digite 'cancelar' para encerrar)` })
            return
        }

        // ================= DEFININDO QUANTIDADE =================
        if (pedido.estado === 'definindo_quantidade') {
            if (texto.toLowerCase() === 'cancelar') {
                pedidos[jid] = { itens: [], total: 0, estado: 'buscando', itemAtual: null }
                await sock.sendMessage(jid, { text: "❌ Pedido cancelado com sucesso." })
                return
            }
            let quantidade = parseInt(texto)
            if (isNaN(quantidade) || quantidade < 1) quantidade = 1

            const itemFinal = {
                tipo: pedido.itemAtual.tipo,
                nome: pedido.itemAtual.nome,
                qualidade: pedido.itemAtual.selecionado.qualidade || null,
                modelo: pedido.itemAtual.selecionado.modelo || null,
                preco: parseFloat(pedido.itemAtual.selecionado.preco),
                quantidade
            }

            pedido.itens.push(itemFinal)
            pedido.estado = 'buscando'
            pedido.itemAtual = null

            await sock.sendMessage(jid, { text: `✅ Adicionado ${itemFinal.tipo} ${itemFinal.nome}${itemFinal.qualidade ? ` (${itemFinal.qualidade})` : ""} x${quantidade} ao pedido.\n\nDigite a próxima peça ou 'finalizar' para concluir.` })
            return
        }

// ================= BUSCANDO PEÇAS =================
let tipo = null
if (texto.includes("tela")) tipo = "tela"
else if (texto.includes("bateria")) tipo = "bateria"
else tipo = "tela" // padrão

// ================= VERIFICAÇÃO DE MÚLTIPLAS PEÇAS =================
// Se houver mais de uma peça na mesma mensagem, avisa para pedir uma por vez
const qtdTelas = (texto.match(/\btela\b/gi) || []).length
const qtdBaterias = (texto.match(/\bbateria\b/gi) || []).length
if (qtdTelas + qtdBaterias > 1) {
    await sock.sendMessage(jid, { text: "⚠️ Por favor, peça uma peça por vez." })
    return
}

// ================= LIMPEZA DO TEXTO =================
let nomeBusca = texto
    .replace(/\btela\b|\bbateria\b/gi, "") // remove palavras-chave
    .replace(/\bdo\b|\bda\b|\buma\b|\bquero\b|\bpor favor\b/gi, "") // remove conectivos
    .trim()

if (!nomeBusca) return

// ================= CONSULTA NO BANCO =================
const tabela = tipo === "tela" ? "telas" : "baterias"
const [rows] = await db.query(
    `SELECT * FROM ${tabela} WHERE nome LIKE ?`,
    [`%${nomeBusca}%`]
)

if (!rows || rows.length === 0) {
    await sock.sendMessage(jid, { text: `⚠️ Por favor, peça uma peça por vez.` })
    return
}

// ================= MOSTRAR OPÇÕES DE QUALIDADE =================
let mensagemOpcoes = `💻 Aqui estão as peças que encontramos:\n\n ${tipo} ${nomeBusca}:\n`
rows.forEach((r, i) => {
    mensagemOpcoes += `${i + 1}. ${tipo} ${r.nome}${r.qualidade ? ` (${r.qualidade})` : ""}${r.modelo ? ` (${r.modelo})` : ""} - R$ ${parseFloat(r.preco).toFixed(2)}\n`
})
mensagemOpcoes += "\nDigite o número da opção desejada, 'nenhum' para não adicionar, ou 'cancelar' para encerrar."

pedido.estado = 'selecionando_qualidade'
pedido.itemAtual = { tipo: tipo, nome: nomeBusca, opcoes: rows }

await sock.sendMessage(jid, { text: mensagemOpcoes })

    })
}

startBot()
