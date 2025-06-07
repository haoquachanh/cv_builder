// src/app/dashboard/settings/page.tsx
"use client";

import { Button } from "@/components/common/Button";
import { Input } from "@/components/common/Input";
import React, { useState } from "react";

export default function SettingsPage() {
  const [username, setUsername] = useState("user123");
  const [email, setEmail] = useState("user@example.com");

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Settings saved!");
  };

  return (
    <form onSubmit={handleSave} className="p-6 max-w-lg space-y-6">
      <h2 className="text-2xl font-semibold mb-4">Account Settings</h2>
      <Input
        label="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <Input
        label="Email"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <Button type="submit" className="w-full">
        Save Changes
      </Button>
    </form>
  );
}
