import React from 'react';

export interface FormState {
  responsavelSSMA: string;
  data: string;
  hora: string;
  local: string;
  setor: string;
  gestor: string;
  coordenador: string;
  classificacao: string[];
  sif: boolean;
  psif: boolean;
  matricula: string;
  nome: string;
  escala: string;
  turno: string;
  funcao: string;
  descricao: string;
  acoesImediatas: string[];
  acoesNecessarias: { acao: string; responsavel: string; prazo: string }[];
}

export interface FormFieldProps {
  label: string;
  value: string | number;
  name: string;
  fullWidth?: boolean;
  readOnly?: boolean;
  type?: string;
  placeholder?: string;
  flex?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export interface AutocompleteSetters {
  setFormData: React.Dispatch<React.SetStateAction<FormState>>;
  setShowAutocomplete: React.Dispatch<React.SetStateAction<boolean>>;
  setFilteredNames: React.Dispatch<React.SetStateAction<string[]>>;
  setHighlightedIndex: React.Dispatch<React.SetStateAction<number>>;
}

export interface LocalAutocompleteSetters {
  setFormData: React.Dispatch<React.SetStateAction<FormState>>;
  setShowLocalAutocomplete: React.Dispatch<React.SetStateAction<boolean>>;
  setFilteredLocalNames: React.Dispatch<React.SetStateAction<string[]>>;
  setHighlightedLocalIndex: React.Dispatch<React.SetStateAction<number>>;
}

export interface SetorAutocompleteSetters {
  setFormData: React.Dispatch<React.SetStateAction<FormState>>;
  setShowSetorAutocomplete: React.Dispatch<React.SetStateAction<boolean>>;
  setFilteredSetorNames: React.Dispatch<React.SetStateAction<string[]>>;
  setHighlightedSetorIndex: React.Dispatch<React.SetStateAction<number>>;
}

export interface GestorAutocompleteSetters {
  setFormData: React.Dispatch<React.SetStateAction<FormState>>;
  setShowGestorAutocomplete: React.Dispatch<React.SetStateAction<boolean>>;
  setFilteredGestorNames: React.Dispatch<React.SetStateAction<string[]>>;
  setHighlightedGestorIndex: React.Dispatch<React.SetStateAction<number>>;
}

export interface CoordenadorAutocompleteSetters {
  setFormData: React.Dispatch<React.SetStateAction<FormState>>;
  setShowCoordenadorAutocomplete: React.Dispatch<React.SetStateAction<boolean>>;
  setFilteredCoordenadorNames: React.Dispatch<React.SetStateAction<string[]>>;
  setHighlightedCoordenadorIndex: React.Dispatch<React.SetStateAction<number>>;
}