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
          "bg-muted/50 hover:bg-muted/60 text-foreground",
        ),
        active: cn(
          "h-8 px-2.5 rounded-md border border-muted-foreground/30",
          "bg-accent/30 hover:bg-accent/40 text-accent-foreground",
        ),
        playerDashed: cn(
          "h-[30px] w-[35px] font-bold border border-dashed border-border",
          "bg-background bg-background/80 hover:bg-muted/20 text-foreground",
        ),
        playerOutline: cn(
          "h-[30px] w-[35px] font-bold border border-accent-foreground",
          "bg-background hover:bg-background/80 text-accent-foreground",
        ),
        playerOutlineAccent: cn(
          "h-[30px] w-[35px] font-bold border-2 border-contrast",
          "bg-background hover:bg-background/80 text-contrast",
        ),
        playerOutlineWarn: cn(
          "h-[30px] w-[35px] font-bold border-2 border-warn",
          "bg-background hover:bg-background/80 text-warn",
        ),
        playerSolid: cn(
          "h-[30px] w-[35px] font-bold border-none",
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
