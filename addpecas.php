<?php include "navbar.php"; ?>
<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <title>Adicionar Peças</title>
  <style>
    body {
      font-family: "Segoe UI", Tahoma, sans-serif;
      background: #add8ec; 
      margin: 0;
      padding: 20px;
    }
    h1 {
      text-align: center;
      margin-bottom: 25px;
      font-weight: 600;
      color: #333;
    }
    .step {
      max-width: 600px;
      margin: 0 auto;
      background: #fff;
      padding: 25px;
      border-radius: 10px;
      box-shadow: 0 4px 10px rgba(0,0,0,0.08);
      animation: fadeIn 0.4s ease-in-out;
    }
    .step h2 {
      margin-bottom: 20px;
      font-size: 20px;
      font-weight: 500;
      color: #444;
      text-align: center;
    }
    .buttons {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(130px, 1fr));
      gap: 12px;
    }
    .buttons button {
      padding: 12px;
      border: none;
      border-radius: 8px;
      background: #007bff;
      color: #fff;
      font-size: 15px;
      cursor: pointer;
      transition: background 0.3s, transform 0.1s;
    }
    .buttons button:hover {
      background: #0056b3;
      transform: translateY(-2px);
    }
    form {
      display: flex;
      flex-direction: column;
      gap: 18px;
      margin-top: 10px;
    }
    label {
      font-weight: 500;
      color: #555;
      margin-bottom: 6px;
      display: block;
    }
    input {
      padding: 10px 12px;
      border: 1px solid #ccc;
      border-radius: 6px;
      width: 100%;
      font-size: 14px;
      transition: border 0.2s;
    }
    input:focus {
      border-color: #007bff;
      outline: none;
    }
    .actions {
      display: flex;
      justify-content: flex-end;
      gap: 10px;
      margin-top: 10px;
    }
    .actions button {
      padding: 10px 18px;
      border: none;
      border-radius: 6px;
      font-size: 14px;
      cursor: pointer;
      color: #fff;
      transition: background 0.3s;
    }
    .actions .back {
      background: #6c757d;
    }
    .actions .back:hover {
      background: #565e64;
    }
    .actions .save {
      background: #28a745;
    }
    .actions .save:hover {
      background: #1e7e34;
    }
    @keyframes fadeIn {
      from { opacity: 0; transform: translateY(15px); }
      to { opacity: 1; transform: translateY(0); }
    }
  </style>
</head>
<body>

<h1>Adicionar Peças</h1>

<div id="step1" class="step">
  <h2>Deseja adicionar qual peça?</h2>
  <div class="buttons">
    <button onclick="escolher('telas')">Tela</button>
    <button onclick="escolher('baterias')">Bateria</button>
    <button onclick="escolher('conector')">Conector</button>
    <button onclick="escolher('alto_falante')">Alto Falante</button>
    <button onclick="escolher('lente_camera')">Lente Câmera</button>
    <button onclick="escolher('flex_sub')">Flex Sub</button>
    <button onclick="escolher('flex_power')">Flex Power</button>
    <button onclick="escolher('flex_digital')">Flex Digital</button>
  </div>
</div>

<div id="step2" class="step" style="display:none;">
  <h2 id="formTitle"></h2>
  <form id="formAdd" method="POST" action="salvarpeca.php">
    <input type="hidden" name="tabela" id="tabela">
    <div id="fields"></div>
    <div class="actions">
      <button type="button" class="back" onclick="voltar()">Voltar</button>
      <button type="submit" class="save">Salvar</button>
    </div>
  </form>
</div>

<script>
function escolher(tipo) {
  document.getElementById("step1").style.display = "none";
  document.getElementById("step2").style.display = "block";
  document.getElementById("tabela").value = tipo;
  const titleMap = {
    telas: "Adicionar Tela",
    baterias: "Adicionar Bateria",
    conector: "Adicionar Conector",
    alto_falante: "Adicionar Alto Falante",
    lente_camera: "Adicionar Lente de Câmera",
    flex_sub: "Adicionar Flex Sub",
    flex_power: "Adicionar Flex Power",
    flex_digital: "Adicionar Flex Digital"
  };
  document.getElementById("formTitle").innerText = titleMap[tipo] || "Adicionar Peça";

  let fields = "";
  if (tipo === "telas") {
    fields = `
      <label>Nome:</label>
      <input type="text" name="nome" required>
      <label>Qualidade:</label>
      <input type="text" name="qualidade">
      <label>Preço:</label>
      <input type="text" name="preco" required oninput="this.value=this.value.replace(/[^0-9.,]/g,'')">
    `;
  } else if (tipo === "baterias") {
    fields = `
      <label>Nome:</label>
      <input type="text" name="nome" required>
      <label>Modelo (opcional):</label>
      <input type="text" name="modelo">
      <label>Preço:</label>
      <input type="text" name="preco" required oninput="this.value=this.value.replace(/[^0-9.,]/g,'')">
    `;
  } else {
    fields = `
      <label>Nome:</label>
      <input type="text" name="nome" required>
      <label>Preço:</label>
      <input type="text" name="preco" required oninput="this.value=this.value.replace(/[^0-9.,]/g,'')">
    `;
  }
  document.getElementById("fields").innerHTML = fields;
}

function voltar() {
  document.getElementById("step2").style.display = "none";
  document.getElementById("step1").style.display = "block";
}
</script>

</body>
</html>
