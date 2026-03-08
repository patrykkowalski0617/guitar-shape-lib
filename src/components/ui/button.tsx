"use client";

import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-block items-center justify-center gap-2 whitespace-nowrap rounded-md text-[12px] font-semibold transition-none disabled:cursor-not-allowed disabled:opacity-50 shrink-0 focus:outline-none focus-visible:ring-2 focus-visible:ring-ring shadow-none h-9.5 px-2.5 flex items-center justify-center",
  {
    variants: {
      variant: {
        default:
          "border border-background bg-muted/50 hover:bg-muted/70 text-foreground",
        active:
          "border border-muted-foreground/30 bg-accent/80 hover:bg-accent text-accent-foreground",
      },
    },
  },
);

interface ButtonProps
  extends React.ComponentProps<"button">, VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  fixedWidthLabel?: React.ReactNode;
}

function Button({
  className,
  variant,
  asChild = false,
  fixedWidthLabel,
  children,
  ...props
}: ButtonProps) {
  const Comp = asChild ? Slot : "button";

  return (
    <Comp
      data-slot="button"
      data-variant={variant}
      className={cn(
        buttonVariants({ variant, className }),

        fixedWidthLabel && "flex-col",
      )}
      {...props}
    >
      {fixedWidthLabel ? (
        <>
          <span
            style={{ height: 0, overflow: "hidden", display: "block" }}
            aria-hidden="true"
          >
            {fixedWidthLabel}
          </span>
          <span>{children}</span>
        </>
      ) : (
        children
      )}
    </Comp>
  );
}

export { Button };
