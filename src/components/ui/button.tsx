import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "../../lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 relative transform-gpu",
  {
    variants: {
      variant: {
        default:
          "bg-primarysolid-50 text-black-100 border-2 border-solid border-[#001428] font-text-16-med shadow-[0_6px_0_#001428,0_8px_12px_rgba(0,20,40,0.3)] hover:shadow-[0_6px_0_#001428,0_10px_16px_rgba(0,20,40,0.4)] active:shadow-[0_2px_0_#001428,0_4px_8px_rgba(0,20,40,0.2)] active:translate-y-1 before:absolute before:inset-0 before:rounded-lg before:bg-gradient-to-b before:from-white/20 before:to-transparent before:pointer-events-none",
        destructive:
          "bg-communicationsoliderror text-white-100 border-2 border-solid border-[#001428] font-text-16-med shadow-[0_6px_0_#001428,0_8px_12px_rgba(0,20,40,0.3)] hover:shadow-[0_6px_0_#001428,0_10px_16px_rgba(0,20,40,0.4)] active:shadow-[0_2px_0_#001428,0_4px_8px_rgba(0,20,40,0.2)] active:translate-y-1 before:absolute before:inset-0 before:rounded-lg before:bg-gradient-to-b before:from-white/20 before:to-transparent before:pointer-events-none",
        outline:
          "bg-white-100 text-black-100 border-2 border-solid border-[#001428] font-text-16-med shadow-[0_6px_0_#001428,0_8px_12px_rgba(0,20,40,0.3)] hover:shadow-[0_6px_0_#001428,0_10px_16px_rgba(0,20,40,0.4)] active:shadow-[0_2px_0_#001428,0_4px_8px_rgba(0,20,40,0.2)] active:translate-y-1 before:absolute before:inset-0 before:rounded-lg before:bg-gradient-to-b before:from-white/20 before:to-transparent before:pointer-events-none",
        secondary:
          "bg-secondarysolid-50 text-white-100 border-2 border-solid border-[#001428] font-text-16-med shadow-[0_6px_0_#001428,0_8px_12px_rgba(0,20,40,0.3)] hover:shadow-[0_6px_0_#001428,0_10px_16px_rgba(0,20,40,0.4)] active:shadow-[0_2px_0_#001428,0_4px_8px_rgba(0,20,40,0.2)] active:translate-y-1 before:absolute before:inset-0 before:rounded-lg before:bg-gradient-to-b before:from-white/20 before:to-transparent before:pointer-events-none",
        ghost: 
          "bg-transparent text-black-100 border-2 border-solid border-transparent hover:bg-primarysolid-10 hover:border-[#001428] hover:shadow-[0_4px_0_#001428,0_6px_8px_rgba(0,20,40,0.2)] active:shadow-[0_1px_0_#001428,0_2px_4px_rgba(0,20,40,0.1)] active:translate-y-1 transition-all duration-150",
        link: 
          "text-black-100 underline-offset-4 hover:underline bg-transparent border-none shadow-none hover:shadow-none active:shadow-none active:translate-y-0",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        style={{
          transition: 'all 150ms ease-in-out, transform 100ms ease-in-out',
        }}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }