"use client";

import { CV } from "@/types/cv";
import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useRef,
  useEffect,
} from "react";
export type TemplateType = "modern" | "classic" | "minimal";

// Import html2pdf dynamically only on client side
let html2pdf: typeof import("html2pdf.js");

interface CVContextType {
  cv: CV;
  updateCV: <K extends keyof CV>(key: K, value: CV[K]) => void;
  saveCv: () => Promise<void>;
  exportPDF: () => Promise<void>;
  previewRef: React.RefObject<HTMLDivElement | null>;
  selectedTemplate: TemplateType;
  setSelectedTemplate: (template: TemplateType) => void;
}

const defaultCV: CV = {
  personalInfo: {
    fullName: "",
    email: "",
    phone: "",
    location: "",
  },
  education: [],
  experience: [],
  skills: [],
  projects: [],
};

const LOCAL_STORAGE_KEY = "cv_builder_data";

interface StoredData {
  cv: CV;
  selectedTemplate: TemplateType;
}

// Helper function to get initial data
const getInitialData = (): StoredData => {
  if (typeof window === "undefined") {
    return {
      cv: defaultCV,
      selectedTemplate: "modern",
    };
  }

  try {
    const storedData = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (storedData) {
      return JSON.parse(storedData) as StoredData;
    }
  } catch (error) {
    console.error("Error loading CV from localStorage:", error);
  }

  return {
    cv: defaultCV,
    selectedTemplate: "modern",
  };
};

export const CVContext = createContext<CVContextType | undefined>(undefined);

export function CVProvider({ children }: { children: ReactNode }) {
  const initialData = getInitialData();
  const [cv, setCV] = useState<CV>(initialData.cv);
  const [selectedTemplate, setSelectedTemplate] = useState<TemplateType>(
    initialData.selectedTemplate
  );
  const previewRef = useRef<HTMLDivElement>(null);

  // Auto-save effect
  useEffect(() => {
    if (typeof window === "undefined") return;

    const saveData = () => {
      try {
        const dataToStore: StoredData = {
          cv,
          selectedTemplate,
        };
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(dataToStore));
      } catch (error) {
        console.error("Error auto-saving CV to localStorage:", error);
      }
    };

    // Save whenever cv or template changes
    saveData();
  }, [cv, selectedTemplate]);

  const updateCV = <K extends keyof CV>(key: K, value: CV[K]) => {
    setCV((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const saveCv = async () => {
    if (typeof window === "undefined") {
      console.error("Cannot save CV during server-side rendering");
      return;
    }

    try {
      const dataToStore: StoredData = {
        cv,
        selectedTemplate,
      };
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(dataToStore));
      // Display save confirmation
      alert("CV saved successfully!");
    } catch (error) {
      console.error("Error saving CV to localStorage:", error);
      alert("Error saving CV. Please try again.");
    }
  };
  const exportPDF = async () => {
    if (typeof window === "undefined") {
      console.error("Cannot export PDF during server-side rendering");
      return;
    }

    if (!previewRef.current) {
      console.error("Preview reference not found");
      return;
    }

    try {
      // Dynamically import html2pdf only on client side
      if (!html2pdf) {
        const importedModule = await import("html2pdf.js");
        html2pdf = importedModule.default;
      }

      const element = previewRef.current;
      const opt = {
        margin: 0.5,
        filename: `${cv?.personalInfo?.fullName || "CV"}-${
          new Date().toISOString().split("T")[0]
        }.pdf`,
        image: { type: "jpeg", quality: 0.98 },
        html2canvas: {
          scale: 2,
          useCORS: true,
          letterRendering: true,
        },
        jsPDF: {
          unit: "in",
          format: "a4",
          orientation: "portrait",
        },
      };

      await html2pdf().set(opt).from(element).save();
    } catch (error) {
      console.error("Error generating PDF:", error);
    }
  };

  return (
    <CVContext.Provider
      value={{
        cv,
        updateCV,
        saveCv,
        exportPDF,
        previewRef,
        selectedTemplate,
        setSelectedTemplate,
      }}
    >
      {children}
    </CVContext.Provider>
  );
}

export function useCV() {
  const context = useContext(CVContext);
  if (context === undefined) {
    throw new Error("useCV must be used within a CVProvider");
  }
  return context;
}
