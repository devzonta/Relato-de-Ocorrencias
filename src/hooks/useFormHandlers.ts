import React, { useState, useEffect } from 'react';
import { FormState } from '../types';
import { migrateData } from '../services/database';
import { createResponsavelSSMAHandlers, createLocalHandlers, createSetorHandlers, createGestorHandlers, createCoordenadorHandlers } from '../utils/autocompleteHandlers';
import { createFormHandlers } from '../utils/formHandlers';
import { createExportHandlers } from '../utils/exportHandlers';

export const useFormHandlers = (
  formData: FormState,
  setFormData: React.Dispatch<React.SetStateAction<FormState>>,
  setImages: React.Dispatch<React.SetStateAction<File[]>>,
  setIsDragOver: React.Dispatch<React.SetStateAction<boolean>>,
  setNotification: React.Dispatch<React.SetStateAction<{ message: string; type: 'success' | 'error' | 'info' } | null>>,
  autocompleteStates: any // TODO: type properly
) => {
  const [isAutoFilled, setIsAutoFilled] = useState(false);

  // Migrar dados na inicialização
  useEffect(() => {
    migrateData();
  }, []);

  // Criar handlers de autocomplete
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

  // Criar handlers de form
  const formHandlers = createFormHandlers(setFormData, setIsAutoFilled, setImages, setIsDragOver, setNotification);

  // Criar handlers de export
  const exportHandlers = createExportHandlers(formData, [], setImages, setNotification); // TODO: selectedBodyParts

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