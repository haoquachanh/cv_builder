// src/components/forms/CVForm.tsx
"use client";

import { useState } from "react";
import { Input } from "../common/Input";
import { Button } from "../common/Button";

interface CVFormProps {
  onSubmit: (data: { title: string }) => void;
}

export const CVForm = ({ onSubmit }: CVFormProps) => {
  const [title, setTitle] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ title });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Input
        label="CV Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />
      <Button type="submit">Create CV</Button>
    </form>
  );
};
