@echo off
title Bot V10
color 0a
echo 🔥 Iniciando Bot V10...

REM Caminho para o Node.js (ajuste se necessário)
SET PATH=%PATH%;C:\Program Files\nodejs

REM Variáveis de conexão com o MySQL remoto
SET DB_HOST=transdevotos.com
SET DB_USER=root
SET DB_PASS=sua_senha
SET DB_NAME=telasdb

REM Executa o bot
node bot.js

pause
