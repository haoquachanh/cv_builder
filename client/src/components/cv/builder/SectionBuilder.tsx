import React from "react";

interface SectionBuilderProps {
  title: string;
  children: React.ReactNode;
}

export const SectionBuilder: React.FC<SectionBuilderProps> = ({
  title,
  children,
}) => {
  return (
    <section className="mb-6">
      <h3 className="text-lg font-semibold mb-2">{title}</h3>
      <div className="space-y-4">{children}</div>
    </section>
  );
};
