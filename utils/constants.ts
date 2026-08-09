import listas from '../SSMA.json';
import { Funcionario, fetchFuncionariosFromSheet, clearCache, getCachedFuncionarios } from './googleSheets';

export const ssmaNames = listas.ssmaNames;

export let localNames: string[] = [];
export let setorNames: string[] = [];
export let gestorNames: string[] = [];
export let coordenadorNames: string[] = [];

export const refreshConstants = async (): Promise<Funcionario[]> => {
  try {
    const funcionarios = getCachedFuncionarios();
    if (!funcionarios) {
      throw new Error('Dados do Google Sheets não carregados.');
    }

    localNames = [...new Set(funcionarios.map(p => p.local).filter(Boolean))] as string[];
    setorNames = [...new Set(funcionarios.map(p => p.setor).filter(Boolean))] as string[];
    gestorNames = [...new Set(funcionarios.map(p => p.gestor).filter(Boolean))] as string[];
    coordenadorNames = [...new Set(funcionarios.map(p => p.coordenador).filter(Boolean))] as string[];

    return funcionarios;
  } catch (error) {
    console.error("Erro ao carregar listas:", error);
    throw error;
  }
};

export const initializeData = async (config: { spreadsheetId: string; sheetName?: string }): Promise<Funcionario[]> => {
  clearCache();
  const funcionarios = await fetchFuncionariosFromSheet(config);
  await refreshConstants();
  return funcionarios;
};