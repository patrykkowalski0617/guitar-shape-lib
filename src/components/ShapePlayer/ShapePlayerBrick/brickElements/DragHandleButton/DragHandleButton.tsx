import type { DraggableAttributes } from "@dnd-kit/core";
import type { SyntheticListenerMap } from "@dnd-kit/core/dist/hooks/utilities";
import * as S from "./parts";

interface DragHandleButtonProps {
  attributes: DraggableAttributes;
  listeners: SyntheticListenerMap | undefined;
}

export const DragHandleButton = ({
  attributes,
  listeners,
}: DragHandleButtonProps) => {
  return <S.Button {...attributes} {...listeners} $variant={"outline"} />;
};
