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
import { downloadPDF } from "@/lib/downloadPDF";

export type TemplateType =
  | "modern"
  | "classic"
  | "minimal"
  | "compact"
  | "creative";

interface CVContextType {
  cv: CV;
  updateCV: <K extends keyof CV>(key: K, value: CV[K]) => void;
  saveCv: () => Promise<void>;
  exportPDF: () => Promise<void>;
  isExporting: boolean;
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

export const CVContext = createContext<CVContextType | undefined>(undefined);

export function CVProvider({ children }: { children: ReactNode }) {
  const [isClient, setIsClient] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [cv, setCV] = useState<CV>(defaultCV);
  const [selectedTemplate, setSelectedTemplate] =
    useState<TemplateType>("modern");
  const [isExporting, setIsExporting] = useState(false);
  const previewRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (isClient) {
      try {
        const storedData = localStorage.getItem(LOCAL_STORAGE_KEY);
        if (storedData) {
          const parsedData = JSON.parse(storedData) as StoredData;
          setCV(parsedData.cv);
          setSelectedTemplate(parsedData.selectedTemplate);
        }
      } catch (error) {
        console.error("Error loading CV from localStorage:", error);
      } finally {
        setIsLoaded(true);
      }
    }
  }, [isClient]);

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
      alert("CV saved in Local Storage successfully!");
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
    setIsExporting(true);
    const notification = document.createElement("div");
    notification.style.position = "fixed";
    notification.style.bottom = "20px";
    notification.style.right = "20px";
    notification.style.backgroundColor = "rgba(0, 0, 0, 0.7)";
    notification.style.color = "white";
    notification.style.padding = "10px 15px";
    notification.style.borderRadius = "4px";
    notification.style.zIndex = "9999";
    notification.textContent = "Preparing PDF export...";
    document.body.appendChild(notification);
    try {
      const name =
        cv.personalInfo?.fullName?.replace(/[^a-z0-9]/gi, "-") || "CV";
      notification.textContent = "Generating PDF...";
      await downloadPDF(name);
      notification.textContent = "PDF successfully exported!";
      notification.style.backgroundColor = "rgba(22, 163, 74, 0.9)";
    } catch (error) {
      console.error("Error generating PDF:", error);
      alert("Error generating PDF. Please try again.");
      notification.textContent = "PDF export failed";
      notification.style.backgroundColor = "rgba(220, 38, 38, 0.9)";
    } finally {
      setIsExporting(false);
      setTimeout(() => {
        if (notification && notification.parentNode) {
          notification.parentNode.removeChild(notification);
        }
      }, 3000);
    }
  };

  return (
    <CVContext.Provider
      value={{
        cv,
        updateCV,
        saveCv,
        exportPDF,
        isExporting,
        previewRef,
        selectedTemplate,
        setSelectedTemplate,
      }}
    >
      {isLoaded ? <div key={JSON.stringify(cv)}>{children}</div> : null}
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
