import { Button } from "@/components/ui/parts";
import type { DraggableAttributes } from "@dnd-kit/core";
import type { SyntheticListenerMap } from "@dnd-kit/core/dist/hooks/utilities";

interface DragHandleButtonProps {
  attributes: DraggableAttributes;
  listeners: SyntheticListenerMap | undefined;
}

export const DragHandleButton = ({
  attributes,
  listeners,
}: DragHandleButtonProps) => {
  return (
    <Button {...attributes} {...listeners} $widthMultiplier={1}>
      ::
    </Button>
  );
};
