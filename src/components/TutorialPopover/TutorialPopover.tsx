import {
  Popover,
  PopoverContent,
  PopoverDescription,
  PopoverHeader,
  PopoverTitle,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Info } from "lucide-react";
import { IconWrapper } from "./parts";
import { useSettingsStore } from "@/store/useSettingsStore";

interface TutorialPopoverProps {
  title: string;
  description: string;
  x?: number;
  y?: number;
  animationOrder: number;
}

export default function TutorialPopover({
  title,
  description,
  x = 0,
  y = 0,
  animationOrder,
}: TutorialPopoverProps) {
  const isTutorialOn = useSettingsStore((state) => state.isTutorialOn);
  if (!isTutorialOn) return null;
  return (
    <Popover>
      <PopoverTrigger asChild>
        <IconWrapper $x={x} $y={y} $animationOrder={animationOrder}>
          <Info size={20} strokeWidth={1} color="var(--accent)" />
        </IconWrapper>
      </PopoverTrigger>

      <PopoverContent>
        <PopoverHeader>
          <PopoverTitle>{title}</PopoverTitle>
          <PopoverDescription>{description}</PopoverDescription>
        </PopoverHeader>
      </PopoverContent>
    </Popover>
  );
}
