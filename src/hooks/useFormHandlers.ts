import React, { useState, useEffect } from 'react';
import { FormState } from '../types';
import { migrateData } from '../services/database';
import { createResponsavelSSMAHandlers, createLocalHandlers, createSetorHandlers, createGestorHandlers, createCoordenadorHandlers } from '../utils/autocompleteHandlers';
import { createFormHandlers } from '../utils/formHandlers';
import { createExportHandlers } from '../utils/exportHandlers';

// Hook principal para coordenar todos os handlers do formulário
export const useFormHandlers = (
  formData: FormState,
  setFormData: React.Dispatch<React.SetStateAction<FormState>>,
  setImages: React.Dispatch<React.SetStateAction<File[]>>,
  setIsDragOver: React.Dispatch<React.SetStateAction<boolean>>,
  setNotification: React.Dispatch<React.SetStateAction<{ message: string; type: 'success' | 'error' | 'info' } | null>>,
  setModal: React.Dispatch<React.SetStateAction<{
    isOpen: boolean;
    title: string;
    message: string;
    type: 'error' | 'warning' | 'info';
  }>>,
  autocompleteStates: any // TODO: type properly
) => {
  // Estado para controlar se o formulário foi preenchido automaticamente
  const [isAutoFilled, setIsAutoFilled] = useState(false);

  // Executar migração de dados na inicialização da aplicação
  useEffect(() => {
    migrateData();
  }, []);

  // Inicializar handlers de autocomplete para cada campo
  const responsavelSSMAHandlers = createResponsavelSSMAHandlers({
    setFormData,
    setShowAutocomplete: autocompleteStates.setShowAutocomplete,
    setFilteredNames: autocompleteStates.setFilteredNames,
    setHighlightedIndex: autocompleteStates.setHighlightedIndex,
  });

  const localHandlers = createLocalHandlers({
    setFormData,
    setShowLocalAutocomplete: autocompleteStates.setShowLocalAutocomplete,
    setFilteredLocalNames: autocompleteStates.setFilteredLocalNames,
    setHighlightedLocalIndex: autocompleteStates.setHighlightedLocalIndex,
  });

  const setorHandlers = createSetorHandlers({
    setFormData,
    setShowSetorAutocomplete: autocompleteStates.setShowSetorAutocomplete,
    setFilteredSetorNames: autocompleteStates.setFilteredSetorNames,
    setHighlightedSetorIndex: autocompleteStates.setHighlightedSetorIndex,
  });

  const gestorHandlers = createGestorHandlers({
    setFormData,
    setShowGestorAutocomplete: autocompleteStates.setShowGestorAutocomplete,
    setFilteredGestorNames: autocompleteStates.setFilteredGestorNames,
    setHighlightedGestorIndex: autocompleteStates.setHighlightedGestorIndex,
  });

  const coordenadorHandlers = createCoordenadorHandlers({
    setFormData,
    setShowCoordenadorAutocomplete: autocompleteStates.setShowCoordenadorAutocomplete,
    setFilteredCoordenadorNames: autocompleteStates.setFilteredCoordenadorNames,
    setHighlightedCoordenadorIndex: autocompleteStates.setHighlightedCoordenadorIndex,
  });

  // Inicializar handlers gerais do formulário
  const formHandlers = createFormHandlers(setFormData, setIsAutoFilled, setImages, setIsDragOver, setNotification, setModal);

  // Inicializar handlers de exportação de relatório
  const exportHandlers = createExportHandlers(formData, [], setImages, setNotification); // TODO: selectedBodyParts

  // Retornar todos os handlers organizados por categoria
  return {
    isAutoFilled,
    responsavelSSMAHandlers,
    localHandlers,
    setorHandlers,
    gestorHandlers,
    coordenadorHandlers,
    formHandlers,
    exportHandlers,
  };
};