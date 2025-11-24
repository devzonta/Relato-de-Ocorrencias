import Dexie, { Table } from 'dexie';
import listaPessoas from './pessoas.json';

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

// Função auxiliar para parsear turno
function parseTurno(turnoStr: string): { turno: string, escala: string } {
  if (!turnoStr) return { turno: '', escala: '' };

  const isEscala = turnoStr.startsWith('6X2');
  let turno = '';

  if (isEscala) {
    // Para escala, parse o horário de escala, e.g. "6X2 0600-1420"
    const parts = turnoStr.split(' ');
    if (parts.length >= 2) {
      const scaleTime = parts[1];
      const [start] = scaleTime.split('-');
      const startHour = parseInt(start.slice(0, 2));
      const startMin = parseInt(start.slice(2));
      if (startHour === 6 && startMin === 0) turno = '1'; // 6X2 06 00-14 20
      else if (startHour === 14 && startMin === 20) turno = '2'; // 6X2 14 20-22 35
      else if (startHour === 22 && startMin === 35) turno = '3'; // 6X2 22 35-06 00
    }
  } else {
    // Para turno normal, parse o horário principal
    const mainTurno = turnoStr.split('(')[0].trim();
    const start = mainTurno.split('-')[0]?.padStart(4, '0') || '';
    const startHour = parseInt(start.slice(0, 2));
    const startMin = parseInt(start.slice(2));
    if (startHour >= 6 && startHour < 15) turno = '1'; // Turno 1: 06:00 - 15:05
    else if (startHour >= 15 || (startHour >= 0 && startHour < 1)) turno = '2'; // Turno 2: 15:05 - 00:10
    else if (startHour >= 0 && startHour < 6) turno = '3'; // Turno 3: 00:10 - 06:00
    else if (startHour === 7 && startMin >= 30) turno = '4'; // Turno 4: 07:30 - 17:30
  }

  const escala = isEscala ? 'Sim' : 'Não';

  return { turno, escala };
}

// Função para migrar dados do JSON para o banco
export const migrateData = async () => {
  try {
    console.log('Iniciando migração de dados...');
    console.log('Número de registros no JSON:', listaPessoas.length);
    // Sempre migra para garantir dados atualizados
    const funcionarios = (listaPessoas as any[]).map((p: any) => {
      const { turno, escala } = parseTurno(p.Turno || '');
      return {
        matricula: p['Matrícula'].toString(),
        nome: p.Nome?.toUpperCase() || '',
        funcao: p.Cargo?.toUpperCase() || '',
        local: p.Local?.toUpperCase() || undefined,
        setor: p.Setor?.toUpperCase() || undefined,
        gestor: p.Lider?.toUpperCase() || undefined,
        coordenador: p.Coordenador?.toUpperCase() || undefined,
        turno,
        escala
      };
    });
    console.log('Funcionários processados:', funcionarios.length);
    console.log('Primeiro funcionário:', funcionarios[0]);
    await db.funcionarios.clear();
    await db.funcionarios.bulkAdd(funcionarios);
    console.log('Dados migrados para o banco de dados local');
  } catch (error) {
    console.error('Erro ao migrar dados:', error);
  }
};
