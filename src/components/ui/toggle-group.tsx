"use client";

import * as React from "react";
import { ToggleGroup as ToggleGroupPrimitive } from "radix-ui";
import { cn } from "@/lib/utils";
import { toggleVariants } from "@/components/ui/toggle";

const ToggleGroupContext = React.createContext<{
  spacing?: number;
}>({
  spacing: 0,
});

function ToggleGroup({
  className,
  spacing = 0,
  children,
  ...props
}: React.ComponentProps<typeof ToggleGroupPrimitive.Root> & {
  spacing?: number;
}) {
  return (
    <ToggleGroupPrimitive.Root
      data-slot="toggle-group"
      data-spacing={spacing}
      style={{ "--gap": spacing } as React.CSSProperties}
      className={cn(
        "group/toggle-group flex w-full max-w-[400px]",
        "items-center gap-[--spacing(var(--gap))] rounded-sm",
        className,
      )}
      {...props}
    >
      <ToggleGroupContext.Provider value={{ spacing }}>
        {children}
      </ToggleGroupContext.Provider>
    </ToggleGroupPrimitive.Root>
  );
}

function ToggleGroupItem({
  className,
  children,
  ...props
}: React.ComponentProps<typeof ToggleGroupPrimitive.Item>) {
  const context = React.useContext(ToggleGroupContext);

  const sharedFocusStyles =
    "focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-0 focus-visible:z-50";

  return (
    <ToggleGroupPrimitive.Item
      data-slot="toggle-group-item"
      data-spacing={context.spacing}
      className={cn(
        toggleVariants(),
        "h-8 flex-1 px-1 flex items-center justify-center relative font-bold",
        "bg-foreground/10 text-background transition-none text-background/90",
        "border-r border-background/20 last:border-r-0",
        "hover:bg-foreground/15",
        "data-[state=on]:bg-accent/35 data-[state=on]:hover:bg-accent/40 data-[state=on]:text-accent-foreground",
        sharedFocusStyles,
        "rounded-none",
        context.spacing === 0 && "first:rounded-l-sm last:rounded-r-sm",
        className,
      )}
      {...props}
    >
      <span className="truncate">{children}</span>
    </ToggleGroupPrimitive.Item>
  );
}

export { ToggleGroup, ToggleGroupItem };
