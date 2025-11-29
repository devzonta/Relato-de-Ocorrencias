import React, { useState } from "react";
import BodyDiagram from "./components/BodyDiagram";
import FrasleLogo from "./components/FrasleLogo";
import { Modal } from './components/ui/Modal';
import { FormRow, FormField } from './components/FormComponents';
import { useFormState } from './hooks/useFormState';
import { useAutocomplete } from './hooks/useAutocomplete';
import { useFormHandlers } from './hooks/useFormHandlers';

const App: React.FC = () => {
  const {
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
  } = useFormState();

  const [modal, setModal] = useState<{
    isOpen: boolean;
    title: string;
    message: string;
    type: 'error' | 'warning' | 'info';
  }>({
    isOpen: false,
    title: '',
    message: '',
    type: 'info',
  });

  const autocompleteStates = useAutocomplete();

  const {
    responsavelSSMAHandlers,
    localHandlers,
    setorHandlers,
    gestorHandlers,
    coordenadorHandlers,
    formHandlers,
    exportHandlers,
  } = useFormHandlers(
    formData,
    setFormData,
    setImages,
    setIsDragOver,
    setNotification,
    setModal,
    autocompleteStates
  );

  const { handleCopy } = exportHandlers;
  const {
    handleInputChange,
    handleCheckboxChange,
    handleAcoesNecessariasKeyPress,
    handleAcoesImediatasKeyPress,
    handleMatriculaKeyPress,
    handleMatriculaChange,
    handleDragOver,
    handleDragLeave,
    handleDrop,
    handleFileChange,
    removeAcaoImediata,
    removeAcaoNecessaria,
    removeImage,
    showNotification,
  } = formHandlers;


  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative">
      {/* Notification */}
      {notification && (
        <div className={`fixed bottom-4 right-4 z-50 px-4 py-2 rounded-lg shadow-lg text-white max-w-xs ${
          notification.type === 'success' ? 'bg-green-500' :
          notification.type === 'error' ? 'bg-red-500' : 'bg-blue-500'
        }`}>
          {notification.message}
        </div>
      )}

      {/* Modal */}
      <Modal
        isOpen={modal.isOpen}
        onClose={() => setModal(prev => ({ ...prev, isOpen: false }))}
        title={modal.title}
        message={modal.message}
        type={modal.type}
      />

      {/* Floating Buttons */}
      <div className="fixed top-4 right-4 flex flex-col gap-2 z-50">
        <button
          onClick={handleCopy}
          className="w-12 h-12 bg-blue-500 hover:bg-blue-600 text-white rounded-full flex items-center justify-center shadow-lg"
          title="Copiar Relato"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
            <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
          </svg>
        </button>
      </div>

      <div
        id="export-area"
        style={{ width: "1000px", margin: "0 auto" }}
        className="bg-white shadow-lg border-2 border-black"
      >
        {/* Header */}
        <header className="relative flex items-center py-3 px-4 border-b-2 border-black"
                style={{ backgroundColor: '#3F3F3F' }}>
          <div className="absolute left-4">
            <FrasleLogo />
          </div>
          <h1 className="w-full text-lg md:text-xl font-bold text-white text-center">
            Relato De Ocorrência – Frasle Caxias
          </h1>
        </header>


        {/* Main Form Body */}
        <div className="text-sm">
          <FormRow>
            <div className="flex-1 border-r border-gray-400">
              <div className="flex items-center p-1 h-full relative">
                <label className="font-bold mr-2 whitespace-nowrap">
                  Responsável SSMA:
                </label>
                <div className="relative flex-1">
                  <input
                    type="text"
                    name="responsavelSSMA"
                    value={formData.responsavelSSMA}
                    onChange={responsavelSSMAHandlers.handleResponsavelSSMAChange}
                    onKeyDown={responsavelSSMAHandlers.handleKeyDown}
                    onBlur={responsavelSSMAHandlers.handleBlur}
                    className="w-full bg-transparent focus:outline-none"
                    autoComplete="off"
                    placeholder="Digite para buscar"
                  />
                  {autocompleteStates.showAutocomplete && autocompleteStates.filteredNames.length > 0 && (
                    <ul className="absolute z-50 w-full bg-white border border-gray-300 shadow-lg mt-1 max-h-48 overflow-y-auto">
                      {autocompleteStates.filteredNames.map((name, index) => (
                        <li
                          key={name}
                          className={`px-3 py-2 cursor-pointer hover:bg-blue-100 ${
                            index === autocompleteStates.highlightedIndex ? 'bg-blue-200' : ''
                          }`}
                          onClick={() => responsavelSSMAHandlers.handleAutocompleteSelect(name)}
                          onMouseEnter={() => autocompleteStates.setHighlightedIndex(index)}
                        >
                          {name}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
            </div>
            <div className="flex">
              <div className="flex items-center p-1 border-r border-gray-400">
                <label className="font-bold mr-2">Data:</label>
                <input
                  type="date"
                  name="data"
                  value={formData.data}
                  onChange={handleInputChange}
                  className="bg-transparent focus:outline-none"
                />
              </div>
              <div className="flex items-center p-1">
                <label className="font-bold mr-2">Hora:</label>
                <input
                  type="time"
                  name="hora"
                  value={formData.hora}
                  onChange={handleInputChange}
                  className="bg-transparent focus:outline-none"
                />
              </div>
            </div>
          </FormRow>


          <div className="bg-gray-500 p-1 font-bold border-b border-gray-400 text-center text-white">
            Identificação do Envolvido
          </div>

          <FormRow>
            <div className="flex-1 p-1 border-r border-gray-400 flex items-center space-x-4">
              <span className="font-bold">Classificação prévia:</span>
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={formData.classificacao.includes("ACPT")}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      classificacao: e.target.checked ? ["ACPT"] : [],
                    }))
                  }
                  className="mr-1"
                />{" "}
                ACPT
              </label>
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={formData.classificacao.includes("ASPT")}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      classificacao: e.target.checked ? ["ASPT"] : [],
                    }))
                  }
                  className="mr-1"
                />{" "}
                ASPT
              </label>
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={formData.classificacao.includes("Incidente")}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      classificacao: e.target.checked ? ["Incidente"] : [],
                    }))
                  }
                  className="mr-1"
                />{" "}
                INCIDENTE
              </label>
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={formData.classificacao.includes(
                    "Atendimento Ambulatorial"
                  )}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      classificacao: e.target.checked
                        ? ["Atendimento Ambulatorial"]
                        : [],
                    }))
                  }
                  className="mr-1"
                />{" "}
                ATENDIMENTO AMBULATORIAL
              </label>
            </div>
            <div className="p-1 flex items-center space-x-4">
              <span className="font-bold mr-2">Classificação previa potencial:</span>
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={formData.sif}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      sif: e.target.checked,
                      psif: false,
                    }))
                  }
                  className="mr-1"
                />{" "}
                SIF
              </label>
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={formData.psif}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      psif: e.target.checked,
                      sif: false,
                    }))
                  }
                  className="mr-1"
                />{" "}
                PSIF
              </label>
            </div>
          </FormRow>

          <FormRow>
            <div className="w-52 p-1 border-r border-gray-400 flex items-center">
              <label className="font-bold mr-2 whitespace-nowrap">
                Matrícula:
              </label>
              <input
                type="text"
                name="matricula"
                value={formData.matricula}
                onChange={handleMatriculaChange}
                onKeyPress={handleMatriculaKeyPress}
                className="w-full bg-transparent focus:outline-none"
                placeholder="Digite para buscar"
              />
            </div>
            <FormField
              label="Nome"
              name="nome"
              value={formData.nome}
              onChange={handleInputChange}
            />
          </FormRow>

          <FormRow>
            <FormField
              label="Função"
              name="funcao"
              value={formData.funcao}
              onChange={handleInputChange}
            />
            <div className="ml-auto flex">
              <div className="flex-1 min-w-24 p-1 flex items-center border-r border-gray-400">
                <span className="font-bold mr-2 whitespace-nowrap">Turno:</span>
                {[1, 2, 3, 4].map((num) => (
                  <label key={num} className="flex items-center mr-2">
                    <input
                      type="checkbox"
                      name="turno"
                      checked={formData.turno === num.toString()}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          turno: e.target.checked ? num.toString() : "",
                        }))
                      }
                      className="mr-1"
                    />
                    {num}
                  </label>
                ))}
              </div>
              <div className="flex-1 min-w-48 p-1 flex items-center border-r border-gray-400">
                <span className="font-bold mr-2 whitespace-nowrap">Escala:</span>
                <label className="flex items-center mr-2">
                  <input
                    type="checkbox"
                    name="Escala"
                    checked={formData.escala === "Sim"}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        escala: e.target.checked ? "Sim" : "",
                      }))
                    }
                    className="mr-1"
                  />{" "}
                  Sim
                </label>
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    name="Escala"
                    checked={formData.escala === "Não"}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        escala: e.target.checked ? "Não" : "",
                      }))
                    }
                    className="mr-1"
                  />{" "}
                  Não
                </label>
              </div>
            </div>
          </FormRow>

          <FormRow>
            <div className="w-72 border-r border-gray-400 p-1">
              <div className="flex items-center h-full relative">
                <label className="font-bold mr-2 whitespace-nowrap">Local:</label>
                <div className="relative flex-1">
                  <input
                    type="text"
                    name="local"
                    value={formData.local}
                    onChange={localHandlers.handleLocalChange}
                    onKeyDown={localHandlers.handleLocalKeyDown}
                    onBlur={localHandlers.handleLocalBlur}
                    className="w-full bg-transparent focus:outline-none"
                    autoComplete="off"
                  />
                  {autocompleteStates.showLocalAutocomplete && autocompleteStates.filteredLocalNames.length > 0 && (
                    <ul className="absolute z-50 w-full bg-white border border-gray-300 shadow-lg mt-1 max-h-48 overflow-y-auto">
                      {autocompleteStates.filteredLocalNames.map((name, index) => (
                        <li
                          key={name}
                          className={`px-3 py-2 cursor-pointer hover:bg-blue-100 ${
                            index === autocompleteStates.highlightedLocalIndex ? 'bg-blue-200' : ''
                          }`}
                          onClick={() => localHandlers.handleLocalSelect(name)}
                          onMouseEnter={() => autocompleteStates.setHighlightedLocalIndex(index)}
                        >
                          {name}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
            </div>
            <div className="flex-1 p-1">
              <div className="flex items-center h-full relative">
                <label className="font-bold mr-2 whitespace-nowrap">Setor:</label>
                <div className="relative flex-1">
                  <input
                    type="text"
                    name="setor"
                    value={formData.setor}
                    onChange={setorHandlers.handleSetorChange}
                    onKeyDown={setorHandlers.handleSetorKeyDown}
                    onBlur={setorHandlers.handleSetorBlur}
                    className="w-full bg-transparent focus:outline-none"
                    autoComplete="off"
                  />
                  {autocompleteStates.showSetorAutocomplete && autocompleteStates.filteredSetorNames.length > 0 && (
                    <ul className="absolute z-50 w-full bg-white border border-gray-300 shadow-lg mt-1 max-h-48 overflow-y-auto">
                      {autocompleteStates.filteredSetorNames.map((name, index) => (
                        <li
                          key={name}
                          className={`px-3 py-2 cursor-pointer hover:bg-blue-100 ${
                            index === autocompleteStates.highlightedSetorIndex ? 'bg-blue-200' : ''
                          }`}
                          onClick={() => setorHandlers.handleSetorSelect(name)}
                          onMouseEnter={() => autocompleteStates.setHighlightedSetorIndex(index)}
                        >
                          {name}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
            </div>
          </FormRow>

          <FormRow>
            <div className="flex-1 border-r border-gray-400 p-1">
              <div className="flex items-center h-full relative">
                <label className="font-bold mr-2 whitespace-nowrap">Gestor:</label>
                <div className="relative flex-1">
                  <input
                    type="text"
                    name="gestor"
                    value={formData.gestor}
                    onChange={gestorHandlers.handleGestorChange}
                    onKeyDown={gestorHandlers.handleGestorKeyDown}
                    onBlur={gestorHandlers.handleGestorBlur}
                    className="w-full bg-transparent focus:outline-none"
                    autoComplete="off"
                  />
                  {autocompleteStates.showGestorAutocomplete && autocompleteStates.filteredGestorNames.length > 0 && (
                    <ul className="absolute z-50 w-full bg-white border border-gray-300 shadow-lg mt-1 max-h-48 overflow-y-auto">
                      {autocompleteStates.filteredGestorNames.map((name, index) => (
                        <li
                          key={name}
                          className={`px-3 py-2 cursor-pointer hover:bg-blue-100 ${
                            index === autocompleteStates.highlightedGestorIndex ? 'bg-blue-200' : ''
                          }`}
                          onClick={() => gestorHandlers.handleGestorSelect(name)}
                          onMouseEnter={() => autocompleteStates.setHighlightedGestorIndex(index)}
                        >
                          {name}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
            </div>
            <div className="flex-1 p-1">
              <div className="flex items-center h-full relative">
                <label className="font-bold mr-2 whitespace-nowrap">Coordenador:</label>
                <div className="relative flex-1">
                  <input
                    type="text"
                    name="coordenador"
                    value={formData.coordenador}
                    onChange={coordenadorHandlers.handleCoordenadorChange}
                    onKeyDown={coordenadorHandlers.handleCoordenadorKeyDown}
                    onBlur={coordenadorHandlers.handleCoordenadorBlur}
                    className="w-full bg-transparent focus:outline-none"
                    autoComplete="off"
                  />
                  {autocompleteStates.showCoordenadorAutocomplete && autocompleteStates.filteredCoordenadorNames.length > 0 && (
                    <ul className="absolute z-50 w-full bg-white border border-gray-300 shadow-lg mt-1 max-h-48 overflow-y-auto">
                      {autocompleteStates.filteredCoordenadorNames.map((name, index) => (
                        <li
                          key={name}
                          className={`px-3 py-2 cursor-pointer hover:bg-blue-100 ${
                            index === autocompleteStates.highlightedCoordenadorIndex ? 'bg-blue-200' : ''
                          }`}
                          onClick={() => coordenadorHandlers.handleCoordenadorSelect(name)}
                          onMouseEnter={() => autocompleteStates.setHighlightedCoordenadorIndex(index)}
                        >
                          {name}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
            </div>
          </FormRow>

          <div className="flex border-b border-gray-400">
            <div className="w-2/3 border-r border-gray-400 flex flex-col">
              <div className="bg-gray-500 p-1 font-bold border-b border-gray-400 text-center text-white">
                Descrição do evento
              </div>
              <textarea
                name="descricao"
                value={formData.descricao}
                onChange={handleInputChange}
                maxLength={1000}
                className="flex-1 w-full p-2 resize-none focus:outline-none"
              />
            </div>
            <div className="w-1/3">
              <div className="bg-gray-500 p-1 font-bold border-b border-gray-400 text-center text-white">
                Parte do corpo afetada
              </div>
              <div className="p-2 flex justify-center items-center">
                <BodyDiagram onSelectionChange={setSelectedBodyParts} />
              </div>
            </div>
          </div>

          <div>
            <div className="bg-gray-500 p-1 font-bold border-b border-gray-400 text-center text-white">
              Fotos
            </div>
            <div
              className={`border-b border-gray-400 p-2 flex flex-col items-center justify-center ${isDragOver ? 'border-dashed border-2 border-blue-500' : ''} ${images.length > 0 ? 'h-auto' : 'h-48'}`}
              onDrop={handleDrop}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
            >
              {images.length === 0 ? (
                <div className="w-full flex justify-center">
                  <div
                    className="border-2 border-dashed border-gray-400 rounded p-4 cursor-pointer text-center text-gray-600 hover:border-gray-600 text-sm"
                    onClick={() => document.getElementById('file-input')?.click()}
                  >
                    Clique para adicionar imagens <br />
                    ou arraste e solte aqui
                  </div>
                </div>
              ) : (
                <div className={`w-full h-full overflow-y-auto ${images.length === 1 ? 'flex justify-center' : 'grid grid-cols-2 gap-2'}`}>
                  {images.slice(0, 4).map((image, index) => (
                    <div key={index} className="relative group" style={{ maxWidth: '100%', maxHeight: '400px' }}>
                      <img
                        src={URL.createObjectURL(image)}
                        alt={`Imagem ${index + 1}`}
                        className="w-full h-full object-contain"
                        style={{ maxWidth: '100%', maxHeight: '400px' }}
                      />
                      <button
                        type="button"
                        onClick={() => removeImage(index)}
                        className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 hover:bg-red-700 opacity-0 group-hover:opacity-100 transition-opacity"
                        title="Remover imagem"
                      >
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M3 6h18"></path>
                          <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"></path>
                          <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"></path>
                        </svg>
                      </button>
                    </div>
                  ))}
                </div>
              )}
              <input
                id="file-input"
                type="file"
                multiple
                accept="image/*"
                className="hidden"
                onChange={handleFileChange}
              />
            </div>
          </div>

          <div>
            <div className="bg-gray-500 p-1 font-bold border-b border-gray-400 text-center text-white">
              Ações Imediatas de Contenção
            </div>
            {formData.acoesImediatas.map((acao, index) => {
              // Mostra apenas o campo preenchido e o próximo campo vazio
              const isLastField = index === formData.acoesImediatas.length - 1;
              const shouldShow = acao.trim() !== "" || isLastField;

              return shouldShow ? (
                <div key={index} className="border-b border-gray-400 relative">
                  <textarea
                    value={acao}
                    onChange={(e) => {
                      const newAcoes = [...formData.acoesImediatas];
                      newAcoes[index] = e.target.value.toUpperCase();
                      setFormData((prev) => ({
                        ...prev,
                        acoesImediatas: newAcoes,
                      }));
                      // Auto-resize textarea
                      setTimeout(() => {
                        e.target.style.height = "auto";
                        e.target.style.height = e.target.scrollHeight + "px";
                      }, 0);
                    }}
                    onKeyPress={(e) => handleAcoesImediatasKeyPress(index, e)}
                    className="w-full p-1 focus:outline-none bg-transparent whitespace-pre-wrap break-words resize-none overflow-hidden text-sm"
                    style={{ height: "auto", minHeight: "1.5rem" }}
                    rows={1}
                    placeholder={
                      isLastField && acao === ""
                        ? "Digite as informações e pressione Enter para adicionar uma nova ação"
                        : ""
                    }
                  />
                  {index > 0 && (
                    <button
                      type="button"
                      onClick={() => removeAcaoImediata(index)}
                      className="absolute top-1 -right-8 text-gray-700 hover:text-gray-900"
                      title="Remover ação"
                    >
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M3 6h18"></path>
                        <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"></path>
                        <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"></path>
                      </svg>
                    </button>
                  )}
                </div>
              ) : null;
            })}
          </div>

          <div>
            <div className="flex border-b-2 border-black">
              <div className="flex-1 min-w-80 bg-gray-500 p-1 font-bold border-r border-gray-400 text-center text-white">
                Ações Necessárias
              </div>
              <div className="w-80 bg-gray-500 p-1 font-bold border-r border-gray-400 text-center text-white">
                Responsável
              </div>
              <div className="w-24 bg-gray-500 p-1 font-bold text-center text-white">
                Prazo
              </div>
            </div>
            {formData.acoesNecessarias.map((item, index) => {
              // Mostra apenas campos preenchidos + o próximo campo vazio
              const isLastField =
                index === formData.acoesNecessarias.length - 1;
              const shouldShow = item.acao.trim() !== "" || isLastField;

              return shouldShow ? (
                <div
                  key={index}
                  className="flex border-b border-gray-400 last:border-b-0 relative"
                >
                  <div className="flex-1 min-w-80 border-r border-gray-400">
                    <textarea
                      value={item.acao}
                      onChange={(e) => {
                        const newAcoes = [...formData.acoesNecessarias];
                        newAcoes[index] = {
                          ...item,
                          acao: e.target.value.toUpperCase(),
                        };
                        setFormData((prev) => ({
                          ...prev,
                          acoesNecessarias: newAcoes,
                        }));
                        // Auto-resize textarea
                        setTimeout(() => {
                          e.target.style.height = "auto";
                          e.target.style.height = e.target.scrollHeight + "px";
                        }, 0);
                      }}
                      onKeyPress={(e) =>
                        handleAcoesNecessariasKeyPress(index, e)
                      }
                      placeholder={
                        isLastField && item.acao === ""
                          ? "Digite as informações e pressione Enter para adicionar uma nova ação"
                          : ""
                      }
                      className="w-full p-1 focus:outline-none bg-transparent whitespace-pre-wrap break-words resize-none overflow-hidden text-sm"
                      style={{ height: "auto", minHeight: "1.5rem" }}
                      rows={1}
                    />
                  </div>
                  <div className="w-80 border-r border-gray-400">
                    <textarea
                      value={item.responsavel}
                      onChange={(e) => {
                        const newAcoes = [...formData.acoesNecessarias];
                        newAcoes[index] = {
                          ...item,
                          responsavel: e.target.value.toUpperCase(),
                        };
                        setFormData((prev) => ({
                          ...prev,
                          acoesNecessarias: newAcoes,
                        }));
                        // Auto-resize textarea
                        setTimeout(() => {
                          e.target.style.height = "auto";
                          e.target.style.height = e.target.scrollHeight + "px";
                        }, 0);
                      }}
                      className="w-full p-1 focus:outline-none bg-transparent whitespace-pre-wrap break-words resize-none overflow-hidden text-center text-sm"
                      style={{ height: "auto", minHeight: "1.5rem" }}
                      rows={1}
                    />
                  </div>
                  <div className="w-24 flex items-center justify-center">
                    <input
                      type="date"
                      value={item.prazo}
                      onChange={(e) => {
                        const newAcoes = [...formData.acoesNecessarias];
                        newAcoes[index] = { ...item, prazo: e.target.value };
                        setFormData((prev) => ({
                          ...prev,
                          acoesNecessarias: newAcoes,
                        }));
                      }}
                      className="w-full p-0 focus:outline-none bg-transparent h-full text-xs text-center"
                    />
                  </div>
                  {index > 0 && (
                    <button
                      type="button"
                      onClick={() => removeAcaoNecessaria(index)}
                      className="absolute top-1 -right-8 text-gray-700 hover:text-gray-900"
                      title="Remover ação"
                    >
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M3 6h18"></path>
                        <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"></path>
                        <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"></path>
                      </svg>
                    </button>
                  )}
                </div>
              ) : null;
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
