import listas from '../SSMA.json';
import { db } from '../database';

export const ssmaNames = listas.ssmaNames;

export let localNames: string[] = [];
export let setorNames: string[] = [];
export let gestorNames: string[] = [];
export let coordenadorNames: string[] = [];

export const refreshConstants = async () => {
  try {
    const all = await db.funcionarios.toArray();
    localNames = [...new Set(all.map(p => p.local).filter(Boolean))] as string[];
    setorNames = [...new Set(all.map(p => p.setor).filter(Boolean))] as string[];
    gestorNames = [...new Set(all.map(p => p.gestor).filter(Boolean))] as string[];
    coordenadorNames = [...new Set(all.map(p => p.coordenador).filter(Boolean))] as string[];
  } catch (error) {
    console.error("Erro ao carregar listas do banco:", error);
  }
};