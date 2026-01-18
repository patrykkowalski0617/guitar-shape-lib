"use client";

import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-[12px] font-semibold transition-none disabled:cursor-not-allowed disabled:opacity-30 shrink-0 focus:outline-none focus-visible:ring-2 focus-visible:ring-ring shadow-none",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        destructive: "bg-destructive text-white hover:bg-destructive/90",
        outline: "border border-muted-foreground/30 bg-muted/30 hover:bg-muted/50 text-foreground",
        secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost: "hover:bg-accent/50 hover:text-current bg-transparent",
        link: "text-primary underline-offset-4 hover:underline bg-transparent border-none w-auto",
      },
      size: {
        default: "h-9 px-4 py-2 text-sm",
        sm: "h-8 px-3",
        lg: "h-10 px-6 text-sm",
        icon: "h-8 w-8 p-0 flex-none",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "sm",
    },
  }
);

function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
  }) {
  const Comp = asChild ? Slot : "button";

  return (
    <Comp
      data-slot="button"
      data-variant={variant}
      data-size={size}
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  );
}

export { Button, buttonVariants };
