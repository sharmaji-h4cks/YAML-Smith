import * as React from 'react';
import { cn } from '../../lib/utils';

export interface SelectProps {
  value?: string;
  onValueChange?: (value: string) => void;
  defaultValue?: string;
  children: React.ReactNode;
}

export function Select({ value, onValueChange, defaultValue, children }: SelectProps) {
  const [isOpen, setIsOpen] = React.useState(false);
  const [selectedValue, setSelectedValue] = React.useState(defaultValue || value || '');

  React.useEffect(() => {
    if (value !== undefined) {
      setSelectedValue(value);
    }
  }, [value]);

  const handleSelect = (newValue: string) => {
    setSelectedValue(newValue);
    onValueChange?.(newValue);
    setIsOpen(false);
  };

  return (
    <SelectContext.Provider value={{ isOpen, setIsOpen, selectedValue, handleSelect }}>
      <div className="relative">{children}</div>
    </SelectContext.Provider>
  );
}

interface SelectContextType {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  selectedValue: string;
  handleSelect: (value: string) => void;
}

const SelectContext = React.createContext<SelectContextType | undefined>(undefined);

function useSelectContext() {
  const context = React.useContext(SelectContext);
  if (!context) {
    throw new Error('Select components must be used within Select');
  }
  return context;
}

export function SelectTrigger({ children, className }: { children: React.ReactNode; className?: string }) {
  const { isOpen, setIsOpen } = useSelectContext();

  return (
    <button
      type="button"
      onClick={() => setIsOpen(!isOpen)}
      className={cn(
        'flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
        className
      )}
    >
      {children}
      <svg
        className={cn('h-4 w-4 opacity-50 transition-transform', isOpen && 'rotate-180')}
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
      </svg>
    </button>
  );
}

export function SelectValue({ placeholder }: { placeholder?: string }) {
  const { selectedValue } = useSelectContext();

  // Find the selected item's label from children
  return <span>{selectedValue || placeholder || 'Select...'}</span>;
}

export function SelectContent({ children, className }: { children: React.ReactNode; className?: string }) {
  const { isOpen } = useSelectContext();

  if (!isOpen) return null;

  return (
    <div
      className={cn(
        'absolute z-50 mt-1 max-h-60 w-full overflow-auto rounded-md border bg-popover text-popover-foreground shadow-md animate-in fade-in-80',
        className
      )}
    >
      {children}
    </div>
  );
}

export function SelectItem({ value, children }: { value: string; children: React.ReactNode }) {
  const { selectedValue, handleSelect } = useSelectContext();

  return (
    <div
      onClick={() => handleSelect(value)}
      className={cn(
        'relative flex cursor-pointer select-none items-center rounded-sm px-3 py-2 text-sm outline-none hover:bg-accent hover:text-accent-foreground',
        selectedValue === value && 'bg-accent text-accent-foreground'
      )}
    >
      {children}
    </div>
  );
}
