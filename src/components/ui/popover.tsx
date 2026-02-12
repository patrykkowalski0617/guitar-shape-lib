"use client";

import * as React from "react";
import * as PopoverPrimitive from "@radix-ui/react-popover";

import { cn } from "@/lib/utils";

const PopoverContext = React.createContext<{
  open: boolean;
  setOpen: (open: boolean) => void;
  isLocked: boolean;
  setIsLocked: (locked: boolean) => void;
} | null>(null);

const globalPopoverRegistry = new Set<(open: boolean) => void>();

function Popover({ children, ...props }: React.ComponentProps<typeof PopoverPrimitive.Root>) {
  const [open, setOpen] = React.useState(false);
  const [isLocked, setIsLocked] = React.useState(false);

  const handleExternalClose = React.useCallback((nextOpen: boolean) => {
    if (!nextOpen) {
      setOpen(false);
      setIsLocked(false);
    }
  }, []);

  const closeOthers = React.useCallback(() => {
    globalPopoverRegistry.forEach((closeFn) => {
      if (closeFn !== handleExternalClose) {
        closeFn(false);
      }
    });
  }, [handleExternalClose]);

  React.useEffect(() => {
    globalPopoverRegistry.add(handleExternalClose);
    return () => {
      globalPopoverRegistry.delete(handleExternalClose);
    };
  }, [handleExternalClose]);

  const setOpenWithInhibition = React.useCallback(
    (nextOpen: boolean) => {
      if (nextOpen) closeOthers();
      setOpen(nextOpen);
    },
    [closeOthers],
  );

  const handleOpenChange = (nextOpen: boolean) => {
    if (!nextOpen) {
      setOpen(false);
      setIsLocked(false);
    } else {
      closeOthers();
      setOpen(true);
    }
    props.onOpenChange?.(nextOpen);
  };

  return (
    <PopoverContext.Provider value={{ open, setOpen: setOpenWithInhibition, isLocked, setIsLocked }}>
      <PopoverPrimitive.Root {...props} open={open} onOpenChange={handleOpenChange}>
        {children}
      </PopoverPrimitive.Root>
    </PopoverContext.Provider>
  );
}

function PopoverTrigger({ ...props }: React.ComponentProps<typeof PopoverPrimitive.Trigger>) {
  const context = React.useContext(PopoverContext);
  if (!context) return null;

  const { setOpen, isLocked, setIsLocked } = context;

  const handleMouseEnter = () => {
    if (!isLocked) setOpen(true);
  };

  const handleMouseLeave = () => {
    if (!isLocked) setOpen(false);
  };

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();

    if (isLocked) {
      setIsLocked(false);
      setOpen(false);
    } else {
      setIsLocked(true);
      setOpen(true);
    }
  };

  return (
    <PopoverPrimitive.Trigger
      asChild
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
      {...props}
    >
      {props.children}
    </PopoverPrimitive.Trigger>
  );
}

function PopoverContent({
  className,
  align = "center",
  sideOffset = 4,
  ...props
}: React.ComponentProps<typeof PopoverPrimitive.Content>) {
  const context = React.useContext(PopoverContext);

  const handleMouseEnter = () => {
    if (context && !context.isLocked) context.setOpen(true);
  };

  const handleMouseLeave = () => {
    if (context && !context.isLocked) context.setOpen(false);
  };

  return (
    <PopoverPrimitive.Portal>
      <PopoverPrimitive.Content
        data-slot="popover-content"
        aria-describedby={undefined}
        align={align}
        sideOffset={sideOffset}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className={cn(
          "mx-3 bg-popover text-popover-foreground data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 ring-foreground/10 flex flex-col gap-2.5 rounded-lg p-2.5 text-sm shadow-2xl shadow-background ring-1 duration-100 z-150 w-72 origin-(--radix-popover-content-transform-origin) outline-hidden",
          className,
        )}
        {...props}
      />
    </PopoverPrimitive.Portal>
  );
}

function PopoverAnchor(props: React.ComponentProps<typeof PopoverPrimitive.Anchor>) {
  return <PopoverPrimitive.Anchor data-slot="popover-anchor" {...props} />;
}

function PopoverHeader({ className, ...props }: React.ComponentProps<"div">) {
  return <div data-slot="popover-header" className={cn("flex flex-col gap-0.5 text-sm", className)} {...props} />;
}

function PopoverTitle({ className, ...props }: React.ComponentProps<"h2">) {
  return <div data-slot="popover-title" className={cn("font-medium", className)} {...props} />;
}

function PopoverDescription({ className, ...props }: React.ComponentProps<"p">) {
  return (
    <p
      data-slot="popover-description"
      className={cn("text-muted-foreground", className)}
      style={{ whiteSpace: "pre-line" }}
      {...props}
    />
  );
}

export { Popover, PopoverAnchor, PopoverContent, PopoverDescription, PopoverHeader, PopoverTitle, PopoverTrigger };
