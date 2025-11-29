import React from 'react';
import { FormState } from '../types';
import { db } from '../database';
import * as htmlToImage from 'html-to-image';

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
  }>>,
  setGestorLabel?: React.Dispatch<React.SetStateAction<string>>,
  setCoordenadorLabel?: React.Dispatch<React.SetStateAction<string>>
) => {
  let lastCheckedMatricula = '';
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value.toUpperCase() }));
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    if (name === "sif" || name === "psif") {
      setFormData((prev) => ({ ...prev, [name]: checked }));
    } else {
      setFormData((prev) => {
        const newClassificacao = checked
          ? [...prev.classificacao, name]
          : prev.classificacao.filter((item) => item !== name);
        return { ...prev, classificacao: newClassificacao };
      });
    }
  };

  const handleAcoesNecessariasKeyPress = (
    index: number,
    e: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (e.key === "Enter" && !e.shiftKey) {
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

  const handleAcoesImediatasKeyPress = (
    index: number,
    e: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (e.key === "Enter" && !e.shiftKey) {
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

  const handleMatriculaKeyPress = async (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      const matricula = (e.target as HTMLInputElement).value.trim();
      await fillMatriculaData(matricula);
    }
  };

  const handleMatriculaBlur = async (e: React.FocusEvent<HTMLInputElement>) => {
    const matricula = (e.target as HTMLInputElement).value.trim();
    await fillMatriculaData(matricula);
  };

  const fillMatriculaData = async (matricula: string) => {
    console.log('Buscando matrícula:', matricula);

    if (matricula === lastCheckedMatricula) {
      return; // Já verificado, não mostrar notificação novamente
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

          // Se o cargo começar com "Coordenador", alterar os labels
          if (funcionario.funcao && funcionario.funcao.toUpperCase().startsWith('COORDENADOR')) {
            if (setGestorLabel) setGestorLabel('Gerente');
            if (setCoordenadorLabel) setCoordenadorLabel('Diretor');
          } else {
            if (setGestorLabel) setGestorLabel('Gestor');
            if (setCoordenadorLabel) setCoordenadorLabel('Coordenador');
          }
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
        setNotification({ message: "Erro ao buscar dados do funcionário!", type: 'error' });
        setTimeout(() => setNotification(null), 3000);
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
      if (setGestorLabel) setGestorLabel('Gestor');
      if (setCoordenadorLabel) setCoordenadorLabel('Coordenador');
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    setIsDragOver(false);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragOver(false);
    const files = Array.from(e.dataTransfer.files as FileList).filter((file: File) => file.type.startsWith('image/'));
    setImages(prev => [...prev, ...files].slice(0, 4));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files as FileList).filter((file: File) => file.type.startsWith('image/'));
    setImages(prev => [...prev, ...files].slice(0, 4));
  };

  const removeAcaoImediata = (index: number) => {
    if (index === 0) {
      setFormData(prev => ({ ...prev, acoesImediatas: ["", ...prev.acoesImediatas.slice(1)] }));
    } else {
      setFormData(prev => ({ ...prev, acoesImediatas: prev.acoesImediatas.filter((_, i) => i !== index) }));
    }
  };

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

  const removeImage = (index: number) => {
    setImages(prev => prev.filter((_, i) => i !== index));
  };

  const showNotification = (message: string, type: 'success' | 'error' | 'info' = 'info') => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 3000);
  };

  const handleCopy = async (formData: FormState, selectedBodyParts: string[], images: File[]) => {
    const exportArea = document.getElementById("export-area");
    if (!exportArea) {
      showNotification("Área do relatório não encontrada.", "error");
      return;
    }

    showNotification("Gerando imagem...", "info");

    // 1. Aplicar classe para forçar o layout ideal de impressão/captura
    document.body.classList.add("force-print-capture");

    // Substituir checkboxes marcados por 🗹
    const checkboxReplacements: { original: HTMLElement; replacement: HTMLElement }[] = [];
    const checkboxes = exportArea.querySelectorAll('input[type="checkbox"]');
    checkboxes.forEach(cb => {
      const input = cb as HTMLInputElement;
      if (input.checked) {
        const span = document.createElement('span');
        span.innerText = '🗹';
        span.style.fontSize = '18px';
        span.style.color = '#2003c4ff';
        span.style.display = 'inline-block';
        span.style.width = '18px';
        span.style.height = '18px';
        span.style.textAlign = 'left';
        input.parentNode?.replaceChild(span, input);
        checkboxReplacements.push({ original: input, replacement: span });
      }
    });

    // Pequeno atraso para garantir que o DOM renderize as mudanças de classe
    await new Promise(r => setTimeout(r, 50));

    // Recalcular alturas dos textareas para garantir que quebras de linha sejam exibidas
    const textareas = exportArea.querySelectorAll('textarea');
    textareas.forEach((textarea: HTMLTextAreaElement) => {
      textarea.style.setProperty('height', 'auto', 'important');
      textarea.style.setProperty('height', textarea.scrollHeight + 'px', 'important');
    });

    // Remover barras de rolagem da seção de fotos
    const imagesContainer = exportArea.querySelector('.overflow-y-auto') as HTMLElement;
    if (imagesContainer) {
      imagesContainer.style.setProperty('overflow', 'hidden', 'important');
      imagesContainer.style.setProperty('height', 'auto', 'important');
    }

    try {
      // 2. Capturar com html-to-image
      const dataURL = await htmlToImage.toPng(exportArea, {
        quality: 1,
        backgroundColor: "#ffffff",
        width: exportArea.offsetWidth,
        height: exportArea.offsetHeight,
      });

      // 3. Baixar PNG diretamente
      const link = document.createElement('a');
      link.href = dataURL;
      link.download = 'Relatorio de Ocorrencia.png';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      showNotification("Imagem gerada com sucesso!", "success");

    } catch (error) {
      console.error("Erro na geração da imagem:", error);
      showNotification("Erro ao gerar a imagem do relatório.", "error");
    } finally {
      // 4. Restaurar checkboxes
      checkboxReplacements.forEach(({ original, replacement }) => {
        replacement.parentNode?.replaceChild(original, replacement);
      });

      // 5. Remover classe no final
      document.body.classList.remove("force-print-capture");
    }
  };

  return {
    handleInputChange,
    handleCheckboxChange,
    handleAcoesNecessariasKeyPress,
    handleAcoesImediatasKeyPress,
    handleMatriculaKeyPress,
    handleMatriculaBlur,
    handleMatriculaChange,
    handleDragOver,
    handleDragLeave,
    handleDrop,
    handleFileChange,
    removeAcaoImediata,
    removeAcaoNecessaria,
    removeImage,
    showNotification,
    handleCopy
  };
};

export const validateForm = (formData: FormState, selectedBodyParts: string[]): string | null => {
  const requiredFields = [
    'responsavelSSMA', 'data', 'hora', 'local', 'setor', 'gestor', 'coordenador',
    'matricula', 'nome', 'funcao', 'turno', 'escala', 'descricao'
  ];

  for (const field of requiredFields) {
    if (!formData[field as keyof FormState]?.toString().trim()) {
      return `Campo obrigatório não preenchido: ${field}`;
    }
  }

  if (!formData.acoesImediatas.some(acao => acao.trim())) {
    return 'Pelo menos uma ação imediata deve ser preenchida';
  }

  if (!formData.acoesNecessarias.some(item => item.acao.trim() && item.responsavel.trim())) {
    return 'Pelo menos uma ação necessária com ação e responsável deve ser preenchida';
  }

  const hasClassificacao = formData.classificacao.length > 0;
  const isIncidente = formData.classificacao.includes('Incidente');
  if (hasClassificacao && !isIncidente && selectedBodyParts.length === 0) {
    return 'Quando uma classificação prévia é selecionada (exceto Incidente), pelo menos uma parte do corpo deve ser selecionada no diagrama';
  }

  return null;
};

export const generateReportText = (formData: FormState, selectedBodyParts: string[], images: File[]): string => {
  let report = `RELATO DE OCORRÊNCIA – FRASLE CAIXAS\n\n`;

  report += `Responsável SSMA: ${formData.responsavelSSMA}\n`;
  report += `Data: ${formData.data}\n`;
  report += `Hora: ${formData.hora}\n`;
  report += `Local: ${formData.local}\n`;
  report += `Setor: ${formData.setor}\n`;
  report += `Gestor: ${formData.gestor}\n`;
  report += `Coordenador: ${formData.coordenador}\n\n`;

  report += `Classificação Prévia: ${formData.classificacao.join(', ') || 'Nenhuma'}\n`;
  report += `Classificação Potencial: ${formData.sif ? 'SIF' : ''}${formData.sif && formData.psif ? ', ' : ''}${formData.psif ? 'PSIF' : ''}\n\n`;

  report += `IDENTIFICAÇÃO DO ENVOLVIDO\n`;
  report += `Matrícula: ${formData.matricula}\n`;
  report += `Nome: ${formData.nome}\n`;
  report += `Função: ${formData.funcao}\n`;
  report += `Turno: ${formData.turno}\n`;
  report += `Escala: ${formData.escala}\n\n`;

  report += `DESCRIÇÃO DO EVENTO\n`;
  report += `${formData.descricao}\n\n`;

  if (selectedBodyParts.length > 0) {
    report += `Parte do corpo afetada: ${selectedBodyParts.join(', ')}\n\n`;
  }

  if (images.length > 0) {
    report += `Fotos: ${images.length} imagem(ns) anexada(s)\n\n`;
  }

  report += `AÇÕES IMEDIATAS DE CONTENÇÃO\n`;
  formData.acoesImediatas.forEach((acao, index) => {
    if (acao.trim()) {
      report += `${index + 1}. ${acao}\n`;
    }
  });
  report += `\n`;

  report += `AÇÕES NECESSÁRIAS\n`;
  formData.acoesNecessarias.forEach((acao, index) => {
    if (acao.acao.trim()) {
      report += `${index + 1}. ${acao.acao} - Responsável: ${acao.responsavel} - Prazo: ${acao.prazo}\n`;
    }
  });

  return report;
};