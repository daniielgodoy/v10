<?php
include "navbar.php";
$mysqli = new mysqli("localhost", "root", "", "telasdb");

// Adicionar cliente
if ($_SERVER["REQUEST_METHOD"] === "POST" && isset($_POST["add"])) {
    $nome = trim($_POST["nome"]);
    $numero = preg_replace("/\D/", "", $_POST["numero"]); // só números
    if ($nome && $numero) {
        $numero .= "@s.whatsapp.net";
        $stmt = $mysqli->prepare("INSERT INTO clientes (nome, numero) VALUES (?, ?)");
        $stmt->bind_param("ss", $nome, $numero);
        $stmt->execute();
        header("Location: clientes.php");
        exit;
    }
}

// Editar cliente
if ($_SERVER["REQUEST_METHOD"] === "POST" && isset($_POST["edit"])) {
    $id = intval($_POST["id"]);
    $nome = trim($_POST["nome"]);
    $numero = preg_replace("/\D/", "", $_POST["numero"]); // só números
    $numero .= "@s.whatsapp.net";
    $stmt = $mysqli->prepare("UPDATE clientes SET nome=?, numero=? WHERE id=?");
    $stmt->bind_param("ssi", $nome, $numero, $id);
    $stmt->execute();
    header("Location: clientes.php");
    exit;
}

// Excluir cliente
if (isset($_GET["delete"])) {
    $id = intval($_GET["delete"]);
    $mysqli->query("DELETE FROM clientes WHERE id=$id");
    header("Location: clientes.php");
    exit;
}

// Buscar clientes
$busca = isset($_GET["busca"]) ? trim($_GET["busca"]) : "";
if ($busca) {
    $stmt = $mysqli->prepare("SELECT * FROM clientes WHERE nome LIKE ? OR numero LIKE ? ORDER BY id ASC");
    $like = "%$busca%";
    $stmt->bind_param("ss", $like, $like);
    $stmt->execute();
    $result = $stmt->get_result();
} else {
    $result = $mysqli->query("SELECT * FROM clientes ORDER BY id ASC");
}
?>
<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <title>Gerenciar Clientes</title>
  <style>
    body { font-family: "Segoe UI", sans-serif;   background: #add8ec; margin: 0; padding: 20px; }
    h1 { text-align: center; margin-bottom: 20px; font-weight: 600; color: #333; }

    .search { text-align: center; margin: 20px 0; }
    .search input { padding: 10px; width: 280px; border: 1px solid #ccc; border-radius: 8px; font-size: 14px; }

    .card { background: #fff; border-radius: 10px; padding: 15px 20px; margin: 10px auto; max-width: 800px;
            box-shadow: 0 4px 12px rgba(0,0,0,0.08); display: flex; align-items: center; justify-content: space-between; }
    .card form { display: flex; gap: 10px; flex: 1; align-items: center; }
    .card input { padding: 8px; border: 1px solid #ccc; border-radius: 6px; font-size: 14px; flex: 1; }
    .actions { display: flex; gap: 8px; }
    .actions button { padding: 8px 12px; border: none; border-radius: 6px; cursor: pointer; font-size: 14px; }
    .edit { background: #ffc107; color: #fff; }
    .edit:hover { background: #e0a800; }
    .delete { background: #dc3545; color: #fff; }
    .delete:hover { background: #c82333; }

    .add-form { max-width: 800px; margin: 0 auto 30px; background: #fff; padding: 20px; border-radius: 10px;
                box-shadow: 0 4px 12px rgba(0,0,0,0.08); }
    .add-form h2 { margin-bottom: 15px; font-size: 18px; color: #333; }
    .add-form input { padding: 10px; margin: 8px 0; width: 100%; border: 1px solid #ccc; border-radius: 6px; font-size: 14px; }
    .add-form button { padding: 10px 15px; border: none; border-radius: 6px; background: #28a745; color: #fff; cursor: pointer; }
    .add-form button:hover { background: #1e7e34; }
  </style>
</head>
<body>
  <h1>Gerenciar Clientes</h1>

  <div class="add-form">
    <h2>Adicionar Cliente</h2>
    <form method="post">
      <input type="text" name="nome" placeholder="Nome" required>
      <input type="text" name="numero" placeholder="Número (somente dígitos) (ex: 5512999999999)" required>
      <button type="submit" name="add">Adicionar</button>
    </form>
  </div>

  <div class="search">
    <form method="get">
      <input type="text" name="busca" placeholder="Buscar por nome ou número" value="<?= htmlspecialchars($busca) ?>">
    </form>
  </div>

  <?php while ($row = $result->fetch_assoc()): 
    $numeroSemSufixo = str_replace("@s.whatsapp.net", "", $row["numero"]);
  ?>
    <div class="card">
      <form method="post">
        <input type="text" name="nome" value="<?= htmlspecialchars($row["nome"]) ?>" required>
        <input type="text" name="numero" value="<?= htmlspecialchars($numeroSemSufixo) ?>" required>
        <input type="hidden" name="id" value="<?= $row["id"] ?>">
        <div class="actions">
          <button type="submit" name="edit" class="edit">Salvar</button>
          <a href="?delete=<?= $row["id"] ?>" onclick="return confirm('Excluir cliente?')">
            <button type="button" class="delete">🗑</button>
          </a>
        </div>
      </form>
    </div>
  <?php endwhile; ?>
</body>
</html>
