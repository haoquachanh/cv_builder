// src/components/forms/RegisterForm.tsx
"use client";

import { useState } from "react";
import Link from "next/link";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { Input } from "../common/Input";
import { Button } from "../common/Button";
import { LoadingSpinner } from "../common/LoadingSpinner";
import { useAuth } from "@/context/AuthContext";
import {
  FaUser,
  FaEnvelope,
  FaLock,
  FaEye,
  FaEyeSlash,
  FaGoogle,
  FaGithub,
  FaArrowRight,
  FaArrowLeft,
} from "react-icons/fa";

interface RegisterFormValues {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  agreeToTerms: boolean;
}

const validationSchema = [
  // Step 1 validation
  Yup.object({
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
  }),
  // Step 2 validation
  Yup.object({
    name: Yup.string()
      .min(2, "Name must be at least 2 characters")
      .required("Name is required"),
    password: Yup.string()
      .min(8, "Password must be at least 8 characters")
      .matches(/[a-z]/, "Password must contain at least one lowercase letter")
      .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
      .matches(/[0-9]/, "Password must contain at least one number")
      .required("Password is required"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password")], "Passwords must match")
      .required("Please confirm your password"),
    agreeToTerms: Yup.boolean().oneOf(
      [true],
      "You must accept the terms and conditions"
    ),
  }),
];

export function RegisterForm() {
  // Router is used in AuthContext after registration
  const { register } = useAuth();
  const [currentStep, setCurrentStep] = useState(0);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [savedValues, setSavedValues] = useState<Partial<RegisterFormValues>>(
    {}
  );

  const initialValues: RegisterFormValues = {
    name: "",
    email: savedValues.email || "",
    password: "",
    confirmPassword: "",
    agreeToTerms: false,
  };
  const handleSubmit = async (values: RegisterFormValues) => {
    try {
      // Clear any previous errors
      setError("");

      if (currentStep === 0) {
        // First step - validate email and move to next step
        console.log("Step 1 completed, email validated:", values.email);
        setSavedValues({ ...savedValues, email: values.email });
        setCurrentStep(1);
        return;
      } else {
        // Second step - submit the full registration
        console.log("Attempting to register with:", {
          email: savedValues.email || values.email,
          name: values.name,
          passwordLength: values.password.length,
        });

        // Make sure we have the email from step 1
        const email = savedValues.email || values.email;

        // Validate that all required fields are present
        if (
          !email ||
          !values.password ||
          !values.name ||
          !values.agreeToTerms
        ) {
          setError("Please fill in all required fields and accept the terms");
          return;
        }

        // Submit registration
        await register(email, values.password, values.name);

        // The redirect is handled in the register function
      }
    } catch (err) {
      console.error("Registration error:", err);
      setError(
        err instanceof Error
          ? err.message
          : "Registration failed. Please try again."
      );
    }
  };

  const getPasswordStrength = (
    password: string
  ): { strength: number; text: string } => {
    let strength = 0;
    if (password.length >= 8) strength++;
    if (/[a-z]/.test(password)) strength++;
    if (/[A-Z]/.test(password)) strength++;
    if (/[0-9]/.test(password)) strength++;
    if (/[^a-zA-Z0-9]/.test(password)) strength++;

    const strengthText =
      ["Very Weak", "Weak", "Fair", "Good", "Strong"][strength - 1] || "";

    return { strength, text: strengthText };
  };

  return (
    <section className="max-w-md w-full mx-auto mt-8 p-8 bg-white rounded-xl shadow-lg">
      <h1 className="text-3xl font-bold mb-8 text-center text-gray-800">
        {currentStep === 0 ? "Create Account" : "Complete Your Profile"}
      </h1>

      {error && (
        <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-600 rounded-lg text-sm">
          {error}
        </div>
      )}

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema[currentStep]}
        onSubmit={handleSubmit}
        enableReinitialize
      >
        {({ values, isSubmitting }) => (
          <Form className="space-y-6">
            {currentStep === 0 ? (
              <>
                <div className="relative">
                  <Input
                    name="email"
                    type="email"
                    placeholder="Email address"
                    icon={<FaEnvelope className="text-gray-400" />}
                    formik={true}
                  />
                </div>
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2.5 rounded-lg font-medium transition-colors flex items-center justify-center gap-2 relative z-10"
                >
                  {isSubmitting ? (
                    <LoadingSpinner size="sm" />
                  ) : (
                    <>
                      Continue
                      <FaArrowRight />
                    </>
                  )}
                </Button>
              </>
            ) : (
              <>
                <div className="relative">
                  <Input
                    name="name"
                    type="text"
                    placeholder="Full name"
                    icon={<FaUser className="text-gray-400" />}
                    formik={true}
                  />
                </div>

                <div className="space-y-1">
                  <div className="relative">
                    <Input
                      name="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Create password"
                      icon={<FaLock className="text-gray-400" />}
                      formik={true}
                      rightIcon={
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="text-gray-400 hover:text-gray-600"
                        >
                          {showPassword ? <FaEyeSlash /> : <FaEye />}
                        </button>
                      }
                    />
                  </div>
                  {values.password && (
                    <div className="mt-2">
                      <div className="flex gap-1 mb-1">
                        {[1, 2, 3, 4, 5].map((level) => (
                          <div
                            key={level}
                            className={`h-1 flex-1 rounded-full ${
                              getPasswordStrength(values.password).strength >=
                              level
                                ? "bg-blue-500"
                                : "bg-gray-200"
                            }`}
                          />
                        ))}
                      </div>
                      <p className="text-xs text-gray-600">
                        Password strength:{" "}
                        {getPasswordStrength(values.password).text}
                      </p>
                    </div>
                  )}
                </div>

                <div className="relative">
                  <Input
                    name="confirmPassword"
                    type={showPassword ? "text" : "password"}
                    placeholder="Confirm password"
                    icon={<FaLock className="text-gray-400" />}
                    formik={true}
                  />
                </div>

                <label className="flex items-center text-gray-700 text-sm gap-2">
                  <Input
                    type="checkbox"
                    name="agreeToTerms"
                    className="rounded text-blue-600 focus:ring-blue-500"
                    formik={true}
                  />
                  I agree to the{" "}
                  <Link
                    href="/terms"
                    className="text-blue-600 hover:text-blue-700"
                  >
                    terms and conditions
                  </Link>
                </label>

                <div className="flex gap-3">
                  <Button
                    type="button"
                    onClick={() => setCurrentStep(0)}
                    className="flex-1 border border-gray-300 text-gray-700 py-2.5 rounded-lg font-medium hover:bg-gray-50 transition-colors flex items-center justify-center gap-2"
                  >
                    <FaArrowLeft />
                    Back
                  </Button>
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2.5 rounded-lg font-medium transition-colors flex items-center justify-center gap-2 relative z-10"
                  >
                    {isSubmitting ? (
                      <LoadingSpinner size="sm" />
                    ) : (
                      "Create Account"
                    )}
                  </Button>
                </div>
              </>
            )}

            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-200" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">
                  Or continue with
                </span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <button
                type="button"
                className="flex items-center justify-center gap-2 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
              >
                <FaGoogle className="text-red-500" />
                <span>Google</span>
              </button>
              <button
                type="button"
                className="flex items-center justify-center gap-2 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
              >
                <FaGithub className="text-gray-900" />
                <span>GitHub</span>
              </button>
            </div>

            <p className="text-center text-gray-600 text-sm mt-8">
              Already have an account?{" "}
              <Link
                href="/login"
                className="text-blue-600 hover:text-blue-700 font-medium"
              >
                Sign in
              </Link>
            </p>
          </Form>
        )}
      </Formik>
    </section>
  );
}
