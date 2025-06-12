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
    label: "Wave",
    value:
      "url(\"data:image/svg+xml,%3Csvg width='100' height='20' viewBox='0 0 100 20' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M21.184 20c.357-.13.72-.264 1.088-.402l1.768-.661C33.64 15.347 39.647 14 50 14c10.271 0 15.362 1.222 24.629 4.928.955.383 1.869.74 2.75 1.072h6.225c-2.51-.73-5.139-1.691-8.233-2.928C65.888 13.278 60.562 12 50 12c-10.626 0-16.855 1.397-26.66 5.063l-1.767.662c-2.475.923-4.66 1.674-6.724 2.275h6.335zm0-20C13.258 2.892 8.077 4 0 4V2c5.744 0 9.951-.574 14.85-2h6.334zM77.38 0C85.239 2.966 90.502 4 100 4V2c-6.842 0-11.386-.542-16.396-2h-6.225zM0 14c8.44 0 13.718-1.21 22.272-4.402l1.768-.661C33.64 5.347 39.647 4 50 4c10.271 0 15.362 1.222 24.629 4.928C84.112 12.722 89.438 14 100 14v-2c-10.271 0-15.362-1.222-24.629-4.928C65.888 3.278 60.562 2 50 2 39.374 2 33.145 3.397 23.34 7.063l-1.767.662C13.223 10.84 8.163 12 0 12v2z' fill='%23e5e7eb' fill-opacity='0.2' fill-rule='evenodd'/%3E%3C/svg%3E\")",
  },
  {
    label: "Circuit",
    value:
      "url(\"data:image/svg+xml,%3Csvg width='32' height='32' viewBox='0 0 32 32' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M10 0h12v6h-2v20h2v6H10v-6h2V6h-2V0zm12 28v2h-2v-2h2zm0-24v2h-2V4h2zM8 28v2H6v-2h2zm0-24v2H6V4h2zm-4 0v2H2V4h2zm0 24v2H2v-2h2zM2 10h2v12H2V10zm28 12h2v-12h-2v12zm-4-8v4h4v-4h-4zm0-8h4v4h-4V6zm0 16h4v4h-4v-4zM10 8h12v4H10V8zm0 8h12v4H10v-4zm0 8h12v4H10v-4z' fill='%23e5e7eb' fill-opacity='0.2' fill-rule='evenodd'/%3E%3C/svg%3E\")",
  },
  {
    label: "Memphis",
    value:
      "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23e5e7eb' fill-opacity='0.2'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")",
  },
  {
    label: "Elegant Lines",
    value:
      "linear-gradient(135deg, #88888808 25%, transparent 25%) -10px 0, linear-gradient(225deg, #88888808 25%, transparent 25%) -10px 0, linear-gradient(315deg, #88888808 25%, transparent 25%), linear-gradient(45deg, #88888808 25%, transparent 25%)",
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
