interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "danger";
  size?: "xs" | "sm" | "md" | "lg";
  tooltip?: string;
  iconLeft?: React.ReactNode;
  iconRight?: React.ReactNode;
  fullWidth?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = "primary",
  size = "md",
  className = "",
  disabled = false,
  tooltip,
  iconLeft,
  iconRight,
  fullWidth = false,
  ...props
}) => {
  const baseStyles = "font-medium rounded-lg transition-all relative";

  const variants = {
    primary: "bg-blue-600 text-white hover:bg-blue-700 active:bg-blue-800",
    secondary: "bg-gray-600 text-white hover:bg-gray-700 active:bg-gray-800",
    outline:
      "border-2 border-blue-600 text-blue-600 hover:bg-blue-50 active:bg-blue-100",
    danger: "bg-red-600 text-white hover:bg-red-700 active:bg-red-800",
  };
  const sizes = {
    xs: "text-xs py-0.5 px-1.5 h-[22px] min-w-[22px]",
    sm: "text-sm py-1 px-2 h-[28px] min-w-[28px]",
    md: "text-sm py-1.5 px-3 h-[36px] min-w-[36px]",
    lg: "text-base py-2 px-4 h-[44px] min-w-[44px]",
  };

  const fullWidthStyle = fullWidth ? "w-full" : "";
  const disabledStyles = disabled ? "opacity-50 cursor-not-allowed" : "";

  return (
    <button
      className={`${baseStyles} ${variants[variant]} ${
        sizes[size]
      } ${className} ${fullWidthStyle} ${
        disabled ? disabledStyles : "cursor-pointer"
      } inline-flex items-center justify-center gap-1.5 whitespace-nowrap`}
      disabled={disabled}
      title={tooltip}
      {...props}
    >
      {iconLeft && (
        <span className="button-icon-left flex-shrink-0">{iconLeft}</span>
      )}
      {children && <span className="inline-block truncate">{children}</span>}
      {iconRight && (
        <span className="button-icon-right flex-shrink-0">{iconRight}</span>
      )}

      {tooltip && disabled && (
        <div className="tooltip-container">
          <span
            className="absolute invisible group-hover:visible opacity-0 group-hover:opacity-100 transition-opacity bg-gray-800 text-white text-xs rounded py-1 px-2 -top-full left-1/2 transform -translate-x-1/2 -translate-y-1 z-50 whitespace-nowrap"
            data-tooltip
          >
            {tooltip}
          </span>
        </div>
      )}
    </button>
  );
};
