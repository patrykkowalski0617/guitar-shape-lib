import styled from "styled-components";
import { instrumentElBRadius } from "@/components/Piano/PianoKey/parts/constants";
import { Label as _Label } from "@/parts";
import { glassEffectShadow } from "@/constants";

export const ITEM_WIDTH = 200;

export const RelativeContainer = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
`;

export const Wrapper = styled.div`
  width: ${ITEM_WIDTH}px;
  border-radius: ${instrumentElBRadius};
  border: 1px solid color-mix(in oklab, var(--border) 90%, var(--background));
  background-color: color-mix(in oklab, var(--accent) 45%, var(--background));
  overflow-x: auto;
  scroll-behavior: smooth;
  ${glassEffectShadow}
  position: relative;
  &::-webkit-scrollbar {
    display: none;
  }
  scrollbar-width: none;
  -ms-overflow-style: none;
`;

export const ScrollContainer = styled.div`
  display: flex;
  flex-direction: row;
  width: max-content;
`;

export const ShapeItem = styled.div<{ $isActive: boolean }>`
  flex: 0 0 ${ITEM_WIDTH}px;
  min-width: ${ITEM_WIDTH}px;
  height: 32px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  user-select: none;
  font-size: 13px;
`;

export const Indicators = styled.div`
  position: absolute;
  bottom: -13px;
  left: 5px;
  right: 5px;
  display: flex;
  justify-content: space-between;
`;

export const Dot = styled.div<{ $active: boolean }>`
  width: 4px;
  height: 4px;
  border-radius: 50%;
  background-color: ${({ $active }) =>
    $active
      ? "color-mix(in oklab, var(--accent) 70%, var(--background))"
      : "color-mix(in oklab, var(--accent) 50%, var(--background))"};
  transition:
    background-color 0.2s ease,
    transform 0.2s ease;
  transform: ${({ $active }) => ($active ? "scale(1.4)" : "scale(1)")};
`;

export const Label = styled(_Label)`
  white-space: nowrap;
  position: absolute;
  top: -23px;
`;
