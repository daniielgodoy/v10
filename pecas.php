<?php
include "navbar.php";

// Conexão banco
$conn = new mysqli("localhost", "root", "", "telasdb");
if ($conn->connect_error) die("Erro: " . $conn->connect_error);

// Atualização ou exclusão
if ($_SERVER["REQUEST_METHOD"] === "POST" && isset($_POST["tabela"])) {
    $tabela = $_POST["tabela"];
    $id = intval($_POST["id"]);

    // Normaliza vírgula para ponto
    if (isset($_POST["preco"])) {
        $_POST["preco"] = str_replace(",", ".", $_POST["preco"]);
    }

    if (isset($_POST["delete"])) {
        $sql = "DELETE FROM $tabela WHERE id=?";
        $stmt = $conn->prepare($sql);
        $stmt->bind_param("i", $id);
        $stmt->execute();
    } else {
        if ($tabela === "telas") {
            $sql = "UPDATE telas SET nome=?, qualidade=?, preco=? WHERE id=?";
            $stmt = $conn->prepare($sql);
            $stmt->bind_param("ssdi", $_POST["nome"], $_POST["qualidade"], $_POST["preco"], $id);
        } elseif ($tabela === "baterias") {
            $sql = "UPDATE baterias SET nome=?, modelo=?, preco=? WHERE id=?";
            $stmt = $conn->prepare($sql);
            $stmt->bind_param("ssdi", $_POST["nome"], $_POST["modelo"], $_POST["preco"], $id);
        } else {
            $sql = "UPDATE $tabela SET nome=?, preco=? WHERE id=?";
            $stmt = $conn->prepare($sql);
            $stmt->bind_param("sdi", $_POST["nome"], $_POST["preco"], $id);
        }
        $stmt->execute();
    }
}


// ==================== Busca Inteligente ====================
$busca = isset($_GET["busca"]) ? trim($_GET["busca"]) : "";
$tabelas = [
    "telas" => ["nome","qualidade","preco"],
    "baterias" => ["nome","modelo","preco"],
    "conector" => ["nome","preco"],
    "alto_falante" => ["nome","preco"],
    "lente_camera" => ["nome","preco"],
    "flex_sub" => ["nome","preco"],
    "flex_power" => ["nome","preco"],
    "flex_digital" => ["nome","preco"],
];

// Sinônimos de tipos → tabelas
$sinonimos = [
    "tela" => "telas",
    "telas" => "telas",
    "bateria" => "baterias",
    "baterias" => "baterias",
    "conector" => "conector",
    "alto falante" => "alto_falante",
    "alto-falante" => "alto_falante",
    "lente" => "lente_camera",
    "camera" => "lente_camera",
    "câmera" => "lente_camera",
    "flex sub" => "flex_sub",
    "flex power" => "flex_power",
    "flex digital" => "flex_digital"
];

$tipoBusca = null;
foreach ($sinonimos as $palavra => $tb) {
    if (stripos($busca, $palavra) === 0) {
        $tipoBusca = $tb;
        $busca = trim(str_ireplace($palavra, "", $busca));
        break;
    }
}


// Função para listar tabela com busca
function listarTabela($conn, $tabela, $campos, $busca, $tipoBusca) {
    if ($tipoBusca && $tipoBusca !== $tabela) return; // só mostra a tabela do tipo solicitado

    $where = "";
    $params = [];
    $types = "";

    if (!empty($busca)) {
        $likes = [];
            foreach ($campos as $c) {
                if ($c !== "preco") {
                    if (!empty($busca)) {
                        // Busca por palavra exata (ex.: g10 não deve pegar g100)
                        $likes[] = "$c REGEXP ?";
                        $params[] = '[[:<:]]' . preg_quote($busca, '/') . '[[:>:]]';
                        $types .= "s";
                    }
                }
            }


        if ($likes) $where = "WHERE " . implode(" OR ", $likes);
    }

    $sql = "SELECT * FROM $tabela $where ORDER BY id ASC";
    $stmt = $conn->prepare($sql);

    if (!empty($where)) $stmt->bind_param($types, ...$params);

    $stmt->execute();
    $res = $stmt->get_result();

    echo "<h2>📦 " . ucfirst(str_replace("_"," ",$tabela)) . "</h2>";
    echo "<table class='tabela-pecas'>";
    echo "<tr>";
    foreach ($campos as $c) echo "<th>".ucfirst($c)."</th>";
    echo "<th>Ações</th></tr>";

    while ($row = $res->fetch_assoc()) {
        echo "<tr><form method='post'>";
        foreach ($campos as $c) {
            echo "<td><input type='text' name='$c' value='".htmlspecialchars($row[$c])."'></td>";
        }
        echo "<td class='acoes'>
                <input type='hidden' name='id' value='".$row["id"]."'>
                <input type='hidden' name='tabela' value='$tabela'>
                <button type='submit' class='btn-salvar'>💾</button>
                <button type='submit' name='delete' value='1' class='btn-deletar' onclick=\"return confirm('Excluir esta peça?')\">🗑️</button>
              </td>";
        echo "</form></tr>";
    }

    echo "</table>";
}

// ==================== CSS ====================
echo "<style>
body {
  font-family: Arial, sans-serif;
  background: #add8ec; 
  margin: 20px;
  }
.filtro {
  background: #fff;
  padding: 15px;
  margin-bottom: 25px;
  border-radius: 8px;
  box-shadow: 0 3px 6px rgba(0,0,0,0.1);
  display: flex;
  gap: 10px;
}
.filtro input[type='text'] {
  flex: 1;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 6px;
}
.filtro button {
  padding: 8px 14px;
  border: none;
  background: #007bff;
  color: white;
  border-radius: 6px;
  cursor: pointer;
}
.tabela-pecas {
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 30px;
  box-shadow: 0 3px 8px rgba(0,0,0,0.1);
  border-radius: 8px;
  overflow: hidden;
}
.tabela-pecas th {
  background: #007bff;
  color: white;
  padding: 10px;
  text-align: left;
}
.tabela-pecas td {
  padding: 8px;
  background: #fff;
}
.tabela-pecas tr:nth-child(even) td {
  background: #f9f9f9;
}
.tabela-pecas input[type='text'] {
  width: 100%;
  padding: 6px;
  border: 1px solid #ccc;
  border-radius: 6px;
}
.acoes {
  display: flex;
  gap: 8px;
  justify-content: center;
}
.btn-salvar, .btn-deletar {
  border: none;
  padding: 6px 10px;
  border-radius: 6px;
  cursor: pointer;
  font-size: 16px;
  transition: transform 0.2s, opacity 0.2s;
}
.btn-salvar {
  background: #28a745;
  color: white;
}
.btn-salvar:hover { transform: scale(1.1); opacity: 0.9; }
.btn-deletar {
  background: #dc3545;
  color: white;
}
.btn-deletar:hover { transform: scale(1.1); opacity: 0.9; }

.btn-limpar {
  display: inline-block;
  padding: 8px 14px;
  background: #6c757d;
  color: white;
  text-decoration: none;
  border-radius: 6px;
  transition: transform 0.2s, opacity 0.2s;
}
.btn-limpar:hover {
  transform: scale(1.05);
  opacity: 0.9;
}

</style>";

// ==================== Formulário de busca ====================
echo "<form method='get' class='filtro'>
        <input type='text' name='busca' placeholder='🔎 Buscar peça (ex.: flex power g10)' value='".htmlspecialchars($busca)."'>
        <button type='submit'>Filtrar</button>
        <a href='pecas.php' class='btn-limpar'>Limpar</a>
      </form>";


// ==================== Listagem ====================
foreach ($tabelas as $tb => $campos) {
    listarTabela($conn, $tb, $campos, $busca, $tipoBusca);
}

$conn->close();
?>
