"use client";

import * as React from "react";
import * as SwitchPrimitives from "@radix-ui/react-switch";

import { cn } from "@/lib/utils";

const Switch = React.forwardRef<
  React.ElementRef<typeof SwitchPrimitives.Root>,
  React.ComponentPropsWithoutRef<typeof SwitchPrimitives.Root> & {
    label?: string; // Optional label for accessibility
    size?: "small" | "medium" | "large"; // Add size options
  }
>(({ className, label, size = "medium", ...props }, ref) => {
  // Determine sizes
  const sizeClasses = {
    small: "h-4 w-8",
    medium: "h-6 w-11",
    large: "h-8 w-14",
  };

  const thumbSizeClasses = {
    small: "h-3 w-3 data-[state=checked]:translate-x-[18px] data-[state=unchecked]:translate-x-[2px]",
    medium: "h-5 w-5 data-[state=checked]:translate-x-[22px] data-[state=unchecked]:translate-x-[2px]",
    large: "h-6 w-6 data-[state=checked]:translate-x-[28px] data-[state=unchecked]:translate-x-[3px]",
  };

  return (
    <div className="flex items-center space-x-3">
      {label && (
        <label htmlFor={props.id} className="text-sm font-medium text-gray-900">
          {label}
        </label>
      )}
      <SwitchPrimitives.Root
        className={cn(
          "peer inline-flex shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=unchecked]:bg-gray-200",
          sizeClasses[size],
          className
        )}
        {...props}
        ref={ref}
      >
        <SwitchPrimitives.Thumb
          className={cn(
            "pointer-events-none block rounded-full bg-white shadow-lg ring-0 transition-transform",
            thumbSizeClasses[size]
          )}
        />
      </SwitchPrimitives.Root>
    </div>
  );
});

Switch.displayName = SwitchPrimitives.Root.displayName;

export { Switch };
