// src/components/layout/Footer.tsx
export const Footer = () => {
  return (
    <footer className="w-full text-center text-sm text-gray-500 py-4 border-t">
      © {new Date().getFullYear()} CV Builder. All rights reserved.
    </footer>
  );
};
