import { forwardRef, HTMLInputTypeAttribute } from "react";
import { cn } from "../../../utils/cn";
import Image from "next/image";

type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  type?: HTMLInputTypeAttribute;
  hint?: string;
  isError?: boolean;
  inputClassName?: string;
  totalClassName?: string;
  isEmpty?: boolean;
  iconSrc?: string;
  classname?: string;
};

const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      type = "text",
      hint,
      isError,
      totalClassName,
      inputClassName,
      iconSrc,
      isEmpty,
      classname,
      ...props
    }: InputProps,
    ref,
  ) => {
    const totalClass = cn(["flex-1 gap-1", totalClassName]);

    const inputClass = cn([
      "rounded-md bg-background-teritary px-3 py-3 focus:outline-blue-700 focus:outline-2",
      iconSrc && "placeholder-indent-2",
      inputClassName,
      isError && "border-red-500 focus:border-red-500 border-2",
      classname,
    ]);

    return (
      <div className={totalClass}>
        <div className="relative flex w-full flex-col">
          <input className={inputClass} type={type} ref={ref} {...props} />
          {iconSrc && isEmpty && (
            <Image
              alt="icon"
              className="absolute top-0 bottom-0 mx-3 my-auto"
              src={iconSrc}
              width={24}
              height={24}
            />
          )}
        </div>
        {hint && <span className="text-sm text-red-500 lg:mb-4">{hint}</span>}
      </div>
    );
  },
);

Input.displayName = "Input";
export default Input;
