import {
  ButtonHTMLAttributes,
  DetailedHTMLProps,
  PropsWithChildren,
  forwardRef,
} from 'react';

interface AuthButtonProps
  extends DetailedHTMLProps<
    ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {
  icon?: JSX.Element;
  styles?: string;
  label: string;
}

const AuthButton = forwardRef<
  HTMLButtonElement,
  PropsWithChildren<AuthButtonProps>
>(
  (
    {
      icon,
      label,
      styles = 'text-blue-900 bg-gray-100 hover:bg-gray-300',
      ...rest
    },
    ref,
  ) => {
    return (
      <button
        ref={ref}
        className={`flex items-center gap-2 w-fit h-fit font-semibold px-4 py-1 rounded ${styles}`}
        {...rest}
      >
        {label}
        {icon}
      </button>
    );
  },
);

export default AuthButton;
