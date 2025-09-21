<?php
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "telasdb";

$conn = new mysqli($servername, $username, $password, $dbname);
if ($conn->connect_error) {
    die("Erro de conexão: " . $conn->connect_error);
}

// ================== Filtros ==================
$where = "1=1";
$params = [];
$types = "";

if (!empty($_GET["nome"])) {
    $where .= " AND p.cliente_nome = ?";
    $params[] = $_GET["nome"];
    $types .= "s";
}

if (!empty($_GET["numero"])) {
    $where .= " AND p.cliente_numero = ?";
    $params[] = $_GET["numero"];
    $types .= "s";
}

if (!empty($_GET["data_inicio"]) && !empty($_GET["data_fim"])) {
    // intervalo entre duas datas
    $where .= " AND p.data_pedido BETWEEN ? AND ?";
    $params[] = $_GET["data_inicio"] . " 00:00:00";
    $params[] = $_GET["data_fim"] . " 23:59:59";
    $types .= "ss";
} elseif (!empty($_GET["data_inicio"])) {
    // apenas data início → a partir dessa data
    $where .= " AND p.data_pedido >= ?";
    $params[] = $_GET["data_inicio"] . " 00:00:00";
    $types .= "s";
} elseif (!empty($_GET["data_fim"])) {
    // apenas data fim → até essa data
    $where .= " AND p.data_pedido <= ?";
    $params[] = $_GET["data_fim"] . " 23:59:59";
    $types .= "s";
}


$sql = "SELECT p.* 
        FROM pedidos p
        WHERE $where
        ORDER BY p.data_pedido DESC";

$stmt = $conn->prepare($sql);
if (!empty($params)) {
    $stmt->bind_param($types, ...$params);
}
$stmt->execute();
$result = $stmt->get_result();
if ($_SERVER["REQUEST_METHOD"] === "POST" && isset($_POST["delete"])) {
    $pedidoId = intval($_POST["delete"]);
    // Apaga itens do pedido primeiro
    $conn->query("DELETE FROM pedido_itens WHERE pedido_id=$pedidoId");
    // Apaga pedido
    $conn->query("DELETE FROM pedidos WHERE id=$pedidoId");
    // Remove PDF se existir
    $pdfPath = __DIR__."/pedidos/pedido_{$pedidoId}.pdf";
    if (file_exists($pdfPath)) {
        unlink($pdfPath);
    }
    // Força refresh imediato
    echo "<script>window.location.href='pedidos.php';</script>";
    exit;
}


// ================== Carregar opções para datalist ==================
$nomesRes = $conn->query("SELECT DISTINCT cliente_nome FROM pedidos ORDER BY cliente_nome ASC");
$numerosRes = $conn->query("SELECT DISTINCT cliente_numero FROM pedidos ORDER BY cliente_numero ASC");
?>
<!DOCTYPE html>
<html lang="pt-br">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="refresh" content="30">
  <title>Pedidos</title>
  <style>
body { 
  font-family: Arial, sans-serif; 
  background: #add8ec; 
  padding: 20px; p
}
h1 { 
  text-align: center; 
  margin-bottom: 20px; 
  color: #333; 
}
.filtros { 
  background: #fff; 
  padding: 20px; 
  border-radius: 10px; 
  margin-bottom: 25px; 
  box-shadow: 0 4px 8px rgba(0,0,0,0.08);
}
.filtros form {
  display: flex;
  flex-wrap: wrap;
  gap: 15px;
  align-items: center;
  justify-content: center;
}
.filtros label {
  font-weight: bold;
  color: #444;
  margin-right: 5px;
}
.filtros input, 
.filtros select {
  padding: 8px 10px;
  border: 1px solid #ccc;
  border-radius: 6px;
  font-size: 14px;
  outline: none;
  transition: all 0.2s;
}
.filtros input:focus,
.filtros select:focus {
  border-color: #007bff;
  box-shadow: 0 0 5px rgba(0,123,255,0.3);
}
.filtros input[type="submit"] {
  background: #007bff;
  color: white;
  font-weight: bold;
  cursor: pointer;
  border: none;
  padding: 10px 16px;
  transition: background 0.3s;
}
.filtros input[type="submit"]:hover {
  background: #0056b3;
}
.filtros a {
  color: #666;
  text-decoration: none;
  font-size: 14px;
  margin-left: 10px;
}
.filtros a:hover {
  color: #000;
}
.pedido { 
  background: #fff; 
  border-radius: 10px; 
  padding: 15px; 
  margin-bottom: 10px; 
  box-shadow: 0 2px 5px rgba(0,0,0,0.1); 
  transition: transform 0.2s;
}
.pedido:hover {
  transform: scale(1.01);
}
.pedido h2 { 
  margin: 0; 
  font-size: 16px; 
  color: #007bff;
}
.pedido small { 
  color: #555; 
  display: block; 
  margin-top: 5px; 
}
a { 
  color: #007bff; 
  text-decoration: none; 
}
a:hover { 
  text-decoration: underline; 
}
.pedido {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.pedido .info {
  flex: 1;
}

.lixeira {
  background: none;
  border: none;
  font-size: 20px;
  cursor: pointer;
  color: #dc3545;
  transition: transform 0.2s, color 0.2s;
  margin-left: 15px;
}
.lixeira:hover {
  transform: scale(1.2);
  color: #a71d2a;
}

.edit-btn {
    margin-left: 10px;
    text-decoration: none;
    font-size: 18px;
    cursor: pointer;
}
.edit-btn {
    transform: scale(1.2);
}

  </style>
</head>
<body>
  <?php
  include "navbar.php";
  ?>

  <h1>📋 Pedidos</h1>

  <!-- Filtros -->
  <div class="filtros">
    <form method="get">
      Nome: 
      <input list="lista_nomes" name="nome" value="<?=htmlspecialchars($_GET['nome'] ?? '')?>">
      <datalist id="lista_nomes">
        <?php while ($n = $nomesRes->fetch_assoc()): ?>
          <option value="<?=$n['cliente_nome']?>">
        <?php endwhile; ?>
      </datalist>


      Data início: <input type="date" name="data_inicio" value="<?=htmlspecialchars($_GET['data_inicio'] ?? '')?>">
      Data fim: <input type="date" name="data_fim" value="<?=htmlspecialchars($_GET['data_fim'] ?? '')?>">

      <input type="submit" value="Filtrar">
      <a href="pedidos.php">Limpar</a>
    </form>
  </div>

  <?php
if ($result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        $pedidoId = $row["id"];
        $pdfFile = "pedidos/pedido_{$pedidoId}.pdf";
        $link = file_exists(__DIR__ . "/" . $pdfFile) ? $pdfFile : "#";

        echo "<div class='pedido' onclick=\"window.open('$link','_blank')\">";
        echo "<div class='info'>";
        echo "<h2>{$row['cliente_nome']} #{$pedidoId}</h2>";
        echo "<small>📅 " . date("d/m/Y H:i", strtotime($row['data_pedido'])) . " | 📞 {$row['cliente_numero']}</small>";
        echo "</div>";

        // Botão Editar
        echo "<a href='editarpedido.php?id=$pedidoId' class='editar' onclick=\"event.stopPropagation()\">✏️</a>";

        // Botão Excluir
        echo "<form method='post' onsubmit=\"return confirm('Excluir este pedido?')\" style='margin:0; display:inline;'>";
        echo "<input type='hidden' name='delete' value='$pedidoId'>";
        echo "<button type='submit' class='lixeira' onclick=\"event.stopPropagation()\">🗑️</button>";
        echo "</form>";

        echo "</div>";
    }



  } else {
      echo "<p>Nenhum pedido encontrado.</p>";
  }

  $stmt->close();
  $conn->close();
  ?>
</body>
</html>
