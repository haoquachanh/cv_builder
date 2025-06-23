export const downloadPDF = async (cvId: string) => {
  try {
    // Show loading notification
    const notification = document.createElement("div");
    notification.style.position = "fixed";
    notification.style.bottom = "20px";
    notification.style.right = "20px";
    notification.style.backgroundColor = "rgba(0, 0, 0, 0.7)";
    notification.style.color = "white";
    notification.style.padding = "12px 20px";
    notification.style.borderRadius = "6px";
    notification.style.zIndex = "9999";
    notification.style.boxShadow = "0 4px 6px rgba(0, 0, 0, 0.1)";
    notification.style.display = "flex";
    notification.style.alignItems = "center";
    notification.style.gap = "10px";
    notification.innerHTML = `
      <svg xmlns="http://www.w3.org/2000/svg" class="animate-spin" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M21 12a9 9 0 1 1-6.219-8.56"></path>
      </svg>
      <span>Generating PDF...</span>
    `;
    document.body.appendChild(notification);

    // Call the API endpoint
    const res = await fetch(`/api/export-pdf?id=${cvId}`);

    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(errorData.error || "Failed to generate PDF");
    }

    const blob = await res.blob();

    // Update notification
    notification.innerHTML = `
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
        <polyline points="22 4 12 14.01 9 11.01"></polyline>
      </svg>
      <span>PDF successfully generated!</span>
    `;
    notification.style.backgroundColor = "rgba(22, 163, 74, 0.9)";

    // Create download link
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `cv-${cvId}.pdf`;
    link.click();

    // Clean up
    setTimeout(() => {
      if (notification.parentNode) {
        notification.parentNode.removeChild(notification);
      }
      window.URL.revokeObjectURL(url);
    }, 3000);
  } catch (error) {
    console.error("Error downloading PDF:", error);

    // Show error notification
    const errorNotification = document.createElement("div");
    errorNotification.style.position = "fixed";
    errorNotification.style.bottom = "20px";
    errorNotification.style.right = "20px";
    errorNotification.style.backgroundColor = "rgba(220, 38, 38, 0.9)";
    errorNotification.style.color = "white";
    errorNotification.style.padding = "12px 20px";
    errorNotification.style.borderRadius = "6px";
    errorNotification.style.zIndex = "9999";
    errorNotification.style.display = "flex";
    errorNotification.style.alignItems = "center";
    errorNotification.style.gap = "10px";
    errorNotification.innerHTML = `
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <circle cx="12" cy="12" r="10"></circle>
        <line x1="12" y1="8" x2="12" y2="12"></line>
        <line x1="12" y1="16" x2="12.01" y2="16"></line>
      </svg>
      <span>Failed to generate PDF. Please try again.</span>
    `;
    document.body.appendChild(errorNotification);

    setTimeout(() => {
      if (errorNotification.parentNode) {
        errorNotification.parentNode.removeChild(errorNotification);
      }
    }, 5000);
  }
};
