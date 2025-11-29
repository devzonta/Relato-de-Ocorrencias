import React from 'react';
import domtoimage from 'dom-to-image';

export const createExportHandlers = (
  formData: any,
  selectedBodyParts: string[],
  setImages: React.Dispatch<React.SetStateAction<File[]>>,
  showNotification: (message: string, type: 'success' | 'error' | 'info') => void
) => {
  const handleCopy = async () => {
    // Verificar se a área de exportação existe
    const exportArea = document.getElementById("export-area");
    if (!exportArea) {
      showNotification("Área do relatório não encontrada.", "error");
      return;
    }

    // Exibir notificação de progresso
    showNotification("Gerando imagem...", "info");

    // Aplicar classe para forçar o layout ideal de impressão/captura
    document.body.classList.add("force-print-capture");

    // Substituir checkboxes marcados por 🗹
    const checkboxReplacements: { original: HTMLElement; replacement: HTMLElement }[] = [];
    const checkboxes = exportArea.querySelectorAll('input[type="checkbox"]');
    checkboxes.forEach(cb => {
      const input = cb as HTMLInputElement;
      if (input.checked) {
        // Criar elemento visual para representar checkbox marcado
        const span = document.createElement('span');
        span.innerText = '🗹';
        span.style.fontSize = '18px';
        span.style.color = '#2003c4ff';
        span.style.display = 'inline-block';
        span.style.width = '18px';
        span.style.height = '18px';
        span.style.textAlign = 'left';
        // Substituir checkbox pelo elemento visual
        input.parentNode?.replaceChild(span, input);
        checkboxReplacements.push({ original: input, replacement: span });
      }
    });

    // Substituir textareas por pre tags para preservar quebras de linha
    const textareaReplacements: { original: HTMLTextAreaElement; replacement: HTMLElement }[] = [];
    const textareas = exportArea.querySelectorAll('textarea');
    textareas.forEach(textarea => {
      // Criar elemento pre para manter formatação de texto
      const pre = document.createElement('pre');
      pre.textContent = textarea.value;
      // Aplicar estilos para preservar aparência visual
      pre.style.whiteSpace = 'pre-wrap';
      pre.style.wordBreak = 'break-word';
      pre.style.overflowWrap = 'break-word';
      pre.style.fontSize = window.getComputedStyle(textarea).fontSize;
      pre.style.fontFamily = window.getComputedStyle(textarea).fontFamily;
      pre.style.lineHeight = window.getComputedStyle(textarea).lineHeight;
      pre.style.padding = window.getComputedStyle(textarea).padding;
      pre.style.width = textarea.offsetWidth + 'px';
      pre.style.minHeight = window.getComputedStyle(textarea).minHeight;
      pre.style.border = window.getComputedStyle(textarea).border;
      pre.style.backgroundColor = window.getComputedStyle(textarea).backgroundColor;
      pre.style.margin = '0';
      // Substituir textarea pelo elemento pre
      textarea.parentNode?.replaceChild(pre, textarea);
      textareaReplacements.push({ original: textarea, replacement: pre });
    });

    // Aguardar renderização das mudanças no DOM
    await new Promise(r => setTimeout(r, 50));

    try {
        // Configurar opções de captura da imagem
        const captureOptions = {
          quality: 1,                    // Qualidade máxima
          bgcolor: "#ffffff",           // Fundo branco
          width: exportArea.offsetWidth, // Largura da área
          height: exportArea.offsetHeight, // Altura da área
        };

        // Capturar área de exportação como imagem PNG
        const dataURL = await domtoimage.toPng(exportArea, captureOptions);

        // Preparar download do arquivo
        const link = document.createElement('a');
        link.href = dataURL;
        link.download = 'relatorio.png';
        // Adicionar ao DOM temporariamente para permitir o download
        document.body.appendChild(link);
        link.click();
        // Remover do DOM após o download
        document.body.removeChild(link);

        // Exibir notificação de sucesso
        showNotification("Imagem gerada com sucesso!", "success");

    } catch (error) {
        // Tratar erros durante a geração da imagem
        console.error("Erro na geração da imagem:", error);
        showNotification("Erro ao gerar a imagem do relatório.", "error");
    } finally {
        // Iniciar processo de limpeza e restauração

        // Restaurar checkboxes originais
        checkboxReplacements.forEach(({ original, replacement }) => {
          replacement.parentNode?.replaceChild(original, replacement);
        });

        // Restaurar textareas originais
        textareaReplacements.forEach(({ original, replacement }) => {
          replacement.parentNode?.replaceChild(original, replacement);
        });

        // Remover classe de captura para restaurar layout normal da página
        document.body.classList.remove("force-print-capture");
    }
  };

  // Retornar objeto com a função de exportação
  return { handleCopy };
};