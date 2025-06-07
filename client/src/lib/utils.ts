export const formatDate = (date: string) => {
  return new Date(date).toLocaleDateString("vi-VN", {
    month: "long",
    year: "numeric",
  });
};
export const downloadPDF = async (cvId: string) => {
  try {
    const response = await fetch(`/api/cv/${cvId}/pdf`, {
      method: "GET",
      headers: {
        "Content-Type": "application/pdf",
      },
    });

    const blob = await response.blob();
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `cv-${cvId}.pdf`;
    link.click();
  } catch (error) {
    console.error("Error downloading PDF:", error);
    throw error;
  }
};
export const validateEmail = (email: string) => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
};
