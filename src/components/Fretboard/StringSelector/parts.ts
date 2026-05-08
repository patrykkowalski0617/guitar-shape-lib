import { Tick } from "@/components/ui/StepSlider/parts";
import styled from "styled-components";

export const StyledTick = styled(Tick)`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

export const IndicatorWrapper = styled.div<{ $hideTick: boolean }>`
  position: relative;
  height: 32px;
  transition: opacity 0.2s ease-in-out;
  opacity: ${({ $hideTick }) => ($hideTick ? 1 : 0.5)};
  display: flex;
  justify-content: center;
  align-items: center;
  left: 10px;
  z-index: 10;
`;

export const StringSelectorWrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 23px 0 0 20px;
  transform: skewX(-1deg);
  position: relative;
  z-index: 10;
`;

export const StringOption = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  cursor: pointer;
  user-select: none;
`;
