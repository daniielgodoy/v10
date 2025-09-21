<?php
include "navbar.php";
$mysqli = new mysqli("localhost", "root", "", "telasdb");

// Buscar clientes
$clientes = $mysqli->query("SELECT * FROM clientes ORDER BY nome ASC")->fetch_all(MYSQLI_ASSOC);

// Função para buscar linhas
function getRows($mysqli, $tabela) {
    return $mysqli->query("SELECT * FROM $tabela ORDER BY id ASC")->fetch_all(MYSQLI_ASSOC);
}

$pecas = [
    "tela" => getRows($mysqli, "telas"),
    "bateria" => getRows($mysqli, "baterias"),
    "conector" => getRows($mysqli, "conector"),
    "alto_falante" => getRows($mysqli, "alto_falante"),
    "lente_camera" => getRows($mysqli, "lente_camera"),
    "flex_sub" => getRows($mysqli, "flex_sub"),
    "flex_power" => getRows($mysqli, "flex_power"),
    "flex_digital" => getRows($mysqli, "flex_digital")
];
?>
<!DOCTYPE html>
<html lang="pt-br">
<head>
<meta charset="UTF-8">
<title>Adicionar Pedido</title>
<style>
body {
    font-family: Arial, sans-serif;
  background: #add8ec; 
    margin: 0;
    padding: 20px;
}
.container {
    max-width: 900px;
    margin: auto;
    background: #fff;
    padding: 25px;
    border-radius: 12px;
    box-shadow: 0 3px 10px rgba(0,0,0,0.1);
}
h2 {
    margin-bottom: 20px;
    color: #333;
}
.step {
    display: none;
}
.step.active {
    display: block;
    animation: fadeIn 0.5s;
}
@keyframes fadeIn {
    from { opacity: 0; transform: translateY(10px); }
    to { opacity: 1; transform: translateY(0); }
}
.form-group {
    margin-bottom: 15px;
}
label {
    display: block;
    font-weight: bold;
    margin-bottom: 6px;
}
select, input {
    width: 100%;
    padding: 8px;
    border-radius: 6px;
    border: 1px solid #ccc;
}
button {
    padding: 10px 18px;
    margin-top: 10px;
    border: none;
    border-radius: 6px;
    background: #007BFF;
    color: white;
    font-size: 15px;
    cursor: pointer;
    transition: background 0.2s;
}
button:hover {
    background: #0056b3;
}
#itens-lista {
    margin-top: 20px;
    padding: 10px;
    border-radius: 6px;
    background: #fafafa;
    border: 1px solid #ddd;
}
.item {
    padding: 8px;
    margin-bottom: 5px;
    border-bottom: 1px solid #eee;
}
</style>
</head>
<body>
<div class="container">
    <h2>Adicionar Pedido Manualmente</h2>

    <!-- Escolher Cliente -->
    <div class="form-group">
        <label>Cliente</label>
        <select id="clienteSelect">
            <option value="">Selecione...</option>
            <?php foreach ($clientes as $c): ?>
                <option value="<?= $c['id'] ?>"><?= htmlspecialchars($c['nome']) ?></option>
            <?php endforeach; ?>
        </select>
    </div>

    <!-- Passo 1: Escolher tipo -->
    <div id="step1" class="step active">
        <h3>Escolha o tipo de peça</h3>
        <?php foreach ($pecas as $tipo => $dados): ?>
            <button onclick="escolherTipo('<?= $tipo ?>')"><?= ucfirst(str_replace("_", " ", $tipo)) ?></button>
        <?php endforeach; ?>
    </div>

    <!-- Passo 2: Preencher dados -->
    <div id="step2" class="step">
        <h3>Adicionar Peça</h3>
        <div id="campos"></div>
        <button onclick="adicionarItem()">Adicionar Peça</button>
        <button onclick="voltar()">Voltar</button>
    </div>

    <!-- Lista -->
    <div id="itens-lista"></div>

    <button onclick="finalizarPedido()">Finalizar Pedido</button>
</div>

<script>
let tipoAtual = "";
let itens = [];
const pecas = <?= json_encode($pecas) ?>;

function escolherTipo(tipo) {
  tipoAtual = tipo;
  document.getElementById("step1").classList.remove("active");
  document.getElementById("step2").classList.add("active");
  montarCampos();
}

function voltar() {
  document.getElementById("step2").classList.remove("active");
  document.getElementById("step1").classList.add("active");
}

function montarCampos() {
  let html = "";

  // Combobox peças
  html += `<div class="form-group">
    <label>Peça</label>
    <select id="pecaSelect" onchange="atualizarQualidades()">
      <option value="">Selecione...</option>`;
  pecas[tipoAtual].forEach(p => {
    const nome = p.nome || p.modelo;
    html += `<option value="${nome}" data-preco="${p.preco}" data-qualidade="${p.qualidade||""}">${nome}</option>`;
  });
  html += `</select></div>`;

  // Combobox qualidade (somente telas/baterias)
  if (tipoAtual === "tela" || tipoAtual === "bateria") {
    html += `<div class="form-group" id="qualidadeBox" style="display:none;">
      <label>Qualidade</label>
      <select id="qualidadeSelect"></select>
    </div>`;
  }

  html += `
    <div class="form-group"><label>Quantidade</label><input type="number" id="quantidade" value="1" min="1"></div>
    <div class="form-group"><label>Preço</label><input type="text" id="preco" readonly></div>
  `;

  document.getElementById("campos").innerHTML = html;
}

function atualizarQualidades() {
  const pecaNome = document.getElementById("pecaSelect").value;
  const precoInput = document.getElementById("preco");
  const box = document.getElementById("qualidadeBox");
  const select = document.getElementById("qualidadeSelect");

  if (!pecaNome) {
    precoInput.value = "";
    if (select) select.innerHTML = "";
    if (box) box.style.display = "none";
    return;
  }

  // Filtra todas as opções dessa peça
  const lista = pecas[tipoAtual].filter(p => (p.nome === pecaNome || p.modelo === pecaNome));

  if (tipoAtual === "tela" || tipoAtual === "bateria") {
    const qualidades = lista.filter(p => p.qualidade).map(p => ({ q: p.qualidade, preco: p.preco }));

    if (qualidades.length > 0) {
      // Preenche o select de qualidades
      select.innerHTML = qualidades.map(q => `<option value="${q.q}" data-preco="${q.preco}">${q.q}</option>`).join("");
      box.style.display = "block";

      // Define o preço do primeiro item
      precoInput.value = qualidades[0].preco;

      // Atualiza preço ao mudar de qualidade
      select.onchange = function() {
        const precoSel = select.options[select.selectedIndex].getAttribute("data-preco");
        precoInput.value = precoSel;
      };
    } else {
      box.style.display = "none";
      precoInput.value = lista.length > 0 ? lista[0].preco : "";
    }
  } else {
    // Outros tipos (sem qualidade)
    precoInput.value = lista.length > 0 ? lista[0].preco : "";
    if (box) box.style.display = "none";
  }
}

function adicionarItem() {
  const peca = document.getElementById("pecaSelect").value;
  if (!peca) {
    alert("Selecione uma peça!");
    return;
  }
  const qualidade = document.getElementById("qualidadeSelect")?.value || "";
  const quantidade = parseInt(document.getElementById("quantidade").value) || 1;
  const precoUnit = parseFloat(document.getElementById("preco").value) || 0;
  const subtotal = (quantidade * precoUnit).toFixed(2);

  itens.push({ tipo: tipoAtual, modelo: peca, qualidade, quantidade, preco: subtotal, preco_unit: precoUnit });
  atualizarLista();
}

function atualizarLista() {
  const div = document.getElementById("itens-lista");
  if (itens.length === 0) {
    div.innerHTML = "";
    return;
  }
  let html = "<h3>Itens do Pedido</h3>";
  itens.forEach((i, idx) => {
    html += `
      <div class="item">
        #${idx+1} - ${i.tipo.toUpperCase()} ${i.modelo} ${i.qualidade ? "(" + i.qualidade + ")" : ""}
        - Qtd: 
        <input type="number" min="1" value="${i.quantidade}" style="width:60px" onchange="atualizarQtd(${idx}, this.value)">
        - R$ ${i.preco}
        <button onclick="removerItem(${idx})" style="margin-left:10px; color:red; border:none; background:none; font-weight:bold; cursor:pointer;">X</button>
      </div>`;
  });
  div.innerHTML = html;
}

function atualizarQtd(idx, novaQtd) {
  novaQtd = parseInt(novaQtd) || 1;
  itens[idx].quantidade = novaQtd;
  itens[idx].preco = (novaQtd * itens[idx].preco_unit).toFixed(2);
  atualizarLista();
}

function removerItem(idx) {
  itens.splice(idx, 1);
  atualizarLista();
}


function finalizarPedido() {
  const clienteId = document.getElementById("clienteSelect").value;
  if (!clienteId) {
    alert("Selecione um cliente!");
    return;
  }
  if (itens.length === 0) {
    alert("Adicione ao menos uma peça!");
    return;
  }

  fetch("salvarpedido.php", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ cliente_id: clienteId, itens })
  })
  .then(res => res.json())
  .then(data => {
    if (data.sucesso) {
      alert("✅ Pedido #" + data.pedido_id + " adicionado com sucesso!");
      location.reload();
    } else {
      alert("⚠️ Erro: " + (data.erro || "não foi possível salvar"));
    }
  })
  .catch(err => {
    alert("⚠️ Falha ao salvar pedido: " + err);
  });
}

</script>
</body>
</html>
