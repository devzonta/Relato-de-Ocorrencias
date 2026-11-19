import { processExcelData, ExcelRow, FuncionarioData } from './dataEnrichment';

export type Funcionario = FuncionarioData;

let cachedFuncionarios: Funcionario[] | null = null;

const isExcelRow = (value: unknown): value is ExcelRow => {
  if (!value || typeof value !== 'object') return false;

  const row = value as Record<string, unknown>;
  return (
    typeof row['Matrícula'] === 'string' &&
    typeof row.Nome === 'string' &&
    typeof row.Cargo === 'string' &&
    typeof row['Setor (Descrição)'] === 'string' &&
    typeof row['Líder'] === 'string' &&
    typeof row.Turno === 'string'
  );
};

export const getCachedFuncionarios = (): Funcionario[] | null => {
  return cachedFuncionarios;
};

export const fetchFuncionariosFromFile = async (): Promise<Funcionario[]> => {
  const response = await fetch(`${import.meta.env.BASE_URL}funcionarios.json`, {
    cache: 'no-store',
  });

  if (!response.ok) {
    throw new Error(
      `Não foi possível carregar os dados de funcionários (HTTP ${response.status}). Gere novamente os dados a partir de public\\LISTA_PESSOAS.xlsx e publique a pasta dist.`,
    );
  }

  const data: unknown = await response.json();
  if (!Array.isArray(data) || data.length === 0 || !data.every(isExcelRow)) {
    throw new Error(
      'O arquivo local de funcionários está vazio ou em formato inválido.',
    );
  }

  const funcionarios = processExcelData(data);
  if (funcionarios.length === 0) {
    throw new Error(
      'Nenhum funcionário válido foi encontrado no arquivo local.',
    );
  }

  cachedFuncionarios = funcionarios;
  return funcionarios;
};

export const getFuncionarioByMatricula = async (
  matricula: string,
): Promise<Funcionario | undefined> => {
  if (!cachedFuncionarios) {
    throw new Error('Dados não carregados. Carregue o arquivo de funcionários primeiro.');
  }

  return cachedFuncionarios.find((funcionario) => funcionario.matricula === matricula);
};
