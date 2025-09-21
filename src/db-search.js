import mysql from 'mysql2/promise'

// se quiser manter pool separado:
const pool = mysql.createPool({
  host: '127.0.0.1',
  user: 'root',
  password: '',
  database: 'telasdb',
  waitForConnections: true,
  connectionLimit: 10,
})

// ----------------- utils de normalização -----------------
function normalize(s) {
  return String(s ?? '')
    .normalize('NFD').replace(/[\u0300-\u036f]/g, '')
    .toLowerCase().trim();
}
function toTokens(s) {
  let norm = normalize(s);

  // proteger combos substituindo espaço por underline
  MODEL_SUFFIX_COMBOS.forEach(combo => {
    const safe = combo.replace(/\s+/g, "_");
    norm = norm.replace(new RegExp("\\b" + combo.replace(" ", "\\s+") + "\\b", "gi"), safe);
  });

  return norm
    .replace(/[^a-z0-9_]+/g, ' ')
    .split(' ')
    .filter(Boolean);
}

function likeParam(token) {
  return `%${token}%`;
}

// remove palavras “filler” e tipos/qualidades do texto de modelo
const FILLERS = new Set([
  'tela','frontal','bateria','conector','flex','sub','digital',
  'alto','falante','altofalante','speaker','fone','caixa','som',
  'lente','camera','câmera','lentecamera',
  'gaveta','tampa','microfone','auricular',
  'eu','quero','queria','preciso','procuro','busco','uma','um','de','do','da',
  'com','sem','aro','comaro','semaro','nacional','original','premium','standard',
  'generica','gen','ori','na','oled','incell','hd'
]);
// sufixos importantes que fazem parte do modelo
const MODEL_SUFFIXES = new Set([
  'pro','plus','lite','max','power','prime','powerlite','power lite','power-lite','power_lite'
]);

const MODEL_SUFFIX_COMBOS = [
  "power lite",
  "pro max"
];
function cleanModelText(s) {
  return toTokens(s).filter(t => {
    if (MODEL_SUFFIXES.has(t)) return true; // mantém sufixos
    return !FILLERS.has(t);
  }).join(' ');
}

// ----------------- marcas & sinônimos (TELAS) -----------------
const BRAND_ALIASES = [
  { re: /^(iphone|apple|ios)$/i, marca: 'iPhone' },
  { re: /^(samsung|sam|galaxy)$/i, marca: 'Samsung' },
  { re: /^(motorola|moto)$/i, marca: 'Motorola' },
  { re: /^(xiaomi|xiomi|mi)$/i, marca: 'Xiaomi' },
  { re: /^(redmi)$/i, marca: 'Redmi' },
  { re: /^(poco)$/i, marca: 'Poco' },
  { re: /^(lg)$/i, marca: 'LG' },
];

function detectarMarcaEModeloBruto(texto) {
  // tenta achar uma das marcas no texto e retorna { marca|null, resto }
  const toks = toTokens(texto);
  let marca = null;
  const restoTokens = [];

  for (const tok of toks) {
    const hit = BRAND_ALIASES.find(a => a.re.test(tok));
    if (hit && !marca) {
      marca = hit.marca;
      continue;
    }
    restoTokens.push(tok);
  }
  const resto = restoTokens.join(' ').trim();
  return { marca, resto };
}

// ----------------- filtro de qualidade (TELAS) -----------------
function buildQualidadeSQL(qualidade) {
  const q = normalize(qualidade || '');
  if (!q || q === 'todas') return { sql: '', params: [] };

  // mapeia pedidos comuns → padrões do seu banco
  // - com aro  → '%c/aro%'
  // - sem aro  → '%s/aro%'
  // - nacional → 'na %' ou '%nacional%'
  // - original → 'ori %' ou '%original%'
  // - oled/incell → '%oled%' / '%incell%'
  const clauses = [];
  const params  = [];

  const want = new Set(q.split(' ')); // permite "com aro", "sem aro", "oled", etc.

  if (q.includes('com aro') || want.has('com') && want.has('aro')) {
    clauses.push('LOWER(qualidade) LIKE ?'); params.push('%c/aro%');
  }
  if (q.includes('sem aro') || want.has('sem') && want.has('aro')) {
    clauses.push('LOWER(qualidade) LIKE ?'); params.push('%s/aro%');
  }
  if (q.includes('nacional') || want.has('na')) {
    clauses.push('(LOWER(qualidade) LIKE ? OR LOWER(qualidade) LIKE ?)');
    params.push('na %', '%nacional%');
  }
  if (q.includes('original') || want.has('ori') || q === 'original') {
    clauses.push('(LOWER(qualidade) LIKE ? OR LOWER(qualidade) LIKE ?)');
    params.push('ori %', '%original%');
  }
  if (q.includes('oled')) { clauses.push('LOWER(qualidade) LIKE ?'); params.push('%oled%'); }
  if (q.includes('incell') || q.includes('in cell')) { clauses.push('LOWER(qualidade) LIKE ?'); params.push('%incell%'); }

  if (!clauses.length) return { sql: '', params: [] };
  return { sql: ' AND ' + clauses.join(' AND '), params };
}

// ----------------- tabela por tipo -----------------
const TABLE_MAP = {
  'tela':          { table: 'telas',          cols: ['id','marca','nome','qualidade','preco'] },
  'bateria':       { table: 'baterias',       cols: ['id','nome','modelo','preco'] },
  'conector':      { table: 'conector',       cols: ['id','nome','modelo','preco'] },
  'alto_falante':  { table: 'alto_falante',   cols: ['id','nome','modelo','preco'] },
  'lente_camera':  { table: 'lente_camera',   cols: ['id','nome','modelo','preco'] },
  'flex_sub':      { table: 'flex_sub',       cols: ['id','nome','modelo','preco'] },
  'flex_power':    { table: 'flex_power',     cols: ['id','nome','modelo','preco'] },
  'flex_digital':  { table: 'flex_digital',   cols: ['id','nome','modelo','preco'] },
  'auricular':     { table: 'auricular',      cols: ['id','nome','modelo','preco'] },
  'camera_frontal':{ table: 'camera_frontal', cols: ['id','nome','modelo','preco'] },
  'camera_traseira':{ table: 'camera_traseira',cols: ['id','nome','modelo','preco'] },
  'gaveta':        { table: 'gaveta',         cols: ['id','nome','modelo','preco'] },
  'microfone':     { table: 'microfone',      cols: ['id','nome','modelo','preco'] },
  'tampa':         { table: 'tampa',          cols: ['id','nome','modelo','preco'] },
  'wifi':          { table: 'wifi',           cols: ['id','nome','modelo','preco'] }
};


// ----------------- query builder genérico -----------------
function buildGenericQuery(tipo, modelo, limit = 20) {
  const map = TABLE_MAP[tipo];
  if (!map) {
    throw new Error(`Tipo "${tipo}" sem tabela mapeada (TABLE_MAP).`);
  }

  const tokens = toTokens(modelo);
  const whereParts = [];
  const params = [];

  // garante que TODOS os tokens apareçam em (nome OR modelo)
  for (const tk of tokens) {
    whereParts.push('(LOWER(nome) LIKE ? OR LOWER(IFNULL(modelo, "")) LIKE ?)');
    const p = likeParam(tk);
    params.push(p, p);
  }

  const sql =
    `SELECT ${map.cols.join(', ')}
     FROM ${map.table}
     ${whereParts.length ? 'WHERE ' + whereParts.join(' AND ') : ''}
     ORDER BY preco ASC, nome ASC
     LIMIT ${Number(limit) || 20}`;

  return { sql, params };   // 🔴 ESSA LINHA NÃO PODE FALTAR
}

function buildTelaQuery(modelo, qualidade, limit = 20) {
  const { marca, resto } = detectarMarcaEModeloBruto(modelo);
  const filtroQual = buildQualidadeSQL(qualidade);

  const whereParts = [];
  const params = [];

  if (marca) {
    const marcaNorm = normalize(marca);
    // procura se a marca está no campo "marca" ou dentro do nome
    whereParts.push('(LOWER(marca) LIKE ? OR LOWER(nome) LIKE ?)');
    params.push(`%${marcaNorm}%`, `%${marcaNorm}%`);

    const tokens = toTokens(resto);
    for (const tk of tokens) {
      whereParts.push('LOWER(nome) LIKE ?');
      params.push(likeParam(tk));
    }
  } else {
    const tokens = toTokens(cleanModelText(modelo));
    for (const tk of tokens) {
      whereParts.push('LOWER(nome) LIKE ?');
      params.push(likeParam(tk));
    }
  }

  const sql =
    `SELECT id, marca, nome, qualidade, preco
     FROM telas
     ${whereParts.length ? 'WHERE ' + whereParts.join(' AND ') : ''}
     ${filtroQual.sql}
     ORDER BY preco ASC, marca ASC, nome ASC
     LIMIT ${Number(limit) || 20}`;

  return { sql, params: [...params, ...filtroQual.params] };
}


export async function buscarNoBanco(tipo, modelo, qualidade = "todas", limit = 20, conn = null) {
  const cnn = conn || pool
  const isTela = tipo === "tela"
  const { sql, params } = isTela
    ? buildTelaQuery(modelo, qualidade, limit)
    : buildGenericQuery(tipo, modelo, limit)

  const [rows] = await cnn.query(sql, params)
return rows.map(r => ({
  id: r.id,
  marca: r.marca ?? null,
  nome: r.nome,
  modelo: r.modelo ?? null,
  qualidade: r.qualidade ?? null,
  preco: Number(r.preco ?? 0),
}))

}