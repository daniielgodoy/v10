// repositorio.js
import { pool } from './src/db-search.js';

/** util: normaliza string p/ matching 'solto' (sem acento, minúscula) */
export function norm(s = '') {
  return s
    .normalize('NFD').replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/\s+/g, ' ')
    .trim();
}

/** ====== Mapa tipo → tabela (adicione aqui se criar mais) ====== */
export const TIPO_TABELA = {
  // especiais
  tela: 'telas',

  // simples (nome, modelo, preco)
  bateria: 'baterias',
  conector: 'conector',
  alto_falante: 'alto_falante',
  lente_camera: 'lente_camera',
  flex_sub: 'flex_sub',
  flex_power: 'flex_power',
  flex_digital: 'flex_digital',
  auricular: 'auricular',
  digital: 'digital',
  microfone: 'microfone',
  tampa: 'tampa',
  gaveta: 'gaveta',

  // se futuramente quiser distinguir:
  camera_frontal: 'camera_frontal',
  camera_traseira: 'camera_traseira'
};

/** ====== Sinônimos de marcas que aparecem na tabela TELAS ======
 * Use o valor à direita exatamente como está gravado no campo `marca`.
 */
const MARCA_SINONIMOS = {
  'iphone': 'iPhone',
  'apple': 'iPhone',
  'ios': 'iPhone',
  'motorola': 'Motorola',
  'moto': 'Motorola',
  'samsung': 'Samsung',
  'sam': 'Samsung',
  'xiaomi': 'Xiaomi',
  'mi': 'Xiaomi',
  'redmi': 'Redmi',
  'poco': 'Poco',   // só fará efeito se existir como marca na sua tabela
  'lg': 'LG'
};

/** Carrega marcas válidas diretamente do banco (telas.marca) e cacheia. */
let _marcasCache = null;
async function getMarcasValidas() {
  if (_marcasCache) return _marcasCache;
  const [rows] = await pool.query(`SELECT DISTINCT marca FROM telas WHERE marca IS NOT NULL`);
  _marcasCache = new Set(rows.map(r => r.marca));
  return _marcasCache;
}

/** Detecta marca no texto usando sinônimos + o que existe no banco. */
export async function detectarMarcaNoTexto(texto) {
  const tokens = norm(texto).split(' ').filter(Boolean);
  const marcasValidas = await getMarcasValidas();

  // 1) tenta via sinônimos (“iphone” → “iPhone”, “moto” → “Motorola” etc.)
  for (const t of tokens) {
    const m = MARCA_SINONIMOS[t];
    if (m && marcasValidas.has(m)) return m;
  }

  // 2) tenta token bater exatamente com uma marca do banco (ex.: “lg”, “redmi”)
  for (const m of marcasValidas) {
    if (tokens.includes(norm(m))) return m;
  }

  return null; // nenhuma marca explícita
}

/** Remove “tela”, qualidades comuns, marcadores inúteis para extrair o “nome” (modelo) */
function limparModeloTela(texto, marcaDetectada) {
  let s = ' ' + norm(texto) + ' ';
  // remove a própria palavra “tela”
  s = s.replace(/\btela(s)?\b/g, ' ');
  // remove a marca detectada para sobrar o modelo
  if (marcaDetectada) {
    const reMarca = new RegExp(`\\b${norm(marcaDetectada)}\\b`, 'g');
    s = s.replace(reMarca, ' ');
  }
  // remove conectivos e ruídos
  s = s.replace(/\b(do|da|de|para|pra|pro|um|uma|por|favor|pfv|pf)\b/g, ' ');
  // NÃO remover “power” aqui: pode fazer parte do nome (ex.: g8 power)
  // remove múltiplos espaços
  s = s.replace(/\s+/g, ' ').trim();
  return s;
}

/** Monta cláusula LIKE com todos tokens (AND), ex.: nome LIKE %g10% AND nome LIKE %power% */
function buildLikeAnd(tokens, campo = 'nome') {
  const wheres = [];
  const params = {};
  tokens.forEach((tk, i) => {
    wheres.push(`${campo} LIKE :p${i}`);
    params[`p${i}`] = `%${tk}%`;
  });
  return { where: wheres.join(' AND '), params };
}

/** Busca TELAS com regra: se houver marca → filtra por marca e procura pelos tokens no nome.
 *  Se não houver marca → procura só pelos tokens no nome (qualquer marca).
 *  Retorna todas as variações de qualidade/preço encontradas.
 */
export async function buscarTelasPorTexto(texto) {
  const marca = await detectarMarcaNoTexto(texto);
  const modeloBruto = limparModeloTela(texto, marca);
  const tokens = modeloBruto.split(' ').filter(Boolean);

  // Se usuário escreveu “tela iphone 12” → tokens = ["12"]
  // Se escreveu “tela g10” → marca=null, tokens=["g10"]

  // Segurança: se não sobrou nada, não traz tudo do mundo; só falha limpo.
  if (tokens.length === 0) return [];

  // 1ª tentativa: AND com todos os tokens
  let sql = `SELECT id, marca, nome, qualidade, preco
             FROM telas
             WHERE `;
  const { where, params } = buildLikeAnd(tokens, 'nome');

  const namedParams = { ...params };
  if (marca) {
    sql += ` marca = :marca AND ${where}`;
    namedParams.marca = marca;
  } else {
    sql += where;
  }

  sql += ` ORDER BY 
            (CASE WHEN nome = :exato THEN 0 ELSE 1 END),
            marca, nome, qualidade`;

  // nome “exato” que tentamos privilegiar (tokens juntos com espaço)
  namedParams.exato = tokens.join(' ');

  let [rows] = await pool.query({ sql, namedPlaceholders: true }, namedParams);

  // fallback: se nada veio e tem mais de 1 token, tenta OR
  if (rows.length === 0 && tokens.length > 1) {
    let whereOr = tokens.map((_, i) => `nome LIKE :q${i}`).join(' OR ');
    const paramsOr = {};
    tokens.forEach((tk, i) => paramsOr[`q${i}`] = `%${tk}%`);
    let sqlOr = `SELECT id, marca, nome, qualidade, preco
                 FROM telas
                 WHERE `;
    if (marca) {
      sqlOr += ` marca = :marca AND (${whereOr})`;
      paramsOr.marca = marca;
    } else {
      sqlOr += ` ${whereOr}`;
    }
    sqlOr += ` ORDER BY marca, nome, qualidade`;
    [rows] = await pool.query({ sql: sqlOr, namedPlaceholders: true }, paramsOr);
  }

  // formato padronizado p/ seu fluxo de “escolha de qualidade”
  // agrupa por (marca, nome) e lista qualidades
  const mapa = new Map();
  for (const r of rows) {
    const key = `${r.marca}::${r.nome}`;
    if (!mapa.has(key)) mapa.set(key, {
      marca: r.marca,
      nome: r.nome,
      opcoes: [] // {id, qualidade, preco}
    });
    mapa.get(key).opcoes.push({ id: r.id, qualidade: r.qualidade, preco: +r.preco });
  }

  // ordena opcoes por “sem aro / s/aro” primeiro, depois “c/aro”, depois “na/ori/oled” etc.
  const rank = (q = '') => {
    const n = norm(q);
    if (/\b(s\/?aro|sem aro)\b/.test(n)) return 0;
    if (/\b(c\/?aro|com aro)\b/.test(n)) return 1;
    if (/\b(nacional|na|ori|original)\b/.test(n)) return 2;
    return 3;
  };
  for (const item of mapa.values()) {
    item.opcoes.sort((a, b) => rank(a.qualidade) - rank(b.qualidade) || a.preco - b.preco);
  }

  return [...mapa.values()];
}

/** Busca genérica nas tabelas simples (nome/modelo/preco) */
export async function buscarGenericoPorNomeModelo(tipo, termo) {
  const tabela = TIPO_TABELA[tipo];
  if (!tabela) return [];

  const tokens = norm(termo).split(' ').filter(Boolean);
  if (tokens.length === 0) return [];

  const wheres = [];
  const params = {};
  let idx = 0;
  for (const tk of tokens) {
    wheres.push(`(LOWER(nome) LIKE :n${idx} OR LOWER(IFNULL(modelo,'')) LIKE :m${idx})`);
    params[`n${idx}`] = `%${tk}%`;
    params[`m${idx}`] = `%${tk}%`;
    idx++;
  }

  const sql = `
    SELECT id, nome, modelo, preco
    FROM ${tabela}
    WHERE ${wheres.join(' AND ')}
    ORDER BY
      (CASE WHEN LOWER(nome) = :exato THEN 0 ELSE 1 END),
      nome, modelo
    LIMIT 100
  `;
  params.exato = tokens.join(' ');

  const [rows] = await pool.query({ sql, namedPlaceholders: true }, params);

  // Normalização de saída pro seu fluxo
  return rows.map(r => ({
    id: r.id,
    nome: r.nome,
    modelo: r.modelo || null,
    preco: +r.preco
  }));
}
