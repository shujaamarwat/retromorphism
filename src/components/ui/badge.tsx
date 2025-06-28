import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "../../lib/utils"

const badgeVariants = cva(
  "inline-flex items-center rounded-xl border-2 border-[#001428] px-3 py-1 text-xs font-title-16-black transition-colors focus:outline-none focus:ring-2 focus:ring-primarysolid-50 focus:ring-offset-2",
  {
    variants: {
      variant: {
        default:
          "bg-primarysolid-50 text-black-100 shadow-[0_2px_0_#001428]",
        secondary:
          "bg-secondarysolid-50 text-white-100 shadow-[0_2px_0_#001428]",
        destructive:
          "bg-error-50 text-white-100 shadow-[0_2px_0_#001428]",
        outline: "bg-white-100 text-black-100 shadow-[0_2px_0_#001428]",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  )
}

export { Badge, badgeVariants }