import { cn } from "../../../utils/cn";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "fill" | "unstyled";
  children: React.ReactNode;
  type?: "button" | "submit" | "reset";
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  className?: string;
};

const Button = ({
  variant = "unstyled",
  children,
  type = "button",
  onClick,
  className,
  ...props
}: ButtonProps) => {
  let buttonClass = "";

  switch (variant) {
    case "fill":
      buttonClass = cn(
        "text-body3-medium rounded-sm bg-button-primary text-white transition-all hover:bg-blue-400 cursor-pointer",
        className,
      );
      break;

    case "unstyled":
    default:
      buttonClass = cn("cursor-pointer", className);
      break;
  }

  return (
    <button onClick={onClick} className={buttonClass} type={type} {...props}>
      {children}
    </button>
  );
};

export default Button;
