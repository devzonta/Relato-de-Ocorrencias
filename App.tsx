import React, { useState, useEffect } from "react";
import BodyDiagram from "./components/BodyDiagram";
import FrasleLogo from "./components/FrasleLogo";
import { Modal } from "./components/ui/Modal";
import { importFromExcel } from "./database";
import { FormState } from "./types";
import { FormRow, FormField } from "./components/FormComponents";
import {
  createResponsavelSSMAHandlers,
  createLocalHandlers,
  createSetorHandlers,
  createGestorHandlers,
  createCoordenadorHandlers,
} from "./utils/autocompleteHandlers";
import { createFormHandlers } from "./utils/formHandlers";
import { refreshConstants } from "./utils/constants";

const App: React.FC = () => {
  useEffect(() => {
    refreshConstants();
  }, []);
  const [formData, setFormData] = useState<FormState>({
    responsavelSSMA: "",
    data: "",
    hora: "",
    local: "",
    setor: "",
    gestor: "",
    coordenador: "",
    tipoOcorrencia: "",
    classificacao: [],
    sif: false,
    psif: false,
    matricula: "",
    nome: "",
    turno: "",
    funcao: "",
    descricao: "",
    acoesImediatas: [""],
    acoesNecessarias: [{ acao: "", responsavel: "", prazo: "" }],
  });

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

  const [showCoordenadorAutocomplete, setShowCoordenadorAutocomplete] =
    useState(false);
  const [filteredCoordenadorNames, setFilteredCoordenadorNames] = useState<
    string[]
  >([]);
  const [highlightedCoordenadorIndex, setHighlightedCoordenadorIndex] =
    useState(-1);

  // Estado para controlar se os campos estão preenchidos automaticamente
  const [isAutoFilled, setIsAutoFilled] = useState(false);
  const [images, setImages] = useState<File[]>([]);
  const [isDragOver, setIsDragOver] = useState(false);
  const [selectedBodyParts, setSelectedBodyParts] = useState<string[]>([]);
  const [notification, setNotification] = useState<{
    message: string;
    type: "success" | "error" | "info";
  } | null>(null);
  const [modal, setModal] = useState<{
    isOpen: boolean;
    title: string;
    message: string;
    type: "error" | "warning" | "info";
  }>({
    isOpen: false,
    title: "",
    message: "",
    type: "info",
  });

  // Labels dinâmicos para Gestor e Coordenador
  const [gestorLabel, setGestorLabel] = useState("Gestor");
  const [coordenadorLabel, setCoordenadorLabel] = useState("Coordenador");

  // Handler para importação de excel manual
  const handleExcelImport = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];

      if (file.name !== "LISTA_PESSOAS.xlsx") {
        setModal({
          isOpen: true,
          title: "Arquivo Inválido",
          message:
            "Por favor, selecione a planilha correta nomeada exatamente como 'LISTA_PESSOAS.xlsx'.",
          type: "error",
        });
        e.target.value = "";
        return;
      }

      try {
        if (showNotification) showNotification("Importando dados...", "info");
        const count = await importFromExcel(file);
        await refreshConstants();
        if (showNotification)
          showNotification(
            `Sucesso! ${count} cadastros lidos e formatados.`,
            "success",
          );
      } catch (err) {
        setModal({
          isOpen: true,
          title: "Erro na importação",
          message:
            "Verifique se a planilha tem a aba padrão estruturada corretamente.",
          type: "error",
        });
      }
      e.target.value = "";
    }
  };

  // Criar handlers
  const {
    handleResponsavelSSMAChange,
    handleAutocompleteSelect,
    handleKeyDown,
    handleBlur,
  } = createResponsavelSSMAHandlers({
    setFormData,
    setShowAutocomplete,
    setFilteredNames,
    setHighlightedIndex,
  });

  const {
    handleLocalChange,
    handleLocalSelect,
    handleLocalKeyDown,
    handleLocalBlur,
  } = createLocalHandlers({
    setFormData,
    setShowLocalAutocomplete,
    setFilteredLocalNames,
    setHighlightedLocalIndex,
  });

  const {
    handleSetorChange,
    handleSetorSelect,
    handleSetorKeyDown,
    handleSetorBlur,
  } = createSetorHandlers({
    setFormData,
    setShowSetorAutocomplete,
    setFilteredSetorNames,
    setHighlightedSetorIndex,
  });

  const {
    handleGestorChange,
    handleGestorSelect,
    handleGestorKeyDown,
    handleGestorBlur,
  } = createGestorHandlers({
    setFormData,
    setShowGestorAutocomplete,
    setFilteredGestorNames,
    setHighlightedGestorIndex,
  });

  const {
    handleCoordenadorChange,
    handleCoordenadorSelect,
    handleCoordenadorKeyDown,
    handleCoordenadorBlur,
  } = createCoordenadorHandlers({
    setFormData,
    setShowCoordenadorAutocomplete,
    setFilteredCoordenadorNames,
    setHighlightedCoordenadorIndex,
  });

  const {
    handleInputChange,
    handleCheckboxChange,
    handleAcoesNecessariasKeyPress,
    handleAcoesImediatasKeyPress,
    handleMatriculaKeyPress,
    handleMatriculaBlur,
    handleMatriculaChange,
    handleDragOver,
    handleDragLeave,
    handleDrop,
    handleFileChange,
    removeAcaoImediata,
    removeAcaoNecessaria,
    removeImage,
    showNotification,
    handleCopy,
  } = createFormHandlers(
    setFormData,
    setIsAutoFilled,
    setImages,
    setIsDragOver,
    setNotification,
    setModal,
    setGestorLabel,
    setCoordenadorLabel,
  );

  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative">
      {/* Notification */}
      {notification && (
        <div
          className={`fixed bottom-4 right-4 z-50 px-4 py-2 rounded-lg shadow-lg text-white max-w-xs ${
            notification.type === "success"
              ? "bg-green-500"
              : notification.type === "error"
                ? "bg-red-500"
                : "bg-blue-500"
          }`}
        >
          {notification.message}
        </div>
      )}

      {/* Modal */}
      <Modal
        isOpen={modal.isOpen}
        onClose={() => setModal((prev) => ({ ...prev, isOpen: false }))}
        title={modal.title}
        message={modal.message}
        type={modal.type}
      />

      {/* Floating Buttons */}
      <div className="fixed top-4 right-4 flex flex-col gap-2 z-50">
        <label
          className="w-12 h-12 bg-green-600 hover:bg-green-700 text-white rounded-full flex items-center justify-center shadow-lg cursor-pointer"
          title="Importar Planilha (LISTA_PESSOAS.xlsx)"
        >
          <span>📁</span>
          <input
            type="file"
            accept=".xlsx, .xls"
            className="hidden"
            onChange={handleExcelImport}
          />
        </label>
        <button
          onClick={() => handleCopy(formData, selectedBodyParts, images)}
          className="w-12 h-12 bg-blue-500 hover:bg-blue-600 text-white rounded-full flex items-center justify-center shadow-lg"
          title="Gerar Imagem PNG"
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
            <circle cx="9" cy="9" r="2"></circle>
            <path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21"></path>
          </svg>
        </button>
      </div>

      <div
        id="export-area"
        style={{ width: "1070px", margin: "0 auto" }}
        className="bg-white shadow-lg border-2 border-black"
      >
        {/* Header */}
        <header
          className="relative flex items-center py-4 px-2 border-b-2 border-black text-white"
          style={{ backgroundColor: "#3F3F3F" }}
        >
          <FrasleLogo />
          <h1 className="absolute left-1/2 transform -translate-x-1/2 text-xl md:text-2xl font-bold">
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
                    onChange={handleResponsavelSSMAChange}
                    onKeyDown={handleKeyDown}
                    onBlur={handleBlur}
                    className="w-full bg-transparent focus:outline-none uppercase"
                    autoComplete="off"
                    placeholder="Digite para buscar"
                  />
                  {showAutocomplete && filteredNames.length > 0 && (
                    <ul className="absolute z-50 w-full bg-white border border-gray-300 shadow-lg mt-1 max-h-48 overflow-y-auto">
                      {filteredNames.map((name, index) => (
                        <li
                          key={name}
                          className={`px-3 py-2 cursor-pointer hover:bg-blue-100 ${
                            index === highlightedIndex ? "bg-blue-200" : ""
                          }`}
                          onClick={() => handleAutocompleteSelect(name)}
                          onMouseEnter={() => setHighlightedIndex(index)}
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

          {/* ── Seção: Tipo de Ocorrência ─────────────────────────── */}
          <div className="bg-gray-500 p-1 font-bold border-b border-gray-400 text-center text-white">
            Tipo de Ocorrência
          </div>

          <FormRow>
            <div className="flex-1 p-1 flex items-center space-x-4">
              <span className="font-bold">Área:</span>
              <label className="flex items-center gap-1.5 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={formData.tipoOcorrencia === "Meio Ambiente"}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      tipoOcorrencia: e.target.checked ? "Meio Ambiente" : "",
                      classificacao: [],
                      sif: false,
                      psif: false,
                    }))
                  }
                  className="w-4 h-4 cursor-pointer accent-blue-600 m-0"
                />
                <span>MEIO AMBIENTE</span>
              </label>
              <label className="flex items-center gap-1.5 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={formData.tipoOcorrencia === "Segurança do Trabalho"}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      tipoOcorrencia: e.target.checked
                        ? "Segurança do Trabalho"
                        : "",
                      classificacao: [],
                      sif: false,
                      psif: false,
                    }))
                  }
                  className="w-4 h-4 cursor-pointer accent-blue-600 m-0"
                />
                <span>SEGURANÇA DO TRABALHO</span>
              </label>
            </div>
          </FormRow>

          {/* ── Seção: Classificação ───────────────────────────────── */}
          {formData.tipoOcorrencia && (
            <>
              <div className="bg-gray-500 p-1 font-bold border-b border-gray-400 text-center text-white">
                Classificação
              </div>

              <FormRow>
                <div className="flex-1 p-1 flex items-center space-x-4">
                  <span className="font-bold">Categoria da Ocorrência:</span>

                  {formData.tipoOcorrencia === "Meio Ambiente" && (
                    <label className="flex items-center gap-1.5 cursor-pointer select-none">
                      <input
                        type="checkbox"
                        checked={formData.classificacao.includes(
                          "Incidente Ambiental",
                        )}
                        onChange={(e) =>
                          setFormData((prev) => ({
                            ...prev,
                            classificacao: e.target.checked
                              ? ["Incidente Ambiental"]
                              : [],
                          }))
                        }
                        className="w-4 h-4 cursor-pointer accent-blue-600 m-0"
                      />
                      <span>INCIDENTE AMBIENTAL</span>
                    </label>
                  )}

                  {formData.tipoOcorrencia === "Segurança do Trabalho" && (
                    <>
                      <label className="flex items-center gap-1.5 cursor-pointer select-none">
                        <input
                          type="checkbox"
                          checked={formData.classificacao.includes("ACPT")}
                          onChange={(e) =>
                            setFormData((prev) => ({
                              ...prev,
                              classificacao: e.target.checked ? ["ACPT"] : [],
                            }))
                          }
                          className="w-4 h-4 cursor-pointer accent-blue-600 m-0"
                        />
                        <span>ACPT</span>
                      </label>
                      <label className="flex items-center gap-1.5 cursor-pointer select-none">
                        <input
                          type="checkbox"
                          checked={formData.classificacao.includes("ASPT")}
                          onChange={(e) =>
                            setFormData((prev) => ({
                              ...prev,
                              classificacao: e.target.checked ? ["ASPT"] : [],
                            }))
                          }
                          className="w-4 h-4 cursor-pointer accent-blue-600 m-0"
                        />
                        <span>ASPT</span>
                      </label>
                      <label className="flex items-center gap-1.5 cursor-pointer select-none">
                        <input
                          type="checkbox"
                          checked={formData.classificacao.includes(
                            "Atendimento Ambulatorial",
                          )}
                          onChange={(e) =>
                            setFormData((prev) => ({
                              ...prev,
                              classificacao: e.target.checked
                                ? ["Atendimento Ambulatorial"]
                                : [],
                            }))
                          }
                          className="w-4 h-4 cursor-pointer accent-blue-600 m-0"
                        />
                        <span>ATENDIMENTO AMBULATORIAL</span>
                      </label>
                      <label className="flex items-center gap-1.5 cursor-pointer select-none">
                        <input
                          type="checkbox"
                          checked={formData.classificacao.includes("CDM")}
                          onChange={(e) =>
                            setFormData((prev) => ({
                              ...prev,
                              classificacao: e.target.checked ? ["CDM"] : [],
                            }))
                          }
                          className="w-4 h-4 cursor-pointer accent-blue-600 m-0"
                        />
                        <span>CDM (OCORRÊNCIA COM DANOS MATERIAIS)</span>
                      </label>
                      <label className="flex items-center gap-1.5 cursor-pointer select-none">
                        <input
                          type="checkbox"
                          checked={formData.classificacao.includes("QA")}
                          onChange={(e) =>
                            setFormData((prev) => ({
                              ...prev,
                              classificacao: e.target.checked ? ["QA"] : [],
                            }))
                          }
                          className="w-4 h-4 cursor-pointer accent-blue-600 m-0"
                        />
                        <span>QA (QUASE ACIDENTE)</span>
                      </label>
                    </>
                  )}
                </div>
              </FormRow>

              {formData.tipoOcorrencia === "Segurança do Trabalho" && (
                <FormRow>
                  <div className="flex-1 p-1 flex items-center space-x-4">
                    <span className="font-bold mr-2">
                      Potencial de Severidade:
                    </span>
                    <label className="flex items-center gap-1.5 cursor-pointer select-none">
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
                        className="w-4 h-4 cursor-pointer accent-blue-600 m-0"
                      />
                      <span>SIF</span>
                    </label>
                    <label className="flex items-center gap-1.5 cursor-pointer select-none">
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
                        className="w-4 h-4 cursor-pointer accent-blue-600 m-0"
                      />
                      <span>PSIF</span>
                    </label>
                  </div>
                </FormRow>
              )}
            </>
          )}

          {/* ── Seção: Identificação do Envolvido ─────────────────── */}
          <div className="bg-gray-500 p-1 font-bold border-b border-gray-400 text-center text-white">
            Identificação do Envolvido
          </div>

          <FormRow>
            <div className="w-64 p-1 border-r border-gray-400 flex items-center">
              <label className="font-bold mr-2 whitespace-nowrap">
                Matrícula:
              </label>
              <input
                type="text"
                name="matricula"
                value={formData.matricula}
                onChange={handleMatriculaChange}
                onKeyPress={handleMatriculaKeyPress}
                onBlur={handleMatriculaBlur}
                className="w-full bg-transparent focus:outline-none uppercase"
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
              <div className="flex-1 min-w-24 p-1 flex items-center">
                <span className="font-bold mr-2 whitespace-nowrap">Turno:</span>
                {[1, 2, 3, 4].map((num) => (
                  <label
                    key={num}
                    className="flex items-center gap-1.5 mr-2 cursor-pointer select-none"
                  >
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
                      className="w-4 h-4 cursor-pointer accent-blue-600 m-0"
                    />
                    <span>{num}</span>
                  </label>
                ))}
              </div>
            </div>
          </FormRow>

          <FormRow>
            <div className="w-72 border-r border-gray-400 p-1">
              <div className="flex items-center h-full relative">
                <label className="font-bold mr-2 whitespace-nowrap">
                  Local:
                </label>
                <div className="relative flex-1">
                  <input
                    type="text"
                    name="local"
                    value={formData.local}
                    onChange={handleLocalChange}
                    onKeyDown={handleLocalKeyDown}
                    onBlur={handleLocalBlur}
                    className="w-full bg-transparent focus:outline-none uppercase"
                    autoComplete="off"
                  />
                  {showLocalAutocomplete && filteredLocalNames.length > 0 && (
                    <ul className="absolute z-50 w-full bg-white border border-gray-300 shadow-lg mt-1 max-h-48 overflow-y-auto">
                      {filteredLocalNames.map((name, index) => (
                        <li
                          key={name}
                          className={`px-3 py-2 cursor-pointer hover:bg-blue-100 ${
                            index === highlightedLocalIndex ? "bg-blue-200" : ""
                          }`}
                          onClick={() => handleLocalSelect(name)}
                          onMouseEnter={() => setHighlightedLocalIndex(index)}
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
                <label className="font-bold mr-2 whitespace-nowrap">
                  Setor:
                </label>
                <div className="relative flex-1">
                  <input
                    type="text"
                    name="setor"
                    value={formData.setor}
                    onChange={handleSetorChange}
                    onKeyDown={handleSetorKeyDown}
                    onBlur={handleSetorBlur}
                    className="w-full bg-transparent focus:outline-none uppercase"
                    autoComplete="off"
                  />
                  {showSetorAutocomplete && filteredSetorNames.length > 0 && (
                    <ul className="absolute z-50 w-full bg-white border border-gray-300 shadow-lg mt-1 max-h-48 overflow-y-auto">
                      {filteredSetorNames.map((name, index) => (
                        <li
                          key={name}
                          className={`px-3 py-2 cursor-pointer hover:bg-blue-100 ${
                            index === highlightedSetorIndex ? "bg-blue-200" : ""
                          }`}
                          onClick={() => handleSetorSelect(name)}
                          onMouseEnter={() => setHighlightedSetorIndex(index)}
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
                <label className="font-bold mr-2 whitespace-nowrap">
                  {gestorLabel}:
                </label>
                <div className="relative flex-1">
                  <input
                    type="text"
                    name="gestor"
                    value={formData.gestor}
                    onChange={handleGestorChange}
                    onKeyDown={handleGestorKeyDown}
                    onBlur={handleGestorBlur}
                    className="w-full bg-transparent focus:outline-none uppercase"
                    autoComplete="off"
                  />
                  {showGestorAutocomplete && filteredGestorNames.length > 0 && (
                    <ul className="absolute z-50 w-full bg-white border border-gray-300 shadow-lg mt-1 max-h-48 overflow-y-auto">
                      {filteredGestorNames.map((name, index) => (
                        <li
                          key={name}
                          className={`px-3 py-2 cursor-pointer hover:bg-blue-100 ${
                            index === highlightedGestorIndex
                              ? "bg-blue-200"
                              : ""
                          }`}
                          onClick={() => handleGestorSelect(name)}
                          onMouseEnter={() => setHighlightedGestorIndex(index)}
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
                <label className="font-bold mr-2 whitespace-nowrap">
                  {coordenadorLabel}:
                </label>
                <div className="relative flex-1">
                  <input
                    type="text"
                    name="coordenador"
                    value={formData.coordenador}
                    onChange={handleCoordenadorChange}
                    onKeyDown={handleCoordenadorKeyDown}
                    onBlur={handleCoordenadorBlur}
                    className="w-full bg-transparent focus:outline-none uppercase"
                    autoComplete="off"
                  />
                  {showCoordenadorAutocomplete &&
                    filteredCoordenadorNames.length > 0 && (
                      <ul className="absolute z-50 w-full bg-white border border-gray-300 shadow-lg mt-1 max-h-48 overflow-y-auto">
                        {filteredCoordenadorNames.map((name, index) => (
                          <li
                            key={name}
                            className={`px-3 py-2 cursor-pointer hover:bg-blue-100 ${
                              index === highlightedCoordenadorIndex
                                ? "bg-blue-200"
                                : ""
                            }`}
                            onClick={() => handleCoordenadorSelect(name)}
                            onMouseEnter={() =>
                              setHighlightedCoordenadorIndex(index)
                            }
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
                className="flex-1 w-full p-2 resize-none focus:outline-none uppercase"
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
              className={`border-b border-gray-400 p-2 flex flex-col items-center justify-center ${isDragOver ? "border-dashed border-2 border-blue-500" : ""} ${images.length > 0 ? "h-auto" : "h-48"}`}
              onDrop={handleDrop}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
            >
              {images.length === 0 ? (
                <div className="w-full flex justify-center">
                  <div
                    className="border-2 border-dashed border-gray-400 rounded p-4 cursor-pointer text-center text-gray-600 hover:border-gray-600 text-sm"
                    onClick={() =>
                      document.getElementById("file-input")?.click()
                    }
                  >
                    Clique para adicionar imagens <br />
                    ou arraste e solte aqui
                  </div>
                </div>
              ) : (
                <div
                  className={`w-full h-full overflow-y-auto ${images.length === 1 ? "flex justify-center" : "grid grid-cols-2 gap-2"}`}
                >
                  {images.slice(0, 4).map((image, index) => (
                    <div
                      key={index}
                      className="relative group"
                      style={{ maxWidth: "100%", maxHeight: "400px" }}
                    >
                      <img
                        src={URL.createObjectURL(image)}
                        alt={`Imagem ${index + 1}`}
                        className="w-full h-full object-contain"
                        style={{ maxWidth: "100%", maxHeight: "400px" }}
                      />
                      <button
                        type="button"
                        onClick={() => removeImage(index)}
                        className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 hover:bg-red-700 opacity-0 group-hover:opacity-100 transition-opacity"
                        title="Remover imagem"
                      >
                        <svg
                          width="12"
                          height="12"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
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
                      newAcoes[index] = e.target.value;
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
                    className="w-full p-1 focus:outline-none bg-transparent whitespace-pre-wrap break-words resize-none text-sm uppercase"
                    style={{
                      height: "auto",
                      minHeight: "1.5rem",
                      whiteSpace: "pre-wrap",
                    }}
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
                      <svg
                        width="12"
                        height="12"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
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
              <div className="flex-1 min-w-88 bg-gray-500 p-1 font-bold border-r border-gray-400 text-center text-white">
                Ações Necessárias
              </div>
              <div className="w-72 bg-gray-500 p-1 font-bold border-r border-gray-400 text-center text-white">
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
                  <div className="flex-1 min-w-88 border-r border-gray-400">
                    <textarea
                      value={item.acao}
                      onChange={(e) => {
                        const newAcoes = [...formData.acoesNecessarias];
                        newAcoes[index] = {
                          ...item,
                          acao: e.target.value,
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
                      className="w-full p-1 focus:outline-none bg-transparent whitespace-pre-wrap break-words resize-none text-sm uppercase"
                      style={{
                        height: "auto",
                        minHeight: "1.5rem",
                        whiteSpace: "pre-wrap",
                      }}
                      rows={1}
                    />
                  </div>
                  <div className="w-72 border-r border-gray-400">
                    <textarea
                      value={item.responsavel}
                      onChange={(e) => {
                        const newAcoes = [...formData.acoesNecessarias];
                        newAcoes[index] = {
                          ...item,
                          responsavel: e.target.value,
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
                      className="w-full p-1 focus:outline-none bg-transparent whitespace-pre-wrap break-words resize-none text-center text-sm uppercase"
                      style={{
                        height: "auto",
                        minHeight: "1.5rem",
                        whiteSpace: "pre-wrap",
                      }}
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
                      className="w-full p-0 focus:outline-none bg-transparent h-full text-center"
                    />
                  </div>
                  {index > 0 && (
                    <button
                      type="button"
                      onClick={() => removeAcaoNecessaria(index)}
                      className="absolute top-1 -right-8 text-gray-700 hover:text-gray-900"
                      title="Remover ação"
                    >
                      <svg
                        width="12"
                        height="12"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
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
