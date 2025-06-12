import { Metadata } from "next";
import { LoginForm } from "@/components/forms/LoginForm";

export const metadata: Metadata = {
  title: "Sign In - CV Builder",
  description: "Sign in to your CV Builder account",
};

export default function LoginPage() {
  return <LoginForm />;
}
