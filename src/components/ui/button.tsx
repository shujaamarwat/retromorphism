import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "../../lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-2xl text-sm font-title-16-black transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primarysolid-50 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border-2 border-[#001428] active:translate-y-1 active:shadow-[0_2px_0_#001428] [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default:
          "bg-primarysolid-50 text-black-100 shadow-[0_4px_0_#001428] hover:bg-primarysolid-40 hover:shadow-[0_6px_0_#001428] hover:-translate-y-0.5",
        destructive:
          "bg-error-50 text-white-100 shadow-[0_4px_0_#001428] hover:bg-error-40 hover:shadow-[0_6px_0_#001428] hover:-translate-y-0.5",
        outline:
          "border-2 border-[#001428] bg-white-100 text-black-100 shadow-[0_4px_0_#001428] hover:bg-primarysolid-10 hover:shadow-[0_6px_0_#001428] hover:-translate-y-0.5",
        secondary:
          "bg-secondarysolid-50 text-white-100 shadow-[0_4px_0_#001428] hover:bg-secondarysolid-40 hover:shadow-[0_6px_0_#001428] hover:-translate-y-0.5",
        ghost: "border-transparent shadow-none hover:bg-primarysolid-10 hover:text-black-100 active:translate-y-0 active:shadow-none",
        link: "border-transparent shadow-none text-secondarysolid-60 underline-offset-4 hover:underline active:translate-y-0 active:shadow-none",
      },
      size: {
        default: "h-12 px-6 py-3",
        sm: "h-10 rounded-xl px-4 text-xs",
        lg: "h-14 rounded-2xl px-8 text-base",
        icon: "h-12 w-12",
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
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }