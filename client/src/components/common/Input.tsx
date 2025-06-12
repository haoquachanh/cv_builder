import { useField } from "formik";
import React from "react";

interface BaseInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  icon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  name: string;
  hint?: string;
}

// Regular Input component without Formik
const RegularInput: React.FC<BaseInputProps> = ({
  label,
  error,
  className = "",
  icon,
  rightIcon,
  hint,
  ...props
}) => {
  return (
    <div className="space-y-1.5">
      {label && (
        <label
          htmlFor={props.name}
          className="block text-sm font-medium text-gray-700"
        >
          {label}
        </label>
      )}
      <div className="relative group">
        {icon && (
          <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none text-gray-400 group-focus-within:text-primary-500 transition-colors">
            {icon}
          </div>
        )}
        <input
          {...props}
          className={`
            block w-full px-3 py-2.5 bg-white dark:bg-gray-900
            border border-gray-300 dark:border-gray-700 rounded-lg
            shadow-sm outline-none transition-all duration-200
            placeholder:text-gray-400 dark:placeholder:text-gray-500
            ${icon ? "pl-10" : ""}
            ${rightIcon ? "pr-10" : ""}
            ${error ? "border-red-300 dark:border-red-700" : "hover:border-gray-400 dark:hover:border-gray-600"}
            focus:border-primary-500 focus:ring-1 focus:ring-primary-500
            dark:focus:border-primary-500 dark:focus:ring-primary-500/20
            ${className}
          `}
        />
        {rightIcon && (
          <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none text-gray-400 group-focus-within:text-primary-500 transition-colors">
            {rightIcon}
          </div>
        )}
      </div>
      {hint && !error && (
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">{hint}</p>
      )}
      {error && (
        <p className="mt-1 text-sm text-red-600 dark:text-red-500">{error}</p>
      )}
    </div>
  );
};

// Formik Input component
const FormikInput: React.FC<BaseInputProps> = ({
  label,
  className = "",
  icon,
  rightIcon,
  hint,
  ...props
}) => {
  const [field, meta] = useField(props.name);
  const showError = meta.touched && meta.error;

  return (
    <div className="space-y-1.5">
      {label && (
        <label
          htmlFor={props.name}
          className="block text-sm font-medium text-gray-700 dark:text-gray-200"
        >
          {label}
        </label>
      )}
      <div className="relative group">
        {icon && (
          <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none text-gray-400 group-focus-within:text-primary-500 transition-colors">
            {icon}
          </div>
        )}
        <input
          {...field}
          {...props}
          className={`
            block w-full px-3 py-2.5 bg-white dark:bg-gray-900
            border border-gray-300 dark:border-gray-700 rounded-lg
            shadow-sm outline-none transition-all duration-200
            placeholder:text-gray-400 dark:placeholder:text-gray-500
            ${icon ? "pl-10" : ""}
            ${rightIcon ? "pr-10" : ""}
            ${showError ? "border-red-300 dark:border-red-700" : "hover:border-gray-400 dark:hover:border-gray-600"}
            focus:border-primary-500 focus:ring-1 focus:ring-primary-500
            dark:focus:border-primary-500 dark:focus:ring-primary-500/20
            ${className}
          `}
        />
        {rightIcon && (
          <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none text-gray-400 group-focus-within:text-primary-500 transition-colors">
            {rightIcon}
          </div>
        )}
      </div>
      {hint && !showError && (
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">{hint}</p>
      )}
      {showError && (
        <p className="mt-1 text-sm text-red-600 dark:text-red-500">
          {meta.error}
        </p>
      )}
    </div>
  );
};

interface InputProps extends BaseInputProps {
  formik?: boolean;
}

// Main Input component that decides which version to render
export const Input: React.FC<InputProps> = ({ formik = false, ...props }) => {
  if (formik) {
    return <FormikInput {...props} />;
  }
  return <RegularInput {...props} />;
};
