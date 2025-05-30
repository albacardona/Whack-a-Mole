import { cva, type VariantProps } from 'class-variance-authority';
import clsx from 'clsx';

const buttonVariants = cva(
  'cursor-none w-32 py-3 px-2 text-sm font-game rounded-md transition-all duration-150 ease-in-out active:translate-y-2 active:border-b-[0px]',
  {
    variants: {
      variant: {
        default:
          'bg-bg-secondary border-bg-secondary text-fg-primary ring-2 ring-ring-primary shadow-button-primary active:shadow-button-primary-active',
        accent:
          'bg-accent border-accent text-fg-primary ring-2 ring-ring-accent shadow-button-accent active:shadow-button-accent-active',
        ghost: 'ring-none ring-0 bg-transparent p-0 m-0 w-fit',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  },
);

interface ButtonProps {
  variant?: VariantProps<typeof buttonVariants>['variant'];
  children?: React.ReactNode;
  value?: number;
  isActive?: boolean;
  className?: string;
  onClick: (value: number) => void;
}

export const Button = ({ value, children, className, variant, isActive, onClick }: ButtonProps) => {
  const handleClick = () => {
    if (value !== undefined) {
      (onClick as (value: number) => void)(value);
    } else {
      (onClick as () => void)();
    }
  };

  return (
    <button
      type="button"
      className={clsx(
        {
          'shadow-none translate-y-2': isActive,
          'bg-bg-secondary-light': isActive && variant === 'default',
          'bg-accent-light': isActive && variant === 'accent',
        },
        buttonVariants({ variant, className }),
      )}
      onClick={handleClick}
    >
      {children ?? value}
    </button>
  );
};
