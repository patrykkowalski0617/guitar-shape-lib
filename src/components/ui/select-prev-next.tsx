"use client";

import * as React from "react";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface SelectPrevNextProps extends React.ComponentProps<typeof Select> {
  options: { value: string; label: string }[];
  placeholder?: string;
  className?: string;
  triggerClassName?: string;
}

export function SelectPrevNext({
  options,
  value,
  onValueChange,
  placeholder,
  className,
  triggerClassName,
  ...props
}: SelectPrevNextProps) {
  const shiftSelection = (direction: number) => {
    if (!options.length || !onValueChange) return;
    const currentIndex = options.findIndex((opt) => opt.value === value);
    const nextIndex =
      (currentIndex + direction + options.length) % options.length;
    onValueChange(options[nextIndex].value);
  };

  const handlePrev = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    shiftSelection(-1);
  };

  const handleNext = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    shiftSelection(1);
  };

  const sharedFocusStyles =
    "focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-0 focus-visible:z-150";

  const buttonStyles = cn(
    "h-8 w-8 px-0 flex items-center justify-center bg-muted/50 text-foreground shadow-none transition-none rounded-sm hover:bg-muted/70 hover:text-accent-foreground shrink-0 relative",
    sharedFocusStyles,
  );

  return (
    <div className={cn("flex items-center gap-0", className)}>
      <Button
        onClick={handlePrev}
        className={cn(
          buttonStyles,
          "rounded-r-none border-r border-background/20",
        )}
      >
        <ChevronLeftIcon className="size-3 opacity-50" />
      </Button>

      <Select value={value} onValueChange={onValueChange} {...props}>
        <SelectTrigger
          className={cn(
            "flex-1 rounded-none border-x-0 bg-muted/50 px-2 shadow-none",
            "data-placeholder:text-muted-foreground",
            sharedFocusStyles,
            triggerClassName,
          )}
        >
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent>{props.children}</SelectContent>
      </Select>

      <Button
        onClick={handleNext}
        className={cn(
          buttonStyles,
          "rounded-l-none border-l border-background/20",
        )}
      >
        <ChevronRightIcon className="size-3 opacity-50" />
      </Button>
    </div>
  );
}
