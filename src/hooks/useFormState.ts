import { useState } from 'react';
import { FormState } from '../types';

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

export const useFormState = () => {
  const [formData, setFormData] = useState<FormState>(initialFormData);
  const [images, setImages] = useState<File[]>([]);
  const [isDragOver, setIsDragOver] = useState(false);
  const [selectedBodyParts, setSelectedBodyParts] = useState<string[]>([]);
  const [notification, setNotification] = useState<{ message: string; type: 'success' | 'error' | 'info' } | null>(null);

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