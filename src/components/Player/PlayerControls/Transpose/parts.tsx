import styled from "styled-components";
import { Button as _Button } from "@/components/ui/button";
import { playerButtonCommon, playerElementCommon } from "../../constants";

export const Button = styled(_Button)`
  ${playerElementCommon}
  ${playerButtonCommon}
  color: var(--background);
  position: relative;
  padding: 0;
  width: 64px;
`;

export const ControlArea = styled.div<{ $disabled?: boolean }>`
  position: absolute;
  top: 0;
  bottom: 0;
  width: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: ${({ $disabled }) => ($disabled ? "default" : "pointer")};
  pointer-events: ${({ $disabled }) => ($disabled ? "none" : "auto")};
`;

export const MinusArea = styled(ControlArea)`
  left: 0;
  border-right: 1px solid rgba(0, 0, 0, 0.4);
`;

export const PlusArea = styled(ControlArea)`
  right: 0;
`;
