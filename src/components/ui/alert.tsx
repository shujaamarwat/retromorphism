import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../../lib/utils";

const alertVariants = cva(
  "relative w-full rounded-2xl border-2 border-[#001428] p-4 [&>svg~*]:pl-7 [&>svg+div]:translate-y-[-3px] [&>svg]:absolute [&>svg]:left-4 [&>svg]:top-4 [&>svg]:text-foreground shadow-[-4px_8px_0px_#001428]",
  {
    variants: {
      variant: {
        default: "bg-white-100 text-foreground",
        destructive:
          "border-communicationsoliderror/50 text-communicationsoliderror dark:border-communicationsoliderror [&>svg]:text-communicationsoliderror bg-white-100",
        warning:
          "border-primarysolid-60/50 text-primarysolid-60 dark:border-primarysolid-60 [&>svg]:text-primarysolid-60 bg-primarysolid-10",
        success:
          "border-secondarysolid-60/50 text-secondarysolid-60 dark:border-secondarysolid-60 [&>svg]:text-secondarysolid-60 bg-secondarysolid-10",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

const Alert = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & VariantProps<typeof alertVariants>
>(({ className, variant, ...props }, ref) => (
  <div
    ref={ref}
    role="alert"
    className={cn(alertVariants({ variant }), className)}
    {...props}
  />
));
Alert.displayName = "Alert";

const AlertTitle = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h5
    ref={ref}
    className={cn("mb-1 font-medium leading-none tracking-tight font-title-16-black", className)}
    {...props}
  />
));
AlertTitle.displayName = "AlertTitle";

const AlertDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("text-sm [&_p]:leading-relaxed font-text-16-med", className)}
    {...props}
  />
));
AlertDescription.displayName = "AlertDescription";

export { Alert, AlertTitle, AlertDescription };