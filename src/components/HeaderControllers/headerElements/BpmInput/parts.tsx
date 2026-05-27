import styled from "styled-components";
import { NumberInput as _NumberInput } from "@/components/ui";

export const NumberInput = styled(_NumberInput)<{ $isDraggingState: boolean }>`
  cursor: ns-resize;
  user-select: ${({ $isDraggingState }) =>
    $isDraggingState ? "none" : "auto"};
  touch-action: none;
  width: 75px;
`;
