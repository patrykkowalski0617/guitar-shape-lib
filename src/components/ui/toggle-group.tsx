"use client";

import * as React from "react";
import * as ToggleGroupPrimitive from "@radix-ui/react-toggle-group";
import { type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";
import { toggleVariants } from "@/components/ui/toggle";

const ToggleGroupContext = React.createContext<
  VariantProps<typeof toggleVariants> & {
    spacing?: number;
  }
>({
  size: "sm",
  variant: "outline",
  spacing: 0,
});

function ToggleGroup({
  className,
  variant = "outline",
  size = "sm",
  spacing = 0,
  children,
  ...props
}: React.ComponentProps<typeof ToggleGroupPrimitive.Root> &
  VariantProps<typeof toggleVariants> & {
    spacing?: number;
  }) {
  return (
    <ToggleGroupPrimitive.Root
      data-slot="toggle-group"
      data-variant={variant}
      data-size={size}
      data-spacing={spacing}
      style={{ "--gap": spacing } as React.CSSProperties}
      className={cn(
        "group/toggle-group flex w-full md:w-fit items-center h-8 gap-[--spacing(var(--gap))]",
        "bg-muted/30 border border-muted-foreground/30 rounded-md",
        className,
      )}
      {...props}
    >
      <ToggleGroupContext.Provider value={{ variant, size, spacing }}>
        {children}
      </ToggleGroupContext.Provider>
    </ToggleGroupPrimitive.Root>
  );
}

function ToggleGroupItem({
  className,
  children,
  variant,
  size,
  ...props
}: React.ComponentProps<typeof ToggleGroupPrimitive.Item> & VariantProps<typeof toggleVariants>) {
  const context = React.useContext(ToggleGroupContext);

  return (
    <ToggleGroupPrimitive.Item
      data-slot="toggle-group-item"
      data-variant={context.variant || variant}
      data-size={context.size || size}
      data-spacing={context.spacing}
      className={cn(
        toggleVariants({
          variant: context.variant || variant,
          size: context.size || size,
        }),
        "h-8 flex-auto min-w-0 shrink-0 px-3 flex items-center justify-center transition-none relative",
        "focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:z-20",
        "data-[spacing=0]:rounded-none",
        "data-[spacing=0]:first:rounded-l-[calc(var(--radius-md)-1px)]",
        "data-[spacing=0]:last:rounded-r-[calc(var(--radius-md)-1px)]",
        "data-[spacing=0]:border-y-0 data-[spacing=0]:border-l-0 data-[spacing=0]:border-r border-muted-foreground/30 last:border-r-0 shadow-none",
        className,
      )}
      {...props}
    >
      {children}
    </ToggleGroupPrimitive.Item>
  );
}

export { ToggleGroup, ToggleGroupItem };
