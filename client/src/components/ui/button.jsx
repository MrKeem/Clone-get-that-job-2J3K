import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-Pink text-white hover:bg-LightPink active:bg-DarkPink",
        destructive:
          "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline:
          "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
        primary: "bg-DarkPink text-White hover:bg-Pink active:bg-LightPink",
        secondary:
          "bg-white text-Gray border border-Pink text-Gray hover:bg-Background active:bg-Background-foreground",
        disabled:
          "bg-BackgroundDark text-LightGray hover:bg-Background active:bg-Background",
        bare: "w-fit",
        ghost:
          "bg-white text-Gray hover:bg-Background  active:bg-BackgroundDark",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-14 px-[24px] py-[16px] m-[4px] rounded-2xl",
        primary: "h-10 px-[16px] py-[8px] rounded-2xl space-x-2",
        secondary: "h-10 px-[16px] py-[8px] rounded-2xl",
        bare: "h-fit space-x-1",
        upload: "h-9 p-2 rounded-lg space-x-2",
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
);

const Button = React.forwardRef(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
