import React, { useState, useEffect } from "react";

interface BodyDiagramProps {
  onSelectionChange?: (selected: string[]) => void;
}
interface BodyPartModalProps {
  show: boolean;
  title: string;
  options: { label: string; description: string }[];
  selectedOption: string;
  onOptionChange: (value: string) => void;
  onSelect: (option: { label: string; description: string }) => void;
  onRemove: () => void;
  onCancel: () => void;
}

const BodyPartModal: React.FC<BodyPartModalProps> = ({
  show,
  title,
  options,
  selectedOption,
  onOptionChange,
  onSelect,
  onRemove,
  onCancel,
}) => {
  if (!show) return null;

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        backgroundColor: "rgba(0,0,0,0.5)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 1000,
      }}
    >
      <div
        style={{
          backgroundColor: "white",
          padding: "20px",
          borderRadius: "8px",
          maxWidth: "400px",
          width: "90%",
        }}
      >
        <h3>{title}</h3>
        <select
          value={selectedOption}
          onChange={(e) => onOptionChange(e.target.value)}
          style={{
            width: "100%",
            padding: "10px",
            margin: "10px 0",
            border: "1px solid #ccc",
          }}
        >
          <option value="">Selecione uma opção</option>
          {options.map((option) => (
            <option key={option.label} value={option.label}>
              {option.label}
            </option>
          ))}
        </select>
        <button
          onClick={() => {
            const option = options.find((o) => o.label === selectedOption);
            if (option) onSelect(option);
          }}
          style={{
            display: "block",
            width: "100%",
            margin: "10px 0",
            padding: "10px",
            border: "1px solid #ccc",
            backgroundColor: "#d4edda",
            cursor: "pointer",
          }}
        >
          Selecionar
        </button>
        <button
          onClick={onRemove}
          style={{
            display: "block",
            width: "100%",
            margin: "10px 0",
            padding: "10px",
            border: "1px solid #ccc",
            backgroundColor: "#fdd",
            cursor: "pointer",
          }}
        >
          Remover lesão nesta parte
        </button>
        <button
          onClick={onCancel}
          style={{
            display: "block",
            width: "100%",
            margin: "5px 0",
            padding: "10px",
            border: "1px solid #ccc",
            backgroundColor: "#eee",
            cursor: "pointer",
          }}
        >
          Cancelar
        </button>
      </div>
    </div>
  );
};

const BodyDiagram: React.FC<BodyDiagramProps> = ({ onSelectionChange }) => {
  const [isFront, setIsFront] = useState(true);
  const [selectedParts, setSelectedParts] = useState<Set<string>>(new Set());
  const [selectedPartNames, setSelectedPartNames] = useState<string[]>([]);
  const [showHeadModal, setShowHeadModal] = useState(false);
  const [headPartId, setHeadPartId] = useState<string | null>(null);
  const [selectedHeadOption, setSelectedHeadOption] = useState<string>("");
  const [showAbdomenModal, setShowAbdomenModal] = useState(false);
  const [abdomenPartId, setAbdomenPartId] = useState<string | null>(null);
  const [selectedAbdomenOption, setSelectedAbdomenOption] =
    useState<string>("");
  const [showLeftHandModal, setShowLeftHandModal] = useState(false);
  const [leftHandPartId, setLeftHandPartId] = useState<string | null>(null);
  const [selectedLeftHandOption, setSelectedLeftHandOption] =
    useState<string>("");
  const [showRightHandModal, setShowRightHandModal] = useState(false);
  const [rightHandPartId, setRightHandPartId] = useState<string | null>(null);
  const [selectedRightHandOption, setSelectedRightHandOption] =
    useState<string>("");
  const [showRightFootModal, setShowRightFootModal] = useState(false);
  const [rightFootPartId, setRightFootPartId] = useState<string | null>(null);
  const [selectedRightFootOption, setSelectedRightFootOption] =
    useState<string>("");
  const [showLeftFootModal, setShowLeftFootModal] = useState(false);
  const [leftFootPartId, setLeftFootPartId] = useState<string | null>(null);
  const [selectedLeftFootOption, setSelectedLeftFootOption] =
    useState<string>("");

  const headOptions = [
    {
      label: "BOCA",
      description: "inclusive lábios, dentes, língua, garganta e paladar",
    },
    { label: "CABEÇA", description: "partes múltiplas" },
    { label: "CABEÇA (OUTRAS PARTES)", description: "" },
    { label: "CRÂNIO", description: "inclusive encéfalo" },
    { label: "FACE", description: "partes múltiplas" },
    { label: "MANDÍBULA", description: "inclusive queixo" },
    {
      label: "NARIZ",
      description: "inclusive fossas nasais, seios da face e olfato",
    },
    { label: "OLHO", description: "inclusive nervo ótico e visão" },
    {
      label: "OUVIDO",
      description: "externo, médio, interno, audição e equilíbrio",
    },
  ].sort((a, b) => a.label.localeCompare(b.label, "pt-BR"));

  const headOptionsPosterior = [
    { label: "CABEÇA (POSTERIOR)", description: "partes múltiplas" },
    { label: "CABEÇA (OUTRAS PARTES)", description: "" },
    { label: "CRÂNIO (POSTERIOR)", description: "inclusive encéfalo" },
  ];

  const [currentHeadOptions, setCurrentHeadOptions] = useState(headOptions);

  const neckOptions = [{ label: "Pescoço", description: "" }];

  const chestOptions = [
    { label: "Tórax", description: "inclusive órgãos internos" },
  ];

  const abdomenOptions = [
    { label: "Abdome", description: "inclusive órgãos internos" },
  ];



  const leftHandOptions = [
    { label: "MÃO ESQUERDA", description: "exceto punho ou dedos" },
    { label: "DEDO(MÃO)", description: "" },
  ];

  const rightHandOptions = [
    { label: "MÃO DIREITA", description: "exceto punho ou dedos" },
    { label: "DEDO(MÃO)", description: "" },
  ];

  const rightFootOptions = [
    { label: "PÉ DIREITO", description: "exceto artelhos" },
    { label: "ARTELHO (Dedo do pé)", description: "" },
  ];

  const leftFootOptions = [
    { label: "PÉ ESQUERDO", description: "exceto artelhos" },
    { label: "ARTELHO (Dedo do pé)", description: "" },
  ];

  useEffect(() => {
    if (onSelectionChange) {
      onSelectionChange(selectedPartNames);
    }
  }, [selectedPartNames, onSelectionChange]);

  const partNames: Record<string, string> = {
    frt_1: "CABEÇA",
    frt_2: "PESCOÇO",
    frt_3: "PEITO",
    frt_4: "ABDÔMEN",
    frt_5: "QUADRIS",
    frt_6: "OMBRO DIREITO",
    frt_7: "OMBRO ESQUERDO",
    frt_8: "BRAÇO DIREITO",
    frt_9: "BRAÇO ESQUERDO",
    frt_10: "COTOVELO DIREITO",
    frt_11: "COTOVELO ESQUERDO",
    frt_12: "ANTEBRAÇO DIREITO",
    frt_13: "ANTEBRAÇO ESQUERDO",
    frt_14: "PUNHO DIREITO",
    frt_15: "PUNHO ESQUERDO",
    frt_16: "MÃO DIREITA",
    frt_17: "MÃO ESQUERDA",
    frt_18: "COXA DIREITA",
    frt_19: "COXA ESQUERDA",
    frt_20: "JOELHO DIREITO",
    frt_21: "JOELHO ESQUERDO",
    frt_22: "PERNA DIREITA",
    frt_23: "PERNA ESQUERDA",
    frt_24: "TORNOZELO DIREITO",
    frt_25: "TORNOZELO ESQUERDO",
    frt_26: "PÉ DIREITO",
    frt_27: "PÉ ESQUERDO",
    frt_28: "CABEÇA",
    frt_29: "PESCOÇO",
    frt_30: "PEITO",
    frt_31: "MAMAS",
    frt_32: "ABDÔMEN",
    frt_33: "QUADRIS",
    frt_34: "OMBRO DIREITO",
    frt_35: "OMBRO ESQUERDO",
    frt_36: "BRAÇO DIREITO",
    frt_37: "BRAÇO ESQUERDO",
    frt_38: "COTOVELO DIREITO",
    frt_39: "COTOVELO ESQUERDO",
    frt_40: "ANTEBRAÇO DIREITO",
    frt_41: "ANTEBRAÇO ESQUERDO",
    frt_42: "PUNHO DIREITO",
    frt_43: "PUNHO ESQUERDO",
    frt_44: "MÃO DIREITA",
    frt_45: "MÃO ESQUERDA",
    frt_46: "COXA DIREITA",
    frt_47: "COXA ESQUERDA",
    frt_48: "JOELHO DIREITO",
    frt_49: "JOELHO ESQUERDO",
    frt_50: "PERNA DIREITA",
    frt_51: "PERNA ESQUERDA",
    frt_52: "TORNOZELO DIREITO",
    frt_53: "TORNOZELO ESQUERDO",
    frt_54: "SOLA DO PÉ DIREITO",
    frt_55: "SOLA DO PÉ ESQUERDO",
    bck_1: "CABEÇA (POSTERIOR)",
    bck_2: "PESCOÇO (POSTERIOR)",
    bck_3: "COSTAS",
    bck_4: "LOMBAR",
    bck_5: "QUADRIS (POSTERIOR)",
    bck_6: "OMBRO DIREITO (POSTERIOR)",
    bck_7: "OMBRO ESQUERDO (POSTERIOR)",
    bck_8: "BRAÇO DIREITO (POSTERIOR)",
    bck_9: "BRAÇO ESQUERDO (POSTERIOR)",
    bck_10: "COTOVELO DIREITO (POSTERIOR)",
    bck_11: "COTOVELO ESQUERDO (POSTERIOR)",
    bck_12: "ANTEBRAÇO DIREITO (POSTERIOR)",
    bck_13: "ANTEBRAÇO ESQUERDO (POSTERIOR)",
    bck_14: "PUNHO DIREITO (POSTERIOR)",
    bck_15: "PUNHO ESQUERDO (POSTERIOR)",
    bck_16: "MÃO DIREITA (POSTERIOR)",
    bck_17: "MÃO ESQUERDA (POSTERIOR)",
    bck_18: "COXA DIREITA (POSTERIOR)",
    bck_19: "COXA ESQUERDA (POSTERIOR)",
    bck_20: "JOELHO DIREITO (POSTERIOR)",
    bck_21: "JOELHO ESQUERDO (POSTERIOR)",
    bck_22: "PERNA DIREITA (POSTERIOR)",
    bck_23: "PERNA ESQUERDA (POSTERIOR)",
    bck_24: "TORNOZELO DIREITO (POSTERIOR)",
    bck_25: "TORNOZELO ESQUERDO (POSTERIOR)",
    bck_26: "SOLA DO PÉ DIREITO",
    bck_27: "SOLA DO PÉ ESQUERDO",
    bck_28: "CABEÇA (POSTERIOR)",
    bck_29: "PESCOÇO (POSTERIOR)",
    bck_30: "COSTAS",
    bck_31: "LOMBAR",
    bck_32: "QUADRIS (POSTERIOR)",
    bck_33: "OMBRO DIREITO (POSTERIOR)",
    bck_34: "OMBRO ESQUERDO (POSTERIOR)",
    bck_35: "BRAÇO DIREITO (POSTERIOR)",
    bck_36: "BRAÇO ESQUERDO (POSTERIOR)",
    bck_37: "COTOVELO DIREITO (POSTERIOR)",
    bck_38: "COTOVELO ESQUERDO (POSTERIOR)",
    bck_39: "ANTEBRAÇO DIREITO (POSTERIOR)",
    bck_40: "ANTEBRAÇO ESQUERDO (POSTERIOR)",
    bck_41: "PUNHO DIREITO (POSTERIOR)",
    bck_42: "PUNHO ESQUERDO (POSTERIOR)",
    bck_43: "MÃO DIREITA (POSTERIOR)",
    bck_44: "MÃO ESQUERDA (POSTERIOR)",
    bck_45: "COXA DIREITA (POSTERIOR)",
    bck_46: "COXA ESQUERDA (POSTERIOR)",
    bck_47: "JOELHO DIREITO (POSTERIOR)",
    bck_48: "JOELHO ESQUERDO (POSTERIOR)",
    bck_49: "PERNA DIREITA (POSTERIOR)",
    bck_50: "PERNA ESQUERDA (POSTERIOR)",
    bck_51: "TORNOZELO DIREITO (POSTERIOR)",
    bck_52: "TORNOZELO ESQUERDO (POSTERIOR)",
    bck_53: "SOLA DO PÉ DIREITO",
    bck_54: "SOLA DO PÉ ESQUERDO",
    bck_55: "PÉ DIREITO (POSTERIOR)",
    bck_56: "PÉ ESQUERDO (POSTERIOR)",
    bck_57: "CABEÇA (POSTERIOR)",
    bck_58: "PESCOÇO (POSTERIOR)",
    bck_59: "COSTAS",
    bck_60: "LOMBAR",
    bck_61: "NÁDEGAS",
    bck_62: "OMBRO DIREITO (POSTERIOR)",
    bck_63: "OMBRO ESQUERDO (POSTERIOR)",
    bck_64: "BRAÇO DIREITO (POSTERIOR)",
    bck_65: "BRAÇO ESQUERDO (POSTERIOR)",
    bck_66: "COTOVELO DIREITO (POSTERIOR)",
    bck_67: "COTOVELO ESQUERDO (POSTERIOR)",
    bck_68: "ANTEBRAÇO DIREITO (POSTERIOR)",
    bck_69: "ANTEBRAÇO ESQUERDO (POSTERIOR)",
    bck_70: "PUNHO DIREITO (POSTERIOR)",
    bck_71: "PUNHO ESQUERDO (POSTERIOR)",
    bck_72: "MÃO DIREITA (POSTERIOR)",
    bck_73: "MÃO ESQUERDA (POSTERIOR)",
    bck_74: "COXA DIREITA (POSTERIOR)",
    bck_75: "COXA ESQUERDA (POSTERIOR)",
    bck_76: "JOELHO DIREITO (POSTERIOR)",
    bck_77: "JOELHO ESQUERDO (POSTERIOR)",
    bck_78: "PERNA DIREITA (POSTERIOR)",
    bck_79: "PERNA ESQUERDA (POSTERIOR)",
    bck_80: "TORNOZELO DIREITO (POSTERIOR)",
    bck_81: "TORNOZELO ESQUERDO (POSTERIOR)",
    bck_82: "SOLA DO PÉ DIREITO",
    bck_83: "SOLA DO PÉ ESQUERDO",
    bck_84: "PÉ DIREITO (POSTERIOR)",
    bck_85: "PÉ ESQUERDO (POSTERIOR)",
  };

  const getModalType = (partName: string): string | null => {
    if (partName.includes('CABEÇA')) return 'head';
    if (partName.includes('PESCOÇO')) return null;
    if (partName.includes('PEITO') || partName.includes('TÓRAX') || partName.includes('MAMAS')) return null;
    if (partName.includes('COSTAS') || partName.includes('LOMBAR') || partName.includes('DORSO')) return 'back';
    if (partName.includes('ABDÔMEN')) return 'abdomen';
    if (partName.includes('PELVE') || partName.includes('NÁDEGAS') || partName.includes('QUADRIS')) return 'pelvis';
    if (partName.includes('MÃO DIREITA')) return 'rightHand';
    if (partName.includes('MÃO ESQUERDA')) return 'leftHand';
    if (partName.includes('PÉ DIREITO')) return 'rightFoot';
    if (partName.includes('PÉ ESQUERDO')) return 'leftFoot';
    if (partName.includes('COXA') || partName.includes('JOELHO') || partName.includes('PERNA') || partName.includes('TORNOZELO') || partName.includes('PERNA') || partName.includes('SOLA DO PÉ')) return null;
    return null;
  };

  const getDirectLabel = (partName: string): string => {
    if (partName.includes('PESCOÇO')) return 'PESCOÇO: ';
    if (partName.includes('PEITO') || partName.includes('TÓRAX') || partName.includes('MAMAS')) return 'TÓRAX: inclusive órgãos internos';
    if (partName.includes('OMBRO DIREITO')) return 'OMBRO DIREITO: ';
    if (partName.includes('OMBRO ESQUERDO')) return 'OMBRO ESQUERDO: ';
    if (partName.includes('BRAÇO DIREITO')) return 'BRAÇO DIREITO: acima do cotovelo e entre o punho e o ombro';
    if (partName.includes('BRAÇO ESQUERDO')) return 'BRAÇO ESQUERDO: acima do cotovelo e entre o punho e o ombro';
    if (partName.includes('COTOVELO DIREITO')) return 'COTOVELO DIREITO: ';
    if (partName.includes('COTOVELO ESQUERDO')) return 'COTOVELO ESQUERDO: ';
    if (partName.includes('ANTEBRAÇO DIREITO')) return 'ANTEBRAÇO DIREITO: entre o punho e o cotovelo';
    if (partName.includes('ANTEBRAÇO ESQUERDO')) return 'ANTEBRAÇO ESQUERDO: entre o punho e o cotovelo';
    if (partName.includes('COXA DIREITA')) return 'COXA DIREITA: ';
    if (partName.includes('COXA ESQUERDA')) return 'COXA ESQUERDA: ';
    if (partName.includes('JOELHO DIREITO')) return 'JOELHO DIREITO: ';
    if (partName.includes('JOELHO ESQUERDO')) return 'JOELHO ESQUERDO: ';
    if (partName.includes('PERNA DIREITA')) return 'PERNA DIREITA: entre o tornozelo e a pélvis';
    if (partName.includes('PERNA ESQUERDA')) return 'PERNA ESQUERDA: entre o tornozelo e a pélvis';
    if (partName.includes('TORNOZELO DIREITO')) return 'TORNOZELO DIREITO: ';
    if (partName.includes('TORNOZELO ESQUERDO')) return 'TORNOZELO ESQUERDO: ';
    if (partName.includes('PERNA DIREITA')) return 'PERNA DIREITA: entre o tornozelo e a pélvis';
    if (partName.includes('PERNA ESQUERDA')) return 'PERNA ESQUERDA: entre o tornozelo e a pélvis';
    if (partName.includes('COXA DIREITA (POSTERIOR)')) return 'COXA DIREITA: ';
    if (partName.includes('COXA ESQUERDA (POSTERIOR)')) return 'COXA ESQUERDA: ';
    if (partName.includes('JOELHO DIREITO (POSTERIOR)')) return 'JOELHO DIREITO: ';
    if (partName.includes('JOELHO ESQUERDO (POSTERIOR)')) return 'JOELHO ESQUERDO: ';
    if (partName.includes('PERNA DIREITA')) return 'PERNA DIREITA: entre o tornozelo e a pélvis';
    if (partName.includes('PERNA ESQUERDA')) return 'PERNA ESQUERDA: entre o tornozelo e a pélvis';
    if (partName.includes('TORNOZELO DIREITO (POSTERIOR)')) return 'TORNOZELO DIREITO: ';
    if (partName.includes('TORNOZELO ESQUERDO (POSTERIOR)')) return 'TORNOZELO ESQUERDO: ';
    if (partName.includes('SOLA DO PÉ DIREITO')) return 'SOLA DO PÉ DIREITO: ';
    if (partName.includes('SOLA DO PÉ ESQUERDO')) return 'SOLA DO PÉ ESQUERDO: ';
    if (partName.includes('PÉ DIREITO (POSTERIOR)')) return 'PÉ DIREITO (POSTERIOR): ';
    if (partName.includes('PÉ ESQUERDO (POSTERIOR)')) return 'PÉ ESQUERDO (POSTERIOR): ';
    return '';
  };

  const handlePartClick = (partId: string) => {
    if (partId === "frt_1" || partId === "bck_1" || partId === "frt_28" || partId === "bck_28" || partId === "bck_57") {
      setHeadPartId(partId);
      const partName = partNames[partId];
      const existing = selectedPartNames.find((name) =>
        name.startsWith(`${partName}: `)
      );
      if (existing) {
        const parts = existing.split(": ");
        setSelectedHeadOption(parts[1]);
      } else {
        setSelectedHeadOption("");
      }
      if (partId.startsWith('bck')) {
        setCurrentHeadOptions(headOptionsPosterior);
      } else {
        setCurrentHeadOptions(headOptions);
      }
      setShowHeadModal(true);
    } else if (
      partId === "frt_2" ||
      partId === "bck_2" ||
      partId === "frt_29" ||
      partId === "bck_29"
    ) {
      if (selectedParts.has(partId)) {
        setSelectedParts((prev) => {
          const newSet = new Set(prev);
          newSet.delete(partId);
          return newSet;
        });
        setSelectedPartNames((prev) =>
          prev.filter((name) => name !== `${partNames[partId]}: PESCOÇO: `)
        );
      } else {
        setSelectedParts((prev) => new Set(prev).add(partId));
        setSelectedPartNames((prev) => [
          ...prev,
          `${partNames[partId]}: PESCOÇO: `,
        ]);
      }
    } else if (
      partId === "frt_3" ||
      partId === "frt_30" ||
      partId === "frt_31"
    ) {
      if (selectedParts.has(partId)) {
        setSelectedParts((prev) => {
          const newSet = new Set(prev);
          newSet.delete(partId);
          return newSet;
        });
        setSelectedPartNames((prev) =>
          prev.filter(
            (name) =>
              name !== `${partNames[partId]}: TÓRAX: inclusive órgãos internos`
          )
        );
      } else {
        setSelectedParts((prev) => new Set(prev).add(partId));
        setSelectedPartNames((prev) => [
          ...prev,
          `${partNames[partId]}: TÓRAX: inclusive órgãos internos`,
        ]);
      }
    } else if (
      partId === "bck_3" ||
      partId === "bck_4" ||
      partId === "bck_30" ||
      partId === "bck_31"
    ) {
      if (selectedParts.has(partId)) {
        setSelectedParts((prev) => {
          const newSet = new Set(prev);
          newSet.delete(partId);
          return newSet;
        });
        const label = partNames[partId] === "LOMBAR" ? "LOMBAR" : "DORSO";
        setSelectedPartNames((prev) =>
          prev.filter((name) => name !== `${partNames[partId]}: ${label}: inclusive músculos dorsais, coluna e medula espinhal`)
        );
      } else {
        setSelectedParts((prev) => new Set(prev).add(partId));
        const label = partNames[partId] === "LOMBAR" ? "LOMBAR" : "DORSO";
        setSelectedPartNames((prev) => [
          ...prev,
          `${partNames[partId]}: ${label}: inclusive músculos dorsais, coluna e medula espinhal`,
        ]);
      }
    } else if (
      partId === "frt_4" ||
      partId === "frt_32"
    ) {
      setAbdomenPartId(partId);
      const partName = partNames[partId];
      const existing = selectedPartNames.find((name) =>
        name.startsWith(`${partName}: `)
      );
      if (existing) {
        const parts = existing.split(": ");
        setSelectedAbdomenOption(parts[1]);
      } else {
        setSelectedAbdomenOption("");
      }
      setShowAbdomenModal(true);
    } else if (partId === "frt_5" || partId === "bck_5" || partId === "frt_33" || partId === "bck_32") {
      if (selectedParts.has(partId)) {
        setSelectedParts((prev) => {
          const newSet = new Set(prev);
          newSet.delete(partId);
          return newSet;
        });
        setSelectedPartNames((prev) =>
          prev.filter((name) => name !== `${partNames[partId]}: inclusive pélvis, órgãos pélvicos e nádegas`)
        );
      } else {
        setSelectedParts((prev) => new Set(prev).add(partId));
        setSelectedPartNames((prev) => [
          ...prev,
          `${partNames[partId]}: inclusive pélvis, órgãos pélvicos e nádegas`,
        ]);
      }
    } else if (partId === "frt_6" || partId === "bck_6" || partId === "frt_34" || partId === "bck_34") {
      if (selectedParts.has(partId)) {
        setSelectedParts((prev) => {
          const newSet = new Set(prev);
          newSet.delete(partId);
          return newSet;
        });
        setSelectedPartNames((prev) =>
          prev.filter((name) => name !== `${partNames[partId]}: OMBRO DIREITO: `)
        );
      } else {
        setSelectedParts((prev) => new Set(prev).add(partId));
        setSelectedPartNames((prev) => [
          ...prev,
          `${partNames[partId]}: OMBRO DIREITO: `,
        ]);
      }
    } else if (partId === "frt_7" || partId === "bck_7" || partId === "frt_35" || partId === "bck_35") {
      if (selectedParts.has(partId)) {
        setSelectedParts((prev) => {
          const newSet = new Set(prev);
          newSet.delete(partId);
          return newSet;
        });
        setSelectedPartNames((prev) =>
          prev.filter((name) => name !== `${partNames[partId]}: OMBRO ESQUERDO: `)
        );
      } else {
        setSelectedParts((prev) => new Set(prev).add(partId));
        setSelectedPartNames((prev) => [
          ...prev,
          `${partNames[partId]}: OMBRO ESQUERDO: `,
        ]);
      }
    } else if (partId === "frt_8" || partId === "bck_8" || partId === "frt_36" || partId === "bck_36") {
      if (selectedParts.has(partId)) {
        setSelectedParts((prev) => {
          const newSet = new Set(prev);
          newSet.delete(partId);
          return newSet;
        });
        setSelectedPartNames((prev) =>
          prev.filter((name) => name !== `${partNames[partId]}: BRAÇO DIREITO: acima do cotovelo e entre o punho e o ombro`)
        );
      } else {
        setSelectedParts((prev) => new Set(prev).add(partId));
        setSelectedPartNames((prev) => [
          ...prev,
          `${partNames[partId]}: BRAÇO DIREITO: acima do cotovelo e entre o punho e o ombro`,
        ]);
      }
    } else if (partId === "frt_9" || partId === "bck_9" || partId === "frt_37" || partId === "bck_37") {
      if (selectedParts.has(partId)) {
        setSelectedParts((prev) => {
          const newSet = new Set(prev);
          newSet.delete(partId);
          return newSet;
        });
        setSelectedPartNames((prev) =>
          prev.filter((name) => name !== `${partNames[partId]}: BRAÇO ESQUERDO: acima do cotovelo e entre o punho e o ombro`)
        );
      } else {
        setSelectedParts((prev) => new Set(prev).add(partId));
        setSelectedPartNames((prev) => [
          ...prev,
          `${partNames[partId]}: BRAÇO ESQUERDO: acima do cotovelo e entre o punho e o ombro`,
        ]);
      }
    } else if (partId === "frt_10" || partId === "bck_10" || partId === "frt_38" || partId === "bck_38") {
      if (selectedParts.has(partId)) {
        setSelectedParts((prev) => {
          const newSet = new Set(prev);
          newSet.delete(partId);
          return newSet;
        });
        setSelectedPartNames((prev) =>
          prev.filter((name) => name !== `${partNames[partId]}: COTOVELO DIREITO: `)
        );
      } else {
        setSelectedParts((prev) => new Set(prev).add(partId));
        setSelectedPartNames((prev) => [
          ...prev,
          `${partNames[partId]}: COTOVELO DIREITO: `,
        ]);
      }
    } else if (partId === "frt_11" || partId === "bck_11" || partId === "frt_39" || partId === "bck_39") {
      if (selectedParts.has(partId)) {
        setSelectedParts((prev) => {
          const newSet = new Set(prev);
          newSet.delete(partId);
          return newSet;
        });
        setSelectedPartNames((prev) =>
          prev.filter((name) => name !== `${partNames[partId]}: COTOVELO ESQUERDO: `)
        );
      } else {
        setSelectedParts((prev) => new Set(prev).add(partId));
        setSelectedPartNames((prev) => [
          ...prev,
          `${partNames[partId]}: COTOVELO ESQUERDO: `,
        ]);
      }
    } else if (partId === "frt_12" || partId === "bck_12" || partId === "frt_40" || partId === "bck_40") {
      if (selectedParts.has(partId)) {
        setSelectedParts((prev) => {
          const newSet = new Set(prev);
          newSet.delete(partId);
          return newSet;
        });
        setSelectedPartNames((prev) =>
          prev.filter((name) => name !== `${partNames[partId]}: ANTEBRAÇO DIREITO: entre o punho e o cotovelo`)
        );
      } else {
        setSelectedParts((prev) => new Set(prev).add(partId));
        setSelectedPartNames((prev) => [
          ...prev,
          `${partNames[partId]}: ANTEBRAÇO DIREITO: entre o punho e o cotovelo`,
        ]);
      }
    } else if (partId === "frt_13" || partId === "bck_13" || partId === "frt_41" || partId === "bck_41") {
      if (selectedParts.has(partId)) {
        setSelectedParts((prev) => {
          const newSet = new Set(prev);
          newSet.delete(partId);
          return newSet;
        });
        setSelectedPartNames((prev) =>
          prev.filter((name) => name !== `${partNames[partId]}: ANTEBRAÇO ESQUERDO: entre o punho e o cotovelo`)
        );
      } else {
        setSelectedParts((prev) => new Set(prev).add(partId));
        setSelectedPartNames((prev) => [
          ...prev,
          `${partNames[partId]}: ANTEBRAÇO ESQUERDO: entre o punho e o cotovelo`,
        ]);
      }
    } else if (partId === "frt_16" || partId === "bck_16" || partId === "frt_44" || partId === "bck_43") {
      setRightHandPartId(partId);
      const partName = partNames[partId];
      const existing = selectedPartNames.find((name) =>
        name.startsWith(`${partName}: `)
      );
      if (existing) {
        const parts = existing.split(": ");
        setSelectedRightHandOption(parts[1]);
      } else {
        setSelectedRightHandOption("");
      }
      setShowRightHandModal(true);
    } else if (partId === "frt_17" || partId === "bck_17" || partId === "frt_45" || partId === "bck_44") {
      setLeftHandPartId(partId);
      const partName = partNames[partId];
      const existing = selectedPartNames.find((name) =>
        name.startsWith(`${partName}: `)
      );
      if (existing) {
        const parts = existing.split(": ");
        setSelectedLeftHandOption(parts[1]);
      } else {
        setSelectedLeftHandOption("");
      }
      setShowLeftHandModal(true);
    } else if (partId === "frt_26" || partId === "bck_26" || partId === "frt_54" || partId === "bck_55") {
      setRightFootPartId(partId);
      const partName = partNames[partId];
      const existing = selectedPartNames.find((name) =>
        name.startsWith(`${partName}: `)
      );
      if (existing) {
        const parts = existing.split(": ");
        setSelectedRightFootOption(parts[1]);
      } else {
        setSelectedRightFootOption("");
      }
      setShowRightFootModal(true);
    } else if (partId === "frt_27" || partId === "bck_27" || partId === "frt_55" || partId === "bck_56") {
      setLeftFootPartId(partId);
      const partName = partNames[partId];
      const existing = selectedPartNames.find((name) =>
        name.startsWith(`${partName}: `)
      );
      if (existing) {
        const parts = existing.split(": ");
        setSelectedLeftFootOption(parts[1]);
      } else {
        setSelectedLeftFootOption("");
      }
      setShowLeftFootModal(true);
    } else if (partId === "frt_22") {
      if (selectedParts.has(partId)) {
        setSelectedParts((prev) => {
          const newSet = new Set(prev);
          newSet.delete(partId);
          return newSet;
        });
        setSelectedPartNames((prev) =>
          prev.filter(
            (name) =>
              name !==
              `${partNames[partId]}: entre o tornozelo e a pélvis`
          )
        );
      } else {
        setSelectedParts((prev) => new Set(prev).add(partId));
        setSelectedPartNames((prev) => [
          ...prev,
          `${partNames[partId]}: entre o tornozelo e a pélvis`,
        ]);
      }
    } else if (partId === "frt_23") {
      if (selectedParts.has(partId)) {
        setSelectedParts((prev) => {
          const newSet = new Set(prev);
          newSet.delete(partId);
          return newSet;
        });
        setSelectedPartNames((prev) =>
          prev.filter(
            (name) =>
              name !==
              `${partNames[partId]}: entre o tornozelo e a pélvis`
          )
        );
      } else {
        setSelectedParts((prev) => new Set(prev).add(partId));
        setSelectedPartNames((prev) => [
          ...prev,
          `${partNames[partId]}: entre o tornozelo e a pélvis`,
        ]);
      }
    } else if (partId === "frt_50") {
      if (selectedParts.has(partId)) {
        setSelectedParts((prev) => {
          const newSet = new Set(prev);
          newSet.delete(partId);
          return newSet;
        });
        setSelectedPartNames((prev) =>
          prev.filter(
            (name) =>
              name !==
              `${partNames[partId]}: entre o tornozelo e a pélvis`
          )
        );
      } else {
        setSelectedParts((prev) => new Set(prev).add(partId));
        setSelectedPartNames((prev) => [
          ...prev,
          `${partNames[partId]}: entre o tornozelo e a pélvis`,
        ]);
      }
    } else if (partId === "frt_51") {
      if (selectedParts.has(partId)) {
        setSelectedParts((prev) => {
          const newSet = new Set(prev);
          newSet.delete(partId);
          return newSet;
        });
        setSelectedPartNames((prev) =>
          prev.filter(
            (name) =>
              name !==
              `${partNames[partId]}: entre o tornozelo e a pélvis`
          )
        );
      } else {
        setSelectedParts((prev) => new Set(prev).add(partId));
        setSelectedPartNames((prev) => [
          ...prev,
          `${partNames[partId]}: entre o tornozelo e a pélvis`,
        ]);
      }
    } else if (partId === "bck_49") {
      if (selectedParts.has(partId)) {
        setSelectedParts((prev) => {
          const newSet = new Set(prev);
          newSet.delete(partId);
          return newSet;
        });
        setSelectedPartNames((prev) =>
          prev.filter((name) => name !== `${partNames[partId]}: entre o tornozelo e a pélvis`)
        );
      } else {
        setSelectedParts((prev) => new Set(prev).add(partId));
        setSelectedPartNames((prev) => [
          ...prev,
          `${partNames[partId]}: entre o tornozelo e a pélvis`,
        ]);
      }
    } else if (partId === "bck_50") {
      if (selectedParts.has(partId)) {
        setSelectedParts((prev) => {
          const newSet = new Set(prev);
          newSet.delete(partId);
          return newSet;
        });
        setSelectedPartNames((prev) =>
          prev.filter((name) => name !== `${partNames[partId]}: entre o tornozelo e a pélvis`)
        );
      } else {
        setSelectedParts((prev) => new Set(prev).add(partId));
        setSelectedPartNames((prev) => [
          ...prev,
          `${partNames[partId]}: entre o tornozelo e a pélvis`,
        ]);
      }
    } else if ((partId as string) === "bck_58") {
      if (selectedParts.has(partId)) {
        setSelectedParts((prev) => {
          const newSet = new Set(prev);
          newSet.delete(partId);
          return newSet;
        });
        setSelectedPartNames((prev) =>
          prev.filter((name) => name !== `${partNames[partId]}: PESCOÇO: `)
        );
      } else {
        setSelectedParts((prev) => new Set(prev).add(partId));
        setSelectedPartNames((prev) => [
          ...prev,
          `${partNames[partId]}: PESCOÇO: `,
        ]);
      }
    } else if ((partId as string) === "bck_59") {
      if (selectedParts.has(partId)) {
        setSelectedParts((prev) => {
          const newSet = new Set(prev);
          newSet.delete(partId);
          return newSet;
        });
        setSelectedPartNames((prev) =>
          prev.filter(
            (name) =>
              name !==
              `${partNames[partId]}: Dorso: inclusive músculos dorsais, coluna e medula espinhal`
          )
        );
      } else {
        setSelectedParts((prev) => new Set(prev).add(partId));
        setSelectedPartNames((prev) => [
          ...prev,
          `${partNames[partId]}: Dorso: inclusive músculos dorsais, coluna e medula espinhal`,
        ]);
      }
    } else if ((partId as string) === "bck_60") {
      if (selectedParts.has(partId)) {
        setSelectedParts((prev) => {
          const newSet = new Set(prev);
          newSet.delete(partId);
          return newSet;
        });
        setSelectedPartNames((prev) =>
          prev.filter(
            (name) =>
              name !==
              `${partNames[partId]}: Dorso: inclusive músculos dorsais, coluna e medula espinhal`
          )
        );
      } else {
        setSelectedParts((prev) => new Set(prev).add(partId));
        setSelectedPartNames((prev) => [
          ...prev,
          `${partNames[partId]}: Dorso: inclusive músculos dorsais, coluna e medula espinhal`,
        ]);
      }
    } else if ((partId as string) === "bck_61") {
      if (selectedParts.has(partId)) {
        setSelectedParts((prev) => {
          const newSet = new Set(prev);
          newSet.delete(partId);
          return newSet;
        });
        setSelectedPartNames((prev) =>
          prev.filter(
            (name) =>
              name !==
              `${partNames[partId]}: Quadris: inclusive pélvis, órgãos pélvicos e nádegas`
          )
        );
      } else {
        setSelectedParts((prev) => new Set(prev).add(partId));
        setSelectedPartNames((prev) => [
          ...prev,
          `${partNames[partId]}: Quadris: inclusive pélvis, órgãos pélvicos e nádegas`,
        ]);
      }
    } else if ((partId as string) === "bck_62") {
      if (selectedParts.has(partId)) {
        setSelectedParts((prev) => {
          const newSet = new Set(prev);
          newSet.delete(partId);
          return newSet;
        });
        setSelectedPartNames((prev) =>
          prev.filter(
            (name) => name !== `${partNames[partId]}: OMBRO DIREITO: `
          )
        );
      } else {
        setSelectedParts((prev) => new Set(prev).add(partId));
        setSelectedPartNames((prev) => [
          ...prev,
          `${partNames[partId]}: OMBRO DIREITO: `,
        ]);
      }
    } else if ((partId as string) === "bck_63") {
      if (selectedParts.has(partId)) {
        setSelectedParts((prev) => {
          const newSet = new Set(prev);
          newSet.delete(partId);
          return newSet;
        });
        setSelectedPartNames((prev) =>
          prev.filter(
            (name) => name !== `${partNames[partId]}: OMBRO ESQUERDO: `
          )
        );
      } else {
        setSelectedParts((prev) => new Set(prev).add(partId));
        setSelectedPartNames((prev) => [
          ...prev,
          `${partNames[partId]}: OMBRO ESQUERDO: `,
        ]);
      }
    } else if ((partId as string) === "bck_64") {
      if (selectedParts.has(partId)) {
        setSelectedParts((prev) => {
          const newSet = new Set(prev);
          newSet.delete(partId);
          return newSet;
        });
        setSelectedPartNames((prev) =>
          prev.filter(
            (name) =>
              name !==
              `${partNames[partId]}: BRAÇO DIREITO: acima do cotovelo e entre o punho e o ombro`
          )
        );
      } else {
        setSelectedParts((prev) => new Set(prev).add(partId));
        setSelectedPartNames((prev) => [
          ...prev,
          `${partNames[partId]}: BRAÇO DIREITO: acima do cotovelo e entre o punho e o ombro`,
        ]);
      }
    } else if ((partId as string) === "bck_65") {
      if (selectedParts.has(partId)) {
        setSelectedParts((prev) => {
          const newSet = new Set(prev);
          newSet.delete(partId);
          return newSet;
        });
        setSelectedPartNames((prev) =>
          prev.filter(
            (name) =>
              name !==
              `${partNames[partId]}: BRAÇO ESQUERDO: acima do cotovelo e entre o punho e o ombro`
          )
        );
      } else {
        setSelectedParts((prev) => new Set(prev).add(partId));
        setSelectedPartNames((prev) => [
          ...prev,
          `${partNames[partId]}: BRAÇO ESQUERDO: acima do cotovelo e entre o punho e o ombro`,
        ]);
      }
    } else if ((partId as string) === "bck_66") {
      if (selectedParts.has(partId)) {
        setSelectedParts((prev) => {
          const newSet = new Set(prev);
          newSet.delete(partId);
          return newSet;
        });
        setSelectedPartNames((prev) =>
          prev.filter(
            (name) => name !== `${partNames[partId]}: COTOVELO DIREITO: `
          )
        );
      } else {
        setSelectedParts((prev) => new Set(prev).add(partId));
        setSelectedPartNames((prev) => [
          ...prev,
          `${partNames[partId]}: COTOVELO DIREITO: `,
        ]);
      }
    } else if ((partId as string) === "bck_67") {
      if (selectedParts.has(partId)) {
        setSelectedParts((prev) => {
          const newSet = new Set(prev);
          newSet.delete(partId);
          return newSet;
        });
        setSelectedPartNames((prev) =>
          prev.filter(
            (name) => name !== `${partNames[partId]}: COTOVELO ESQUERDO: `
          )
        );
      } else {
        setSelectedParts((prev) => new Set(prev).add(partId));
        setSelectedPartNames((prev) => [
          ...prev,
          `${partNames[partId]}: COTOVELO ESQUERDO: `,
        ]);
      }
    } else if ((partId as string) === "bck_68") {
      if (selectedParts.has(partId)) {
        setSelectedParts((prev) => {
          const newSet = new Set(prev);
          newSet.delete(partId);
          return newSet;
        });
        setSelectedPartNames((prev) =>
          prev.filter(
            (name) =>
              name !==
              `${partNames[partId]}: ANTEBRAÇO DIREITO: entre o punho e o cotovelo`
          )
        );
      } else {
        setSelectedParts((prev) => new Set(prev).add(partId));
        setSelectedPartNames((prev) => [
          ...prev,
          `${partNames[partId]}: ANTEBRAÇO DIREITO: entre o punho e o cotovelo`,
        ]);
      }
    } else if ((partId as string) === "bck_69") {
      if (selectedParts.has(partId)) {
        setSelectedParts((prev) => {
          const newSet = new Set(prev);
          newSet.delete(partId);
          return newSet;
        });
        setSelectedPartNames((prev) =>
          prev.filter(
            (name) =>
              name !==
              `${partNames[partId]}: ANTEBRAÇO ESQUERDO: entre o punho e o cotovelo`
          )
        );
      } else {
        setSelectedParts((prev) => new Set(prev).add(partId));
        setSelectedPartNames((prev) => [
          ...prev,
          `${partNames[partId]}: ANTEBRAÇO ESQUERDO: entre o punho e o cotovelo`,
        ]);
      }
    } else if ((partId as string) === "bck_70") {
      if (selectedParts.has(partId)) {
        setSelectedParts((prev) => {
          const newSet = new Set(prev);
          newSet.delete(partId);
          return newSet;
        });
        setSelectedPartNames((prev) =>
          prev.filter(
            (name) => name !== `${partNames[partId]}: PUNHO DIREITO: `
          )
        );
      } else {
        setSelectedParts((prev) => new Set(prev).add(partId));
        setSelectedPartNames((prev) => [
          ...prev,
          `${partNames[partId]}: PUNHO DIREITO: `,
        ]);
      }
    } else if ((partId as string) === "bck_71") {
      if (selectedParts.has(partId)) {
        setSelectedParts((prev) => {
          const newSet = new Set(prev);
          newSet.delete(partId);
          return newSet;
        });
        setSelectedPartNames((prev) =>
          prev.filter(
            (name) => name !== `${partNames[partId]}: PUNHO ESQUERDO: `
          )
        );
      } else {
        setSelectedParts((prev) => new Set(prev).add(partId));
        setSelectedPartNames((prev) => [
          ...prev,
          `${partNames[partId]}: PUNHO ESQUERDO: `,
        ]);
      }
    } else if ((partId as string) === "bck_72") {
      if (selectedParts.has(partId)) {
        setSelectedParts((prev) => {
          const newSet = new Set(prev);
          newSet.delete(partId);
          return newSet;
        });
        setSelectedPartNames((prev) =>
          prev.filter(
            (name) =>
              name !==
              `${partNames[partId]}: MÃO DIREITA: exceto punho ou dedos`
          )
        );
      } else {
        setSelectedParts((prev) => new Set(prev).add(partId));
        setSelectedPartNames((prev) => [
          ...prev,
          `${partNames[partId]}: MÃO DIREITA: exceto punho ou dedos`,
        ]);
      }
    } else if ((partId as string) === "bck_73") {
      if (selectedParts.has(partId)) {
        setSelectedParts((prev) => {
          const newSet = new Set(prev);
          newSet.delete(partId);
          return newSet;
        });
        setSelectedPartNames((prev) =>
          prev.filter(
            (name) =>
              name !==
              `${partNames[partId]}: MÃO ESQUERDA: exceto punho ou dedos`
          )
        );
      } else {
        setSelectedParts((prev) => new Set(prev).add(partId));
        setSelectedPartNames((prev) => [
          ...prev,
          `${partNames[partId]}: MÃO ESQUERDA: exceto punho ou dedos`,
        ]);
      }
    } else if ((partId as string) === "bck_74") {
      if (selectedParts.has(partId)) {
        setSelectedParts((prev) => {
          const newSet = new Set(prev);
          newSet.delete(partId);
          return newSet;
        });
        setSelectedPartNames((prev) =>
          prev.filter((name) => name !== `${partNames[partId]}: COXA DIREITA: `)
        );
      } else {
        setSelectedParts((prev) => new Set(prev).add(partId));
        setSelectedPartNames((prev) => [
          ...prev,
          `${partNames[partId]}: COXA DIREITA: `,
        ]);
      }
    } else if ((partId as string) === "bck_75") {
      if (selectedParts.has(partId)) {
        setSelectedParts((prev) => {
          const newSet = new Set(prev);
          newSet.delete(partId);
          return newSet;
        });
        setSelectedPartNames((prev) =>
          prev.filter(
            (name) => name !== `${partNames[partId]}: COXA ESQUERDA: `
          )
        );
      } else {
        setSelectedParts((prev) => new Set(prev).add(partId));
        setSelectedPartNames((prev) => [
          ...prev,
          `${partNames[partId]}: COXA ESQUERDA: `,
        ]);
      }
    } else if ((partId as string) === "bck_76") {
      if (selectedParts.has(partId)) {
        setSelectedParts((prev) => {
          const newSet = new Set(prev);
          newSet.delete(partId);
          return newSet;
        });
        setSelectedPartNames((prev) =>
          prev.filter(
            (name) => name !== `${partNames[partId]}: JOELHO DIREITO: `
          )
        );
      } else {
        setSelectedParts((prev) => new Set(prev).add(partId));
        setSelectedPartNames((prev) => [
          ...prev,
          `${partNames[partId]}: JOELHO DIREITO: `,
        ]);
      }
    } else if ((partId as string) === "bck_77") {
      if (selectedParts.has(partId)) {
        setSelectedParts((prev) => {
          const newSet = new Set(prev);
          newSet.delete(partId);
          return newSet;
        });
        setSelectedPartNames((prev) =>
          prev.filter(
            (name) => name !== `${partNames[partId]}: JOELHO ESQUERDO: `
          )
        );
      } else {
        setSelectedParts((prev) => new Set(prev).add(partId));
        setSelectedPartNames((prev) => [
          ...prev,
          `${partNames[partId]}: JOELHO ESQUERDO: `,
        ]);
      }
    } else if ((partId as string) === "bck_78") {
      if (selectedParts.has(partId)) {
        setSelectedParts((prev) => {
          const newSet = new Set(prev);
          newSet.delete(partId);
          return newSet;
        });
        setSelectedPartNames((prev) =>
          prev.filter(
            (name) => name !== `${partNames[partId]}: entre o tornozelo e a pélvis`
          )
        );
      } else {
        setSelectedParts((prev) => new Set(prev).add(partId));
        setSelectedPartNames((prev) => [
          ...prev,
          `${partNames[partId]}: entre o tornozelo e a pélvis`,
        ]);
      }
    } else if ((partId as string) === "bck_79") {
      if (selectedParts.has(partId)) {
        setSelectedParts((prev) => {
          const newSet = new Set(prev);
          newSet.delete(partId);
          return newSet;
        });
        setSelectedPartNames((prev) =>
          prev.filter(
            (name) => name !== `${partNames[partId]}: entre o tornozelo e a pélvis`
          )
        );
      } else {
        setSelectedParts((prev) => new Set(prev).add(partId));
        setSelectedPartNames((prev) => [
          ...prev,
          `${partNames[partId]}: entre o tornozelo e a pélvis`,
        ]);
      }
    } else if ((partId as string) === "bck_80") {
      if (selectedParts.has(partId)) {
        setSelectedParts((prev) => {
          const newSet = new Set(prev);
          newSet.delete(partId);
          return newSet;
        });
        setSelectedPartNames((prev) =>
          prev.filter(
            (name) => name !== `${partNames[partId]}: TORNOZELO DIREITO: `
          )
        );
      } else {
        setSelectedParts((prev) => new Set(prev).add(partId));
        setSelectedPartNames((prev) => [
          ...prev,
          `${partNames[partId]}: TORNOZELO DIREITO: `,
        ]);
      }
    } else if ((partId as string) === "bck_81") {
      if (selectedParts.has(partId)) {
        setSelectedParts((prev) => {
          const newSet = new Set(prev);
          newSet.delete(partId);
          return newSet;
        });
        setSelectedPartNames((prev) =>
          prev.filter(
            (name) => name !== `${partNames[partId]}: TORNOZELO ESQUERDO: `
          )
        );
      } else {
        setSelectedParts((prev) => new Set(prev).add(partId));
        setSelectedPartNames((prev) => [
          ...prev,
          `${partNames[partId]}: TORNOZELO ESQUERDO: `,
        ]);
      }
    } else if ((partId as string) === "bck_84") {
      if (selectedParts.has(partId)) {
        setSelectedParts((prev) => {
          const newSet = new Set(prev);
          newSet.delete(partId);
          return newSet;
        });
        setSelectedPartNames((prev) =>
          prev.filter(
            (name) =>
              name !== `${partNames[partId]}: PÉ DIREITO: exceto artelhos`
          )
        );
      } else {
        setSelectedParts((prev) => new Set(prev).add(partId));
        setSelectedPartNames((prev) => [
          ...prev,
          `${partNames[partId]}: PÉ DIREITO: exceto artelhos`,
        ]);
      }
    } else if ((partId as string) === "bck_85") {
      if (selectedParts.has(partId)) {
        setSelectedParts((prev) => {
          const newSet = new Set(prev);
          newSet.delete(partId);
          return newSet;
        });
        setSelectedPartNames((prev) =>
          prev.filter((name) => name !== `${partNames[partId]}: PÉ ESQUERDO: exceto artelhos`)
        );
      } else {
        setSelectedParts((prev) => new Set(prev).add(partId));
        setSelectedPartNames((prev) => [
          ...prev,
          partNames[partId] + ': PÉ ESQUERDO: exceto artelhos',
        ]);
      }
    } else if (partId === "bck_22") {
      if (selectedParts.has(partId)) {
        setSelectedParts((prev) => {
          const newSet = new Set(prev);
          newSet.delete(partId);
          return newSet;
        });
        setSelectedPartNames((prev) =>
          prev.filter(
            (name) => name !== `${partNames[partId]}: entre o tornozelo e a pélvis`
          )
        );
      } else {
        setSelectedParts((prev) => new Set(prev).add(partId));
        setSelectedPartNames((prev) => [
          ...prev,
          `${partNames[partId]}: entre o tornozelo e a pélvis`,
        ]);
      }
    } else if (partId === "bck_23") {
      if (selectedParts.has(partId)) {
        setSelectedParts((prev) => {
          const newSet = new Set(prev);
          newSet.delete(partId);
          return newSet;
        });
        setSelectedPartNames((prev) =>
          prev.filter(
            (name) => name !== `${partNames[partId]}: entre o tornozelo e a pélvis`
          )
        );
      } else {
        setSelectedParts((prev) => new Set(prev).add(partId));
        setSelectedPartNames((prev) => [
          ...prev,
          `${partNames[partId]}: entre o tornozelo e a pélvis`,
        ]);
      }
    } else {
      const isSelected = selectedParts.has(partId);
      setSelectedParts((prev) => {
        const newSet = new Set(prev);
        if (isSelected) {
          newSet.delete(partId);
        } else {
          newSet.add(partId);
        }
        return newSet;
      });
      setSelectedPartNames((prevNames) => {
        if (isSelected) {
          return prevNames.filter((name) => name !== partNames[partId]);
        } else {
          return [...prevNames, partNames[partId]];
        }
      });
    }
  };

  const handleSubpartSelect = (option: {
    label: string;
    description: string;
  }) => {
    const partName = partNames[headPartId!];
    const fullName = `${partName}: ${option.label}: ${option.description}`;
    // remover qualquer anterior para essa parte
    setSelectedPartNames((prev) =>
      prev.filter((name) => !name.startsWith(`${partName}: `))
    );
    // adicionar nova
    setSelectedPartNames((prev) => [...prev, fullName]);
    // marcar como selecionada
    setSelectedParts((prev) => new Set(prev).add(headPartId!));
    setShowHeadModal(false);
    setHeadPartId(null);
  };

  const handleRemoveHead = () => {
    setSelectedParts((prev) => {
      const newSet = new Set(prev);
      newSet.delete(headPartId!);
      return newSet;
    });
    setSelectedPartNames((prev) =>
      prev.filter((name) => !name.startsWith(`${partNames[headPartId!]}: `))
    );
    setShowHeadModal(false);
    setHeadPartId(null);
  };

  const handleAbdomenSelect = (option: {
    label: string;
    description: string;
  }) => {
    const partName = partNames[abdomenPartId!];
    const fullName = `${partName}: ${option.label}: ${option.description}`;
    setSelectedPartNames((prev) =>
      prev.filter((name) => !name.startsWith(`${partName}: `))
    );
    setSelectedPartNames((prev) => [...prev, fullName]);
    setSelectedParts((prev) => new Set(prev).add(abdomenPartId!));
    setShowAbdomenModal(false);
    setAbdomenPartId(null);
  };

  const handleRemoveAbdomen = () => {
    setSelectedParts((prev) => {
      const newSet = new Set(prev);
      newSet.delete(abdomenPartId!);
      return newSet;
    });
    setSelectedPartNames((prev) =>
      prev.filter((name) => !name.startsWith(`${partNames[abdomenPartId!]}: `))
    );
    setShowAbdomenModal(false);
    setAbdomenPartId(null);
  };







  const handleLeftHandSelect = (option: {
    label: string;
    description: string;
  }) => {
    const partName = partNames[leftHandPartId!];
    const fullName = `${partName}: ${option.label}: ${option.description}`;
    setSelectedPartNames((prev) =>
      prev.filter((name) => !name.startsWith(`${partName}: `))
    );
    setSelectedPartNames((prev) => [...prev, fullName]);
    setSelectedParts((prev) => new Set(prev).add(leftHandPartId!));
    setShowLeftHandModal(false);
    setLeftHandPartId(null);
  };

  const handleRemoveLeftHand = () => {
    setSelectedParts((prev) => {
      const newSet = new Set(prev);
      newSet.delete(leftHandPartId!);
      return newSet;
    });
    setSelectedPartNames((prev) =>
      prev.filter((name) => !name.startsWith(`${partNames[leftHandPartId!]}: `))
    );
    setShowLeftHandModal(false);
    setLeftHandPartId(null);
  };

  const handleRightHandSelect = (option: {
    label: string;
    description: string;
  }) => {
    const partName = partNames[rightHandPartId!];
    const fullName = `${partName}: ${option.label}: ${option.description}`;
    setSelectedPartNames((prev) =>
      prev.filter((name) => !name.startsWith(`${partName}: `))
    );
    setSelectedPartNames((prev) => [...prev, fullName]);
    setSelectedParts((prev) => new Set(prev).add(rightHandPartId!));
    setShowRightHandModal(false);
    setRightHandPartId(null);
  };

  const handleRemoveRightHand = () => {
    setSelectedParts((prev) => {
      const newSet = new Set(prev);
      newSet.delete(rightHandPartId!);
      return newSet;
    });
    setSelectedPartNames((prev) =>
      prev.filter((name) => !name.startsWith(`${partNames[rightHandPartId!]}: `))
    );
    setShowRightHandModal(false);
    setRightHandPartId(null);
  };

  const handleRightFootSelect = (option: {
    label: string;
    description: string;
  }) => {
    const partName = partNames[rightFootPartId!];
    const fullName = `${partName}: ${option.label}: ${option.description}`;
    setSelectedPartNames((prev) =>
      prev.filter((name) => !name.startsWith(`${partName}: `))
    );
    setSelectedPartNames((prev) => [...prev, fullName]);
    setSelectedParts((prev) => new Set(prev).add(rightFootPartId!));
    setShowRightFootModal(false);
    setRightFootPartId(null);
  };

  const handleRemoveRightFoot = () => {
    setSelectedParts((prev) => {
      const newSet = new Set(prev);
      newSet.delete(rightFootPartId!);
      return newSet;
    });
    setSelectedPartNames((prev) =>
      prev.filter(
        (name) => !name.startsWith(`${partNames[rightFootPartId!]}: `)
      )
    );
    setShowRightFootModal(false);
    setRightFootPartId(null);
  };

  const handleLeftFootSelect = (option: {
    label: string;
    description: string;
  }) => {
    const partName = partNames[leftFootPartId!];
    const fullName = `${partName}: ${option.label}: ${option.description}`;
    setSelectedPartNames((prev) =>
      prev.filter((name) => !name.startsWith(`${partName}: `))
    );
    setSelectedPartNames((prev) => [...prev, fullName]);
    setSelectedParts((prev) => new Set(prev).add(leftFootPartId!));
    setShowLeftFootModal(false);
    setLeftFootPartId(null);
  };

  const handleRemoveLeftFoot = () => {
    setSelectedParts((prev) => {
      const newSet = new Set(prev);
      newSet.delete(leftFootPartId!);
      return newSet;
    });
    setSelectedPartNames((prev) =>
      prev.filter((name) => !name.startsWith(`${partNames[leftFootPartId!]}: `))
    );
    setShowLeftFootModal(false);
    setLeftFootPartId(null);
  };

  const getPartStyle = (partId: string) => {
    const isSelected = selectedParts.has(partId);
    return {
      fill: isSelected ? "#ff0000b8" : "transparent",
      stroke: "#8C8C8C",
      cursor: "pointer",
      transition: "fill 0.3s ease",
      vectorEffect: "non-scaling-stroke" as const,
    };
  };

  return (
    <>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "20px",
        }}
      >
        <div
          style={{
            textAlign: "center",
            marginBottom: "10px",
            fontWeight: "bold",
            fontSize: "14px",
          }}
        >
          {selectedPartNames.length > 1
            ? "PARTES MULTIPLAS"
            : selectedPartNames.length === 1
            ? (() => {
                const parts = selectedPartNames[0].split(": ");
                if (parts.length === 3) {
                  return `${parts[1]}: ${parts[2]}`;
                } else {
                  return selectedPartNames[0];
                }
              })()
            : "SEM LESÃO"}
          {selectedPartNames.length > 1 && (
            <div style={{ fontSize: "12px", color: "#666", marginTop: "5px" }}>
              {selectedPartNames.map((name, index) => {
                const parts = name.split(": ");
                if (parts.length === 3) {
                  return (
                    <div key={index}>
                      {parts[1]}: {parts[2]}
                    </div>
                  );
                } else {
                  return (
                    <div key={index}>
                      {name}
                    </div>
                  );
                }
              })}
            </div>
          )}
        </div>
        <div id="organswrapper" className="col-md-8 m-top-20">
          {isFront ? (
            <svg
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              width="250px"
              height="250px"
              viewBox="0 0 1390 1370"
              xmlSpace="preserve"
            >
              <path
                id="CABECA_M"
                onClick={() => handlePartClick("frt_1")}
                style={getPartStyle("frt_1")}
                d="M418.334,108.667c-1.001,4.667-6.417,27.583-5.709,32.708c0.25,3.375-2.125,13-4.75,18.625c-9.208,14.333-24.041,23-45.708,23C340.5,183,321,163.667,318,159.667c-2.167-6.334-2.666-13.667-3.333-18.834c0-10-4.627-25.305-6.667-33c0.333-3.834-0.333-11.5-0.667-16.167s0.585-19.872,2.5-28.167c3-13,22.333-44.5,53.167-44.5c19,0,53.668,19,55.334,51C420,102,419.001,101.334,418.334,108.667z M299.833,106c-4,4-1.833,17-0.833,20.667s5.833,14.666,7.167,15.833c1.333,1.167,5.167,4.833,8.5-1.667c0-10-4.627-25.305-6.667-33C307,106.001,303.833,102,299.833,106z M412.625,141.375c3.75,6.375,8.875,3.25,10-1.75s7.625-7.875,6.75-23.625s-8.041-11.666-11.041-7.333C417.333,113.334,411.917,136.25,412.625,141.375z"
              />
              <path
                id="PESCOCO_M"
                onClick={() => handlePartClick("frt_2")}
                style={getPartStyle("frt_2")}
                d="M307.667,244.167c15.667-0.833,41.167-2.166,45.333,3.667c4.167,5.833,15.834,6,19.667,0c3.833-6,38.028-6.245,50.833-4.333c4.95,0.739,9.833,0.81,14.438,0.363c10.976-1.066,20.373-5.078,25.342-10.017c-8.889,0.081-18.524-5.195-31.03-10.721C416.125,216,407.625,207.25,407,204.5s0.125-34.5,0.875-44.5c-9.208,14.333-24.041,23-45.708,23C340.5,183,321,163.667,318,159.667c2.167,6.333,1.5,29.833,0.75,45.333c-8.5,15.25-40,24-48,27.5c2.042,1.655,10.695,6.598,20.857,9.508C296.793,243.493,302.373,244.448,307.667,244.167z"
              />
              <path
                id="PEITO_M"
                onClick={() => handlePartClick("frt_3")}
                style={getPartStyle("frt_3")}
                d="M486.5,295c-2.018-20.749-37.75-48.25-48.562-51.137c-4.605,0.447-9.488,0.376-14.438-0.363c-12.805-1.911-47-1.667-50.833,4.333c-3.833,6-15.5,5.833-19.667,0c-4.167-5.833-29.667-4.5-45.333-3.667c-5.294,0.281-10.873-0.674-16.059-2.159c-8.004,3.48-46.033,26.426-52.127,58.308c-0.46,2.402-0.744,4.852-0.814,7.351c-1,35.667,0.003,72.11-0.165,85.722c0.383-0.096,9.666,25.111,12.166,30.778c2.5,5.667,5.083,17.833,8.583,24.583C267.5,456.5,306,474,332.5,467s36.5-6.244,65,0.128c28.5,6.372,52.668-2.794,73.084-27.211c1.25-3.25,4.75-11.75,5.333-15c0.583-3.25,2.667-6.999,4.084-9.749s7.455-21.675,8.005-21.176C488.678,380.65,487.667,307.001,486.5,295z"
              />
              <path
                id="ABDOMEN_M"
                onClick={() => handlePartClick("frt_4")}
                style={getPartStyle("frt_4")}
                d="M397.5,467.128C369,460.756,359,460,332.5,467s-65-10.5-73.25-18.25c3.5,6.75,2,12,3.75,17.75s5,21.334,0.5,41.501c-4.5,20.167-1.667,35.666-0.5,40.166c0.785,3.029,2.326,5.001,1.419,8.814C276,568.5,294.834,591.5,364.917,591.5s86.417-20.498,98.75-33.499c-1.666-4.5-0.501-12,2.499-21.167s-3.499-44.667-3.833-52.833c-0.334-8.166,2.501-21.5,2.751-27.584c0.25-6.084,4.25-13.25,5.5-16.5C450.168,464.334,426,473.5,397.5,467.128z"
              />
              <path
                id="PELVE_M"
                onClick={() => handlePartClick("frt_5")}
                style={getPartStyle("frt_5")}
                d="M463.667,558.001C451.334,571.002,435,591.5,364.917,591.5s-88.917-23-100.498-34.52c-0.44,1.852-1.458,4.137-3.419,7.188c-2.708,4.214-5.009,15.491-6.673,27.332c10.34,9.027,56.211,47.94,84.085,82.636c7.636,9.505,13.921,18.693,17.755,26.864c1-2.167,2.75-2.833,6.833-3.167c4.083-0.334,5.75,0.834,6.917,1.584c3.8-7.69,10.229-16.519,18.101-25.734c28.214-33.03,74.964-71.046,85.649-79.515C472.667,580.502,465.333,562.501,463.667,558.001z"
              />
              <path
                id="OMBRO_D_M"
                onClick={() => handlePartClick("frt_6")}
                style={getPartStyle("frt_6")}
                d="M239.48,300.316c6.094-31.882,44.122-54.828,52.127-58.308c-10.162-2.91-18.816-7.852-20.857-9.508c-8,3.5-15.5,2-26.75,4.25S202.5,250,190.5,274.5s-9.5,57-9.25,65.75c0.034,1.202,0.012,2.258-0.058,3.222C194.058,328.083,224.9,324.345,239.48,300.316z"
              />
              <path
                id="OMBRO_E_M"
                onClick={() => handlePartClick("frt_7")}
                style={getPartStyle("frt_7")}
                d="M486.5,295c13.5,30.001,46.022,30.211,58.595,48.44c-0.768-3.438-1.004-7.947-0.345-14.44c1.931-19.007-4.875-52.125-17.875-68.5s-53.125-26.75-63.595-26.654c-4.969,4.939-14.366,8.951-25.342,10.017C448.75,246.75,484.482,274.251,486.5,295z"
              />
              <path
                id="BRACO_D_M"
                onClick={() => handlePartClick("frt_8")}
                style={getPartStyle("frt_8")}
                d="M238.666,307.667c0.07-2.499,0.355-4.949,0.814-7.351c-14.58,24.029-45.423,27.768-58.288,43.156c-0.437,6.049-2.914,8.093-7.442,14.778C168.5,366,158.5,397.5,155,409.5c-0.507,1.738-0.896,3.229-1.221,4.551c-1.413,17.735,10.718,25.876,24.421,31.618c11.394,4.774,24.501,8.306,33.45,1.543c0.711-1.544,1.634-3.368,2.85-5.712c3.5-6.75,23.363-47.953,24.001-48.111C238.669,379.777,237.666,343.334,238.666,307.667z"
              />
              <path
                id="BRACO_E_M"
                onClick={() => handlePartClick("frt_9")}
                style={getPartStyle("frt_9")}
                d="M549.573,445.669c14.284-5.985,25.869-14.57,23.177-33.919c-1.625-11.25-17.875-51.25-22-57.25c-2.265-3.294-4.53-6.027-5.655-11.06C532.522,325.211,500,325.001,486.5,295c1.167,12.001,2.178,85.65,1.506,98.992c0.108,0.098,20.827,42.675,23.494,48.175C520.012,455.281,536.009,451.353,549.573,445.669z"
              />
              <path
                id="COTOVELO_D_M"
                onClick={() => handlePartClick("frt_10")}
                style={getPartStyle("frt_10")}
                d="M178.2,445.669c-13.704-5.742-25.834-13.883-24.421-31.618c-1.917,7.803-1.51,9.506-8.779,18.699c-5.907,7.47-15.794,29.063-22.538,48.927c15.882-28.244,68.495,4.695,75.547,19.871c6.154-16.332,11.13-43.69,11.49-47.172c0.245-2.366,0.814-4.26,2.15-7.163C202.702,453.975,189.594,450.443,178.2,445.669z"
              />
              <path
                id="COTOVELO_E_M"
                onClick={() => handlePartClick("frt_11")}
                style={getPartStyle("frt_11")}
                d="M606,485.25c-2.028-7.858-4.954-16.439-9.03-24.074c-4.97-9.31-16.414-30.066-17.72-32.176c-3.25-5.25-5.336-9.194-6.5-17.25c2.692,19.349-8.893,27.934-23.177,33.919c-13.564,5.684-29.562,9.612-38.073-3.502c2.667,5.5,7,11.333,7,17.333c0,1.363,1.692,13.781,4.385,25.353c2.187,9.397,5.372,18.235,6.115,20.147C527.5,492,591.5,448,606,485.25z"
              />
              <path
                id="ANTEBRACO_D_M"
                onClick={() => handlePartClick("frt_12")}
                style={getPartStyle("frt_12")}
                d="M122.462,481.677c-2.96,8.722-5.318,17.111-6.462,23.823c-2.028,11.896-8.779,39.212-16.707,62.487c-1.735,5.094-3.563,9.992-5.337,14.495c1.722,9.015,32.508,23.476,42.632,18.606c1.457-2.714,2.764-5.01,3.745-6.587c4.667-7.5,11.917-19.251,24.917-35.251s25.5-39.75,32-55.75c0.255-0.629,0.508-1.285,0.76-1.953C190.957,486.372,138.345,453.433,122.462,481.677z"
              />
              <path
                id="ANTEBRACO_E_M"
                onClick={() => handlePartClick("frt_13")}
                style={getPartStyle("frt_13")}
                d="M632.833,581.06c-2.89-7.643-5.898-16.096-8.083-21.56c-4-10-12.75-51-18.75-74.25C591.5,448,527.5,492,529,505c7,18,35.75,60.25,40.375,65.875s16.49,23.007,19.5,28.25C595.414,609.279,634.667,590.667,632.833,581.06z"
              />
              <path
                id="PUNHO_D_M"
                onClick={() => handlePartClick("frt_14")}
                style={getPartStyle("frt_14")}
                d="M93.956,582.482c-5.112,12.975-9.774,22.651-10.456,24.143c-0.886,1.939-1.456,3.337-2.977,4.62c9.057,0.416,28.988,8.686,43.015,19.44c2.127-7.809,8.37-20.88,13.05-29.598C126.464,605.958,95.678,591.497,93.956,582.482z"
              />
              <path
                id="PUNHO_E_M"
                onClick={() => handlePartClick("frt_15")}
                style={getPartStyle("frt_15")}
                d="M648.75,611.25c-8.5-4-5.75-8.25-9.5-15c-1.7-3.061-4.019-8.847-6.417-15.19c1.834,9.607-37.419,28.219-43.958,18.065c1.544,2.69,5.188,10.481,8.506,17.668c3.15,6.824,6.007,13.104,6.494,13.957C618.75,618.834,640.333,610.666,648.75,611.25z"
              />
              <path
                id="MAO_D_M"
                onClick={() => handlePartClick("frt_16")}
                style={getPartStyle("frt_16")}
                d="M67.75,616.375c-13.375,3.75-33.125,20.25-37.75,23.25s-7.75,8.375-11.875,10.5s-4.125,8.625,0,10.5s9.625,0.125,13-1.5s9.042-8.457,15.5-10.5c3.788-1.198,7.625-1.5,7.625,0.125s-8.5,22.375-9.125,25.5s-3.875,13.875-5.875,21.125s-5.5,21.25-6.75,29.25s0.875,11.75,5.125,12.625s7.875-7.625,8.646-10.625s2.854-12.75,3.979-15.5s6.625-18.75,8-22s2.375-8.625,4.375-7.75s-0.375,5.875-1.75,9.75S53.75,715.875,53,719.75s-5,19.75-5.25,22.5s-1.875,8.75,2.75,10.5s7.75-1.875,9.5-5.625S65.375,729.5,67.375,721s5.75-19.5,7.125-24s2.125-8,3.875-7.875s1.5,2.5,0.75,4.75S73,714.5,72,719.5s-4.25,16.125-5.375,20.375s-1.75,9.25,2.5,10.75s6.875-1.5,8.75-4.75s7.875-21.5,9.369-27.125c1.494-5.625,4.756-18.5,6.131-22.375s2.5-5.625,3.625-5.5s0.25,2.625-1.125,7s-5.375,18.5-7.125,25s-2.25,9.625,0,12s7.084-0.541,8.25-2.541s3-11,5.667-16.333c1.676-3.352,3.669-11.246,6.53-19.381c1.691-4.808,4.336-9.699,5.636-13.786c3.5-11,4.333-18.833,7-28.5s0.167-11.667,1-20.167c0.096-0.975,0.344-2.156,0.705-3.482c-14.027-10.755-33.958-19.024-43.015-19.44C78.612,612.857,75.198,614.287,67.75,616.375z"
              />
              <path
                id="MAO_E_M"
                onClick={() => handlePartClick("frt_17")}
                style={getPartStyle("frt_17")}
                d="M702.25,641.25c-2.75-3.75-17.5-11.5-21.75-14.5c-2.125-1.5-7.938-4.375-14.281-7.375c-6.344-3-13.219-6.125-17.469-8.125c-8.417-0.584-30,7.584-44.875,19.5c1,1.75-0.875,7.125,0.125,16.25s4.125,23.25,6.375,32.125s7,18.375,8.5,22.875s9.403,29.364,12.625,32c2.75,2.25,7.5,0.75,8.25-2.75s-1.625-10.875-2.5-14.125s-5.625-19.25-6.5-21.75s-2-5.125-0.25-5.125s2.125,2.75,3.25,5.625s5.875,19.5,6.875,24.125s4.5,17,6.25,21.75s5,10,9,9.75s4.875-4.75,5.125-8.375s-5.875-23.5-6.375-27.625s-5.375-19.25-6.125-21.25s-1.375-5,0.625-5.125s2.875,5.625,3.75,8.625s9.75,31.875,10.25,35.5s2.625,14.5,6,17.75c2.744,2.643,5.625,3.875,8.625,0.875s2.25-10,0.875-15.25s-4.625-21.125-5.5-25s-6.375-20.875-7.25-24s-2.125-5.375-1.125-5.75s2.25,1.125,3.5,5.25s6.625,20.5,8.375,25.5s1.5,11.625,4.125,17.375s7,7.625,10.625,7.125s4.277-7.391,4.375-10.125c0.098-2.734-4.75-20.5-6.25-27.375s-5.25-16.625-6.5-23s-7.375-23.375-8.625-26s-0.625-4.75,2.5-3.875s9.25,2.625,13,7.625s10.875,6.75,13.375,7s8.5,0.375,9.25-6.375S705,645,702.25,641.25z"
              />
              <path
                id="COXA_D_M"
                onClick={() => handlePartClick("frt_18")}
                style={getPartStyle("frt_18")}
                d="M254.327,591.5c-2.021,14.389-3.101,29.611-2.827,34c0.5,8-6.5,46-11.5,70c-3.981,19.107-12.131,56.915-14.376,92.477c-0.575,9.106,0.172,18.064,0.376,26.523c0.845,35.062,9.541,55.489,16.139,69.427c35.654,13.2,53.799,56.767,88.484,34.358c2.478-11.204,8.03-39.965,9.627-52.285c1.75-13.5,10.083-66.333,11.815-88.167c1.732-21.834,1.269-38.833,0.435-43.166s-0.167-12.667-0.417-21.334s3.083-10.166,4.083-12.333c-3.835-8.171-10.12-17.359-17.755-26.864C310.538,639.44,264.667,600.527,254.327,591.5z"
              />
              <path
                id="COXA_E_M"
                onClick={() => handlePartClick("frt_19")}
                style={getPartStyle("frt_19")}
                d="M388.018,673.683c-7.872,9.216-14.301,18.044-18.101,25.734c1.167,0.75,3.083,5.083,4.333,8.083s1,20.75-0.25,31.5s1.5,59.75,3.75,71s8.417,55.334,10.084,67.001c1.667,11.667,5.166,31.5,7.166,39.833c36.334,25.833,52.478-20.023,89.334-33.168c5.667-10,13.999-27.333,15.999-52.333c0.874-10.926,1.602-27.168,0.824-43.078c-1.002-20.493-3.844-40.436-5.157-47.754c-2.333-13-14.834-82.834-17-92.667s-4.333-40-5.333-53.666C462.981,602.637,416.231,640.652,388.018,673.683z"
              />
              <path
                id="JOELHO_D_M"
                onClick={() => handlePartClick("frt_20")}
                style={getPartStyle("frt_20")}
                d="M242.139,883.927c1.212,2.56,2.353,4.901,3.361,7.073c6.5,14,6,37.5,6.5,61c0.078,3.657,0.262,7.679,0.348,11.921c10.591,44.449,51.024,21.223,68.904,3.938c0.325-1.35,0.929-2.658,1.373-3.483c0.875-1.625,2.125-10.625,3.375-16.625s2-18.5,4-26.75c0.175-0.721,0.386-1.643,0.623-2.715C295.938,940.693,277.793,897.127,242.139,883.927z"
              />
              <path
                id="JOELHO_E_M"
                onClick={() => handlePartClick("frt_21")}
                style={getPartStyle("frt_21")}
                d="M395,916.834c2,8.333,4.333,14.167,4.333,24s4,22.167,5.167,25c17.417,18.167,61,46.833,69.25-8.834c0-11.5,3.25-39.334,3.584-50.334c0.334-11,1.333-13,7-23C447.478,896.81,431.334,942.667,395,916.834z"
              />
              <path
                id="PANTURRILHA_D_M"
                onClick={() => handlePartClick("frt_22")}
                style={getPartStyle("frt_22")}
                d="M252.348,963.921c0.085,4.202,0.072,8.622-0.239,13.122c-1.393,20.15-4.799,41.913-4.109,52.957c1,16,4.5,62,7.5,83s6.875,83,7.125,87.5c0.06,1.082,0.008,2.26-0.107,3.478c6.992-11.484,36.463-9.869,44.754-6.101c-1.079-3.858-2.297-10.522-2.439-15.043c-0.167-5.333,7.5-47.167,8.333-58.333c0.833-11.166,3.667-29.5,4.333-33.333s5.75-17.168,9.5-25.918s3.5-20,2.5-27.25s-3.75-45.75-4.5-51.375s-2.25-13.125-3.5-15.125c-0.615-0.984-0.563-2.333-0.248-3.642C303.372,985.144,262.939,1008.37,252.348,963.921z"
              />
              <path
                id="PANTURRILHA_E_M"
                onClick={() => handlePartClick("frt_23")}
                style={getPartStyle("frt_23")}
                d="M404.5,965.834c1.167,2.833-1.25,16.416-4.25,33.916s-4.083,48.751-3.083,56.751s9.667,28.833,11.833,35s0.667,8.833,2,20.833s7.167,47.334,9,59s1.5,21-0.667,27.167C426,1194,462,1191.5,465.5,1207c-0.75-4.25-1.75-10-1-22.25s5-60.25,8.25-87.75s6.75-82,4.5-96.5s-3.5-32-3.5-43.5C465.5,1012.667,421.917,984.001,404.5,965.834z"
              />
              <path
                id="TORNOZELO_D_M"
                onClick={() => handlePartClick("frt_24")}
                style={getPartStyle("frt_24")}
                d="M262.518,1203.978c-0.363,3.847-1.388,8.108-1.768,11.147c-0.5,4,2.125,8.625,1.375,15.875c-0.034,0.332-0.091,0.67-0.146,1.008c12.665-4.423,40.242,8.668,48.998,21.075c1.177-7.814,1.064-15.23-0.477-19.082c-1.667-4.166-2.167-7.167-0.833-12.5s-0.667-18.667-1.833-21.834c-0.178-0.482-0.368-1.097-0.561-1.79C298.981,1194.108,269.51,1192.493,262.518,1203.978z"
              />
              <path
                id="TORNOZELO_E_M"
                onClick={() => handlePartClick("frt_25")}
                style={getPartStyle("frt_25")}
                d="M419.333,1198.501c-2.167,6.167-3.166,21-2.666,22.667s0.833,9.333-1,13.499c-1.833,4.166-1.667,13.334-0.667,21.5c6-13.583,37-29.917,50-23.667c-2-5.5-2.25-5.75-1-9.25s2.25-12,1.5-16.25C462,1191.5,426,1194,419.333,1198.501z"
              />
              <path
                id="PE_D_M"
                onClick={() => handlePartClick("frt_26")}
                style={getPartStyle("frt_26")}
                d="M261.979,1232.008c-1.15,7.047-6.68,15.393-10.854,23.742c-4.375,8.75-13,19.375-21,28.25s-10.375,26.375-10.125,29.5s3.125,5.875,6.125,5.5c0,1.125,1,2.875,4.25,2.5c0.25,2,0,6.25,8.25,5c4,4.875,7.875,4.625,10.75,1.75c5.292,6.314,10.383,6.492,15.75,5.809c4.375-0.558,11.125-7.809,12.25-10.559s2.25-3.875,5.875-6.75c1.972-1.563,3.795-4.086,5.156-8.824c1.141-3.973,1.957-10.098,2.261-12.758c0.667-5.833,0.667-10.834,4.5-21.334c8.667-3.667,14-10.333,15.5-18.833c0.113-0.642,0.215-1.280,0.311-1.918C302.221,1240.676,274.645,1227.585,261.979,1232.008z"
              />
              <path
                id="PE_E_M"
                onClick={() => handlePartClick("frt_27")}
                style={getPartStyle("frt_27")}
                d="M415,1256.167c1,8.166,12,15,15,16.5s3,4.167,3.833,7c0.833,2.833,2.834,10.667,3.834,21s6.25,15.749,8.666,17.666c2.416,1.917,2.834,3,3.667,4.667s3.417,6.083,11.167,9.75s14.999-1.167,16.749-4.75c4.5,4.5,11.084,0.416,12.25-2.084c4.916,1.416,7.834-3.25,7.917-5.166c1.583,0.334,3.584-1.082,4.25-2.582c0.833,0.334,2.5,0.666,5-3.334s-3-17.5-4.167-21.667c-1.167-4.167-9.666-14.833-16.333-21.833c-6.667-7-7.833-11.333-12.5-18.667C469.666,1245.333,467,1238,465,1232.5C452,1226.25,421,1242.584,415,1256.167z"
              />
              <path
                id="CABECA_F"
                onClick={() => handlePartClick("frt_28")}
                style={getPartStyle("frt_28")}
                d="M1134.245,138.852c0,0.647-0.07,1.804-0.204,3.341c-0.54,6.214-2.149,18.875-4.662,31.473c-2.146,10.75-4.947,21.444-8.301,28.019c-1.687,3.839-6.631,8.759-10.528,12.226c-7.165,6.374-15.553,10.22-27.271,10.22c-11.366,0-18.5-3.142-26.037-9.029c-4.459-3.483-10.358-7.927-13.83-13.25c-3.094-3.638-7.286-13.773-10.495-26.914c-2.299-9.411-4.087-20.362-4.608-31.584c-0.101-2.172-0.16-4.353-0.16-6.536c0-16.455,0.385-29.87,3.598-40.511c6.588-21.808,24.508-35.475,50.414-35.475C1142.167,60.833,1134.245,123.727,1134.245,138.852z M1021.25,139.125c-2.875,0.625-4.125,8.25-3.125,13.625s3.909,14.25,6.455,18.75c2.336,4.131,4.846,9.557,8.337,3.439c-2.299-9.411-4.087-20.362-4.608-31.584C1025.986,141.067,1023.102,138.723,1021.25,139.125z M1136,174.625c1.5-2.375,4.375-8.875,5.75-12.625s2.875-14.25,2.375-18.875s-4.75-4.875-6.5-2.25c-0.807,1.21-2.197,1.536-3.584,1.318c-0.54,6.214-2.149,18.875-4.662,31.473C1131.777,178.98,1134.818,176.495,1136,174.625z"
              />
              <path
                id="PESCOCO_F"
                onClick={() => handlePartClick("frt_29")}
                style={getPartStyle("frt_29")}
                d="M1055.245,277.185c7.666-1.333,14,3.667,18.333,7.667s11.666,4,15.333,0s12.001-9.334,24.334-7.334s16.333-1,26.333-6c13.203-6.602,19.454-9.105,36.681-14.544c-4.235-0.279-8.442-0.39-12.514-0.622c-17.5-1-38.957-4.63-42.5-13.334c-4.079-10.019-3.245-27.352-0.167-41.333c-1.687,3.839-6.631,8.759-10.528,12.226c-7.165,6.374-15.553,10.22-27.271,10.22c-11.366,0-18.5-3.142-26.037-9.029c-4.459-3.483-10.358-7.927-13.83-13.25c0.333,2.167,2.75,18.772,1.833,32.25c-0.911,13.398-10.762,16.644-31.612,20.584c-8.076,1.526-21.371,2.995-29.388,3.666c20.666,3.5,43.333,10.5,47.333,13.5S1047.579,278.519,1055.245,277.185z"
              />
              <path
                id="PEITO_F"
                onClick={() => handlePartClick("frt_30")}
                style={getPartStyle("frt_30")}
                d="M1183.389,362.851c-1.799-4.795-3.164-9.618-2.81-16c0.434-7.804,1.971-18.29,1.593-28.995c-0.712-20.142-8.204-41.059-42.594-46.337c-10,5-14,8-26.333,6s-20.667,3.334-24.334,7.334s-11,4-15.333,0s-10.667-9-18.333-7.667c-7.666,1.334-19.667-2.333-23.667-5.333c-32.877,3.202-47.718,24.43-48.082,49.281c-0.053,3.622,0.198,7.319,0.749,11.05c1.906,12.904-0.123,23.486-2.841,33.069c-3.46,12.201-7.175,14.914-7.034,34.474c1.25,8,5.125,16.75,8.875,21.25c0.494,4.944,3.648,20.29,5.687,28.839c0.539,2.259,1,4.043,1.313,5.036c0.467,1.478,1.176,8.086,1.885,16.806c2.263,3.992,7.449,32.313,48.83,14.238c12.048-5.262,24.116-13.146,41.201-13.146s30.371,8.46,41.064,13.26c40.021,17.962,46.986-6.785,50.044-16.517c0.871-10.137,1.665-17.716,1.976-18.765c1-3.375,5.166-24.208,5.833-30.042c3.333-4,7.917-15,8.333-19.416C1191.936,381.241,1186.857,372.096,1183.389,362.851z"
              />
              <path
                id="MAMAS_F"
                onClick={() => handlePartClick("frt_31")}
                style={getPartStyle("frt_31")}
                d="M1183.389,362.851c-16.477-44.995-66.144-13.998-101.228-13.998s-84.915-32.333-100.757,16.401c-3.46,12.201-7.175,14.914-7.034,34.474c1.25,8,5.125,16.75,8.875,21.25c23,29.375,52.834,11.538,67-1c8.393-7.428,20.5-14.811,31.916-14.811c9.584,0,18.084,4.821,27.584,12.811c22,18.503,54,26.625,71.333,2.708c3.333-4,7.917-15,8.333-19.416C1191.936,381.241,1186.857,372.096,1183.389,362.851z"
              />
              <path
                id="ABDOMEN_F"
                onClick={() => handlePartClick("frt_32")}
                style={getPartStyle("frt_32")}
                d="M1123.226,486.009c-10.693-4.799-23.979-13.26-41.064-13.26s-29.153,7.884-41.201,13.146c-41.381,18.075-46.567-10.247-48.83-14.238c1.571,19.306,3.148,48.961,2.115,56.194c-1.135,7.941-9.276,28.039-14.799,41.473c3.636,7.516,25.04,39.648,101.913,39.648s99.986-31.362,104.039-39.648c-2.226-5.323-4.486-11.973-5.403-14.723c-1.25-3.75-6.75-17-9.25-23.25c-1.723-4.308,0.592-39.376,2.524-61.86C1170.212,479.224,1163.246,503.971,1123.226,486.009z"
              />
              <path
                id="PELVE_F"
                onClick={() => handlePartClick("frt_33")}
                style={getPartStyle("frt_33")}
                d="M1187.745,574.352c-0.733-1.333-1.538-3.092-2.347-5.027c-4.053,8.286-27.166,39.648-104.039,39.648s-98.277-32.132-101.913-39.648c-1.779,4.327-3.287,7.963-4.201,10.277c-0.718,1.819-4.753,12.178-9.266,28.098c20.901,5.683,66.603,53.919,86.013,79.231c5.745,7.492,9.585,12.977,10.419,14.754c15.333,17.168,28.667,12.5,40.834-0.833c0.847-1.714,4.106-7.153,9.088-14.61c16.61-24.865,56.122-72.163,85.544-78.591C1193.102,588.989,1188.684,576.059,1187.745,574.352z"
              />
              <path
                id="OMBRO_D_F"
                onClick={() => handlePartClick("frt_34")}
                style={getPartStyle("frt_34")}
                d="M983.496,321.133c0.364-24.852,15.205-46.08,48.082-49.281c-4-3-26.667-10-47.333-13.5c-8.017,0.671-36.833-0.833-45.5,44.5c-1.326,6.935-6.612,29.151-8.44,49.643C938.758,339.442,975.279,337.249,983.496,321.133z"
              />
              <path
                id="OMBRO_E_F"
                onClick={() => handlePartClick("frt_35")}
                style={getPartStyle("frt_35")}
                d="M1182.172,317.855c5.073,20.997,49.579,18.889,52.073,36.997c0-5.5-5-59.75-19-79.25c-10.742-14.963-25.018-17.709-38.986-18.628c-17.227,5.44-23.478,7.943-36.681,14.544C1173.968,276.797,1181.46,297.713,1182.172,317.855z"
              />
              <path
                id="BRACO_D_F"
                onClick={() => handlePartClick("frt_36")}
                style={getPartStyle("frt_36")}
                d="M981.404,365.253c2.718-9.583,4.747-20.165,2.841-33.069c-0.551-3.731-0.802-7.429-0.749-11.05c-8.217,16.115-44.738,18.309-53.191,31.362c-0.269,3.007-0.464,5.978-0.56,8.857c-0.697,20.911-17.797,65.556-22.819,82.598c1.973,21.535,38.649,20.571,48.624,11.675c0.842-2.145,1.608-3.973,2.195-5.273c2.333-5.167,15.667-39.667,16.625-50.625C974.229,380.167,977.944,377.454,981.404,365.253z"
              />
              <path
                id="BRACO_E_F"
                onClick={() => handlePartClick("frt_37")}
                style={getPartStyle("frt_37")}
                d="M1257.359,443.382c-0.202-0.769-0.41-1.559-0.634-2.391c-2.22-8.277-5.535-19.675-10.48-34.389c-3.74-11.129-6.349-20.294-8.152-27.713c-1.16-4.771-1.988-8.82-2.571-12.207c-0.995-5.78-1.276-9.627-1.276-11.83c-2.494-18.108-47-16-52.073-36.997c0.378,10.705-1.159,21.191-1.593,28.995c-0.354,6.382,1.011,11.205,2.81,16c3.469,9.245,8.547,18.391,6.022,38.418c0.333,1.917,1.834,4.083,2.667,6.916c0.833,2.834,7.334,22.667,10.334,30.833c1.362,3.709,3.618,8.688,5.8,13.723C1213.072,465.191,1264.631,474.896,1257.359,443.382z"
              />
              <path
                id="COTOVELO_D_F"
                onClick={() => handlePartClick("frt_38")}
                style={getPartStyle("frt_38")}
                d="M906.926,443.95c-0.382,1.295-0.701,2.449-0.931,3.402c-3.25,13.5-5.75,23.5-9.5,29.75c-1.344,2.239-4.423,8.375-7.957,16.714c8.213-9.979,21.624-12.289,31.761-7.811c10.473,4.626,18.204,17.605,19.489,33.772c0.413-1.687,0.739-3.183,0.957-4.425c1.667-9.5,6.5-29,8-37.667c1.123-6.486,4.299-15.679,6.805-22.06C945.575,464.521,908.898,465.484,906.926,443.95z"
              />
              <path
                id="COTOVELO_E_F"
                onClick={() => handlePartClick("frt_39")}
                style={getPartStyle("frt_39")}
                d="M1244.594,486.005c11.671-5.155,25.484-5.065,32.105,9.867c-1.364-3.261-2.682-6.233-3.891-8.824c-1.132-2.424-2.169-4.515-3.063-6.196c-6.25-11.75-8-20-9-23.75c-0.469-1.759-1.437-6.279-3.386-13.72c7.271,31.514-44.287,21.81-49.147,9.359c2.623,6.052,5.139,12.183,5.866,16.277c0.87,4.895,2.834,15.834,4.5,21.334c0.842,2.78,2.11,9.819,3.504,17.005c1.362,7.03,2.845,14.2,4.163,17.662C1221.555,504.252,1231.784,491.663,1244.594,486.005z"
              />
              <path
                id="ANTEBRACO_D_F"
                onClick={() => handlePartClick("frt_40")}
                style={getPartStyle("frt_40")}
                d="M920.299,486.005c-10.137-4.478-23.548-2.168-31.761,7.811c-6.328,14.935-14.118,36.964-16.043,56.536c-4.38,44.525-10.921,61.208-15.92,74.535c1.766,4.367,7.198,6.687,12.375,8.934c5.517,2.394,14.79,4.127,20.007,3.178c2.049-4.53,4.271-9.329,6.538-13.397c8.5-15.25,21.75-43.417,28.75-59.083c6.085-13.618,12.796-33.527,15.543-44.742C938.503,503.61,930.771,490.631,920.299,486.005z"
              />
              <path
                id="ANTEBRACO_E_F"
                onClick={() => handlePartClick("frt_41")}
                style={getPartStyle("frt_41")}
                d="M1295.942,633.821c5.138-2.229,10.528-4.53,12.336-8.833c-0.175-0.452-0.352-0.911-0.533-1.386c-6.5-17-11.5-47.25-15-73.25c-2.464-18.305-9.761-39.461-16.046-54.48c-6.621-14.932-20.435-15.022-32.105-9.867c-12.81,5.658-23.039,18.247-18.349,39.014c2.667,7,11,35,20,52c7.483,14.136,23.78,47.339,29.779,59.996C1281.258,637.928,1290.457,636.202,1295.942,633.821z"
              />
              <path
                id="PUNHO_D_F"
                onClick={() => handlePartClick("frt_42")}
                style={getPartStyle("frt_42")}
                d="M868.95,633.821c-5.177-2.247-10.609-4.566-12.375-8.934c-0.684,1.821-1.339,3.582-1.955,5.34c-2.742,7.825-5.627,12.177-8.157,14.688c6.81-0.805,13.795,1.275,19.601,4.923c6.23,3.915,11.636,4.602,13.336,9.767c1.026-3.539,3.603-9.493,6.953-16.841c0.824-1.808,1.699-3.763,2.604-5.765C883.74,637.948,874.467,636.215,868.95,633.821z"
              />
              <path
                id="PUNHO_E_F"
                onClick={() => handlePartClick("frt_43")}
                style={getPartStyle("frt_43")}
                d="M1298.829,649.838c7.824-4.917,17.79-6.998,26.583-2.986c-9.072-4.698-11.06-6.172-17.134-21.864c-1.808,4.303-7.198,6.604-12.336,8.833c-5.485,2.381-14.685,4.107-19.918,3.194c1.216,2.565,2.01,4.29,2.221,4.838c1.25,3.25,5.625,12.75,5.75,15.5c0.057,1.237,0.467,4.698,1.117,9.019C1283.745,654.54,1290.563,655.033,1298.829,649.838z"
              />
              <path
                id="MAO_D_F"
                onClick={() => handlePartClick("frt_44")}
                style={getPartStyle("frt_44")}
                d="M866.063,649.838c-5.806-3.648-12.791-5.729-19.601-4.923c-2.199,2.181-4.131,2.973-5.468,3.438c-2.875,1-20.625,11.625-26.375,15.25s-8.625,9.375-14.25,12.125s-8.5,6.875-10,8.625c-1.5,1.75-6.625,7.5-6.625,9.875s4.375,3.75,8,2.875s11.75-8.625,15.75-12.375c4-3.75,9.5-4.875,12.25-4.875s2.625,3.125,1.875,4.5s-2.875,8.25-4,13.625s-1,11.874-1.875,13.999s-5,19.375-5.625,23.625s-2.625,15.5,0,19s6,1.25,7.125-1.375s3.625-14.125,4.086-16.875c0.461-2.75,6.789-21.125,7.414-22.75s3.125,2.625,2.25,5.75s-2.375,11.75-4.75,18.5s-2.625,14.125-3.375,17.5s-1.75,8.125-1.5,11.5s3.125,5.875,5.5,4.625s4.875-9.5,5.5-12.5s4-14.375,5.625-18.375s3-20.5,4-23s1.875,1.125,1.25,2.75s-3.375,18-3.75,21.625s-3.5,14.875-2.625,19.125s5.125,3.5,6.75,1.75s2.5-7.125,3-9.75s4.125-13.375,5.427-17.5c1.302-4.125,3.448-16.25,4.073-20.25s2-1.625,1.125,1.75s-0.875,11.875-1.75,14.25s-1,8.125-1.75,9.625s-2.75,5.875-1,9s5,1.5,5.875,0.125s3.75-10.625,5-13.375s2.625-11,3.75-15.875s3.208-11,4.375-17.499c1.167-6.5,1.333-14,2.5-18.334c1.167-4.333,4.5-18.666,4.667-23c0.023-0.589,0.196-1.409,0.487-2.413C877.699,654.44,872.293,653.753,866.063,649.838z"
              />
              <path
                id="MAO_E_F"
                onClick={() => handlePartClick("frt_45")}
                style={getPartStyle("frt_45")}
                d="M1369.578,677.019c-3.334-5.167-13.666-10-17-13.5s-17.833-11.833-27.166-16.667c-8.793-4.012-18.759-1.931-26.583,2.986c-8.266,5.195-15.084,4.702-13.717,16.534c0.795,5.289,1.951,11.865,3.258,17.231c2.375,9.75,2.125,16.25,3.5,22.375c1.375,6.124,4.875,14.499,5.75,21.249s3.375,7.25,5.5,15.25s6.875,8.375,8.125,6.125s0.375-7.5-0.375-8.5s-1.5-3.125-1.875-5.25s-1.625-8.375-2.125-11.5s-3.125-13.125-2.25-14.5s3.5,4,3.75,5.875s3,14.875,5,21.25s4,18.5,7.125,22.875s7.125,1.125,7.125-2.875s-3-17.125-3.25-20s-3.875-20-4.375-21.625s2.5-1.125,2.75,0.25s1.75,10.625,3,14.375s5,18.125,5.5,20.75s2,14.125,6.125,16.25s5.875-2.125,6.25-5.875s-5.5-30-6.375-34.5s-4.375-16.875-3-18.125c1.375-1.249,4.875,11.75,5.5,15.75s4.375,22.875,5.875,26.625s5.75,4.75,7.5,1.5s-1.5-24.375-1.875-31.375s-4.375-14.249-4.5-21.249s-5.25-20.5-4.834-22.708c0.499-2.646,9.167,0.333,12.167,2.667c3,2.333,8.5,8.5,11.5,10s8.833,3.834,10.167,0C1377.079,684.852,1372.912,682.186,1369.578,677.019z"
              />
              <path
                id="COXA_D_F"
                onClick={() => handlePartClick("frt_46")}
                style={getPartStyle("frt_46")}
                d="M965.979,607.7c-8.94,31.535-19.757,84.918-10.4,137.151c1.925,10.749,29.666,157,32.416,171.75c0.446,2.394,1.164,5.843,2.017,10.031c54.814-4.183,72.883,49.144,80.68,10.055c-0.333-28.322-1.68-73.09-2.696-91.586c-0.494-9-1.657-28.941,3.583-60.582c2.38-14.367,13.417-54.918-9.167-82.834c-0.834-1.777-4.674-7.262-10.419-14.754C1032.582,661.62,986.881,613.383,965.979,607.7z"
              />
              <path
                id="COXA_E_F"
                onClick={() => handlePartClick("frt_47")}
                style={getPartStyle("frt_47")}
                d="M1112.333,686.242c-4.981,7.457-8.241,12.896-9.088,14.61c-22,24.165-15.5,60.249-10.5,83.749s4,49.25,3.75,59.5c-0.192,7.873-2.694,56.297-3.015,88.533c7.488,47.217,22.265-11.783,80.561-5.816c0.635-3.859,1.253-7.717,1.87-11.301c1.666-9.666,18.001-92.666,21.001-108.666s14.579-62.191,14.583-105.25c0.003-32.74-7.137-68.624-13.618-93.95C1168.455,614.08,1128.943,661.377,1112.333,686.242z"
              />
              <path
                id="JOELHO_D_F"
                onClick={() => handlePartClick("frt_48")}
                style={getPartStyle("frt_48")}
                d="M990.012,926.633c3.118,15.324,8.045,40.617,8.183,61.056c9.946,48.058,48.957,36.435,64.312,13.893c0.233-1.731,0.557-3.249,0.989-4.48c3.25-9.25,7-21.25,7.25-44c0.047-4.254,0.023-9.9-0.054-16.414C1062.895,975.776,1044.825,922.45,990.012,926.633z"
              />
              <path
                id="JOELHO_E_F"
                onClick={() => handlePartClick("frt_49")}
                style={getPartStyle("frt_49")}
                d="M1093.48,932.635c-0.097,9.738,0.006,17.998,0.431,23.219c1.833,22.5,4.167,31.666,7.667,44.5c15.167,23.998,59.667,38.498,64.917-16.002c0-11.75,2.083-30.834,4.083-39.166c1.259-5.246,2.386-11.81,3.463-18.367C1115.745,920.852,1100.969,979.852,1093.48,932.635z"
              />
              <path
                id="PERNA_D_F"
                onClick={() => handlePartClick("frt_50")}
                style={getPartStyle("frt_50")}
                d="M998.194,987.688c0.057,8.378-0.69,15.94-2.699,21.663c-9.481,27.008-3.25,94.75,0,112s21.25,99.75,24.084,121.502c0.292,2.238,0.427,4.588,0.472,6.978c7.032-6.858,20.667-9.863,28.878-8.069c4.987,1.089,8.274,3.628,11.095,7.459c-2.394-9.663-1.716-19.744-1.028-34.869c0.75-16.5,6.75-83.5,9.75-105.25s0.75-46.25-2.5-62c-2.817-13.653-5.256-34.25-3.739-45.52C1047.151,1024.123,1008.141,1035.746,998.194,987.688z"
              />
              <path
                id="PERNA_E_F"
                onClick={() => handlePartClick("frt_51")}
                style={getPartStyle("frt_51")}
                d="M1101.578,1000.354c3.5,12.832-5.166,55.332-7,75.166c-1.834,19.832,5,54.5,5.167,66.334c0.167,11.832,3.166,42.5,4.833,56.832c1.667,14.334,2.333,41.168-0.667,53.5c3.302-5.502,5.874-9.074,12.053-10.424c8.796-1.922,21.821,0.66,28.281,8.59c0.5-9.5,5.25-38.25,14.75-79.25s12.75-69.75,14.5-100.5s-0.5-49.75-2.25-55s-4.75-19.5-4.75-31.25C1161.245,1038.852,1116.745,1024.352,1101.578,1000.354z"
              />
              <path
                id="TORNOZELO_D_F"
                onClick={() => handlePartClick("frt_52")}
                style={getPartStyle("frt_52")}
                d="M1048.929,1241.762c-8.211-1.794-21.846,1.211-28.878,8.069c0.206,10.988-1.585,22.862,0.195,29.022c1.613,5.583,2.301,5.904,1.31,9.828c7.506-4.416,35.265-5.709,42.285,2.941c-0.564-3.49-1.649-7.012-2.347-9.521c-1.25-4.5,0.25-8.75,1.75-11.25s0.75-8.5-2.5-19c-0.271-0.875-0.505-1.752-0.722-2.631C1057.203,1245.39,1053.916,1242.851,1048.929,1241.762z"
              />
              <path
                id="TORNOZELO_E_F"
                onClick={() => handlePartClick("frt_53")}
                style={getPartStyle("frt_53")}
                d="M1115.964,1241.762c-6.179,1.35-8.751,4.922-12.053,10.424c-3,12.334-3.166,15.168-1.166,22.334c2,7.168,0,8.5-1.833,18c4.667-11.668,38.198-9.256,42-3.5c-1.666-4.334,0.5-5.5,1.833-12.5s-1-16.668-0.5-26.168C1137.785,1242.422,1124.76,1239.84,1115.964,1241.762z"
              />
              <path
                id="PE_D_F"
                onClick={() => handlePartClick("frt_54")}
                style={getPartStyle("frt_54")}
                d="M1021.557,1288.682c-0.34,1.347-0.877,3.116-1.643,5.672c-3,10-9.334,16.832-12.5,22c-3.166,5.166-0.5,7.832,2.833,9.666c3.333,1.832,3.333-0.5,4.833,0.666c1.5,1.168,12.334,0.5,13.5,0.168c1.166-0.334,1.5-0.668,5.167,0.832s8.833-2.332,10.667-0.666s10,1.666,12.666,1.404s5.334-5.238,5.834-6.738s0.333-3,1-5s1.166-6.166-0.167-9c-1.333-2.832-1.5-3.332,0-8.332c0.663-2.211,0.543-4.961,0.096-7.73C1056.821,1282.973,1029.063,1284.266,1021.557,1288.682z"
              />
              <path
                id="PE_E_F"
                onClick={() => handlePartClick("frt_55")}
                style={getPartStyle("frt_55")}
                d="M1100.912,1292.52c-1.833,9.5,2.666,9.834,0.333,14.166c-2.333,4.334-1.333,10.5-0.167,11.5s-1.333,2.5,3,7.168c4.333,4.666,13.834,2.666,15.334,2.166s3-1,4,0.201c1,1.203,6.5,0.633,7.666,0c1.166-0.631,3.334-1.201,4-0.318s5.167-0.383,7.5-0.049s5.834-1.168,8.167-0.834c2.333,0.332,7.167-2,7-6.5s-2.833-6.166-4.833-9.166s-8.334-17.5-10-21.834C1139.11,1283.264,1105.579,1280.852,1100.912,1292.52z"
              />
            </svg>
          ) : (
            <svg
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              width="250px"
              height="250px"
              viewBox="0 0 1390 1370"
              xmlSpace="preserve"
            >
              <path
                id="CABECA_TRAS_M"
                onClick={() => handlePartClick("bck_1")}
                style={getPartStyle("bck_1")}
                d="M412.806,156.076c3.058-18.988,9.442-66.107,10.527-83.743C424.666,50.667,394.333,17,362,17c-27.334,0-58.5,32-58,52.667c0.19,7.876,2,33,2.333,36.333c0.239,2.389,4.332,32.016,7.46,49.645C324,176.667,402.611,176.486,412.806,156.076z"
              />
              <path
                id="PESCOCO_TRAS_M"
                onClick={() => handlePartClick("bck_2")}
                style={getPartStyle("bck_2")}
                d="M459.833,228c-28-9.5-48.999-27.333-49.999-29.5s0.166-30.667,1.5-34.5c0.248-0.713,0.773-3.584,1.472-7.924c-10.194,20.41-88.806,20.59-99.013-0.432c1.235,6.962,2.32,12.053,2.957,12.855c1.555,1.958,2.93,28.364,0.5,31.5c-7.805,10.073-31.475,20.792-49.208,27.501C289.75,221.5,441.908,224.22,459.833,228z"
              />
              <path
                id="COSTAS_M"
                onClick={() => handlePartClick("bck_3")}
                style={getPartStyle("bck_3")}
                d="M501,353c2.836-16.7,6.264-36.969,4.097-48.71c-0.126-0.68-0.266-1.336-0.43-1.956c-3-11.333-7.667-52-44.834-74.333c-17.925-3.78-170.083-6.5-191.792-0.499C228.583,249.001,223.5,296.25,222.5,302s0.5,26.25,2.25,36.75s8.249,29.583,4.625,66.375c1.125,0,1.5,3.5,1.875,6.125s4.25,16.75,9.25,23s9.25,25,13.25,32.5c4.468,5.507,41.373,10.639,83.746,11.485c9.657,0.193,19.599-1.733,29.504-1.776c9.977-0.044,19.919,1.793,29.499,1.512c39.579-1.163,72.98-6.345,77.196-11.47c2.613-5.707,6.414-14.637,7.473-18.167c1.5-5,2.666-9.167,4.833-12.667s7.833-18.083,8.666-21.083c0.833-3,2.167-9.417,3.334-9.5C497,389.667,498,370.667,501,353z"
              />
              <path
                id="LOMBAR_M"
                onClick={() => handlePartClick("bck_4")}
                style={getPartStyle("bck_4")}
                d="M396.499,477.97c-9.58,0.281-19.522-1.556-29.499-1.512c-9.906,0.044-19.847,1.969-29.504,1.776c-42.373-0.846-79.277-5.978-83.746-11.485c4,7.5,6.5,19,8.5,37.75s-2.25,32-3.25,37.75s-0.227,23.88,1.25,28c1.412,3.939,3.607,9.041-0.422,15.812c6.278-9.18,30.556-16.657,56.643-16.657c29.53,0,31.03,10.279,51.53,10.279c19,0,26-10.042,51.526-10.166c25.239-0.123,43.853,7.19,48.379,16.593c-0.532-1.279-0.915-2.171-1.072-2.61c-0.834-2.333-1.166-6.167-0.333-8.167s2.667-12.833,2.833-19c0.166-6.167-3.667-30-4.667-34.833s1.667-28.5,2.334-33.333c0.667-4.833,3-14.667,4.333-16.833c0.392-0.637,1.273-2.456,2.361-4.833C469.479,471.625,436.078,476.807,396.499,477.97z"
              />
              <path
                id="NADEGAS_M"
                onClick={() => handlePartClick("bck_5")}
                style={getPartStyle("bck_5")}
                d="M419.526,569.518C394,569.642,387,579.684,368,579.684c-20.5,0-22-10.279-51.53-10.279c-26.087,0-50.365,7.477-56.643,16.657c-0.185,0.311-0.366,0.62-0.578,0.938c-6,9-12,51.75-11.5,64s-2.5,24-4,32.5c0,19,7.324,25.063,15.316,37.142C279.76,751.914,317.235,774.904,351.5,741c2.75-2.875,6.75-8.875,7.75-11.625s2-3.25,4.375-3.25s3.75,1.125,4.25,2.875s3.792,8.5,7.292,11.334c37.774,39.903,74.878,12.96,94.414-18.404c8.533-13.701,14.134-14.93,14.134-38.43c-1.558-8.437-3.389-18.087-4.048-21.667c-1.167-6.333-0.5-24.333-2.666-42.667c-1.622-13.732-6.051-25.594-8.522-31.664c-0.206-0.505-0.398-0.97-0.574-1.393C463.379,576.708,444.765,569.395,419.526,569.518z"
              />
              <path
                id="OMBRO_TRAS_D_M"
                onClick={() => handlePartClick("bck_6")}
                style={getPartStyle("bck_6")}
                d="M504.667,302.333c0.164,0.62,0.305,1.276,0.43,1.956c16.05,17.076,38.941,31.041,53.413,43.878c-0.086-0.138-0.174-0.282-0.26-0.418C558.5,327.5,563,297,546,269.25S487.833,237.5,459.833,228C497,250.333,501.667,291,504.667,302.333z"
              />
              <path
                id="OMBRO_TRAS_E_M"
                onClick={() => handlePartClick("bck_7")}
                style={getPartStyle("bck_7")}
                d="M222.5,302c1-5.75,6.083-52.999,45.542-74.499c-8.126,3.074-15.006,5.307-18.542,6.249c-8.263,2.203-41.894,9.408-53.5,19.5c-17.25,15-26,35-27.5,62.75c-0.721,13.331,0,25.833,0,34.5C178.333,326.25,202.667,324.333,222.5,302z"
              />
              <path
                id="BRACO_TRAS_D_M"
                onClick={() => handlePartClick("bck_8")}
                style={getPartStyle("bck_8")}
                d="M560.107,468.68c14.466-5.319,29.128-11.117,27.667-40.179c-2.005-7.583-4.834-13.009-8.024-28.751c-3.706-18.282-14.002-39.975-21.24-51.582c-14.472-12.836-37.362-26.802-53.413-43.878c2.167,11.742-1.261,32.011-4.097,48.71c-3,17.667-4,36.667-2.999,52.083C499.168,405,500.75,408,502,410.75c1.086,2.39,15.767,34.99,21.069,46.274C532.186,470.092,544.849,474.29,560.107,468.68z"
              />
              <path
                id="BRACO_TRAS_E_M"
                onClick={() => handlePartClick("bck_9")}
                style={getPartStyle("bck_9")}
                d="M224.75,338.75c-1.75-10.5-3.25-31-2.25-36.75c-19.833,22.333-44.167,24.25-54,48.5c-6.834,10.667-18.25,33.75-20,44s-4.5,20-7.25,27.75c-3.98,34.526,10.693,40.75,26.143,46.43c16.538,6.08,29.232,0.639,38.288-15.131c1.1-2.171,2.2-4.311,3.152-6.215c3.5-7,16.417-34.458,17.292-37.333s2.125-4.875,3.25-4.875C232.999,368.333,226.5,349.25,224.75,338.75z"
              />
              <path
                id="COTOVELO_TRAS_D_M"
                onClick={() => handlePartClick("bck_10")}
                style={getPartStyle("bck_10")}
                d="M568.824,504.292c39.135-10.364,46.681,1.813,50.268,8.767c-0.214-1.377-0.413-2.655-0.592-3.809c-2.75-17.75-17.75-47-19.5-49.75s-8.25-16.5-10.25-26.75c-0.298-1.528-0.625-2.92-0.976-4.249c1.46,29.061-13.201,34.86-27.667,40.179c-15.259,5.61-27.921,1.412-37.038-11.656c0.798,1.699,1.386,2.92,1.681,3.476c2.25,4.25,2.25,4.75,2.177,7.75s2.823,14.25,4.073,19.5c1.179,4.95,0.139,15.905,7.558,38.93C541.114,514.447,559.768,506.69,568.824,504.292z"
              />
              <path
                id="COTOVELO_TRAS_E_M"
                onClick={() => handlePartClick("bck_11")}
                style={getPartStyle("bck_11")}
                d="M167.393,468.68c-15.45-5.68-30.124-11.904-26.143-46.43c-2.75,7.75-1.75,15.25-6.5,23.5s-0.75,6.5-9.75,20c-4.221,6.332-8.992,20.141-13.178,35.472c-1.258,4.606-2.463,9.351-3.584,14.07c3.399-5.935,6.601-22.609,50.438-11c10.714,2.837,31.865,11.173,26.897,27.549c2.671-7.794,4.745-15.229,6.308-21.617c2.547-10.41,3.739-18.036,3.953-19.891c0.5-4.333,0.834-7.333,1.5-9.333c0.667-2,2.167-9.833,2.334-13.167c0.122-2.427,3.069-8.474,6.014-14.285C196.625,469.319,183.931,474.76,167.393,468.68z"
              />
              <path
                id="ANTEBRACO_TRAS_D_M"
                onClick={() => handlePartClick("bck_12")}
                style={getPartStyle("bck_12")}
                d="M620.191,621.035c8.857-3.745,15.074-6.784,16.994-10.783c-1.959-5.819-4.01-12.795-5.435-20.252c-3.039-15.895-9.573-57.137-12.658-76.941c-3.587-6.955-11.133-19.131-50.268-8.767c-9.056,2.398-27.71,10.155-30.267,22.388c0.45,1.397,0.928,2.833,1.442,4.32c9,26,30,55.25,45.5,79.5c2.965,4.638,5.481,8.858,7.625,12.69C599.133,625.104,611.447,624.732,620.191,621.035z"
              />
              <path
                id="ANTEBRACO_TRAS_E_M"
                onClick={() => handlePartClick("bck_13")}
                style={getPartStyle("bck_13")}
                d="M158.676,504.292c-43.837-11.609-47.038,5.065-50.438,11c-3.104,13.064-5.568,25.943-6.738,35.208c-2.206,17.467-8.379,42.596-11.756,56.062c-0.875,6.021,6.182,9.66,17.564,14.473c11.004,4.653,23.67,4.044,26.295,0.232c10.117-17.065,26.772-37.525,39.896-61.517c4.95-9.049,8.926-18.728,12.073-27.909C190.541,515.465,169.39,507.129,158.676,504.292z"
              />
              <path
                id="PUNHO_TRAS_D_M"
                onClick={() => handlePartClick("bck_14")}
                style={getPartStyle("bck_14")}
                d="M648,637.75c-3.5-0.5-4-8.25-5.25-12.25c-0.702-2.246-3.058-7.8-5.565-15.248c-1.92,3.999-8.137,7.038-16.994,10.783c-8.745,3.698-21.058,4.07-27.066,2.155c9.067,16.197,11.432,25.37,12.375,29.144c0.527,2.109,0.643,3.571,0.461,4.91c8.146-4.652,34.231-16.276,43.574-19.126C648.977,637.944,648.459,637.815,648,637.75z"
              />
              <path
                id="PUNHO_TRAS_E_M"
                onClick={() => handlePartClick("bck_15")}
                style={getPartStyle("bck_15")}
                d="M107.309,621.035c-11.382-4.813-18.439-8.452-17.564-14.473c-1.215,4.844-2.068,8.179-2.244,9.105c-0.666,3.5-4.164,10.214-6.166,18.333c-0.375,1.692-2.811,3.547-5.5,4.5C79.5,637.75,120.411,656.865,121,659c-1-4-1.25-8,7-27c1.483-3.416,3.387-6.993,5.604-10.733C130.979,625.079,118.313,625.688,107.309,621.035z"
              />
              <path
                id="MAO_TRAS_D_M"
                onClick={() => handlePartClick("bck_16")}
                style={getPartStyle("bck_16")}
                d="M675.668,654.333c-2.333-1-7.918-8.083-12.668-10.083c-4.127-1.738-9.761-4.982-13.464-6.132c-9.342,2.85-35.428,14.474-43.574,19.126c-0.221,1.622-0.881,3.065-1.795,5.257c-1.667,4-0.666,16.167,0.334,19.5c1,3.334,4.166,22.334,5.833,26s3,8.167,3.667,10.5c0.667,2.333,7.667,32,10.167,34.333s5.666,1.834,7-0.5c1.334-2.334,0.5-7.5,0-10.833s-1.667-9.833-2-12.5c-0.333-2.667-2.334-10.5-3.334-14.166c-1-3.667,1.334-3.668,3-1.5c1.666,2.166,3.334,8.666,4.167,11.833c0.833,3.167,3.5,16.166,4.333,20.666s2.834,17.667,5.834,20.834s5.666,3.333,8.166,1s1.167-7.333,0.834-10.167c-0.333-2.834-2.5-19.166-2.834-23c-0.334-3.834-3.833-14.334-4.666-20.5c-0.833-6.166,2.666-1.834,3-0.5c0.334,1.334,4.166,14.833,4.666,18.333s3,15.667,3.5,22.667s3.667,13,4.834,14.5c1.167,1.5,6,2.167,7.5,0s1.166-5.667,1-9.333c-0.166-3.666-1.5-22.167-1.5-25.667s-4.5-19.834-5-23.5s1.333-1.834,2-0.166c0.667,1.666,4.999,19.166,5.833,22.833c0.834,3.667,1.166,7.333,1.833,12s3.833,9,6.333,10.333s5.5-1.166,6.5-3.833s-1.5-15.167-1.833-23.333c-0.333-8.166-1.5-11.334-2.167-14c-0.667-2.667-3-18.167-3.833-22.5c-0.833-4.334-6.666-19-7.666-21.834s4.166,0.5,5.666,2.833s7.5,5.5,10.5,5.333s5.667-1.667,6-5.333s-3.833-4.5-5.833-9.833C684.556,659.146,678.001,655.333,675.668,654.333z"
              />
              <path
                id="MAO_TRAS_E_M"
                onClick={() => handlePartClick("bck_17")}
                style={getPartStyle("bck_17")}
                d="M75.834,638.5c-3.168,1.123-14.167,7-17.834,8.5s-5.833,6.5-10.167,9s-8.333,6-9,8.833s-5.5,4.333-5.5,7.333s2,5.333,6.879,6s12.621-8,14.121-9.5s2.5,0.5,1.833,2.333s-5.667,15-6.833,19.834c-1.167,4.833-3.833,17-4.5,21s-3,20.999-3.333,23.999s-3.333,15,1.167,18.334s7.833-2.334,9.833-7.667s1.5-11.833,2.667-14.5s4.333-19,6.333-22.5s2.834,1.166,1.667,4.166c-1.167,3-3.833,16.167-3.833,18.334s-1.833,14-2.5,18s-1.333,14,0,18.167s7.167,1.666,9-0.5c1.833-2.166,3.666-11.167,4.5-16.5c0.833-5.333,1-14.167,2.531-20c1.531-5.833,3.636-16.333,5.469-19.167c1.833-2.834,3.833,0.334,3.333,2.5s-2.333,9.5-4,16.333c-1.666,6.833-1.5,14.5-3,21.334S71.5,764.5,74.667,768s6.5,0.833,8.5-1.667S87.5,753,88.834,744.5c1.333-8.5,4.666-21.166,5.833-25.166c1.167-4.001,3.5-7.834,5.334-7.5c1.833,0.333-0.166,6-1,9.166s-5,20.667-5.166,26.334c-0.167,5.667,2.5,7.833,5.666,6.5s4.333-6,5-8.834c0.666-2.834,2.666-8.666,3.166-12s4.167-16.166,6.167-20.334c2-4.166,2.834-9.332,6.673-27.332C124.346,667.333,122,663,121,659C120.411,656.865,79.5,637.75,75.834,638.5z"
              />
              <path
                id="POSTERIOR_COXA_D_M"
                onClick={() => handlePartClick("bck_18")}
                style={getPartStyle("bck_18")}
                d="M375.167,740.334C376,746.168,375.25,750.5,374,769s3.25,73.25,6.5,86.75s7,38,8.75,56.25c1.093,11.398,3.356,23.087,5.571,32.39c8.43,9.247,24.089,12.271,39.665,11.319c15.283-0.934,32.867-4.996,46.759-24.891c0.889-5.953,1.705-9.622,2.004-10.818c0.75-3,10.75-28,13.5-41.25s4.25-43.083,5.25-58.083s-4.499-54.001-5.833-61.667c-1.334-7.666-3.833-29.666-5.166-35.833s-4.334-21.667-4.834-25.667c-0.218-1.739-1.254-7.511-2.452-14c0,23.5-5.6,24.729-14.134,38.43C450.045,753.294,412.941,780.237,375.167,740.334z"
              />
              <path
                id="POSTERIOR_COXA_E_M"
                onClick={() => handlePartClick("bck_19")}
                style={getPartStyle("bck_19")}
                d="M259.066,720.642c-7.993-12.078-15.316-18.142-15.316-37.142c-1.5,8.5-8.25,43-9.75,54s-3,14.5-7.25,46.75s-1.25,76,2.75,93.5S242.25,914,244.75,927c14.239,23.213,32.047,27.719,48.263,28.709c17.665,1.079,33.441-2.949,40.654-15.376c1.667-5.833,6-44.5,8.167-58s9.5-61.333,10.5-78.667c1-17.334,1-34.999,0.167-40.999s-1.625-16.292-1-21.667C317.235,774.904,279.76,751.914,259.066,720.642z"
              />
              <path
                id="JOELHO_TRAS_D_M"
                onClick={() => handlePartClick("bck_20")}
                style={getPartStyle("bck_20")}
                d="M434.486,955.709c-15.577,0.951-31.235-2.072-39.665-11.319c1.332,5.594,2.646,10.325,3.679,13.61c2.75,8.75,2.25,34.25,5.5,40.5c2.566,4.935,3.723,9.253,3.484,15.155c6.028-4.677,22.368-6.785,36.539-8.198c13.658-1.361,29.354,1.297,35.855,14.047c-1.023-13.899-1.763-29.888-1.628-46.754c0.15-18.787,1.656-32.959,2.996-41.932C467.353,950.713,449.77,954.775,434.486,955.709z"
              />
              <path
                id="JOELHO_TRAS_E_M"
                onClick={() => handlePartClick("bck_21")}
                style={getPartStyle("bck_21")}
                d="M293.013,955.709c-16.216-0.99-34.024-5.496-48.263-28.709c2.5,13,3.25,32.25,4.25,53.5c0.655,13.917-0.085,29.658-1.164,42.445c2.574-20.91,19.107-19.136,35.64-17.488c16.633,1.658,33.267,3.273,35.69,9.876c-1.167-5.5,0.667-11.167,3-16c2.333-4.833,3.167-17.833,4-28.833s5.833-24.334,7.5-30.167C326.455,952.76,310.679,956.788,293.013,955.709z"
              />
              <path
                id="PANTURRILHAD_M"
                onClick={() => handlePartClick("bck_22")}
                style={getPartStyle("bck_22")}
                d="M444.023,1005.457c-14.171,1.413-30.511,3.522-36.539,8.198c-0.064,1.573-0.221,3.253-0.484,5.095c-1.25,8.75-7,65.25-7.5,84.75s7.5,36,10.5,40s3.75,15.5,4,21.75c0.127,3.173,1.801,16.722,3.81,30.928c5.639,7.736,15.869,11.903,25.567,11.521c11.76-0.464,25.932-3.604,30.46-12.624c0.124-3.28,0.257-6.378,0.413-9.074c0.75-13,4.75-46.75,7.5-74s3-44.75,1-62.25c-0.92-8.055-2-18.392-2.872-30.246C473.377,1006.754,457.682,1004.096,444.023,1005.457z"
              />
              <path
                id="PANTURRILHA_E_M"
                onClick={() => handlePartClick("bck_23")}
                style={getPartStyle("bck_23")}
                d="M283.476,1005.457c-16.533-1.647-33.066-3.422-35.64,17.488c-0.569,6.737-1.232,12.655-1.836,17.055c-1.75,12.75-5,46-2.5,60s8.75,70.5,9,91.75c2.411,11.598,18.52,15.432,31.624,15.948c13.165,0.52,23.325-2.338,25.624-16.146c1.52-12.183,2.896-25.104,3.086-31.552c0.333-11.333,8.333-24,12.833-37.334s0.5-46.666-1.167-65.5s-4.167-36.333-5.333-41.833C316.743,1008.729,300.109,1007.115,283.476,1005.457z"
              />
              <path
                id="TORNOZELO_TRAS_D_M"
                onClick={() => handlePartClick("bck_24")}
                style={getPartStyle("bck_24")}
                d="M443.377,1207.698c-9.697,0.383-19.927-3.784-25.567-11.521c1.949,13.775,4.213,28.17,5.691,34.323c3,12.5,1,17.833-1.833,26.667s-2.334,14.333-1.334,21.999s0.667,17.5,0.5,24.5c-0.097,4.075-2.111,11.312-2.63,18.029c5.397-8.651,37.767-2.677,48.526,9.038c0.54-0.488,1.031-0.948,1.458-1.357c0.771-4.053,1.114-8.488,0.792-12.721c-0.999-13.15-1.991-21.145,2.987-33.769c-0.096-0.073-0.193-0.146-0.301-0.221C469.5,1281.167,470,1270,470,1261s1.25-24.25,2.25-32c0.792-6.143,1.114-21.391,1.587-33.926C469.309,1204.095,455.137,1207.234,443.377,1207.698z"
              />
              <path
                id="TORNOZELO_TRAS_E_M"
                onClick={() => handlePartClick("bck_25")}
                style={getPartStyle("bck_25")}
                d="M284.124,1207.698c-13.104-0.517-29.212-4.351-31.624-15.948c0.25,21.25,4.125,51.5,4.25,58.125s-1.25,26.75-1,28.625s0.25,3.75-0.875,3.75c6.082,14.415,4.342,25.212,3.644,34.406c-0.388,5.104,0.181,9.513,1.315,14.177c10.5-13.499,47.957-20.15,48.229-7.491c-0.177-6.154-1.244-13.505-2.062-20.509c-1.5-12.834,1.833-27.333,2.167-31.167s-4.5-18.5-5.833-25.5s2.167-19.166,4.167-31.333c0.862-5.245,2.096-14.051,3.247-23.281C307.448,1205.36,297.289,1208.218,284.124,1207.698z"
              />
              <path
                id="SOLA_PE_D_M"
                onClick={() => handlePartClick("bck_26")}
                style={getPartStyle("bck_26")}
                d="M418.204,1321.696c-0.372,4.823,0.025,9.38,2.463,12.305c6.573,7.889,13.334,10.333,26.667,7.166c9.395-2.231,15.716-7.104,19.396-10.433C455.971,1319.02,423.602,1313.045,418.204,1321.696z"
              />
              <path
                id="SOLA_PE_E_M"
                onClick={() => handlePartClick("bck_27")}
                style={getPartStyle("bck_27")}
                d="M259.833,1330.833C262.167,1333,272.5,1340,283,1342.512s19.167-1.512,23-7.179c1.741-2.574,2.21-6.868,2.062-11.991C307.79,1310.683,270.333,1317.334,259.833,1330.833z"
              />
              <path
                id="PE_TRAS_D_M"
                onClick={() => handlePartClick("bck_28")}
                style={getPartStyle("bck_28")}
                d="M468.981,1316.656c0.321,4.232-0.021,8.668-0.792,12.721c0.792-0.758,1.396-1.358,1.812-1.71c2.167-1.834,16-5.666,21.5-7.5s7.333-7.166,7.666-10.166c0.333-3,0.5-2.667,1.834-5.834c1.334-3.167-5.167-7.5-6-7.5s-2,0-2-1.5s-3.667-4.333-5.167-4.333s-3-1-3.5-2.5s-6.667-3.833-8.833-3.5c-2.058,0.316-1.715-0.571-3.533-1.946C466.991,1295.512,467.982,1303.506,468.981,1316.656z"
              />
              <path
                id="PE_TRAS_E_M"
                onClick={() => handlePartClick("bck_29")}
                style={getPartStyle("bck_29")}
                d="M258.519,1316.656c0.699-9.194,2.438-19.991-3.644-34.406c-1.125,0-2.875,1.375-3.125,2.625s-2.375,0.625-4,0.125s-6.625,4.5-6.75,5.125s-0.25,1.25-2.25,1.125s-5.75,3.125-5.875,4.125s-1.208,1.792-2.875,1.958s-4.167,3-5.167,5.334s0.834,4.833,1.667,9.166s6.666,9.333,18.833,12.167c12.167,2.834,12.167,4.666,14.5,6.833C258.699,1326.169,258.13,1321.761,258.519,1316.656z"
              />
              <path
                id="CABECA_TRAS_F"
                onClick={() => handlePartClick("bck_28")}
                style={getPartStyle("bck_28")}
                d="M1126.355,199.415c0.778-1.884,1.421-3.543,1.734-4.601c8.91-30.064,10.593-68.02,7.453-84.763c-7.043-37.551-26.043-49.365-55.076-49.365c-24.545,0-45.633,15.813-51.082,50.793c-0.606,3.894-0.719,18.188-0.385,24.688s5.166,38.333,6.5,51.166c0.402,3.875,1.295,7.531,2.367,10.834C1052.742,213.064,1109.674,213.289,1126.355,199.415z"
              />
              <path
                id="PESCOCO_TRAS_F"
                onClick={() => handlePartClick("bck_29")}
                style={getPartStyle("bck_29")}
                d="M1159.289,256.58c-24.708-4.058-43.898-6.108-38.521-44.124c0.075-0.529,3.383-7.698,5.588-13.041c-16.682,13.874-73.613,13.649-88.488-1.248c2.479,7.635,5.935,13.355,6.633,15.333c1,2.833,1.101,23.757-0.833,27.333c-4.764,8.81-20.45,14.072-36.136,16.957C1032.887,261.835,1137.844,261.565,1159.289,256.58z"
              />
              <path
                id="COSTAS_F"
                onClick={() => handlePartClick("bck_30")}
                style={getPartStyle("bck_30")}
                d="M1187.059,352.366c1.042-6.596,4.563-15.113,6.822-24.408c1.684-6.926,2.669-14.283,1.402-21.604c-1.211-6.999-8.583-33.088-27.918-48.359c-2.739-0.525-5.439-0.982-8.076-1.415c-21.445,4.984-126.402,5.255-151.758,1.211c-2.954,0.544-5.905,1.001-8.786,1.383c-20.906,14.732-28.538,41.156-28.639,52.963c-0.052,6.076,0.717,11.467,1.741,16.199c1.65,7.623,3.969,13.524,4.623,17.745c0.935,6.021,4.099,12.505,3.347,30.31c0.695-0.762,1.361-0.074,1.599,1.775c0.334,2.583,0.414,8.647,0.584,14.167c0.834,27.167,8.25,62.417,10.5,74.417c0.864,4.607,2.134,12.61,3.412,21.707c12.51,3.593,36.984,6.452,64.054,7.054c8.353,0.186,16.95-1.671,25.52-1.713c8.629-0.043,17.228,1.729,25.513,1.458c24.939-0.817,47.03-3.692,58.604-7.104c0.909-7.375,1.759-13.759,2.148-15.152c1.348-4.822,7.622-41.454,8.5-45.25c2.354-10.18,2.502-27.106,3.25-30c0.749-2.893,0.702-21.669,1.75-21.75c0.085-0.006,0.299,0.349,0.618,0.999C1185.572,369.207,1185.675,361.114,1187.059,352.366z"
              />
              <path
                id="LOMBAR_F"
                onClick={() => handlePartClick("bck_31")}
                style={getPartStyle("bck_31")}
                d="M1085.485,493.798c-8.569,0.042-17.167,1.899-25.52,1.713c-27.069-0.602-51.544-3.461-64.054-7.054c2.051,14.595,4.126,32.012,4.588,42.793c0.75,17.5-3,26-8.75,39.25c-2.334,5.377-6.521,15.532-11.106,27.505c12.579-6.673,39.644-11.567,58.938-11.567c26.518,0,27.865,9.913,46.273,9.913c17.061,0,23.347-9.685,46.269-9.805c19.26-0.1,44.073,7.602,54.368,15.691c-3.005-8.806-5.877-17.667-8.825-23.904c-4.333-9.167-11.751-27.5-12.667-31.583c-1.039-4.633,0.9-27.839,1.5-32.5c0.354-2.753,1.789-15.457,3.102-26.098c-11.573,3.412-33.664,6.287-58.604,7.104C1102.713,495.527,1094.114,493.755,1085.485,493.798z"
              />
              <path
                id="NADEGAS_F"
                onClick={() => handlePartClick("bck_32")}
                style={getPartStyle("bck_32")}
                d="M1085.855,596.351c-18.408,0-19.756-9.913-46.273-9.913c-19.295,0-46.359,4.894-58.938,11.567c-6.713,17.528-14.281,38.953-18.144,54.995c-5.731,23.808-6.991,46.636-7.209,63.701c29.158,39.25,78.172,59.463,116.954,24c0.208-1.105,0.721-1.672,1.672-2.2c1.5-0.834,5.25-6.916,6.25-8.75c1-1.834-0.5-4.25,2.667-4.25c3.166,0,2.166,2.167,3.083,4.417s5.25,6.833,6.75,9.25c0.244,0.393,0.419,0.7,0.55,0.957c38.418,35.821,87.089,16.505,116.521-22.031c-0.555-18.68-3.029-36.468-5.238-50.094c-3-18.5-9-41.667-13.666-53.667c-1.491-3.835-2.932-7.959-4.342-12.096c-10.295-8.089-35.108-15.792-54.368-15.691C1109.202,586.666,1102.916,596.351,1085.855,596.351z"
              />
              <path
                id="OMBRO_TRAS_D_F"
                onClick={() => handlePartClick("bck_33")}
                style={getPartStyle("bck_33")}
                d="M1195.283,306.354c1.267,7.32,0.281,14.678-1.402,21.604c15.378,16.313,36.147,29.67,48.012,42.064c-2.872-15.51-2.674-29.3-12.393-66.522c-9.696-37.136-34.926-40.147-61.182-45.321c-0.318-0.063-0.636-0.124-0.953-0.184C1186.7,273.266,1194.072,299.356,1195.283,306.354z"
              />
              <path
                id="OMBRO_TRAS_E_F"
                onClick={() => handlePartClick("bck_34")}
                style={getPartStyle("bck_34")}
                d="M971.848,328.337c-1.024-4.732-1.793-10.124-1.741-16.199c0.101-11.807,7.732-38.231,28.639-52.963c-3.144,0.418-6.204,0.747-9.079,0.993c-19.5,1.667-29.999,7.167-40.666,17.667s-12.833,29-16.5,42.167s-6.166,32.833-8.666,47.667c-0.186,1.098-0.394,2.236-0.618,3.4C934.8,358.473,956.07,344.937,971.848,328.337z"
              />
              <path
                id="BRACO_TRAS_D_F"
                onClick={() => handlePartClick("bck_35")}
                style={getPartStyle("bck_35")}
                d="M1251.415,486.132c8.355-3.299,16.792-6.843,19.493-19.357c-2.969-9.552-5.826-22.777-10.408-36.525c-2.616-7.848-10.031-27.096-16.289-50.052c-0.987-3.621-1.719-6.936-2.318-10.176c-11.864-12.394-32.634-25.751-48.012-42.064c-2.26,9.295-5.78,17.813-6.822,24.408c-1.384,8.748-1.486,16.841-1.19,24.633c3.607,7.351,20.851,53.065,21.882,55.501c1.122,2.652,13.73,35.901,15.75,40c0.62,1.258,1.399,3.698,2.203,6.554C1232.26,487.68,1241.016,490.238,1251.415,486.132z"
              />
              <path
                id="BRACO_TRAS_E_F"
                onClick={() => handlePartClick("bck_36")}
                style={getPartStyle("bck_36")}
                d="M976.471,346.082c-0.654-4.221-2.973-10.122-4.623-17.745c-15.777,16.6-37.048,30.136-48.632,42.729c-2.809,14.561-8.512,33.735-12.216,43.767c-4,10.833-11.333,33.333-15.333,47.333c-0.271,0.947-0.549,1.88-0.832,2.804c2.254,13.99,11.088,17.709,19.832,21.162c9.813,3.874,18.164,1.82,24.583-5.67c2.101-7.862,12.472-30.725,17.084-43.129c4.833-13,21.75-56.583,22.666-59.333c0.261-0.782,0.541-1.306,0.817-1.608C980.569,358.587,977.405,352.102,976.471,346.082z"
              />
              <path
                id="COTOVELO_TRAS_D_F"
                onClick={() => handlePartClick("bck_37")}
                style={getPartStyle("bck_37")}
                d="M1260.719,517.093c17.666-5.388,26.376-3.416,31.051,0.222c-3.516-10.317-7.056-17.939-8.02-19.565c-1.571-2.652-5.5-13.5-10-23.25c-0.994-2.155-1.924-4.77-2.842-7.725c-2.701,12.514-11.138,16.058-19.493,19.357c-10.399,4.106-19.155,1.547-25.712-7.079c1.814,6.445,3.757,15.015,4.297,16.946c1.396,4.992,3.128,13.186,4.25,18.25c0.746,3.363,1.607,9.433,4.883,20.598C1241.495,525.172,1254.375,519.027,1260.719,517.093z"
              />
              <path
                id="COTOVELO_TRAS_E_F"
                onClick={() => handlePartClick("bck_38")}
                style={getPartStyle("bck_38")}
                d="M914.667,486.132c-8.744-3.453-17.578-7.172-19.832-21.162c-3.906,12.737-8.94,23.293-12.669,31.529c-2.147,4.742-5.686,12.941-8.969,21.789c4.363-4.216,12.979-7.047,32.166-1.196c6.256,1.908,18.88,7.908,21.492,17.355c2.269-8.254,4.666-21.363,6.145-25.947c1.666-5.167,4.666-20.333,6-27c0.061-0.306,0.149-0.66,0.25-1.038C932.831,487.953,924.479,490.006,914.667,486.132z"
              />
              <path
                id="ANTEBRACO_TRAS_D_F"
                onClick={() => handlePartClick("bck_39")}
                style={getPartStyle("bck_39")}
                d="M1313.271,621.668c-6.903-23.147-12.489-67.07-15.521-82.418c-1.548-7.837-3.76-15.422-5.98-21.935c-4.675-3.638-13.385-5.609-31.051-0.222c-6.344,1.934-19.224,8.08-21.586,17.755c1.655,5.645,3.927,12.588,7.117,21.152c9.197,24.688,23.002,50.249,35.914,77.07c0.09,0.187,0.26,0.683,0.494,1.392c5.866-0.635,13.676-2.687,18.501-4.877C1307.249,626.819,1311.627,624.546,1313.271,621.668z"
              />
              <path
                id="ANTEBRACO_TRAS_E_F"
                onClick={() => handlePartClick("bck_40")}
                style={getPartStyle("bck_40")}
                d="M905.363,517.093c-19.187-5.851-27.803-3.02-32.166,1.196c-2.832,7.635-5.474,15.751-6.863,22.545c-3,14.667-3.834,31.167-6.167,46.5c-1.317,8.659-4.655,21.356-8.076,31.76c0.04,4.225,5.042,6.953,12.832,10.491c4.603,2.09,11.921,4.052,17.679,4.78c5.512-11.326,14.676-28.423,20.898-41.531c7.833-16.5,20-47.833,22.5-55.5c0.281-0.864,0.567-1.838,0.855-2.886C924.243,525,911.619,519,905.363,517.093z"
              />
              <path
                id="PUNHO_TRAS_D_F"
                onClick={() => handlePartClick("bck_41")}
                style={getPartStyle("bck_41")}
                d="M1315.5,628.25c-0.757-1.922-1.5-4.138-2.229-6.582c-1.644,2.878-6.021,5.151-12.111,7.916c-4.825,2.191-12.635,4.242-18.501,4.877c0.587,1.78,1.59,4.951,2.842,8.288c1.156,3.081,2.127,7.941,2.679,12.28c7.985-5.969,25.61-13.901,37.272-15.479C1321.674,637.721,1318.034,634.687,1315.5,628.25z"
              />
              <path
                id="PUNHO_TRAS_E_F"
                onClick={() => handlePartClick("bck_42")}
                style={getPartStyle("bck_42")}
                d="M852.091,619.094c-2.638,8.02-5.324,14.679-7.175,17.073c-0.801,1.037-2.903,2.156-5.535,3.241c10.734,1.056,27.465,8.22,36.476,14.186c0.177-2.485,0.761-5.597,3.311-11.76c0.822-1.987,2.008-4.538,3.435-7.469c-5.758-0.728-13.076-2.69-17.679-4.78C857.133,626.047,852.131,623.319,852.091,619.094z"
              />
              <path
                id="MAO_TRAS_D_F"
                onClick={() => handlePartClick("bck_43")}
                style={getPartStyle("bck_43")}
                d="M1364,661.25c-2.167-1.833-3.25-5.75-5.166-6.583c-4.294-1.868-5.833-3.5-10.167-5.667c-2.845-1.422-7.706-4.102-16-6.833c-2.291-0.755-4.781-1.438-7.216-2.616c-11.662,1.579-29.287,9.511-37.272,15.479c0.284,2.231,0.459,4.328,0.487,5.97c0.083,4.833,2.75,18,3.25,22.417s0.501,11.75,3.001,17.583s1.5,11.084,3.333,14.084s2.25,6.25,5.167,11.333s5.166,5.583,6.416,2.166s0-8.167-0.833-9.917s-1.917-7.582-2.334-10.416s-1.583-7.583-0.75-9.833s3.167,2.417,3.334,4.5s1.416,12.333,2.083,16.333s2.25,14.083,3.417,19.083s4.5,8.584,6.833,7.084s2.75-6.834,2.583-9.084s-1.416-12.499-1.583-15.583s-1.666-15.75-1.916-17.5s2.25-1.583,2.75,0.584c0.5,2.166,2.083,9.583,2.833,13c0.75,3.416,2.916,15.416,3.666,21.666s4.917,10.25,7.5,10.417s3.084-6.667,3.167-9.167s-1-12.5-1.5-15.333s-4.25-24.833-3.167-24.833s3.584,14.75,4.834,21.25s2.75,13,6.667,13.083s3.25-4.833,3.416-12.75s-0.75-13.917-2.333-25.25s-3.333-17.917-4.417-22s-3.166-10.75-2.083-12.583s7.5,1.667,11.333,5.167s10.834,4.5,13.25,2.5S1366.167,663.083,1364,661.25z"
              />
              <path
                id="MAO_TRAS_E_F"
                onClick={() => handlePartClick("bck_44")}
                style={getPartStyle("bck_44")}
                d="M824.75,644.167c-5.917,1.667-7.083,4.167-11.833,6.417s-9.75,6.167-10.417,7.25s-2.75,2.917-5.166,5.667c-2.417,2.75-0.834,5.583,1.833,6.417s7.75-0.5,11.25-3.333s6.75-4.667,9.167-5.75c2.416-1.083,3.416,0.417,3.666,2.083s-2.583,9.583-4,14s-1.416,6.833-1.916,10.5s-2.584,12.917-3.25,17.667c-0.667,4.75-1.418,14.416-1.5,19.25c-0.084,4.834,0.832,8.75,3.332,9.083s4.584-2,5.334-5.667s2.5-10.084,2.916-13.834c0.417-3.75,2.584-12.666,3.084-14.332c0.5-1.667,2.084-1.084,1.834,0.35c-0.25,1.435-1,5.482-1.5,8.15c-0.5,2.666-2.417,13.5-3.084,17.166s-1.5,14-1.334,18.167c0.167,4.167,2.834,6,5.168,4.833c2.333-1.167,4.582-6.5,5.332-10.75s2.168-10,3-15.25c0.834-5.25,2.918-15.083,4-18.583c1.084-3.5,2.418-0.917,2.334,0.917c-0.084,1.833-0.834,4.333-1,8.916s-1,15.584-1.5,19.834s-1.416,11,1.584,12.166s5.166-2.5,6.416-6.166c1.25-3.666,2.417-12.084,3.417-16.75c1-4.667,2.083-15.334,2.833-18.834s2.084-6.25,2.917-5.666c0.833,0.583,0.75,3.916,0,7.583s-1.667,9.75-2.667,13.5s-3.25,10.083,0,11.417c3.25,1.334,5.584-3.917,7-7.584s2.917-6.416,4.084-11c1.166-4.584,1.666-3.375,3.416-12.066c1.75-8.69,1.375-11.309,3.125-21.059s2.709-17.208,3.041-21.208c0.121-1.45,0.091-2.661,0.19-4.074c-9.011-5.966-25.741-13.13-36.476-14.186C834.767,641.309,828.518,643.106,824.75,644.167z"
              />
              <path
                id="POSTERIOR_COXA_D_F"
                onClick={() => handlePartClick("bck_45")}
                style={getPartStyle("bck_45")}
                d="M1093.217,740.125c0.668,1.323,0.02,1.214-0.05,3.376c-0.083,2.583-0.833,6.832-0.333,16.332s3,33.5,6.166,48.667s3.5,45.5,3.166,59.333c-0.333,13.833-1.832,43.333-2,53c-0.1,5.755,0.215,21.138,0.662,35.072c8.068,8.272,22.294,10.98,36.449,10.092c13.415-0.841,28.719-4.327,41.309-20.48c1.438-8.746,2.678-16.652,3.081-21.016c1-10.833,4.5-31.167,6.5-44.667s9.166-56.5,11.5-71.5s8.333-44.334,9.833-70c0.396-6.763,0.437-13.557,0.238-20.24C1180.306,756.63,1131.635,775.946,1093.217,740.125z"
              />
              <path
                id="POSTERIOR_COXA_E_F"
                onClick={() => handlePartClick("bck_46")}
                style={getPartStyle("bck_46")}
                d="M955.291,716.701c-0.029,2.288-0.041,4.48-0.041,6.549c0,17.5,1.75,35.25,3.75,48s13.25,79.25,16,96.25c2.169,13.408,7.447,52.006,11.381,76.551c12.795,17.416,28.61,21.08,42.423,21.946c13.647,0.857,27.359-1.631,35.557-9.223c0.568-15.524,0.901-32.5,0.64-40.274c-0.5-14.833-2.25-56-2.125-67.875s2.625-35,4.25-43.75s4.959-31.457,5.209-41.624c0.25-10.167,0-17-0.167-20c-0.062-1.098-0.042-1.912,0.078-2.55C1033.463,776.164,984.449,755.951,955.291,716.701z"
              />
              <path
                id="JOELHO_TRAS_D_F"
                onClick={() => handlePartClick("bck_47")}
                style={getPartStyle("bck_47")}
                d="M1137.277,965.997c-14.155,0.889-28.381-1.82-36.449-10.092c0.304,9.472,0.668,18.274,1.006,22.928c0.833,11.5,5.832,24.167,5.832,40.667c0,3.606-0.085,6.959-0.251,10.211c5.991-5.396,22.928-10.366,35.706-11.734c11.358-1.217,24.285,0.893,30.771,10.977c-0.72-4.93-1.486-9.509-2.059-13.453c-1.5-10.333-0.334-21.167,1.166-34.334c0.896-7.864,3.456-22.682,5.586-35.65C1165.996,961.67,1150.692,965.156,1137.277,965.997z"
              />
              <path
                id="JOELHO_TRAS_E_F"
                onClick={() => handlePartClick("bck_48")}
                style={getPartStyle("bck_48")}
                d="M1028.804,965.997c-13.813-0.866-29.628-4.53-42.423-21.946c1.054,6.575,2.012,12.146,2.786,15.949c3.667,18,2.667,23.833,4.167,33s0.833,17.5-1.667,33.5c-0.191,1.223-0.35,2.636-0.485,4.176c6.072-11.57,19.8-13.982,31.779-12.699c12.366,1.323,28.625,6.021,35.092,11.214c-0.223-4.039-0.335-7.883-0.386-11.357c-0.167-11.5,3.5-22.5,4.833-30.333c0.635-3.727,1.344-16.629,1.86-30.726C1056.163,964.366,1042.451,966.854,1028.804,965.997z"
              />
              <path
                id="PANTURRILHA_D_F"
                onClick={() => handlePartClick("bck_49")}
                style={getPartStyle("bck_49")}
                d="M1143.121,1017.977c-12.778,1.368-29.715,6.339-35.706,11.734c-0.594,11.627-2.289,21.885-5.415,37.122c-4,19.5-2.166,39.5-0.166,53.834s3,38.5,6.166,63.5c0.523,4.132,1.001,8.069,1.438,11.864c4.719,8.662,14.691,13.389,24.104,12.99c8.9-0.377,19.338-2.587,24.836-8.479c3.605-15.573,7.638-32.348,9.79-44.542c4-22.666,5.5-50.667,5.5-59.167s2.166-28.333,2.333-42.333c0.104-8.655-0.94-17.563-2.107-25.547C1167.406,1018.87,1154.479,1016.76,1143.121,1017.977z"
              />
              <path
                id="PANTURRILHA_E_F"
                onClick={() => handlePartClick("bck_50")}
                style={getPartStyle("bck_50")}
                d="M991.182,1030.676c-1.645,18.618,0.485,58.332,0.485,68.491c0,11,3.167,52.833,8,69.666c2.067,7.199,4.53,18.583,6.868,30.301c5.065,6.956,16.429,9.481,26.006,9.888c9.072,0.384,18.664-3.994,23.571-12.067c0.954-9.137,1.891-17.886,2.388-23.787c1.333-15.833,6.334-57.667,7-66.834s-0.166-34.5-3.5-48c-2.326-9.421-3.433-19.813-3.947-29.143c-6.467-5.192-22.726-9.891-35.092-11.214C1010.981,1016.693,997.254,1019.106,991.182,1030.676z"
              />
              <path
                id="TORNOZELO_TRAS_D_F"
                onClick={() => handlePartClick("bck_51")}
                style={getPartStyle("bck_51")}
                d="M1109.438,1196.031c2.207,19.166,3.259,34.28,2.563,47.636c-0.408,7.827-3.25,15-5.416,22.25c-2.167,7.25-0.167,12.749,1.166,16.666s1.584,7,0.584,11.5s1.25,14.084,1.416,19.084c0.101,3.019,0.029,7.617,1.324,12.31c5.011-8.101,30.007-8.45,35.653,6.138c0.716-0.778,1.365-1.59,1.947-2.401c0.425-6.792,0.573-15.504,0.342-18.777c-0.809-11.434-1.615-18.82,1.506-29.082c-0.119-0.115-0.241-0.226-0.355-0.353c-1.5-1.667-1-7.333-1.333-10.667s0.5-18.833,2.666-36c1.001-7.932,3.781-20.418,6.877-33.791c-5.498,5.892-15.936,8.102-24.836,8.479C1124.129,1209.42,1114.156,1204.693,1109.438,1196.031z"
              />
              <path
                id="TORNOZELO_TRAS_E_F"
                onClick={() => handlePartClick("bck_52")}
                style={getPartStyle("bck_52")}
                d="M1032.541,1209.021c-9.577-0.406-20.94-2.932-26.006-9.888c3.129,15.682,6.034,31.961,7.465,39.616c2.5,13.375,2.667,35.916,2.084,40c-0.144,1.009-0.375,1.654-0.679,2.092c3.308,10.532,2.482,17.97,1.66,29.594c-0.249,3.515-0.06,13.297,0.44,20.242c0.507,0.56,1.034,1.105,1.598,1.626c4.882-14.596,28.534-15.045,35.094-7.896c1.65-5.945,1.032-11.148,2.053-18.408c1.125-8-0.125-13.125-0.5-16.625s1.875-5.125,3.375-12.125s-1.125-12.875-3-19.625s-2.458-13.625-2.958-22.959c-0.313-5.855,1.34-22.334,2.945-37.712C1051.205,1205.027,1041.613,1209.405,1032.541,1209.021z"
              />
              <path
                id="SOLA_PE_D_F"
                onClick={() => handlePartClick("bck_53")}
                style={getPartStyle("bck_53")}
                d="M1111.074,1325.477c0.85,3.079,2.283,6.199,4.76,8.939c6.25,6.916,20.083,3.834,25.833,1.084c1.966-0.94,3.644-2.342,5.061-3.886C1141.081,1317.026,1116.085,1317.376,1111.074,1325.477z"
              />
              <path
                id="SOLA_PE_E_F"
                onClick={() => handlePartClick("bck_54")}
                style={getPartStyle("bck_54")}
                d="M1019.104,1332.304c4.011,3.708,9.41,6.354,16.021,6.821c10.625,0.75,16.125-6.125,18.5-12.875c0.22-0.625,0.403-1.236,0.572-1.842C1047.638,1317.259,1023.985,1317.708,1019.104,1332.304z"
              />
              <path
                id="PE_TRAS_D_F"
                onClick={() => handlePartClick("bck_55")}
                style={getPartStyle("bck_55")}
                d="M1149.017,1310.436c0.231,3.273,0.083,11.985-0.342,18.777c1.638-2.285,2.762-4.545,3.409-5.88c1.334-2.75,9.5-11.333,12.75-14.916s2.499-5.084,2.499-7.084s2-2,2.5-5.333s-1.833-4.833-2.916-5.583s-4.084-0.75-4.25-1.417s-1.25-1.917-3.167-2.917s-4,0.667-4.917-1.083c-0.847-1.617-2.613-2.247-4.061-3.646C1147.401,1291.615,1148.208,1299.002,1149.017,1310.436z"
              />
              <path
                id="PE_TRAS_E_F"
                onClick={() => handlePartClick("bck_56")}
                style={getPartStyle("bck_56")}
                d="M1017.065,1310.436c0.822-11.624,1.647-19.062-1.66-29.594c-0.925,1.334-2.522,0.714-4.405,2.408c-1.34,1.206-1.584,2.583-3.834,2.667s-4.666,2.25-5.5,3.75c-0.833,1.5-2.749,0.25-4.916,1.416s-3,3.667-2.416,6.25c0.583,2.583,2.333,3.25,2.416,4.917s1,4.25,3.75,7.75s9.25,7.25,12.875,14.625c1.053,2.142,2.442,4.193,4.131,6.053C1017.006,1323.732,1016.816,1313.95,1017.065,1310.436z"
              />
            </svg>
          )}
          <div className="clear"></div>
          <div style={{ textAlign: "center" }}>
            <button
              onClick={() => setIsFront(!isFront)}
              style={{
                padding: "6px",
                color: "#333",
                border: "none",
                cursor: "pointer",
                display: "block",
                margin: "0 auto",
                alignItems: "center",
                justifyContent: "center",
                width: "28px",
                height: "28px",
              }}
              title={isFront ? "Ver Vista Traseira" : "Ver Vista Frontal"}
            >
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8"></path>
                <path d="M21 3v5h-5"></path>
                <path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16"></path>
                <path d="M8 16H3v5"></path>
                <circle cx="12" cy="12" r="1"></circle>
              </svg>
            </button>
          </div>
        </div>
        <BodyPartModal
          show={showHeadModal}
          title={headPartId ? partNames[headPartId] : "Selecione a parte atingida:"}
          options={currentHeadOptions}
          selectedOption={selectedHeadOption}
          onOptionChange={setSelectedHeadOption}
          onSelect={handleSubpartSelect}
          onRemove={handleRemoveHead}
          onCancel={() => {
            setShowHeadModal(false);
            setHeadPartId(null);
            setSelectedHeadOption("");
          }}
        />
        <BodyPartModal
          show={showAbdomenModal}
          title={abdomenPartId ? partNames[abdomenPartId] : "Selecione a parte atingida:"}
          options={abdomenOptions}
          selectedOption={selectedAbdomenOption}
          onOptionChange={setSelectedAbdomenOption}
          onSelect={handleAbdomenSelect}
          onRemove={handleRemoveAbdomen}
          onCancel={() => {
            setShowAbdomenModal(false);
            setAbdomenPartId(null);
            setSelectedAbdomenOption("");
          }}
        />
        <BodyPartModal
          show={showLeftHandModal}
          title={leftHandPartId ? partNames[leftHandPartId] : "Selecione a parte atingida:"}
          options={leftHandOptions}
          selectedOption={selectedLeftHandOption}
          onOptionChange={setSelectedLeftHandOption}
          onSelect={handleLeftHandSelect}
          onRemove={handleRemoveLeftHand}
          onCancel={() => {
            setShowLeftHandModal(false);
            setLeftHandPartId(null);
            setSelectedLeftHandOption("");
          }}
        />
        <BodyPartModal
          show={showRightHandModal}
          title={rightHandPartId ? partNames[rightHandPartId] : "Selecione a parte atingida:"}
          options={rightHandOptions}
          selectedOption={selectedRightHandOption}
          onOptionChange={setSelectedRightHandOption}
          onSelect={handleRightHandSelect}
          onRemove={handleRemoveRightHand}
          onCancel={() => {
            setShowRightHandModal(false);
            setRightHandPartId(null);
            setSelectedRightHandOption("");
          }}
        />
        <BodyPartModal
          show={showRightFootModal}
          title={rightFootPartId ? partNames[rightFootPartId] : "Selecione a parte atingida:"}
          options={rightFootOptions}
          selectedOption={selectedRightFootOption}
          onOptionChange={setSelectedRightFootOption}
          onSelect={handleRightFootSelect}
          onRemove={handleRemoveRightFoot}
          onCancel={() => {
            setShowRightFootModal(false);
            setRightFootPartId(null);
            setSelectedRightFootOption("");
          }}
        />
        <BodyPartModal
          show={showLeftFootModal}
          title={leftFootPartId ? partNames[leftFootPartId] : "Selecione a parte atingida:"}
          options={leftFootOptions}
          selectedOption={selectedLeftFootOption}
          onOptionChange={setSelectedLeftFootOption}
          onSelect={handleLeftFootSelect}
          onRemove={handleRemoveLeftFoot}
          onCancel={() => {
            setShowLeftFootModal(false);
            setLeftFootPartId(null);
            setSelectedLeftFootOption("");
          }}
        />
      </div>
    </>
  );
};

export default BodyDiagram;
