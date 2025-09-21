const path = require("path")

console.log("🔥 Bootstrap iniciado (start.cjs)...")

// sempre tenta importar bot.js
;(async () => {
  try {
    const botPath = path.join(process.cwd(), "bot.js")
    await import(botPath)
  } catch (err) {
    console.error("❌ Erro ao importar bot.js:", err)
    process.exit(1)
  }
})()
