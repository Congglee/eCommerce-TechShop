import { ButtonHTMLAttributes } from "react";
import { OvalSpinner } from "..";

interface buttonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  isLoading: boolean;
}

const Button = (props: buttonProps) => {
  const { className, isLoading, disabled, children, ...rest } = props;
  const newClassName = disabled ? className + " cursor-not-allowed" : className;

  return (
    <button className={newClassName} disabled={disabled} {...rest}>
      <div className="flex items-center justify-center gap-x-2">
        {children}
        {isLoading && <OvalSpinner />}
      </div>
    </button>
  );
};

export default Button;
