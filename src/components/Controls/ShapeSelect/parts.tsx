import { ControlWrapper } from "@/parts";
import styled, { keyframes } from "styled-components";

const pulseHighlight = keyframes`
  0% {
    box-shadow: 0 0 0 0px var(--primary);
  }
  50% {
    box-shadow: 0 0 20px 5px rgba(0, 0, 0, 0);
  }
  100% {
    box-shadow: 0 0 0 0px rgba(0, 0, 0, 0);
  }
`;

export const AnimatedWrapper = styled(ControlWrapper)`
  border-radius: calc(var(--radius) - 2px);
  box-shadow: 0 0 0 0px transparent;
  animation: ${pulseHighlight} 3s ease-in-out 2s 3 forwards;
`;
