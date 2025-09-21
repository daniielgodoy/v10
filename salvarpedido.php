<?php
$mysqli = new mysqli("localhost", "root", "", "telasdb");

if ($_SERVER["REQUEST_METHOD"] === "POST") {
    $data = json_decode(file_get_contents("php://input"), true);

    $cliente_id = $data["cliente_id"];
    $itens = $data["itens"];

    // Buscar nome/numero do cliente
    $stmt = $mysqli->prepare("SELECT nome, numero FROM clientes WHERE id=?");
    $stmt->bind_param("i", $cliente_id);
    $stmt->execute();
    $res = $stmt->get_result()->fetch_assoc();
    $stmt->close();

    if (!$res) {
        http_response_code(400);
        echo json_encode(["erro" => "Cliente não encontrado"]);
        exit;
    }

    $cliente_nome = $res["nome"];
    $cliente_numero = $res["numero"];

    // Inserir pedido
    $stmt = $mysqli->prepare("INSERT INTO pedidos (cliente_nome, cliente_numero) VALUES (?, ?)");
    $stmt->bind_param("ss", $cliente_nome, $cliente_numero);
    $stmt->execute();
    $pedido_id = $stmt->insert_id;
    $stmt->close();

    // Inserir itens
    $stmt = $mysqli->prepare("INSERT INTO pedido_itens (pedido_id, tipo, modelo, qualidade, quantidade, preco) VALUES (?, ?, ?, ?, ?, ?)");
    foreach ($itens as $i) {
        $tipo = $i["tipo"];
        $modelo = $i["modelo"];
        $qualidade = $i["qualidade"] ?: null;
        $quantidade = intval($i["quantidade"]);
        $preco = floatval(str_replace(",", ".", $i["preco"]));
        $stmt->bind_param("isssid", $pedido_id, $tipo, $modelo, $qualidade, $quantidade, $preco);
        $stmt->execute();
    }
    $stmt->close();

    // ========================
    // Gerar PDF (EXATAMENTE como você mandou)
    // ========================
    $pdfPath = __DIR__ . "/pedidos/pedido_" . $pedido_id . ".pdf";
    $carrinho = json_encode($itens, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE);

    $pythonCode = <<<PY
from reportlab.platypus import SimpleDocTemplate, Table, TableStyle, Spacer, Image, Paragraph
from reportlab.lib import colors
from reportlab.lib.units import cm
from reportlab.lib.styles import getSampleStyleSheet
from reportlab.lib.enums import TA_CENTER
import os, json
from datetime import datetime

carrinho = json.loads('''$carrinho''')
cliente_nome = "$cliente_nome"
output_path = r"$pdfPath"

doc = SimpleDocTemplate(output_path, pagesize=(8*cm, 25*cm))
elements, styles = [], getSampleStyleSheet()

from datetime import datetime
data_str = datetime.now().strftime("%d/%m/%Y %H:%M")

style_nome = styles['Heading2']
style_nome.alignment = TA_CENTER

style_data = styles['Normal']
style_data.fontSize = 8
style_data.alignment = TA_CENTER

logo_esq = None
logo_path = "v10.jpg"
if os.path.exists(logo_path):
    logo_esq = Image(logo_path, width=2*cm, height=2*cm)
else:
    logo_esq = ""

header_nome_data = Table(
    [[logo_esq, Paragraph(cliente_nome, style_nome), Paragraph(data_str, style_data)]],
    colWidths=[2*cm, 4*cm, 2*cm]
)
header_nome_data.setStyle(TableStyle([
    ('VALIGN', (0,0), (-1,-1), 'MIDDLE')
]))
elements.append(header_nome_data)
elements.append(Spacer(1,12))

data = [["Qtd","Produto","Valor"]]
total = 0

# Mapeamento de tipos e ordem de exibição
mapa_tipos = {
    "tela": "Tela",
    "bateria": "Bateria",
    "conector": "Conector",
    "alto_falante": "Alto Falante",
    "lente_camera": "Lente Câmera",
    "flex_sub": "Flex Sub",
    "flex_power": "Flex Power",
    "flex_digital": "Flex Digital"
}

ordem_tipos = ["tela","bateria","conector","alto_falante","lente_camera","flex_sub","flex_power","flex_digital"]

# Ordena o carrinho pela ordem definida
carrinho_ordenado = sorted(carrinho, key=lambda x: ordem_tipos.index(x.get("tipo", "").lower()) if x.get("tipo", "").lower() in ordem_tipos else 999)

for item in carrinho_ordenado:
    detalhe = ""
    if item.get("qualidade") and item.get("qualidade") not in ("", "todas"):
        detalhe = item.get("qualidade")
    elif item.get("modelo"):
        detalhe = item.get("modelo")

    tipo = mapa_tipos.get(item.get("tipo", "").lower(), "Peça")
    nome = f"{tipo} {(item.get('nome') or item.get('modelo') or 'DESCONHECIDO').upper()}"

    qtd = int(item.get("quantidade", 1))
    subtotal = float(item["preco"]) * qtd
    data.append([str(qtd), nome + ((" ("+detalhe+")") if detalhe else ""), "R$ %.2f" % subtotal])
    total += subtotal

data.append(["", "Valor total", "R$ %.2f" % total])

t = Table(data, colWidths=[1.2*cm, 4.8*cm, 2*cm])
t.setStyle(TableStyle([
    ('GRID',(0,0),(-1,-2),0.5,colors.black),
    ('ALIGN',(0,0),(-1,-2),'CENTER'),
    ('BACKGROUND',(0,0),(-1,0),colors.lightgrey),
    ('FONTNAME',(0,0),(-1,0),'Helvetica-Bold'),
    ('LINEABOVE',(0,-1),(-1,-1),0.5,colors.black),
    ('LINEBELOW',(0,-1),(-1,-1),0.5,colors.black),
    ('LINEBEFORE',(2,-1),(2,-1),0.5,colors.black),
    ('LINEAFTER',(2,-1),(2,-1),0.5,colors.black),
    ('ALIGN',(2,-1),(2,-1),'RIGHT'),
]))
elements.append(t)
doc.build(elements)
PY;

    $pyFile = __DIR__ . "/tmp_pdf_" . time() . ".py";
    file_put_contents($pyFile, $pythonCode);
    exec("python \"$pyFile\"");
    @unlink($pyFile);

    echo json_encode(["sucesso" => true, "pedido_id" => $pedido_id, "pdf" => basename($pdfPath)]);
}
?>
<?php
$mysqli = new mysqli("localhost", "root", "", "telasdb");

if ($_SERVER["REQUEST_METHOD"] === "POST") {
    $data = json_decode(file_get_contents("php://input"), true);

    $cliente_id = $data["cliente_id"];
    $itens = $data["itens"];

    // Buscar nome/numero do cliente
    $stmt = $mysqli->prepare("SELECT nome, numero FROM clientes WHERE id=?");
    $stmt->bind_param("i", $cliente_id);
    $stmt->execute();
    $res = $stmt->get_result()->fetch_assoc();
    $stmt->close();

    if (!$res) {
        http_response_code(400);
        echo json_encode(["erro" => "Cliente não encontrado"]);
        exit;
    }

    $cliente_nome = $res["nome"];
    $cliente_numero = $res["numero"];

    // Inserir pedido
    $stmt = $mysqli->prepare("INSERT INTO pedidos (cliente_nome, cliente_numero) VALUES (?, ?)");
    $stmt->bind_param("ss", $cliente_nome, $cliente_numero);
    $stmt->execute();
    $pedido_id = $stmt->insert_id;
    $stmt->close();

    // Inserir itens
    $stmt = $mysqli->prepare("INSERT INTO pedido_itens (pedido_id, tipo, modelo, qualidade, quantidade, preco) VALUES (?, ?, ?, ?, ?, ?)");
    foreach ($itens as $i) {
        $tipo = $i["tipo"];
        $modelo = $i["modelo"];
        $qualidade = $i["qualidade"] ?: null;
        $quantidade = intval($i["quantidade"]);
        $preco = floatval(str_replace(",", ".", $i["preco"]));
        $stmt->bind_param("isssid", $pedido_id, $tipo, $modelo, $qualidade, $quantidade, $preco);
        $stmt->execute();
    }
    $stmt->close();

    // ========================
    // Gerar PDF (EXATAMENTE como você mandou)
    // ========================
    $pdfPath = __DIR__ . "/pedidos/pedido_" . $pedido_id . ".pdf";
    $carrinho = json_encode($itens, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE);

    $pythonCode = <<<PY
from reportlab.platypus import SimpleDocTemplate, Table, TableStyle, Spacer, Image, Paragraph
from reportlab.lib import colors
from reportlab.lib.units import cm
from reportlab.lib.styles import getSampleStyleSheet
from reportlab.lib.enums import TA_CENTER
import os, json
from datetime import datetime

carrinho = json.loads('''$carrinho''')
cliente_nome = "$cliente_nome"
output_path = r"$pdfPath"

doc = SimpleDocTemplate(output_path, pagesize=(8*cm, 25*cm))
elements, styles = [], getSampleStyleSheet()

from datetime import datetime
data_str = datetime.now().strftime("%d/%m/%Y %H:%M")

style_nome = styles['Heading2']
style_nome.alignment = TA_CENTER

style_data = styles['Normal']
style_data.fontSize = 8
style_data.alignment = TA_CENTER

logo_esq = None
logo_path = "v10.jpg"
if os.path.exists(logo_path):
    logo_esq = Image(logo_path, width=2*cm, height=2*cm)
else:
    logo_esq = ""

header_nome_data = Table(
    [[logo_esq, Paragraph(cliente_nome, style_nome), Paragraph(data_str, style_data)]],
    colWidths=[2*cm, 4*cm, 2*cm]
)
header_nome_data.setStyle(TableStyle([
    ('VALIGN', (0,0), (-1,-1), 'MIDDLE')
]))
elements.append(header_nome_data)
elements.append(Spacer(1,12))

data = [["Qtd","Produto","Valor"]]
total = 0

# Mapeamento de tipos e ordem de exibição
mapa_tipos = {
    "tela": "Tela",
    "bateria": "Bateria",
    "conector": "Conector",
    "alto_falante": "Alto Falante",
    "lente_camera": "Lente Câmera",
    "flex_sub": "Flex Sub",
    "flex_power": "Flex Power",
    "flex_digital": "Flex Digital"
}

ordem_tipos = ["tela","bateria","conector","alto_falante","lente_camera","flex_sub","flex_power","flex_digital"]

# Ordena o carrinho pela ordem definida
carrinho_ordenado = sorted(carrinho, key=lambda x: ordem_tipos.index(x.get("tipo", "").lower()) if x.get("tipo", "").lower() in ordem_tipos else 999)

for item in carrinho_ordenado:
    detalhe = ""
    if item.get("qualidade") and item.get("qualidade") not in ("", "todas"):
        detalhe = item.get("qualidade")
    elif item.get("modelo"):
        detalhe = item.get("modelo")

    tipo = mapa_tipos.get(item.get("tipo", "").lower(), "Peça")
    nome = f"{tipo} {(item.get('nome') or item.get('modelo') or 'DESCONHECIDO').upper()}"

    qtd = int(item.get("quantidade", 1))
    subtotal = float(item["preco"]) * qtd
    data.append([str(qtd), nome + ((" ("+detalhe+")") if detalhe else ""), "R$ %.2f" % subtotal])
    total += subtotal

data.append(["", "Valor total", "R$ %.2f" % total])

t = Table(data, colWidths=[1.2*cm, 4.8*cm, 2*cm])
t.setStyle(TableStyle([
    ('GRID',(0,0),(-1,-2),0.5,colors.black),
    ('ALIGN',(0,0),(-1,-2),'CENTER'),
    ('BACKGROUND',(0,0),(-1,0),colors.lightgrey),
    ('FONTNAME',(0,0),(-1,0),'Helvetica-Bold'),
    ('LINEABOVE',(0,-1),(-1,-1),0.5,colors.black),
    ('LINEBELOW',(0,-1),(-1,-1),0.5,colors.black),
    ('LINEBEFORE',(2,-1),(2,-1),0.5,colors.black),
    ('LINEAFTER',(2,-1),(2,-1),0.5,colors.black),
    ('ALIGN',(2,-1),(2,-1),'RIGHT'),
]))
elements.append(t)
doc.build(elements)
PY;

    $pyFile = __DIR__ . "/tmp_pdf_" . time() . ".py";
    file_put_contents($pyFile, $pythonCode);
    exec("python \"$pyFile\"");
    @unlink($pyFile);

    echo json_encode(["sucesso" => true, "pedido_id" => $pedido_id, "pdf" => basename($pdfPath)]);
}
?>
