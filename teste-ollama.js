import fetch from "node-fetch"

async function interpretarMensagem(texto) {
    const prompt = `
Você é um atendente de peças para celular.
Transforme pedidos em JSON válido.
Responda APENAS com JSON.

Formato:
{
  "telas": [{ "modelo": "string", "quantidade": number, "qualidade": "original|premium|genérica|todas" }],
  "baterias": [{ "modelo": "string", "quantidade": number, "qualidade": "original|premium|genérica|todas" }]
}
    `

    const response = await fetch("http://localhost:11434/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            model: "mistral",
            prompt: prompt + "\n\nEntrada: " + texto
        })
    })

    // Lê como stream no Node.js
    let raw = ""
    for await (const chunk of response.body) {
        raw += chunk.toString("utf8")
    }

    // Junta as linhas JSONL
    let saida = ""
    raw.split("\n").forEach(line => {
        try {
            const obj = JSON.parse(line)
            if (obj.response) saida += obj.response
        } catch {}
    })

    // Limpeza
    saida = saida.trim()
    saida = saida.replace(/```json/g, "").replace(/```/g, "").trim()

    const match = saida.match(/\{[\s\S]*\}/)
    if (match) {
        return JSON.parse(match[0])
    } else {
        return { telas: [], baterias: [] }
    }
}

// 🚀 Teste
const resultado = await interpretarMensagem("quero duas telas do g10 e uma bateria premium do s23")
console.log("Saída JSON:", resultado)
