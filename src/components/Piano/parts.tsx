import styled from "styled-components";
import {
  instrumentBRadius,
  instrumentElBRadius,
} from "./PianoKey/parts/constants";

export const ShadowWrapper = styled.div`
  position: relative;
`;

export const PianoKeysShadow = styled.div`
  box-shadow: 0px 8px 8px 1px
    color-mix(in oklab, var(--background) 100%, transparent) inset;
  position: absolute;
  top: 0;
  left: -4px;
  right: -2px;
  border-radius: ${instrumentBRadius} ${instrumentBRadius} 0 0;
  height: 20px;
  z-index: 15;
`;

export const PianoShadow = styled.div`
  border-radius: ${instrumentBRadius} ${instrumentBRadius}
    ${instrumentElBRadius} ${instrumentElBRadius};
  box-shadow:
    5px 8px 10px 5px color-mix(in oklab, var(--background) 100%, transparent),
    0px -5px 20px 5px color-mix(in oklab, var(--foreground) 30%, transparent),
    0px 5px 20px 5px color-mix(in oklab, var(--background) 100%, transparent);
  height: 140px;
  left: 1px;
  right: 1px;
  bottom: 1px;
  position: absolute;
  transform: skew(1deg, 360deg);
`;

export const PianoWrapper = styled.div`
  background-color: color-mix(in oklab, var(--background) 90%, transparent);
  border-radius: ${instrumentBRadius} ${instrumentBRadius}
    ${instrumentElBRadius} ${instrumentElBRadius};
  position: relative;
  overflow: hidden;
`;

export const Piano = styled.div<{ $numberOfKeys: number }>`
  user-select: none;
  display: flex;
  padding: 0px 1px 0;
  position: relative;
  z-index: 10;
`;
