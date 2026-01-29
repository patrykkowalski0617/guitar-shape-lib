"use client";

import * as React from "react";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectTrigger, SelectValue } from "@/components/ui/select";

interface SelectWithNextProps extends React.ComponentProps<typeof Select> {
  options: { value: string; label: string }[];
  placeholder?: string;
  className?: string;
  triggerClassName?: string;
}

export function SelectWithNext({
  options,
  value,
  onValueChange,
  placeholder,
  className,
  triggerClassName,
  ...props
}: SelectWithNextProps) {
  const shiftSelection = (direction: number) => {
    if (!options.length || !onValueChange) return;
    const currentIndex = options.findIndex((opt) => opt.value === value);
    const nextIndex = (currentIndex + direction + options.length) % options.length;
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

  const itemStyles =
    "h-full border-y-0 border-l-0 border-r border-muted-foreground/30 shadow-none transition-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:z-20 rounded-none bg-transparent hover:bg-muted/50";

  return (
    <div
      className={cn(
        "flex items-center h-8 w-full",
        "bg-muted/30 border border-muted-foreground/30 rounded-md overflow-hidden",
        className,
      )}
    >
      <Button
        variant="ghost"
        size="icon"
        onClick={handlePrev}
        className={cn(itemStyles, "w-8 px-0 flex items-center justify-center grow-1 max-w-12")}
      >
        <ChevronLeftIcon className="size-3.5 opacity-50" />
      </Button>

      <Select value={value} onValueChange={onValueChange} {...props}>
        <SelectTrigger
          className={cn(
            itemStyles,
            "flex-1 border-l-0",
            "data-[placeholder]:text-muted-foreground",
            triggerClassName,
          )}
        >
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent>{props.children}</SelectContent>
      </Select>

      <Button
        variant="ghost"
        size="icon"
        onClick={handleNext}
        className={cn(
          itemStyles,
          "w-8 px-0 flex items-center justify-center border-r-0  grow-1 max-w-12",
        )}
      >
        <ChevronRightIcon className="size-3.5 opacity-50" />
      </Button>
    </div>
  );
}
