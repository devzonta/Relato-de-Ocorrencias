import { processExcelData, ExcelRow } from './dataEnrichment';

export interface Funcionario {
  matricula: string;
  nome: string;
  funcao: string;
  local?: string;
  setor?: string;
  gestor?: string;
  coordenador?: string;
  turno?: string;
  escala?: string;
}

export interface GoogleSheetsConfig {
  spreadsheetId: string;
  sheetName?: string;
}

let cachedFuncionarios: Funcionario[] | null = null;

export const setCachedFuncionarios = (data: Funcionario[] | null) => {
  cachedFuncionarios = data;
};

export const getCachedFuncionarios = (): Funcionario[] | null => {
  return cachedFuncionarios;
};

export const clearCache = () => {
  cachedFuncionarios = null;
};

const parseCSV = (csvText: string): string[][] => {
  const rows: string[][] = [];
  let currentRow: string[] = [];
  let currentCell = '';
  let insideQuotes = false;

  for (let i = 0; i < csvText.length; i++) {
    const char = csvText[i];
    const nextChar = csvText[i + 1];

    if (char === '"') {
      if (insideQuotes && nextChar === '"') {
        currentCell += '"';
        i++;
      } else {
        insideQuotes = !insideQuotes;
      }
    } else if (char === ',' && !insideQuotes) {
      currentRow.push(currentCell.trim());
      currentCell = '';
    } else if ((char === '\r' && nextChar === '\n') || char === '\n') {
      if (char === '\r') i++;
      currentRow.push(currentCell.trim());
      currentCell = '';
      if (currentRow.some(cell => cell.trim() !== '')) {
        rows.push(currentRow);
      }
      currentRow = [];
    } else {
      currentCell += char;
    }
  }

  if (currentCell || currentRow.length > 0) {
    currentRow.push(currentCell.trim());
    rows.push(currentRow);
  }

  return rows;
};

const REQUIRED_HEADERS = [
  'Matrícula',
  'Nome',
  'Cargo',
  'Setor (Descrição)',
  'Líder',
  'Turno'
];

const mapRowToExcelRow = (row: string[], headers: string[]): ExcelRow => {
  const obj: any = {};

  const getIndex = (name: string) => headers.findIndex(h => h.trim().toLowerCase() === name.toLowerCase());

  const matriculaIndex = getIndex('Matrícula');
  const nomeIndex = getIndex('Nome');
  const cargoIndex = getIndex('Cargo');
  const setorIndex = getIndex('Setor (Descrição)');
  const liderIndex = getIndex('Líder');
  const turnoIndex = getIndex('Turno');

  if (matriculaIndex >= 0) obj['Matrícula'] = row[matriculaIndex];
  if (nomeIndex >= 0) obj['Nome'] = row[nomeIndex];
  if (cargoIndex >= 0) obj['Cargo'] = row[cargoIndex];
  if (setorIndex >= 0) obj['Setor (Descrição)'] = row[setorIndex];
  if (liderIndex >= 0) obj['Líder'] = row[liderIndex];
  if (turnoIndex >= 0) obj['Turno'] = row[turnoIndex];

  return obj as ExcelRow;
};

export const fetchFuncionariosFromSheet = async (config: GoogleSheetsConfig): Promise<Funcionario[]> => {
  const { spreadsheetId, sheetName = 'Página1' } = config;

  const encodedSheetName = encodeURIComponent(sheetName);
  const url = `https://docs.google.com/spreadsheets/d/${spreadsheetId}/gviz/tq?tqx=out:csv&sheet=${encodedSheetName}`;

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`Erro ao buscar dados da planilha: ${response.status}`);
  }

  const csvText = await response.text();

  if (!csvText || csvText.trim().length === 0) {
    throw new Error('A planilha está vazia ou não foi encontrada.');
  }

  const rows = parseCSV(csvText);

  if (rows.length === 0) {
    throw new Error('A planilha está vazia ou não foi encontrada.');
  }

  const headers = rows[0];
  const dataRows = rows.slice(1);

  const missingHeaders = REQUIRED_HEADERS.filter(required => 
    !headers.some(h => h.trim().toLowerCase() === required.toLowerCase())
  );

  if (missingHeaders.length > 0) {
    throw new Error(`Cabeçalhos obrigatórios não encontrados na planilha: ${missingHeaders.join(', ')}`);
  }

  const excelRows: ExcelRow[] = dataRows
    .filter(row => row.some(cell => cell && cell.toString().trim() !== ''))
    .map(row => mapRowToExcelRow(row, headers));

  const funcionarios = processExcelData(excelRows);
  cachedFuncionarios = funcionarios;

  return funcionarios;
};

export const getFuncionarioByMatricula = async (matricula: string): Promise<Funcionario | undefined> => {
  if (!cachedFuncionarios) {
    throw new Error('Dados não carregados. Chame fetchFuncionariosFromSheet primeiro.');
  }

  return cachedFuncionarios.find(f => f.matricula === matricula);
};
