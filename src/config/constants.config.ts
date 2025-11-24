import listas from '../../listas.json';
import listaPessoas from '../../pessoas.json';

export const ssmaNames = listas.ssmaNames;

export const localNames = [...new Set((listaPessoas as any[]).map((p: any) => p.Local).filter(Boolean))];

export const setorNames = [...new Set((listaPessoas as any[]).map((p: any) => p.Setor).filter(Boolean))];

export const gestorNames = [...new Set((listaPessoas as any[]).map((p: any) => p.Lider).filter(Boolean))];

export const coordenadorNames = [...new Set((listaPessoas as any[]).map((p: any) => p.Coordenador).filter(Boolean))];