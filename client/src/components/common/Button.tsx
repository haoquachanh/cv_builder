interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline";
  size?: "sm" | "md" | "lg";
}
export const Button: React.FC<ButtonProps> = ({
  children,
  variant = "primary",
  // size = "md",
  className,
  disabled = false,
  ...props
}) => {
  const baseStyles = "font-medium rounded-lg transition-colors";
  const variants = {
    primary: "bg-blue-600 text-white hover:bg-blue-700",
    secondary: "bg-gray-600 text-white hover:bg-gray-700",
    outline: "border-2 border-blue-600 text-blue-600 hover:bg-blue-50",
  };

  const disabledStyles = disabled
    ? "opacity-15 pointer-events-none !cursor-default !hover:none"
    : "";

  return (
    <button
      className={`${baseStyles} ${variants[variant]} ${className} py-0.5 px-1.5 cursor-pointer ${disabledStyles}`}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
};
