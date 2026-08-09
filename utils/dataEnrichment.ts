export interface ExcelRow {
  "Matrícula": string | number;
  "Nome"?: string;
  "Cargo"?: string;
  "Setor (Descrição)"?: string;
  "Líder"?: string;
  "Turno"?: string;
  [key: string]: any;
}

export interface FuncionarioData {
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

// Reutilizamos a lógica existente do banco
export function parseTurno(turnoStr: string): { turno: string, escala: string } {
  if (!turnoStr) return { turno: '', escala: '' };

  const isEscala = turnoStr.startsWith('6X2');
  let turno = '';

  if (isEscala) {
    const parts = turnoStr.split(' ');
    if (parts.length >= 2) {
      const scaleTime = parts[1];
      const [start] = scaleTime.split('-');
      if (start) {
        const startHour = parseInt(start.slice(0, 2));
        const startMin = parseInt(start.slice(2));
        if (startHour === 6 && startMin === 0) turno = '1';
        else if (startHour === 14 && startMin === 20) turno = '2';
        else if (startHour === 22 && startMin === 35) turno = '3';
      }
    }
  } else {
    const mainTurno = turnoStr.split('(')[0].trim();
    const start = mainTurno.split('-')[0]?.padStart(4, '0') || '';
    if (start.length >= 4) {
      const startHour = parseInt(start.slice(0, 2));
      if (startHour === 7) turno = '4';
      else if (startHour >= 6 && startHour < 15) turno = '1';
      else if (startHour >= 15 || (startHour >= 0 && startHour < 1)) turno = '2';
      else if (startHour >= 0 && startHour < 6) turno = '3';
    }
  }

  const escala = isEscala ? 'Sim' : 'Não';
  return { turno, escala };
}

export function processExcelData(rows: ExcelRow[]): FuncionarioData[] {
  // Mapa para buscar o Líder pelo Nome
  const nameMap = new Map<string, ExcelRow>();
  
  rows.forEach(row => {
    if (row.Nome) {
      // Ignorar maiusculas e minusculas na indexacao e ignorar espaços duplos
      nameMap.set(row.Nome.trim().toUpperCase(), row);
    }
  });

  return rows.map(row => {
    const { turno, escala } = parseTurno(row.Turno || '');
    
    // Tratamento de Setor e Local
    let rawSetor = row["Setor (Descrição)"] || "";
    // Remove sufixos como T1, T2, T3 (com limites de palavra) para evitar sujar a tela
    let cleanedSetorDesc = rawSetor.replace(/\bT[1-4]\b/gi, "").trim();
    
    const parts = cleanedSetorDesc.split(" ").filter(p => p !== "");
    
    // Regra de Exceção: Se começar com "Manutencao SIBLO", inverte para que SIBLO seja o Local
    if (parts.length >= 2 && (parts[0].toUpperCase() === "MANUTENCAO" || parts[0].toUpperCase() === "MANUTENÇÃO")) {
      const temp = parts[0];
      parts[0] = parts[1];
      parts[1] = temp;
    }

    let local = parts.length > 0 ? parts[0].toUpperCase() : undefined;
    let setor = parts.length > 1 ? parts.slice(1).join(" ").toUpperCase() : undefined;
    
    // As vezes o setor fica com um traço de separação (Ex: "- SESMT"). Vamos limpá-lo.
    if (setor) {
      setor = setor.replace(/^[-\s]+/, '');
    }

    // Regra de Exceção: Pessoas do SESMT pertencem ao local SSMA
    if (cleanedSetorDesc.toUpperCase().includes("SESMT")) {
      local = "SSMA";
      setor = "SESMT SEGURANCA DO TRABALHO";
    }

    // Função para limpar strings (nomes ou cargos) e tirar prefixos de código numérico como "00057310 - "
    const cleanField = (text?: string) => {
      if (!text) return undefined;
      const parts = text.split(" - ");
      return parts[parts.length - 1].trim().toUpperCase();
    };

    // Cálculo Hierárquico do Lider do Lider (Coordenador)
    const gestorName = cleanField(row["Líder"]);
    let coordenadorName = undefined;

    if (gestorName) {
      const parentRow = nameMap.get(gestorName);
      if (parentRow && parentRow["Líder"]) {
        coordenadorName = cleanField(parentRow["Líder"]);
      }
    }

    return {
      matricula: row["Matrícula"] ? row["Matrícula"].toString().replace(/^0+(?=\d)/, '') : "",
      nome: row.Nome ? row.Nome.toUpperCase() : "",
      funcao: cleanField(row.Cargo) || "",
      local,
      setor,
      gestor: gestorName ? gestorName.toUpperCase() : undefined,
      coordenador: coordenadorName ? coordenadorName.toUpperCase() : undefined,
      turno,
      escala
    };
  }).filter(func => func.matricula && func.nome); // Filtrar linhas incorretas ou vazias da planilha
}
