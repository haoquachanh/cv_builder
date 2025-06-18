export const downloadPDF = async (cvId: string) => {
  const res = await fetch(`/api/export-pdf?id=${cvId}`);
  const blob = await res.blob();
  const url = window.URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = `cv-${cvId}.pdf`;
  link.click();
};
