import React from 'react';
import { FormState } from '../types';
import { db } from '../services/database';

// Criar handlers para gerenciar interações do formulário
export const createFormHandlers = (
  setFormData: React.Dispatch<React.SetStateAction<FormState>>,
  setIsAutoFilled: React.Dispatch<React.SetStateAction<boolean>>,
  setImages: React.Dispatch<React.SetStateAction<File[]>>,
  setIsDragOver: React.Dispatch<React.SetStateAction<boolean>>,
  setNotification: React.Dispatch<React.SetStateAction<{ message: string; type: 'success' | 'error' | 'info' } | null>>,
  setModal: React.Dispatch<React.SetStateAction<{
    isOpen: boolean;
    title: string;
    message: string;
    type: 'error' | 'warning' | 'info';
  }>>
) => {
  // Controlar última matrícula verificada para evitar buscas duplicadas
  let lastCheckedMatricula = '';
  // Handler genérico para mudanças em inputs e textareas
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value.toUpperCase() }));
  };

  // Handler para mudanças em checkboxes (classificação e SIF/PSIF)
  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    if (name === "sif" || name === "psif") {
      // Para SIF/PSIF, apenas atualizar o valor booleano
      setFormData((prev) => ({ ...prev, [name]: checked }));
    } else {
      // Para classificação prévia, adicionar/remover da lista
      setFormData((prev) => {
        const newClassificacao = checked
          ? [...prev.classificacao, name]
          : prev.classificacao.filter((item) => item !== name);
        return { ...prev, classificacao: newClassificacao };
      });
    }
  };

  // Handler para adicionar nova ação necessária ao pressionar Enter
  const handleAcoesNecessariasKeyPress = (
    index: number,
    e: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (e.key === "Enter") {
      e.preventDefault();
      setFormData((prev) => {
        if (
          index === prev.acoesNecessarias.length - 1 &&
          prev.acoesNecessarias[index].acao.trim() !== ""
        ) {
          return { ...prev, acoesNecessarias: [...prev.acoesNecessarias, { acao: "", responsavel: "", prazo: "" }] };
        }
        return prev;
      });
    }
  };

  // Handler para adicionar nova ação imediata ao pressionar Enter
  const handleAcoesImediatasKeyPress = (
    index: number,
    e: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (e.key === "Enter") {
      e.preventDefault();
      setFormData((prev) => {
        if (
          index === prev.acoesImediatas.length - 1 &&
          prev.acoesImediatas[index].trim() !== ""
        ) {
          return { ...prev, acoesImediatas: [...prev.acoesImediatas, ""] };
        }
        return prev;
      });
    }
  };

  // Handler para buscar dados do funcionário ao pressionar Enter na matrícula
  const handleMatriculaKeyPress = async (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      const matricula = (e.target as HTMLInputElement).value.trim();
      await fillMatriculaData(matricula);
    }
  };

  // Buscar e preencher dados do funcionário baseado na matrícula
  const fillMatriculaData = async (matricula: string) => {
    console.log('Buscando matrícula:', matricula);

    if (matricula === lastCheckedMatricula) {
      return; // Já verificado, não mostrar modal novamente
    }

    lastCheckedMatricula = matricula;

    if (matricula) {
      try {
        const funcionario = await db.funcionarios.get(matricula);
        console.log('Funcionário encontrado:', funcionario);
        if (funcionario) {
          setFormData((prev) => ({
            ...prev,
            nome: funcionario.nome,
            funcao: funcionario.funcao,
            local: funcionario.local || prev.local,
            setor: funcionario.setor || prev.setor,
            gestor: funcionario.gestor || prev.gestor,
            coordenador: funcionario.coordenador || prev.coordenador,
            turno: funcionario.turno || '',
            escala: funcionario.escala || ''
          }));
          setIsAutoFilled(true);
          console.log('Campos preenchidos com:', funcionario);
        } else {
          setFormData((prev) => ({
            ...prev,
            nome: "",
            funcao: ""
          }));
          setIsAutoFilled(false);
          setModal({
            isOpen: true,
            title: "Matrícula não encontrada",
            message: "Matrícula não encontrada na base de dados. Preencha os campos manualmente.",
            type: 'info'
          });
        }
      } catch (error) {
        console.error('Erro ao buscar funcionário:', error);
        setModal({
          isOpen: true,
          title: "Erro",
          message: "Erro ao buscar dados do funcionário.",
          type: 'error'
        });
      }
    }
  };

  const handleMatriculaChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setFormData((prev) => ({ ...prev, matricula: value }));

    // Resetar a última matrícula verificada se o valor mudou
    if (value !== lastCheckedMatricula) {
      lastCheckedMatricula = '';
    }

    if (setIsAutoFilled) {
      setIsAutoFilled(false);
      setFormData((prev) => ({
        ...prev,
        nome: "",
        funcao: "",
        local: "",
        setor: "",
        gestor: "",
        coordenador: "",
        turno: "",
        escala: ""
      }));
    }
  };

  // Handler para drag over na área de upload de imagens
  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  // Handler para drag leave na área de upload
  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    setIsDragOver(false);
  };

  // Handler para drop de arquivos na área de upload
  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragOver(false);
    const files = Array.from(e.dataTransfer.files as FileList).filter((file: File) => file.type.startsWith('image/'));
    setImages(prev => [...prev, ...files].slice(0, 4));
  };

  // Handler para seleção de arquivos via input file
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files as FileList).filter((file: File) => file.type.startsWith('image/'));
    setImages(prev => [...prev, ...files].slice(0, 4));
  };

  // Remover ação imediata (mantém pelo menos uma linha vazia)
  const removeAcaoImediata = (index: number) => {
    if (index === 0) {
      setFormData(prev => ({ ...prev, acoesImediatas: ["", ...prev.acoesImediatas.slice(1)] }));
    } else {
      setFormData(prev => ({ ...prev, acoesImediatas: prev.acoesImediatas.filter((_, i) => i !== index) }));
    }
  };

  // Remover ação necessária (mantém pelo menos uma linha vazia)
  const removeAcaoNecessaria = (index: number) => {
    if (index === 0) {
      setFormData(prev => ({
        ...prev,
        acoesNecessarias: [{ acao: "", responsavel: "", prazo: "" }, ...prev.acoesNecessarias.slice(1)]
      }));
    } else {
      setFormData(prev => ({ ...prev, acoesNecessarias: prev.acoesNecessarias.filter((_, i) => i !== index) }));
    }
  };

  // Remover imagem da lista
  const removeImage = (index: number) => {
    setImages(prev => prev.filter((_, i) => i !== index));
  };

  // Exibir notificação temporária para o usuário
  const showNotification = (message: string, type: 'success' | 'error' | 'info' = 'info') => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 3000);
  };

  // Retornar todos os handlers criados
  return {
    handleInputChange,
    handleCheckboxChange,
    handleAcoesNecessariasKeyPress,
    handleAcoesImediatasKeyPress,
    handleMatriculaKeyPress,
    handleMatriculaChange,
    handleDragOver,
    handleDragLeave,
    handleDrop,
    handleFileChange,
    removeAcaoImediata,
    removeAcaoNecessaria,
    removeImage,
    showNotification
  };
};

// Validar formulário antes da geração do relatório
export const validateForm = (formData: FormState, selectedBodyParts: string[]): string | null => {
  // Lista de campos obrigatórios
  const requiredFields = [
    'responsavelSSMA', 'data', 'hora', 'local', 'setor', 'gestor', 'coordenador',
    'matricula', 'nome', 'funcao', 'turno', 'escala', 'descricao'
  ];

  // Verificar se todos os campos obrigatórios estão preenchidos
  for (const field of requiredFields) {
    if (!formData[field as keyof FormState]?.toString().trim()) {
      return `Campo obrigatório não preenchido: ${field}`;
    }
  }

  // Verificar se há pelo menos uma ação imediata
  if (!formData.acoesImediatas.some(acao => acao.trim())) {
    return 'Pelo menos uma ação imediata deve ser preenchida';
  }

  // Verificar se há pelo menos uma ação necessária com ação e responsável
  if (!formData.acoesNecessarias.some(item => item.acao.trim() && item.responsavel.trim())) {
    return 'Pelo menos uma ação necessária com ação e responsável deve ser preenchida';
  }

  // Verificar se parte do corpo foi selecionada quando necessário
  const hasClassificacao = formData.classificacao.length > 0;
  const isIncidente = formData.classificacao.includes('Incidente');
  if (hasClassificacao && !isIncidente && selectedBodyParts.length === 0) {
    return 'Quando uma classificação prévia é selecionada (exceto Incidente), pelo menos uma parte do corpo deve ser selecionada no diagrama';
  }

  return null;
};

// Gerar relatório em formato de texto para cópia
export const generateReportText = (formData: FormState, selectedBodyParts: string[], images: File[]): string => {
  let report = `RELATO DE OCORRÊNCIA – FRASLE CAIXAS\n\n`;

  // Cabeçalho com informações básicas
  report += `Responsável SSMA: ${formData.responsavelSSMA}\n`;
  report += `Data: ${formData.data}\n`;
  report += `Hora: ${formData.hora}\n`;
  report += `Local: ${formData.local}\n`;
  report += `Setor: ${formData.setor}\n`;
  report += `Gestor: ${formData.gestor}\n`;
  report += `Coordenador: ${formData.coordenador}\n\n`;

  // Classificações do evento
  report += `Classificação Prévia: ${formData.classificacao.join(', ') || 'Nenhuma'}\n`;
  report += `Classificação Potencial: ${formData.sif ? 'SIF' : ''}${formData.sif && formData.psif ? ', ' : ''}${formData.psif ? 'PSIF' : ''}\n\n`;

  // Identificação do envolvido
  report += `IDENTIFICAÇÃO DO ENVOLVIDO\n`;
  report += `Matrícula: ${formData.matricula}\n`;
  report += `Nome: ${formData.nome}\n`;
  report += `Função: ${formData.funcao}\n`;
  report += `Turno: ${formData.turno}\n`;
  report += `Escala: ${formData.escala}\n\n`;

  // Descrição do evento
  report += `DESCRIÇÃO DO EVENTO\n`;
  report += `${formData.descricao}\n\n`;

  // Parte do corpo afetada (se aplicável)
  if (selectedBodyParts.length > 0) {
    report += `Parte do corpo afetada: ${selectedBodyParts.join(', ')}\n\n`;
  }

  // Informações sobre fotos anexadas
  if (images.length > 0) {
    report += `Fotos: ${images.length} imagem(ns) anexada(s)\n\n`;
  }

  // Ações imediatas de contenção
  report += `AÇÕES IMEDIATAS DE CONTENÇÃO\n`;
  formData.acoesImediatas.forEach((acao, index) => {
    if (acao.trim()) {
      report += `${index + 1}. ${acao}\n`;
    }
  });
  report += `\n`;

  // Ações necessárias
  report += `AÇÕES NECESSÁRIAS\n`;
  formData.acoesNecessarias.forEach((acao, index) => {
    if (acao.acao.trim()) {
      report += `${index + 1}. ${acao.acao} - Responsável: ${acao.responsavel} - Prazo: ${acao.prazo}\n`;
    }
  });

  return report;
};