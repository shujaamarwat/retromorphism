import * as React from "react"
import * as SliderPrimitive from "@radix-ui/react-slider"

import { cn } from "../../lib/utils"

const Slider = React.forwardRef<
  React.ElementRef<typeof SliderPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof SliderPrimitive.Root>
>(({ className, ...props }, ref) => (
  <SliderPrimitive.Root
    ref={ref}
    className={cn(
      "relative flex w-full touch-none select-none items-center py-4",
      className
    )}
    {...props}
  >
    <SliderPrimitive.Track className="relative h-6 w-full grow overflow-hidden rounded-full bg-white-100 border-2 border-[#001428] shadow-[inset_0_3px_0_rgba(0,20,40,0.3),0_2px_0_#001428]">
      <SliderPrimitive.Range className="absolute h-full bg-gradient-to-r from-primarysolid-50 to-primarysolid-60 rounded-full shadow-[inset_0_1px_0_rgba(255,255,255,0.3)]" />
    </SliderPrimitive.Track>
    <SliderPrimitive.Thumb className="block h-8 w-8 rounded-full bg-white-100 border-2 border-[#001428] shadow-[0_4px_0_#001428,0_6px_8px_rgba(0,20,40,0.3)] ring-offset-background transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primarysolid-50 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:shadow-[0_6px_0_#001428,0_8px_12px_rgba(0,20,40,0.4)] hover:-translate-y-0.5 active:shadow-[0_2px_0_#001428,0_3px_4px_rgba(0,20,40,0.3)] active:translate-y-0.5 cursor-grab active:cursor-grabbing relative before:absolute before:inset-1 before:rounded-full before:bg-gradient-to-b before:from-white-100 before:to-gray-100" />
  </SliderPrimitive.Root>
))
Slider.displayName = SliderPrimitive.Root.displayName

export { Slider }