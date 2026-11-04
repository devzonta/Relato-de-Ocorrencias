import React from 'react';
import { FormState, AutocompleteSetters, LocalAutocompleteSetters, SetorAutocompleteSetters, GestorAutocompleteSetters, CoordenadorAutocompleteSetters } from '../types';
import { ssmaNames, localNames, setorNames, gestorNames, coordenadorNames } from './constants';

const createAutocompleteKeyDownHandler = ({
  isOpen,
  options,
  highlightedIndex,
  setIsOpen,
  setHighlightedIndex,
  onSelect,
}: {
  isOpen: boolean;
  options: string[];
  highlightedIndex: number;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setHighlightedIndex: React.Dispatch<React.SetStateAction<number>>;
  onSelect: (option: string) => void;
}) => (e: React.KeyboardEvent<HTMLInputElement>) => {
  if (!isOpen || options.length === 0) return;

  switch (e.key) {
    case "ArrowDown":
      e.preventDefault();
      setHighlightedIndex(highlightedIndex < options.length - 1 ? highlightedIndex + 1 : 0);
      break;
    case "ArrowUp":
      e.preventDefault();
      setHighlightedIndex(highlightedIndex > 0 ? highlightedIndex - 1 : options.length - 1);
      break;
    case "Enter":
      e.preventDefault();
      if (highlightedIndex >= 0 && options[highlightedIndex]) {
        onSelect(options[highlightedIndex]);
      }
      break;
    case "Escape":
      setIsOpen(false);
      setHighlightedIndex(-1);
      break;
  }
};

export const createResponsavelSSMAHandlers = (setters: AutocompleteSetters) => {
  const { setFormData, showAutocomplete, filteredNames, highlightedIndex, setShowAutocomplete, setFilteredNames, setHighlightedIndex } = setters;

  const handleResponsavelSSMAChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setFormData((prev) => ({ ...prev, responsavelSSMA: value }));

    if (value.trim() === "") {
      setFilteredNames([]);
      setShowAutocomplete(false);
    } else {
      const filtered = ssmaNames.filter(name =>
        name.toUpperCase().includes(value.toUpperCase())
      );
      setFilteredNames(filtered);
      setShowAutocomplete(filtered.length > 0);
      setHighlightedIndex(-1);
    }
  };

  const handleAutocompleteSelect = (name: string) => {
    setFormData((prev) => ({ ...prev, responsavelSSMA: name }));
    setShowAutocomplete(false);
    setFilteredNames([]);
    setHighlightedIndex(-1);
  };

  const handleKeyDown = createAutocompleteKeyDownHandler({
    isOpen: showAutocomplete,
    options: filteredNames,
    highlightedIndex,
    setIsOpen: setShowAutocomplete,
    setHighlightedIndex,
    onSelect: handleAutocompleteSelect,
  });

  const handleBlur = () => {
    setTimeout(() => {
      setShowAutocomplete(false);
      setHighlightedIndex(-1);
    }, 200);
  };

  return { handleResponsavelSSMAChange, handleAutocompleteSelect, handleKeyDown, handleBlur };
};

export const createLocalHandlers = (setters: LocalAutocompleteSetters) => {
  const { setFormData, showLocalAutocomplete, filteredLocalNames, highlightedLocalIndex, setShowLocalAutocomplete, setFilteredLocalNames, setHighlightedLocalIndex } = setters;

  const handleLocalChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setFormData((prev) => ({ ...prev, local: value }));

    if (value.trim() === "") {
      setFilteredLocalNames([]);
      setShowLocalAutocomplete(false);
    } else {
      const filtered = localNames.filter(name =>
        name.toUpperCase().includes(value.toUpperCase())
      );
      setFilteredLocalNames(filtered);
      setShowLocalAutocomplete(filtered.length > 0);
      setHighlightedLocalIndex(-1);
    }
  };

  const handleLocalSelect = (name: string) => {
    setFormData((prev) => ({ ...prev, local: name }));
    setShowLocalAutocomplete(false);
    setFilteredLocalNames([]);
    setHighlightedLocalIndex(-1);
  };

  const handleLocalKeyDown = createAutocompleteKeyDownHandler({
    isOpen: showLocalAutocomplete,
    options: filteredLocalNames,
    highlightedIndex: highlightedLocalIndex,
    setIsOpen: setShowLocalAutocomplete,
    setHighlightedIndex: setHighlightedLocalIndex,
    onSelect: handleLocalSelect,
  });

  const handleLocalBlur = () => {
    setTimeout(() => {
      setShowLocalAutocomplete(false);
      setHighlightedLocalIndex(-1);
    }, 200);
  };

  return { handleLocalChange, handleLocalSelect, handleLocalKeyDown, handleLocalBlur };
};

// Similar para setor, gestor, coordenador
export const createSetorHandlers = (setters: SetorAutocompleteSetters) => {
  const { setFormData, showSetorAutocomplete, filteredSetorNames, highlightedSetorIndex, setShowSetorAutocomplete, setFilteredSetorNames, setHighlightedSetorIndex } = setters;

  const handleSetorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setFormData((prev) => ({ ...prev, setor: value }));

    if (value.trim() === "") {
      setFilteredSetorNames([]);
      setShowSetorAutocomplete(false);
    } else {
      const filtered = setorNames.filter(name =>
        name.toUpperCase().includes(value.toUpperCase())
      );
      setFilteredSetorNames(filtered);
      setShowSetorAutocomplete(filtered.length > 0);
      setHighlightedSetorIndex(-1);
    }
  };

  const handleSetorSelect = (name: string) => {
    setFormData((prev) => ({ ...prev, setor: name }));
    setShowSetorAutocomplete(false);
    setFilteredSetorNames([]);
    setHighlightedSetorIndex(-1);
  };

  const handleSetorKeyDown = createAutocompleteKeyDownHandler({
    isOpen: showSetorAutocomplete,
    options: filteredSetorNames,
    highlightedIndex: highlightedSetorIndex,
    setIsOpen: setShowSetorAutocomplete,
    setHighlightedIndex: setHighlightedSetorIndex,
    onSelect: handleSetorSelect,
  });

  const handleSetorBlur = () => {
    setTimeout(() => {
      setShowSetorAutocomplete(false);
      setHighlightedSetorIndex(-1);
    }, 200);
  };

  return { handleSetorChange, handleSetorSelect, handleSetorKeyDown, handleSetorBlur };
};

export const createGestorHandlers = (setters: GestorAutocompleteSetters) => {
  const { setFormData, showGestorAutocomplete, filteredGestorNames, highlightedGestorIndex, setShowGestorAutocomplete, setFilteredGestorNames, setHighlightedGestorIndex } = setters;

  const handleGestorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setFormData((prev) => ({ ...prev, gestor: value }));

    if (value.trim() === "") {
      setFilteredGestorNames([]);
      setShowGestorAutocomplete(false);
    } else {
      const filtered = gestorNames.filter(name =>
        name.toUpperCase().includes(value.toUpperCase())
      );
      setFilteredGestorNames(filtered);
      setShowGestorAutocomplete(filtered.length > 0);
      setHighlightedGestorIndex(-1);
    }
  };

  const handleGestorSelect = (name: string) => {
    setFormData((prev) => ({ ...prev, gestor: name }));
    setShowGestorAutocomplete(false);
    setFilteredGestorNames([]);
    setHighlightedGestorIndex(-1);
  };

  const handleGestorKeyDown = createAutocompleteKeyDownHandler({
    isOpen: showGestorAutocomplete,
    options: filteredGestorNames,
    highlightedIndex: highlightedGestorIndex,
    setIsOpen: setShowGestorAutocomplete,
    setHighlightedIndex: setHighlightedGestorIndex,
    onSelect: handleGestorSelect,
  });

  const handleGestorBlur = () => {
    setTimeout(() => {
      setShowGestorAutocomplete(false);
      setHighlightedGestorIndex(-1);
    }, 200);
  };

  return { handleGestorChange, handleGestorSelect, handleGestorKeyDown, handleGestorBlur };
};

export const createCoordenadorHandlers = (setters: CoordenadorAutocompleteSetters) => {
  const { setFormData, showCoordenadorAutocomplete, filteredCoordenadorNames, highlightedCoordenadorIndex, setShowCoordenadorAutocomplete, setFilteredCoordenadorNames, setHighlightedCoordenadorIndex } = setters;

  const handleCoordenadorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setFormData((prev) => ({ ...prev, coordenador: value }));

    if (value.trim() === "") {
      setFilteredCoordenadorNames([]);
      setShowCoordenadorAutocomplete(false);
    } else {
      const filtered = coordenadorNames.filter(name =>
        name.toUpperCase().includes(value.toUpperCase())
      );
      setFilteredCoordenadorNames(filtered);
      setShowCoordenadorAutocomplete(filtered.length > 0);
      setHighlightedCoordenadorIndex(-1);
    }
  };

  const handleCoordenadorSelect = (name: string) => {
    setFormData((prev) => ({ ...prev, coordenador: name }));
    setShowCoordenadorAutocomplete(false);
    setFilteredCoordenadorNames([]);
    setHighlightedCoordenadorIndex(-1);
  };

  const handleCoordenadorKeyDown = createAutocompleteKeyDownHandler({
    isOpen: showCoordenadorAutocomplete,
    options: filteredCoordenadorNames,
    highlightedIndex: highlightedCoordenadorIndex,
    setIsOpen: setShowCoordenadorAutocomplete,
    setHighlightedIndex: setHighlightedCoordenadorIndex,
    onSelect: handleCoordenadorSelect,
  });

  const handleCoordenadorBlur = () => {
    setTimeout(() => {
      setShowCoordenadorAutocomplete(false);
      setHighlightedCoordenadorIndex(-1);
    }, 200);
  };

  return { handleCoordenadorChange, handleCoordenadorSelect, handleCoordenadorKeyDown, handleCoordenadorBlur };
};