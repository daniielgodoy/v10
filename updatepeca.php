<?php
$host = "localhost";
$user = "root";
$pass = "";
$dbname = "telasdb";

$conn = new mysqli($host, $user, $pass, $dbname);
if ($conn->connect_error) {
    die("Erro de conexão: " . $conn->connect_error);
}

$tabela = $_GET["tabela"] ?? "";
$id = intval($_GET["id"]);
$nome = trim($_GET["nome"] ?? "");
$modelo = $_GET["modelo"] ?? null;
$qualidade = $_GET["qualidade"] ?? null;
$preco = $_GET["preco"] ?? "0";

$preco = preg_replace("/[^0-9.,]/", "", $preco);
$preco = str_replace(",", ".", $preco);

if ($tabela === "telas") {
    $stmt = $conn->prepare("UPDATE telas SET nome=?, qualidade=?, preco=? WHERE id=?");
    $stmt->bind_param("ssdi", $nome, $qualidade, $preco, $id);
} elseif ($tabela === "baterias") {
    $stmt = $conn->prepare("UPDATE baterias SET nome=?, modelo=?, preco=? WHERE id=?");
    $stmt->bind_param("ssdi", $nome, $modelo, $preco, $id);
} else {
    $stmt = $conn->prepare("UPDATE $tabela SET nome=?, preco=? WHERE id=?");
    $stmt->bind_param("sdi", $nome, $preco, $id);
}

if ($stmt->execute()) {
    echo "<script>alert('Peça atualizada com sucesso!'); window.location.href='pecas.php';</script>";
} else {
    echo "<script>alert('Erro ao atualizar peça: " . $stmt->error . "'); window.location.href='pecas.php';</script>";
}

$stmt->close();
$conn->close();
?>
