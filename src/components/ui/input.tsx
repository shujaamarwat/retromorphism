import * as React from "react";
import { cn } from "../../lib/utils";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          // Base styling
          "flex h-12 w-full rounded-2xl border-2 border-[#001428] bg-white-100 px-4 py-3",
          // Typography
          "font-text-16-med text-black-100 placeholder:text-black-60",
          // Focus and interaction states
          "transition-all duration-200 ease-in-out",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primarysolid-50 focus-visible:ring-offset-2",
          "hover:border-primarysolid-60",
          // Disabled state
          "disabled:cursor-not-allowed disabled:opacity-50 disabled:bg-black-10",
          // File input specific
          "file:border-0 file:bg-transparent file:text-sm file:font-medium",
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
Input.displayName = "Input";

export { Input };