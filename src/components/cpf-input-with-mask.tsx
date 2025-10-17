"use client";

import React, { forwardRef } from "react";
import { IMaskInput } from "react-imask";
import { cn } from "@/lib/utils";

interface CpfInputWithMaskProps {
  name: string;
  value?: string;
  onChange?: (value: string) => void;
  onBlur?: React.FocusEventHandler<HTMLInputElement>;
  className?: string;
  placeholder?: string;
  disabled?: boolean;
}

const CpfInputWithMask = forwardRef<HTMLInputElement, CpfInputWithMaskProps>(
  (
    { name, value, onChange, onBlur, className, placeholder, disabled },
    ref
  ) => {
    return (
      <IMaskInput
        mask="000.000.000-00"
        id={name}
        name={name}
        value={value}
        onAccept={(unmaskedValue: string) => onChange?.(unmaskedValue)}
        onBlur={onBlur}
        inputRef={ref}
        placeholder={placeholder ?? "000.000.000-00"}
        disabled={disabled}
        className={cn(
          "file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input flex h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
          "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]",
          "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
          className
        )}
      />
    );
  }
);

CpfInputWithMask.displayName = "CpfInputWithMask";

export default CpfInputWithMask;
