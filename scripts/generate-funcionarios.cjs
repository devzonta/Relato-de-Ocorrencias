const fs = require('node:fs');
const path = require('node:path');
const XLSX = require('xlsx');

const projectRoot = path.resolve(__dirname, '..');
const sourcePath = path.join(projectRoot, 'public', 'LISTA_PESSOAS.xlsx');
const outputPath = path.join(projectRoot, 'public', 'funcionarios.json');
const requiredHeaders = [
  'Matrícula',
  'Nome',
  'Cargo',
  'Setor (Descrição)',
  'Líder',
  'Turno',
];

const normalizeHeader = (value) =>
  String(value ?? '')
    .replace(/^\uFEFF/, '')
    .trim()
    .toLocaleLowerCase('pt-BR');

if (!fs.existsSync(sourcePath)) {
  throw new Error(`Arquivo obrigatório não encontrado: ${sourcePath}`);
}

const workbook = XLSX.readFile(sourcePath);
const firstSheetName = workbook.SheetNames[0];
if (!firstSheetName) {
  throw new Error('A planilha LISTA_PESSOAS.xlsx não contém abas.');
}

const worksheet = workbook.Sheets[firstSheetName];
const rows = XLSX.utils.sheet_to_json(worksheet, {
  header: 1,
  raw: false,
  defval: '',
});
const headerRowIndex = rows.findIndex(
  (row, index) =>
    index < 50 &&
    requiredHeaders.every((required) =>
      row.some((header) => normalizeHeader(header) === normalizeHeader(required)),
    ),
);

if (headerRowIndex < 0) {
  throw new Error(
    `Não foi encontrada uma linha de cabeçalho com as colunas obrigatórias: ${requiredHeaders.join(', ')}.`,
  );
}

const headers = rows[headerRowIndex].map(normalizeHeader);
const columnIndexes = requiredHeaders.map((header) =>
  headers.indexOf(normalizeHeader(header)),
);
const employees = rows
  .slice(headerRowIndex + 1)
  .map((row) =>
    Object.fromEntries(
      requiredHeaders.map((header, index) => [
        header,
        String(row[columnIndexes[index]] ?? '').trim(),
      ]),
    ),
  )
  .filter((employee) => employee['Matrícula'] && employee.Nome);

if (employees.length === 0) {
  throw new Error('Nenhum funcionário válido encontrado na planilha.');
}

fs.writeFileSync(outputPath, JSON.stringify(employees), 'utf8');
console.log(`Dados locais gerados: ${employees.length} funcionários e 6 colunas.`);
