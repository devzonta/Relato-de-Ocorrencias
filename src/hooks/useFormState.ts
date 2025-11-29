import { useState } from 'react';
import { FormState } from '../types';

// Definir valores iniciais do formulário
const initialFormData: FormState = {
  responsavelSSMA: "",
  data: "",
  hora: "",
  local: "",
  setor: "",
  gestor: "",
  coordenador: "",
  classificacao: [],
  sif: false,
  psif: false,
  matricula: "",
  nome: "",
  escala: "",
  turno: "",
  funcao: "",
  descricao: "",
  acoesImediatas: [""],
  acoesNecessarias: [{ acao: "", responsavel: "", prazo: "" }],
};

// Hook personalizado para gerenciar o estado do formulário de relatório
export const useFormState = () => {
  // Estado principal do formulário com dados do relatório
  const [formData, setFormData] = useState<FormState>(initialFormData);

  // Estado para armazenar imagens anexadas ao relatório
  const [images, setImages] = useState<File[]>([]);

  // Estado para controlar visual de drag and drop
  const [isDragOver, setIsDragOver] = useState(false);

  // Estado para partes do corpo selecionadas no diagrama
  const [selectedBodyParts, setSelectedBodyParts] = useState<string[]>([]);

  // Estado para notificações do sistema
  const [notification, setNotification] = useState<{ message: string; type: 'success' | 'error' | 'info' } | null>(null);

  // Retornar todos os estados e setters
  return {
    formData,
    setFormData,
    images,
    setImages,
    isDragOver,
    setIsDragOver,
    selectedBodyParts,
    setSelectedBodyParts,
    notification,
    setNotification,
  };
};