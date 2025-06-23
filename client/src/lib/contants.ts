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
  { label: "Royal Blue", value: "#1e40af" },
  { label: "Sky Blue", value: "#0ea5e9" },
  { label: "Green", value: "#059669" },
  { label: "Emerald", value: "#10b981" },
  { label: "Forest Green", value: "#166534" },
  { label: "Red", value: "#dc2626" },
  { label: "Rose", value: "#e11d48" },
  { label: "Crimson", value: "#be123c" },
  { label: "Purple", value: "#7c3aed" },
  { label: "Violet", value: "#8b5cf6" },
  { label: "Fuchsia", value: "#c026d3" },
  { label: "Orange", value: "#ea580c" },
  { label: "Amber", value: "#d97706" },
  { label: "Gray", value: "#4b5563" },
  { label: "Slate", value: "#334155" },
  { label: "Dark Gray", value: "#1f2937" },
  { label: "Teal", value: "#0d9488" },
  { label: "Cyan", value: "#06b6d4" },
  { label: "Indigo", value: "#4f46e5" },
  { label: "Navy", value: "#1e3a8a" },
  { label: "Brown", value: "#78350f" },
  { label: "Maroon", value: "#9f1239" },
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
  {
    label: "Japanese Waves",
    value:
      "url(\"data:image/svg+xml,%3Csvg width='100' height='20' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 10 Q 5 0, 10 10 T 20 10 T 30 10 T 40 10 T 50 10 T 60 10 T 70 10 T 80 10 T 90 10 T 100 10 V 20 H 0 Z' fill='%232563eb10'/%3E%3C/svg%3E\")",
  },
  {
    label: "Autumn Leaves",
    value:
      "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='60' height='60' viewBox='0 0 60 60'%3E%3Cg fill-rule='evenodd'%3E%3Cg fill='%23ea580c' fill-opacity='0.15' transform='rotate(120 30 30)'%3E%3Cpath d='M16.7 15c-1.9 1-3.7 1.8-5.6 2.6-2.8 0-5.2-1.5-6-4.2-.6-2.2 0-4.5 1.6-6.2.5-.5 1-1 1.6-1.4 2.2-1.3 4.4-1.3 6.3 0 2 1.4 2.7 3.4 2.7 5.7-.1 1.3-.3 2.5-.6 3.5zm-1-12l1.2.4c1.3 1 1.6 2.5 1.6 4l-.4 2-2 .7-2.7.1a7 7 0 0 1-3.6-1.2c-.7-2 .2-3.4 1.6-4.1 1.5-.8 3-1.2 4.4-2z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")",
  },
  {
    label: "Hexagons",
    value:
      "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='28' height='49' viewBox='0 0 28 49'%3E%3Cg fill-rule='evenodd'%3E%3Cg fill='%237c3aed' fill-opacity='0.1'%3E%3Cpath d='M13.99 9.25l13 7.5v15l-13 7.5L1 31.75v-15l12.99-7.5zM3 17.9v12.7l10.99 6.34 11-6.35V17.9l-11-6.34L3 17.9zM0 15l12.98-7.5V0h-2v6.35L0 12.69v2.3zm0 18.5L12.98 41v8h-2v-6.85L0 35.81v-2.3zM15 0v7.5L27.99 15H28v-2.31h-.01L17 6.35V0h-2zm0 49v-8l12.99-7.5H28v2.31h-.01L17 42.15V49h-2z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")",
  },
  {
    label: "Floating Bubbles",
    value:
      "radial-gradient(circle at 30% 20%, #2563eb15 1%, transparent 6%), radial-gradient(circle at 70% 65%, #ea580c15 1%, transparent 6%), radial-gradient(circle at 40% 80%, #7c3aed15 2%, transparent 10%), radial-gradient(circle at 80% 10%, #05966915 1%, transparent 8%)",
  },
  {
    label: "Blueprint Grid",
    value:
      "linear-gradient(rgba(135, 206, 250, 0.09) 1px, transparent 1px), linear-gradient(to right, rgba(135, 206, 250, 0.09) 1px, transparent 1px), linear-gradient(rgba(135, 206, 250, 0.06) 0.5px, transparent 0.5px), linear-gradient(to right, rgba(135, 206, 250, 0.06) 0.5px, transparent 0.5px)",
  },
  {
    label: "Rain Droplets",
    value:
      "repeating-radial-gradient(#00000008 2px, transparent 4px, transparent 20px)",
  },
  {
    label: "Elegant Diamonds",
    value:
      "linear-gradient(135deg, #88888808 25%, transparent 25%) -6px 0, linear-gradient(225deg, #88888808 25%, transparent 25%) -6px 0, linear-gradient(315deg, #88888808 25%, transparent 25%), linear-gradient(45deg, #88888808 25%, transparent 25%)",
  },
  {
    label: "Bamboo Forest",
    value:
      "repeating-linear-gradient(to right, #05966922 0 2px, transparent 2px 10px), repeating-linear-gradient(to right, #05966911 0 1px, transparent 1px 20px)",
  },
  {
    label: "Cherry Blossoms",
    value:
      "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='40' height='40' viewBox='0 0 40 40'%3E%3Cg fill='%23ffb7c5' fill-opacity='0.15'%3E%3Cpath d='M20 0C9 0 0 9 0 20s9 20 20 20 20-9 20-20S31 0 20 0zm0 37c-9.4 0-17-7.6-17-17S10.6 3 20 3s17 7.6 17 17-7.6 17-17 17zm0-30c-7.2 0-13 5.8-13 13s5.8 13 13 13 13-5.8 13-13-5.8-13-13-13zm0 22c-5 0-9-4-9-9s4-9 9-9 9 4 9 9-4 9-9 9z'/%3E%3C/g%3E%3C/svg%3E\")",
  },
  {
    label: "Abstract Geometric",
    value:
      "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='60' height='60' viewBox='0 0 60 60'%3E%3Cg fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='0.06'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")",
  },
  {
    label: "Subtle Stripes",
    value:
      "linear-gradient(135deg, #f8fafc 25%, transparent 25%, transparent 50%, #f8fafc 50%, #f8fafc 75%, transparent 75%, transparent)",
  },
  {
    label: "Marble Effect",
    value:
      "radial-gradient(circle at 52% 33%, rgba(0, 0, 0, 0.03) 0%, rgba(0, 0, 0, 0.03) 4%, transparent 4%, transparent 100%), radial-gradient(circle at 30% 43%, rgba(0, 0, 0, 0.03) 0%, rgba(0, 0, 0, 0.03) 4%, transparent 4%, transparent 100%), radial-gradient(circle at 78% 68%, rgba(0, 0, 0, 0.03) 0%, rgba(0, 0, 0, 0.03) 4%, transparent 4%, transparent 100%), radial-gradient(circle at 54% 57%, rgba(0, 0, 0, 0.03) 0%, rgba(0, 0, 0, 0.03) 6%, transparent 6%, transparent 100%)",
  },
  {
    label: "Digital Circuit",
    value:
      "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100' viewBox='0 0 100 100'%3E%3Cg fill-rule='evenodd' stroke='%23000' stroke-opacity='0.1' stroke-width='1'%3E%3Cpath fill='none' d='M0 0h100v100H0z'/%3E%3Cpath fill='none' d='M60 20h20v20H60z'/%3E%3Cpath fill='none' d='M20 60h20v20H20z'/%3E%3Cpath fill='none' d='M60 60h20v20H60z'/%3E%3Cpath d='M50 20h10v10H50z'/%3E%3Cpath d='M70 50h10v10H70z'/%3E%3Cpath d='M30 50h10v10H30z'/%3E%3C/g%3E%3C/svg%3E\")",
  },
  {
    label: "Starry Night",
    value:
      "radial-gradient(circle at 50% 50%, rgba(255, 255, 255, 0.15) 1px, transparent 2px), radial-gradient(circle at 30% 30%, rgba(255, 255, 255, 0.2) 0.5px, transparent 1px), radial-gradient(circle at 70% 80%, rgba(255, 255, 255, 0.25) 1px, transparent 2px), radial-gradient(circle at 20% 90%, rgba(255, 255, 255, 0.15) 0.5px, transparent 1px), radial-gradient(circle at 90% 10%, rgba(255, 255, 255, 0.2) 1px, transparent 2px), radial-gradient(circle at 10% 25%, rgba(255, 255, 255, 0.15) 0.5px, transparent 1px), radial-gradient(circle at 60% 40%, rgba(255, 255, 255, 0.2) 1px, transparent 2px), rgba(31, 41, 55, 0.05)",
  },
] as const;

export const SKILL_COLORS = [
  { label: "Default", value: "inherit" },
  { label: "Black", value: "black" },
  { label: "Blue", value: "#2563eb" },
  { label: "Royal Blue", value: "#1e40af" },
  { label: "Sky Blue", value: "#0ea5e9" },
  { label: "Green", value: "#059669" },
  { label: "Emerald", value: "#10b981" },
  { label: "Forest Green", value: "#166534" },
  { label: "Red", value: "#dc2626" },
  { label: "Rose", value: "#e11d48" },
  { label: "Crimson", value: "#be123c" },
  { label: "Purple", value: "#7c3aed" },
  { label: "Violet", value: "#8b5cf6" },
  { label: "Fuchsia", value: "#c026d3" },
  { label: "Orange", value: "#ea580c" },
  { label: "Amber", value: "#d97706" },
  { label: "Gray", value: "#4b5563" },
  { label: "Slate", value: "#334155" },
  { label: "Teal", value: "#0d9488" },
  { label: "Cyan", value: "#06b6d4" },
  { label: "Indigo", value: "#4f46e5" },
  { label: "Navy", value: "#1e3a8a" },
  { label: "Brown", value: "#78350f" },
  { label: "Maroon", value: "#9f1239" },
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
