import jsPDF from 'jspdf';
import * as htmlToImage from 'html-to-image';
import { FormState } from '../types';
import { validateForm, generateReportText } from './formHandlers';

export const createExportHandlers = (
  formData: FormState,
  selectedBodyParts: string[],
  images: File[],
  showNotification: (message: string, type: 'success' | 'error' | 'info') => void
) => {
  const handleCopy = async () => {
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
        link.download = 'relatorio.png';
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

  const handleExportPDF = async () => {
    const validationError = validateForm(formData, selectedBodyParts);
    if (validationError) {
      showNotification("Atenção! Há campos que necessitam ser preenchidos!", 'error');
      return;
    }

    showNotification("Gerando PDF...", 'info');
    const element = document.getElementById("export-area") as HTMLElement;
    if (!element) {
      showNotification("Área do relatório não encontrada.", "error");
      return;
    }
    const canvas = await htmlToImage.toCanvas(element);
    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF();
    const imgWidth = 210; // A4 width in mm
    const pageHeight = 295; // A4 height in mm
    const imgHeight = canvas.height * imgWidth / canvas.width;
    let heightLeft = imgHeight;
    let position = 0;
    pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
    heightLeft -= pageHeight;
    while (heightLeft >= 0) {
      position = heightLeft - imgHeight;
      pdf.addPage();
      pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;
    }
    const pdfBlob = pdf.output('blob');
    const url = URL.createObjectURL(pdfBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'Relato de Ocorrência -.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    showNotification("Relato exportado com sucesso!", 'success');
  };

  return { handleCopy, handleExportPDF };
};