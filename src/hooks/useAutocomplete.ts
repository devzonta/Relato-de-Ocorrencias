import { useState } from 'react';

export const useAutocomplete = () => {
  const [showAutocomplete, setShowAutocomplete] = useState(false);
  const [filteredNames, setFilteredNames] = useState<string[]>([]);
  const [highlightedIndex, setHighlightedIndex] = useState(-1);

  const [showLocalAutocomplete, setShowLocalAutocomplete] = useState(false);
  const [filteredLocalNames, setFilteredLocalNames] = useState<string[]>([]);
  const [highlightedLocalIndex, setHighlightedLocalIndex] = useState(-1);

  const [showSetorAutocomplete, setShowSetorAutocomplete] = useState(false);
  const [filteredSetorNames, setFilteredSetorNames] = useState<string[]>([]);
  const [highlightedSetorIndex, setHighlightedSetorIndex] = useState(-1);

  const [showGestorAutocomplete, setShowGestorAutocomplete] = useState(false);
  const [filteredGestorNames, setFilteredGestorNames] = useState<string[]>([]);
  const [highlightedGestorIndex, setHighlightedGestorIndex] = useState(-1);

  const [showCoordenadorAutocomplete, setShowCoordenadorAutocomplete] = useState(false);
  const [filteredCoordenadorNames, setFilteredCoordenadorNames] = useState<string[]>([]);
  const [highlightedCoordenadorIndex, setHighlightedCoordenadorIndex] = useState(-1);

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