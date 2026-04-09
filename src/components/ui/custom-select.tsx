"use client";

import * as React from "react";
import { CheckIcon } from "lucide-react";
import { cn } from "@/lib/utils";

const SelectContext = React.createContext<{
  value?: string;
  onValueChange?: (value: string) => void;
  open: boolean;
  setOpen: (open: boolean) => void;
} | null>(null);

function Select({
  children,
  value,
  onValueChange,
  open: controlledOpen,
  onOpenChange,
}: {
  children: React.ReactNode;
  value?: string;
  onValueChange?: (value: string) => void;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}) {
  const [internalOpen, setInternalOpen] = React.useState(false);
  const isControlled = controlledOpen !== undefined;
  const open = isControlled ? controlledOpen : internalOpen;

  const setOpen = React.useCallback(
    (nextOpen: boolean) => {
      if (!isControlled) setInternalOpen(nextOpen);
      onOpenChange?.(nextOpen);
    },
    [isControlled, onOpenChange],
  );

  const containerRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      const isInsideSelect = containerRef.current?.contains(target);
      const isInsideChordToggle = target.closest('[data-chord-area="true"]');

      const shouldKeepOpen = isInsideSelect || isInsideChordToggle;

      if (open && !shouldKeepOpen) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, [open, setOpen]);

  return (
    <SelectContext.Provider value={{ value, onValueChange, open, setOpen }}>
      <div ref={containerRef} className="relative w-full" data-slot="select">
        {children}
      </div>
    </SelectContext.Provider>
  );
}

function SelectTrigger({
  className,
  children,
  disabled,
  ...props
}: React.ComponentProps<"button">) {
  const context = React.useContext(SelectContext);

  const handleToggle = () => {
    if (disabled) return;
    context?.setOpen(!context.open);
  };

  const hasNoValue = !context?.value || context.value === "";

  return (
    <button
      type="button"
      data-slot="select-trigger"
      disabled={disabled}
      onClick={handleToggle}
      className={cn(
        "flex h-8 w-full items-center justify-between gap-2 bg-background",
        "px-2 text-sm font-normal tracking-tight shadow-none transition-none",
        "whitespace-nowrap rounded-sm relative",
        "focus:outline-none focus-visible:ring-2 focus-visible:ring-ring",
        "cursor-default",
        hasNoValue && "opacity-0",
        className,
      )}
      {...props}
    >
      <span className="truncate w-full text-center">{children}</span>
    </button>
  );
}

function SelectContent({
  className,
  children,
  ...props
}: React.ComponentProps<"div">) {
  const context = React.useContext(SelectContext);
  if (!context?.open) return null;

  return (
    <div
      key="static-select-content"
      data-slot="select-content"
      className={cn(
        "absolute top-0 left-0 z-150 min-w-[8rem] w-full overflow-hidden rounded-sm shadow-md bg-popover text-popover-foreground",
        "animate-in fade-in-0 zoom-in-95",
        className,
      )}
      {...props}
    >
      <div className="p-0.5 w-full">{children}</div>
    </div>
  );
}

function SelectItem({
  className,
  children,
  value,
  ...props
}: React.ComponentProps<"div"> & { value: string }) {
  const context = React.useContext(SelectContext);
  const isSelected = context?.value === value;

  const handleItemClick = () => {
    context?.onValueChange?.(value);
    context?.setOpen(false);
  };

  return (
    <div
      data-slot="select-item"
      onClick={handleItemClick}
      className={cn(
        "hover:bg-accent/50 hover:text-accent-foreground relative flex w-full cursor-default items-center gap-2 rounded-sm outline-none select-none py-1 pr-7 pl-2 text-sm",
        isSelected && "bg-accent/30",
        className,
      )}
      {...props}
    >
      <span className="w-full text-left">{children}</span>
      {isSelected && (
        <span className="absolute right-1.5 flex size-3 items-center justify-center">
          <CheckIcon className="size-3" />
        </span>
      )}
    </div>
  );
}

function SelectValue({
  options,
  placeholder,
}: {
  options?: any[];
  placeholder?: string;
}) {
  const context = React.useContext(SelectContext);
  const activeOption = options?.find((opt) => opt.value === context?.value);

  if (!activeOption) return <span>{placeholder}</span>;

  return (
    <>
      <span className="opacity-50 mr-2">{activeOption.labelRootNote}</span>
      <span>{activeOption.labelShapeName}</span>
    </>
  );
}

export { Select, SelectTrigger, SelectContent, SelectItem, SelectValue };
