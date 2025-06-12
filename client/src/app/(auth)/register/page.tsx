// src/app/register/page.tsx
import { RegisterForm } from "@/components/forms/RegisterForm";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Create Account - CV Builder",
  description:
    "Create your CV Builder account to start creating professional resumes",
};

export default function RegisterPage() {
  return <RegisterForm />;
}
