<?php
$host = "localhost";
$user = "root";
$pass = "";
$dbname = "telasdb";

$conn = new mysqli($host, $user, $pass, $dbname);
if ($conn->connect_error) {
    die("Erro de conexão: " . $conn->connect_error);
}

// Sanitiza entradas
$tabela = $_POST["tabela"] ?? "";
$nome = trim($_POST["nome"] ?? "");
$modelo = $_POST["modelo"] ?? null;
$qualidade = $_POST["qualidade"] ?? null;
$preco = $_POST["preco"] ?? "0";

// Substitui vírgula por ponto e remove letras
$preco = preg_replace("/[^0-9.,]/", "", $preco);
$preco = str_replace(",", ".", $preco);

// ===== Verifica duplicata =====
$existe = false;
$sqlCheck = "";
$params = [];
$types = "";

if ($tabela === "telas") {
    $sqlCheck = "SELECT id FROM telas WHERE nome=? AND qualidade=?";
    $params = [$nome, $qualidade];
    $types = "ss";
} elseif ($tabela === "baterias") {
    $sqlCheck = "SELECT id FROM baterias WHERE nome=? AND modelo=?";
    $params = [$nome, $modelo];
    $types = "ss";
} else {
    $sqlCheck = "SELECT id FROM $tabela WHERE nome=?";
    $params = [$nome];
    $types = "s";
}

$stmt = $conn->prepare($sqlCheck);
$stmt->bind_param($types, ...$params);
$stmt->execute();
$result = $stmt->get_result();
$row = $result->fetch_assoc();
$stmt->close();

if ($row) {
    // Já existe → perguntar se deseja editar
    $idExistente = $row["id"];
    echo "
    <script>
      if (confirm('Essa peça já existe. Deseja atualizar com os novos dados?')) {
        window.location.href = 'updatepeca.php?tabela=$tabela&id=$idExistente&nome=" . urlencode($nome) . "&modelo=" . urlencode($modelo) . "&qualidade=" . urlencode($qualidade) . "&preco=" . urlencode($preco) . "';
      } else {
        alert('Nenhuma alteração feita.');
        window.location.href = 'addpecas.php';
      }
    </script>";
    exit;
}

// ===== Se não existir, insere =====
if ($tabela === "telas") {
    $stmt = $conn->prepare("INSERT INTO telas (nome, qualidade, preco) VALUES (?, ?, ?)");
    $stmt->bind_param("ssd", $nome, $qualidade, $preco);
} elseif ($tabela === "baterias") {
    $stmt = $conn->prepare("INSERT INTO baterias (nome, modelo, preco) VALUES (?, ?, ?)");
    $stmt->bind_param("ssd", $nome, $modelo, $preco);
} else {
    $stmt = $conn->prepare("INSERT INTO $tabela (nome, preco) VALUES (?, ?)");
    $stmt->bind_param("sd", $nome, $preco);
}

if ($stmt->execute()) {
    echo "<script>alert('Peça adicionada com sucesso!'); window.location.href='pecas.php';</script>";
} else {
    echo "<script>alert('Erro ao adicionar peça: " . $stmt->error . "'); window.location.href='addpecas.php';</script>";
}

$stmt->close();
$conn->close();
?>
