import React from 'react';
import { FormState, AutocompleteSetters, LocalAutocompleteSetters, SetorAutocompleteSetters, GestorAutocompleteSetters, CoordenadorAutocompleteSetters } from '../types';
import { ssmaNames, localNames, setorNames, gestorNames, coordenadorNames } from '../config/constants.config';

export const createResponsavelSSMAHandlers = (setters: AutocompleteSetters) => {
  const { setFormData, setShowAutocomplete, setFilteredNames, setHighlightedIndex } = setters;

  const handleResponsavelSSMAChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.toUpperCase();
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

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!setters.setShowAutocomplete || setters.setFilteredNames.length === 0) return;

    switch (e.key) {
      case "ArrowDown":
        e.preventDefault();
        setHighlightedIndex((prev) =>
          prev < setters.setFilteredNames.length - 1 ? prev + 1 : 0
        );
        break;
      case "ArrowUp":
        e.preventDefault();
        setHighlightedIndex((prev) =>
          prev > 0 ? prev - 1 : setters.setFilteredNames.length - 1
        );
        break;
      case "Enter":
        e.preventDefault();
        if (setters.setHighlightedIndex >= 0) {
          handleAutocompleteSelect(setters.setFilteredNames[setters.setHighlightedIndex]);
        }
        break;
      case "Escape":
        setters.setShowAutocomplete(false);
        setHighlightedIndex(-1);
        break;
    }
  };

  const handleBlur = () => {
    setTimeout(() => {
      setShowAutocomplete(false);
      setHighlightedIndex(-1);
    }, 200);
  };

  return { handleResponsavelSSMAChange, handleAutocompleteSelect, handleKeyDown, handleBlur };
};

export const createLocalHandlers = (setters: LocalAutocompleteSetters) => {
  const { setFormData, setShowLocalAutocomplete, setFilteredLocalNames, setHighlightedLocalIndex } = setters;

  const handleLocalChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.toUpperCase();
    setFormData((prev) => ({ ...prev, local: value }));

    if (value.trim() === "") {
      setFilteredLocalNames([]);
      setShowLocalAutocomplete(false);
    } else {
      const filtered = localNames.filter(name =>
        name.includes(value)
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

  const handleLocalKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!setShowLocalAutocomplete || setters.setFilteredLocalNames.length === 0) return;

    switch (e.key) {
      case "ArrowDown":
        e.preventDefault();
        setHighlightedLocalIndex((prev) =>
          prev < setters.setFilteredLocalNames.length - 1 ? prev + 1 : 0
        );
        break;
      case "ArrowUp":
        e.preventDefault();
        setHighlightedLocalIndex((prev) =>
          prev > 0 ? prev - 1 : setters.setFilteredLocalNames.length - 1
        );
        break;
      case "Enter":
        e.preventDefault();
        if (setters.setHighlightedLocalIndex >= 0) {
          handleLocalSelect(setters.setFilteredLocalNames[setters.setHighlightedLocalIndex]);
        }
        break;
      case "Escape":
        setShowLocalAutocomplete(false);
        setHighlightedLocalIndex(-1);
        break;
    }
  };

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
  const { setFormData, setShowSetorAutocomplete, setFilteredSetorNames, setHighlightedSetorIndex } = setters;

  const handleSetorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.toUpperCase();
    setFormData((prev) => ({ ...prev, setor: value }));

    if (value.trim() === "") {
      setFilteredSetorNames([]);
      setShowSetorAutocomplete(false);
    } else {
      const filtered = setorNames.filter(name =>
        name.includes(value)
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

  const handleSetorKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!setShowSetorAutocomplete || setters.setFilteredSetorNames.length === 0) return;

    switch (e.key) {
      case "ArrowDown":
        e.preventDefault();
        setHighlightedSetorIndex((prev) =>
          prev < setters.setFilteredSetorNames.length - 1 ? prev + 1 : 0
        );
        break;
      case "ArrowUp":
        e.preventDefault();
        setHighlightedSetorIndex((prev) =>
          prev > 0 ? prev - 1 : setters.setFilteredSetorNames.length - 1
        );
        break;
      case "Enter":
        e.preventDefault();
        if (setters.setHighlightedSetorIndex >= 0) {
          handleSetorSelect(setters.setFilteredSetorNames[setters.setHighlightedSetorIndex]);
        }
        break;
      case "Escape":
        setShowSetorAutocomplete(false);
        setHighlightedSetorIndex(-1);
        break;
    }
  };

  const handleSetorBlur = () => {
    setTimeout(() => {
      setShowSetorAutocomplete(false);
      setHighlightedSetorIndex(-1);
    }, 200);
  };

  return { handleSetorChange, handleSetorSelect, handleSetorKeyDown, handleSetorBlur };
};

export const createGestorHandlers = (setters: GestorAutocompleteSetters) => {
  const { setFormData, setShowGestorAutocomplete, setFilteredGestorNames, setHighlightedGestorIndex } = setters;

  const handleGestorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.toUpperCase();
    setFormData((prev) => ({ ...prev, gestor: value }));

    if (value.trim() === "") {
      setFilteredGestorNames([]);
      setShowGestorAutocomplete(false);
    } else {
      const filtered = gestorNames.filter(name =>
        name.includes(value)
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

  const handleGestorKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!setShowGestorAutocomplete || setters.setFilteredGestorNames.length === 0) return;

    switch (e.key) {
      case "ArrowDown":
        e.preventDefault();
        setHighlightedGestorIndex((prev) =>
          prev < setters.setFilteredGestorNames.length - 1 ? prev + 1 : 0
        );
        break;
      case "ArrowUp":
        e.preventDefault();
        setHighlightedGestorIndex((prev) =>
          prev > 0 ? prev - 1 : setters.setFilteredGestorNames.length - 1
        );
        break;
      case "Enter":
        e.preventDefault();
        if (setters.setHighlightedGestorIndex >= 0) {
          handleGestorSelect(setters.setFilteredGestorNames[setters.setHighlightedGestorIndex]);
        }
        break;
      case "Escape":
        setShowGestorAutocomplete(false);
        setHighlightedGestorIndex(-1);
        break;
    }
  };

  const handleGestorBlur = () => {
    setTimeout(() => {
      setShowGestorAutocomplete(false);
      setHighlightedGestorIndex(-1);
    }, 200);
  };

  return { handleGestorChange, handleGestorSelect, handleGestorKeyDown, handleGestorBlur };
};

export const createCoordenadorHandlers = (setters: CoordenadorAutocompleteSetters) => {
  const { setFormData, setShowCoordenadorAutocomplete, setFilteredCoordenadorNames, setHighlightedCoordenadorIndex } = setters;

  const handleCoordenadorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.toUpperCase();
    setFormData((prev) => ({ ...prev, coordenador: value }));

    if (value.trim() === "") {
      setFilteredCoordenadorNames([]);
      setShowCoordenadorAutocomplete(false);
    } else {
      const filtered = coordenadorNames.filter(name =>
        name.includes(value)
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

  const handleCoordenadorKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!setShowCoordenadorAutocomplete || setters.setFilteredCoordenadorNames.length === 0) return;

    switch (e.key) {
      case "ArrowDown":
        e.preventDefault();
        setHighlightedCoordenadorIndex((prev) =>
          prev < setters.setFilteredCoordenadorNames.length - 1 ? prev + 1 : 0
        );
        break;
      case "ArrowUp":
        e.preventDefault();
        setHighlightedCoordenadorIndex((prev) =>
          prev > 0 ? prev - 1 : setters.setFilteredCoordenadorNames.length - 1
        );
        break;
      case "Enter":
        e.preventDefault();
        if (setters.setHighlightedCoordenadorIndex >= 0) {
          handleCoordenadorSelect(setters.setFilteredCoordenadorNames[setters.setHighlightedCoordenadorIndex]);
        }
        break;
      case "Escape":
        setShowCoordenadorAutocomplete(false);
        setHighlightedCoordenadorIndex(-1);
        break;
    }
  };

  const handleCoordenadorBlur = () => {
    setTimeout(() => {
      setShowCoordenadorAutocomplete(false);
      setHighlightedCoordenadorIndex(-1);
    }, 200);
  };

  return { handleCoordenadorChange, handleCoordenadorSelect, handleCoordenadorKeyDown, handleCoordenadorBlur };
};