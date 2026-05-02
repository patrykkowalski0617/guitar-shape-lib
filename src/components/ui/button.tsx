"use client";

import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import { instrumentElBRadius } from "../Piano/PianoKey/parts/constants";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap font-semibold transition-none disabled:cursor-not-allowed disabled:opacity-50 shrink-0 focus:outline-none focus-visible:ring-2 focus-visible:ring-ring shadow-none text-[12px]",
  {
    variants: {
      variant: {
        default: cn(
          "h-8 px-2.5 rounded-md",
          "bg-muted/30 hover:bg-muted/60 text-foreground",
        ),
        active: cn(
          "h-8 px-2.5 rounded-md border border-muted-foreground/30",
          "bg-accent/15 hover:bg-accent/25 text-accent-foreground",
        ),
        playerDashed: cn(
          "h-[30px] w-[35px] border border-dashed border-border",
          "bg-muted/20 hover:bg-muted/40 hover:bg-muted/20 text-foreground",
        ),
        playerOutline: cn(
          "h-[30px] w-[35px] border border-accent-foreground",
          "bg-muted/20 hover:bg-muted/40 text-accent-foreground",
        ),
        playerOutlineAccent: cn(
          "h-[30px] w-[35px] font border border-contrast",
          "bg-muted/20 hover:bg-muted/40 text-contrast",
        ),
        playerOutlineWarn: cn(
          "h-[30px] w-[35px] border border-warn",
          "bg-muted/20 hover:bg-muted/40 text-warn",
        ),
        playerSolid: cn(
          "h-[30px] w-[35px] border",
          "bg-background bg-accent/70 hover:bg-accent/90 text-foreground",
        ),
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
  style,
  children,
  ...props
}: ButtonProps) {
  const Comp = asChild ? Slot : "button";

  const isStackedLayout = !!fixedWidthLabel;
  const isPlayerVariant = variant?.toString().startsWith("player");

  const finalStyle = isPlayerVariant
    ? { borderRadius: instrumentElBRadius, ...style }
    : style;

  return (
    <Comp
      data-slot="button"
      data-variant={variant}
      className={cn(
        buttonVariants({ variant, className }),
        isStackedLayout && "flex-col",
      )}
      style={finalStyle}
      {...props}
    >
      {isStackedLayout ? (
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
