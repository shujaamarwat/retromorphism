import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../../lib/utils";

const badgeVariants = cva(
  "inline-flex items-center rounded-2xl border-2 border-[#001428] px-4 py-2 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 shadow-[-2px_4px_0px_#001428] font-text-12-med",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-primarysolid-50 text-black-100 hover:bg-primarysolid-60",
        secondary:
          "border-transparent bg-secondarysolid-50 text-white-100 hover:bg-secondarysolid-60",
        destructive:
          "border-transparent bg-communicationsoliderror text-white-100 hover:bg-communicationsoliderror/80",
        outline: "text-foreground bg-white-100",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  );
}

export { Badge, badgeVariants };