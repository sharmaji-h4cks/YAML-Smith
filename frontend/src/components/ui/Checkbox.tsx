import * as React from 'react';
import { cn } from '../../lib/utils';

export interface CheckboxProps {
  id?: string;
  checked?: boolean;
  onCheckedChange?: (checked: boolean) => void;
  defaultChecked?: boolean;
  disabled?: boolean;
  className?: string;
}

export function Checkbox({
  id,
  checked,
  onCheckedChange,
  defaultChecked,
  disabled,
  className,
}: CheckboxProps) {
  const [isChecked, setIsChecked] = React.useState(defaultChecked || checked || false);

  React.useEffect(() => {
    if (checked !== undefined) {
      setIsChecked(checked);
    }
  }, [checked]);

  const handleChange = () => {
    const newChecked = !isChecked;
    setIsChecked(newChecked);
    onCheckedChange?.(newChecked);
  };

  return (
    <button
      type="button"
      role="checkbox"
      id={id}
      aria-checked={isChecked}
      onClick={handleChange}
      disabled={disabled}
      className={cn(
        'peer h-4 w-4 shrink-0 rounded-sm border border-primary ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
        isChecked && 'bg-primary text-primary-foreground',
        className
      )}
    >
      {isChecked && (
        <svg
          className="h-4 w-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={3}
            d="M5 13l4 4L19 7"
          />
        </svg>
      )}
    </button>
  );
}
