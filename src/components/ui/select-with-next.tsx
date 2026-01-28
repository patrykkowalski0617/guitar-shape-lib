"use client";

import * as React from "react";
import { ChevronRightIcon } from "lucide-react";
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
  const handleNext = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (!options.length || !onValueChange) return;

    const currentIndex = options.findIndex((opt) => opt.value === value);
    const nextIndex = (currentIndex + 1) % options.length;
    onValueChange(options[nextIndex].value);
  };

  return (
    <div className={cn("flex items-center h-8 w-full group/select-next", className)}>
      <Select value={value} onValueChange={onValueChange} {...props}>
        <SelectTrigger
          className={cn(
            "rounded-r-none border-r-0 h-8 flex-1",
            "focus-visible:z-20",
            triggerClassName,
          )}
        >
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent>{props.children}</SelectContent>
      </Select>

      <Button
        size="icon"
        onClick={handleNext}
        className={cn(
          "border border-muted-foreground/30 bg-primary/45 hover:bg-primary/65 text-foreground",
          "flex justify-center",
          "h-8 w-8 shrink-0 rounded-l-none border-muted-foreground/30",
          "focus-visible:ring-2 focus-visible:z-20",
          "-ml-[1px]",
        )}
      >
        <ChevronRightIcon className="size-3.5 opacity-50" />
      </Button>
    </div>
  );
}
