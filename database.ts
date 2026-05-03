import Dexie, { Table } from 'dexie';
import * as XLSX from 'xlsx';
import { processExcelData } from './utils/dataEnrichment';

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

export class AppDatabase extends Dexie {
  funcionarios!: Table<Funcionario>;

  constructor() {
    super('RelatoOcorrenciasDB');
    this.version(1).stores({
      funcionarios: 'matricula, nome, funcao, local, setor, gestor, coordenador, turno, escala'
    });
  }
}

export const db = new AppDatabase();

// Função para migrar/importar dados dinamicamente do Excel para o banco
export const importFromExcel = async (file: File): Promise<number> => {
  try {
    const data = await file.arrayBuffer();
    // Faz a leitura completa do WorkBook localmente, sem envios
    const workbook = XLSX.read(data, { type: 'array' });
    const firstSheetName = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[firstSheetName];
    
    // Converte a aba principal da planilha para Array de Objetos JSON
    // Usando range puro sem 'header: 1' pega automaticamente a 1ª linha como chave de Objeto
    const json = XLSX.utils.sheet_to_json(worksheet);
    
    // Processamento de Enriquecimento de Dados (Aplica hierarquias e sanitiza setores)
    const funcionarios = processExcelData(json as any[]);

    if (funcionarios.length === 0) {
      throw new Error("Nenhum funcionário válido encontrado na planilha.");
    }

    await db.funcionarios.clear();
    await db.funcionarios.bulkAdd(funcionarios);
    
    console.log(`Dados migrados para o banco de dados local. Total: ${funcionarios.length}`);
    return funcionarios.length;
  } catch (error) {
    console.error('Erro ao importar dados da planilha:', error);
    throw error;
  }
};
