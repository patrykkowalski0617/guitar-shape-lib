import {
  color,
  duration,
  element,
  hoverGlow,
  radius,
  space,
} from "@/components/ui";
import styled, { css, keyframes } from "styled-components";

export const CounterWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: ${element.heightSm};
  gap: 4px;
  border-radius: 6px;
  box-sizing: border-box;
  min-width: 250px;
  padding: 0 ${space._3};
`;

export const ControlButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid ${color.border};
  border-radius: ${radius.sm};
  cursor: pointer;
  padding: 0 2px;
  height: 100%;
  transition: color 0.2s;
  background: ${color.surface};
  user-select: none;
  ${hoverGlow()}
  &:hover:not(:disabled) {
    color: #ffe0c8;
  }

  &:disabled {
    opacity: 0.3;
    cursor: not-allowed;
  }
`;

export const BeatsContainer = styled.div`
  display: flex;
  flex: 1;
  height: 100%;
  gap: 4px;
  width: 150px;
`;

interface BeatIndicatorProps {
  $isActive: boolean;
}

const disappearingText = keyframes`
  from {
    color: ${color.fg};
    opacity: 1;
  }

  to {
    color: transparent;
    opacity: 0;
  }
`;

export const BeatIndicator = styled.div<BeatIndicatorProps>`
  flex: 1;
  height: 100%;
  border-radius: ${radius.sm};
  background-color: rgba(30, 10, 5, 0.6);
  border: 1px solid rgba(197, 48, 28, 0.1);
  box-shadow:
    0px 0px 0px rgba(220, 74, 55, 0),
    0px 0px 0px rgba(195, 55, 35, 0);
  transition:
    box-shadow 0.3s ease-out,
    border 4s ease-out;
  font-size: 20px;
  display: flex;
  justify-content: center;
  align-items: center;

  user-select: none;

  ${({ $isActive }) =>
    $isActive &&
    css`
      transition: none;

      background-color: #ffe0c8;

      border: 1px solid #c5301c;

      box-shadow:
        0px 0px 16px rgb(234, 69, 44),
        0px 0px 30px rgba(200, 48, 28, 0.4);
    `}
`;

export const BeatText = styled.span`
  animation: ${disappearingText} ${duration.crawl} forwards;
`;
