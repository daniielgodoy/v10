<?php
include "navbar.php";
$mysqli = new mysqli("localhost", "root", "", "telasdb");
if ($mysqli->connect_errno) { die("DB error"); }

$pedido_id = isset($_GET["id"]) ? intval($_GET["id"]) : 0;
if ($pedido_id <= 0) { die("Pedido inválido."); }

// pedido + itens
$pedido = $mysqli->query("SELECT * FROM pedidos WHERE id=$pedido_id")->fetch_assoc();
$itensDB = $mysqli->query("SELECT * FROM pedido_itens WHERE pedido_id=$pedido_id ORDER BY id ASC")->fetch_all(MYSQLI_ASSOC);

// clientes (para exibir nome/numero – não vamos trocar cliente aqui)
$cliente_nome = $pedido ? $pedido["cliente_nome"] : "";
$cliente_numero = $pedido ? $pedido["cliente_numero"] : "";

// helper busca
function getRows($mysqli, $tabela) {
  return $mysqli->query("SELECT * FROM $tabela ORDER BY id ASC")->fetch_all(MYSQLI_ASSOC);
}
$pecas = [
  "tela"         => getRows($mysqli, "telas"),
  "bateria"      => getRows($mysqli, "baterias"),
  "conector"     => getRows($mysqli, "conector"),
  "alto_falante" => getRows($mysqli, "alto_falante"),
  "lente_camera" => getRows($mysqli, "lente_camera"),
  "flex_sub"     => getRows($mysqli, "flex_sub"),
  "flex_power"   => getRows($mysqli, "flex_power"),
  "flex_digital" => getRows($mysqli, "flex_digital")
];
?>
<!DOCTYPE html>
<html lang="pt-br">
<head>
<meta charset="UTF-8" />
<title>Editar Pedido #<?= $pedido_id ?></title>
<style>
/* === mesmo CSS do adicionarpedido.php === */
body {
    font-family: Arial, sans-serif;
    background: #f7f7f7;
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
.step { display: none; }
.step.active { display: block; animation: fadeIn 0.5s; }
@keyframes fadeIn {
    from { opacity: 0; transform: translateY(10px); }
    to { opacity: 1; transform: translateY(0); }
}
.form-group { margin-bottom: 15px; }
label { display: block; font-weight: bold; margin-bottom: 6px; }
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
button:hover { background: #0056b3; }
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
.item button {
    background: #dc3545;
    border: none;
    border-radius: 6px;
    padding: 6px 12px;
    color: #fff;
    cursor: pointer;
    float: right;
}
.item button:hover { background: #b02a37; }
</style>
</head>
<body>
<div class="container">
  <h2>Editar Pedido #<?= $pedido_id ?></h2>
  <div class="form-group">
    <label>Cliente</label>
    <input type="text" value="<?= htmlspecialchars($cliente_nome) ?> (<?= htmlspecialchars($cliente_numero) ?>)" readonly>
  </div>

  <!-- Passo 1: Escolher tipo -->
  <div id="step1" class="step active">
    <h3>Escolha o tipo de peça</h3>
    <?php foreach ($pecas as $tipo => $dados): ?>
      <button type="button" onclick="escolherTipo('<?= $tipo ?>')">
        <?= ucfirst(str_replace("_"," ",$tipo)) ?>
      </button>
    <?php endforeach; ?>
  </div>

  <!-- Passo 2: Campos da peça -->
  <div id="step2" class="step">
    <h3>Adicionar/Editar Peça</h3>
    <div id="campos"></div>
    <button type="button" onclick="adicionarItem()">Adicionar Peça</button>
    <button type="button" onclick="voltar()">Voltar</button>
  </div>

  <!-- Lista de itens -->
  <div id="itens-lista"></div>

  <button id="btnSalvar" type="button" onclick="salvarAlteracoes()">Salvar Alterações</button>
</div>

<script>
const pedidoId = <?= (int)$pedido_id ?>;
const pecas   = <?= json_encode($pecas, JSON_UNESCAPED_UNICODE) ?>;
// prepara “itens” a partir do banco
let itens = <?= json_encode($itensDB, JSON_UNESCAPED_UNICODE) ?>.map(i => ({
  tipo: i.tipo,
  modelo: i.modelo,
  qualidade: i.qualidade || "",
  quantidade: parseInt(i.quantidade, 10) || 1,
  preco: String(i.preco) // unitário
}));

let tipoAtual = "";

function escolherTipo(tipo) {
  tipoAtual = tipo;
  document.getElementById("step1").classList.remove("active");
  document.getElementById("step2").classList.add("active");
  montarCampos(); // MESMO layout do adicionar
}
function voltar() {
  document.getElementById("step2").classList.remove("active");
  document.getElementById("step1").classList.add("active");
}

// ===== montarCampos (igual ao adicionar; com qty recalculando total visual) =====
function montarCampos() {
  let html = "";

  // peça
  html += `<div class="form-group">
    <label>Peça</label>
    <select id="pecaSelect" onchange="atualizarQualidades()">
      <option value="">Selecione...</option>`;
  (pecas[tipoAtual] || []).forEach(p => {
    const nome = p.nome || p.modelo;
    html += `<option value="${nome}" data-preco="${p.preco}" data-qualidade="${p.qualidade||""}">${nome}</option>`;
  });
  html += `</select></div>`;

  // qualidade (só tela/bateria)
  if (tipoAtual === "tela" || tipoAtual === "bateria") {
    html += `<div class="form-group" id="qualidadeBox" style="display:none;">
      <label>Qualidade</label>
      <select id="qualidadeSelect"></select>
    </div>`;
  }

  html += `
    <div class="form-group">
      <label>Quantidade</label>
      <input type="number" id="quantidade" value="1" min="1" oninput="atualizarPrecoPorQuantidade()" />
    </div>
    <div class="form-group">
      <label>Preço (unitário)</label>
      <input type="text" id="preco" readonly />
    </div>
    <div class="form-group">
      <label>Total (pré-visualização)</label>
      <input type="text" id="preco_total" readonly />
    </div>
  `;
  document.getElementById("campos").innerHTML = html;
}

function atualizarQualidades() {
  const pecaNome   = document.getElementById("pecaSelect").value;
  const precoInput = document.getElementById("preco");
  const totalInput = document.getElementById("preco_total");
  const box   = document.getElementById("qualidadeBox");
  const select= document.getElementById("qualidadeSelect");
  const qtyEl = document.getElementById("quantidade");

  if (!pecaNome) {
    if (precoInput) precoInput.value = "";
    if (totalInput) totalInput.value = "";
    if (select) select.innerHTML = "";
    if (box) box.style.display = "none";
    return;
  }

  const lista = (pecas[tipoAtual] || []).filter(p => (p.nome === pecaNome || p.modelo === pecaNome));

  if (tipoAtual === "tela" || tipoAtual === "bateria") {
    const qualidades = lista.filter(p => p.qualidade).map(p => ({ q: p.qualidade, preco: p.preco }));

    if (qualidades.length > 0) {
      select.innerHTML = qualidades.map(q => `<option value="${q.q}" data-preco="${q.preco}">${q.q}</option>`).join("");
      box.style.display = "block";

      const unit = parseFloat(qualidades[0].preco || 0) || 0;
      const qty  = parseInt(qtyEl.value, 10) || 1;
      precoInput.value = unit.toFixed(2);
      totalInput.value = (unit * qty).toFixed(2);

      select.onchange = function() {
        const unit2 = parseFloat(select.options[select.selectedIndex].getAttribute("data-preco") || 0) || 0;
        const qty2  = parseInt(qtyEl.value, 10) || 1;
        precoInput.value = unit2.toFixed(2);
        totalInput.value = (unit2 * qty2).toFixed(2);
      };
    } else {
      // tela/bateria, mas sem qualidade no banco
      box.style.display = "none";
      const unit = lista.length > 0 ? parseFloat(lista[0].preco || 0) : 0;
      const qty  = parseInt(qtyEl.value, 10) || 1;
      precoInput.value = unit.toFixed(2);
      totalInput.value = (unit * qty).toFixed(2);
    }
  } else {
    // outros tipos
    const unit = lista.length > 0 ? parseFloat(lista[0].preco || 0) : 0;
    const qty  = parseInt(qtyEl.value, 10) || 1;
    precoInput.value = unit.toFixed(2);
    totalInput.value = (unit * qty).toFixed(2);
    if (box) box.style.display = "none";
  }
}

function atualizarPrecoPorQuantidade() {
  const precoInput = document.getElementById("preco");
  const totalInput = document.getElementById("preco_total");
  const qtyEl = document.getElementById("quantidade");
  const unit = parseFloat(precoInput.value.replace(",", ".") || 0) || 0;
  const qty  = parseInt(qtyEl.value, 10) || 1;
  totalInput.value = (unit * qty).toFixed(2);
}

function adicionarItem() {
  const peca = document.getElementById("pecaSelect").value;
  if (!peca) { alert("Selecione uma peça!"); return; }
  const qualidade = document.getElementById("qualidadeSelect")?.value || "";
  const quantidade = parseInt(document.getElementById("quantidade").value, 10) || 1;
  const precoUnit  = parseFloat((document.getElementById("preco").value || "0").replace(",", ".")) || 0;

  itens.push({ tipo: tipoAtual, modelo: peca, qualidade, quantidade, preco: precoUnit.toFixed(2) });
  atualizarLista();
}

function removerItem(idx) {
  itens.splice(idx, 1);
  atualizarLista();
}

function atualizarLista() {
  const div = document.getElementById("itens-lista");
  if (!itens.length) { div.innerHTML = ""; return; }
  let html = "<h3>Itens do Pedido</h3>";
  itens.forEach((i, idx) => {
    const total = (parseFloat(i.preco) * (parseInt(i.quantidade,10)||1)).toFixed(2);
    html += `
      <div class="item">
        #${idx+1} - ${i.tipo.toUpperCase()} ${i.modelo} ${i.qualidade? "(" + i.qualidade + ")" : ""} 
        - Qtd: ${i.quantidade} - R$ ${total}
        <button type="button" onclick="removerItem(${idx})">Excluir</button>
      </div>
    `;
  });
  div.innerHTML = html;
}

// carrega lista inicial
atualizarLista();

// ====== SALVAR ======
async function salvarAlteracoes() {
  if (!itens.length) { alert("Adicione pelo menos uma peça."); return; }

  try {
    const resp = await fetch("salvar_edicao.php", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ pedido_id: pedidoId, itens })
    });
    const data = await resp.json();
    if (data && data.sucesso) {
      alert("✅ Pedido atualizado!");
      // se quiser, abre o PDF novo:
      // if (data.pdf) window.open(data.pdf, "_blank");
      location.href = "pedidos.php";
    } else {
      alert("⚠️ Erro ao salvar: " + (data.erro || "desconhecido"));
    }
  } catch (e) {
    alert("⚠️ Falha: " + e.message);
  }
}
</script>
</body>
</html>
