import { useState } from 'react';

// Hook personalizado para gerenciar estados de autocomplete
export const useAutocomplete = () => {
  // Estados para autocomplete do campo Responsável SSMA
  const [showAutocomplete, setShowAutocomplete] = useState(false);
  const [filteredNames, setFilteredNames] = useState<string[]>([]);
  const [highlightedIndex, setHighlightedIndex] = useState(-1);

  // Estados para autocomplete do campo Local
  const [showLocalAutocomplete, setShowLocalAutocomplete] = useState(false);
  const [filteredLocalNames, setFilteredLocalNames] = useState<string[]>([]);
  const [highlightedLocalIndex, setHighlightedLocalIndex] = useState(-1);

  // Estados para autocomplete do campo Setor
  const [showSetorAutocomplete, setShowSetorAutocomplete] = useState(false);
  const [filteredSetorNames, setFilteredSetorNames] = useState<string[]>([]);
  const [highlightedSetorIndex, setHighlightedSetorIndex] = useState(-1);

  // Estados para autocomplete do campo Gestor
  const [showGestorAutocomplete, setShowGestorAutocomplete] = useState(false);
  const [filteredGestorNames, setFilteredGestorNames] = useState<string[]>([]);
  const [highlightedGestorIndex, setHighlightedGestorIndex] = useState(-1);

  // Estados para autocomplete do campo Coordenador
  const [showCoordenadorAutocomplete, setShowCoordenadorAutocomplete] = useState(false);
  const [filteredCoordenadorNames, setFilteredCoordenadorNames] = useState<string[]>([]);
  const [highlightedCoordenadorIndex, setHighlightedCoordenadorIndex] = useState(-1);

  // Retornar todos os estados e setters para autocomplete
  return {
    showAutocomplete,
    setShowAutocomplete,
    filteredNames,
    setFilteredNames,
    highlightedIndex,
    setHighlightedIndex,
    showLocalAutocomplete,
    setShowLocalAutocomplete,
    filteredLocalNames,
    setFilteredLocalNames,
    highlightedLocalIndex,
    setHighlightedLocalIndex,
    showSetorAutocomplete,
    setShowSetorAutocomplete,
    filteredSetorNames,
    setFilteredSetorNames,
    highlightedSetorIndex,
    setHighlightedSetorIndex,
    showGestorAutocomplete,
    setShowGestorAutocomplete,
    filteredGestorNames,
    setFilteredGestorNames,
    highlightedGestorIndex,
    setHighlightedGestorIndex,
    showCoordenadorAutocomplete,
    setShowCoordenadorAutocomplete,
    filteredCoordenadorNames,
    setFilteredCoordenadorNames,
    highlightedCoordenadorIndex,
    setHighlightedCoordenadorIndex,
  };
};