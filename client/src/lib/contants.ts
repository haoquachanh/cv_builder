export const CV_TEMPLATES = [
  {
    id: "template1",
    name: "Professional",
    thumbnail: "/templates/professional.png",
  },
  {
    id: "template2",
    name: "Creative",
    thumbnail: "/templates/creative.png",
  },
  {
    id: "template3",
    name: "Minimal",
    thumbnail: "/templates/minimal.png",
  },
] as const;

export const SKILL_LEVELS = [
  { value: 20, label: "Beginner" },
  { value: 40, label: "Elementary" },
  { value: 60, label: "Intermediate" },
  { value: 80, label: "Advanced" },
  { value: 100, label: "Expert" },
] as const;

export const PRIMARY_COLORS = [
  { label: "Blue", value: "#2563eb" },
  { label: "Green", value: "#059669" },
  { label: "Red", value: "#dc2626" },
  { label: "Purple", value: "#7c3aed" },
  { label: "Orange", value: "#ea580c" },
  { label: "Gray", value: "#4b5563" },
  { label: "Teal", value: "#0d9488" },
  { label: "Indigo", value: "#4f46e5" },
] as const;

export const FONT_FAMILIES = [
  { label: "Inter", value: "Inter, sans-serif" },
  { label: "Roboto", value: "Roboto, sans-serif" },
  { label: "Open Sans", value: "Open Sans, sans-serif" },
  { label: "Montserrat", value: "Montserrat, sans-serif" },
  { label: "Lato", value: "Lato, sans-serif" },
  { label: "Poppins", value: "Poppins, sans-serif" },
] as const;

export const BACKGROUND_COLORS = [
  { label: "White", value: "#ffffff" },
  { label: "Light Gray", value: "#f8fafc" },
  { label: "Cool Gray", value: "#f1f5f9" },
  { label: "Warm Gray", value: "#f5f5f4" },
  { label: "Light Blue", value: "#f0f9ff" },
  { label: "Light Green", value: "#f0fdf4" },
] as const;

export const BACKGROUND_PATTERNS = [
  { label: "None", value: "none" },
  {
    label: "Polka Dots",
    value: "radial-gradient(circle at 1px 1px, #00000009 1px, transparent 0)",
  },
  {
    label: "Grid",
    value:
      "linear-gradient(#00000009 1px, transparent 1px), linear-gradient(to right, #00000009 1px, transparent 1px)",
  },
  {
    label: "Diagonal",
    value:
      "repeating-linear-gradient(45deg, #00000009 0, #00000009 1px, transparent 0, transparent 50%)",
  },
  {
    label: "Circuit",
    value:
      "url(\"data:image/svg+xml,%3Csvg width='32' height='32' viewBox='0 0 32 32' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M10 0h12v6h-2v20h2v6H10v-6h2V6h-2V0zm12 28v2h-2v-2h2zm0-24v2h-2V4h2zM8 28v2H6v-2h2zm0-24v2H6V4h2zm-4 0v2H2V4h2zm0 24v2H2v-2h2zM2 10h2v12H2V10zm28 12h2v-12h-2v12zm-4-8v4h4v-4h-4zm0-8h4v4h-4V6zm0 16h4v4h-4v-4zM10 8h12v4H10V8zm0 8h12v4H10v-4zm0 8h12v4H10v-4z' fill='%23e5e7eb' fill-opacity='0.2' fill-rule='evenodd'/%3E%3C/svg%3E\")",
  },
  {
    label: "Confetti",
    value:
      "repeating-linear-gradient(135deg, #ea580c33 0 2px, transparent 2px 8px), repeating-linear-gradient(45deg, #05966933 0 2px, transparent 2px 8px)",
  },
] as const;

export const SKILL_COLORS = [
  { label: "Default", value: "inherit" },
  { label: "Black", value: "black" },
  { label: "Blue", value: "#2563eb" },
  { label: "Green", value: "#059669" },
  { label: "Red", value: "#dc2626" },
  { label: "Purple", value: "#7c3aed" },
  { label: "Orange", value: "#ea580c" },
  { label: "Gray", value: "#4b5563" },
] as const;

export const FONT_STYLES = [
  { label: "Normal", value: "normal" },
  { label: "Italic", value: "italic" },
] as const;

export const FONT_WEIGHTS = [
  { label: "Regular", value: "normal" },
  { label: "Bold", value: "bold" },
] as const;

export const TEXT_DECORATIONS = [
  { label: "None", value: "none" },
  { label: "Underline", value: "underline" },
] as const;
