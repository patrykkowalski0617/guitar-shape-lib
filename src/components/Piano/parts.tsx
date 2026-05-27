import styled from "styled-components";
import { instrumentBRadius, instrumentElBRadius } from "./constants";

export const ShadowWrapper = styled.div`
  position: relative;
  transform-origin: center;
`;

export const PianoKeysLeftSideShadow = styled.div`
  height: 100%;
  position: absolute;
  width: 20px;
  box-shadow: 13px 0px 11px 0px
    color-mix(in oklab, hsl(0, 0%, 2%) 100%, transparent);
  z-index: 11;
  left: -30px;
  transform: skew(-6deg, 0deg);
`;

export const PianoKeysRightSideShadow = styled.div`
  height: 100%;
  position: absolute;
  width: 20px;
  box-shadow: -7px 0px 11px 0px
    color-mix(in oklab, hsl(0, 0%, 2%) 100%, transparent);
  z-index: 11;
  right: -30px;
  transform: skew(10deg, 0deg);
`;

export const PianoKeysTopShadow = styled.div`
  box-shadow: 0px 10px 20px 8px
    color-mix(in oklab, hsl(0, 0%, 2%) 100%, transparent);
  position: absolute;
  top: -20px;
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
    10px 10px 20px 4px color-mix(in oklab, hsl(0, 0%, 2%) 100%, transparent),
    0px -15px 30px 8px color-mix(in oklab, var(--foreground) 25%, transparent);
  top: 0;
  left: 1px;
  right: 1px;
  bottom: 1px;
  position: absolute;
`;

export const PianoWrapper = styled.div`
  background-color: color-mix(in oklab, hsl(0, 0%, 2%) 90%, transparent);
  border-radius: ${instrumentBRadius} ${instrumentBRadius}
    ${instrumentElBRadius} ${instrumentElBRadius};
  position: relative;
  overflow: hidden;
  margin-left: auto;
  width: 1400px;
  border: 3px solid #1b1b1b;
  border-bottom: 0;
  border-right-width: 1px;
  border-left-width: 1px;
`;

export const Piano = styled.div<{ $numberOfKeys: number }>`
  user-select: none;
  display: flex;
  padding: 0px 1px 0;
  position: relative;
  z-index: 10;
`;
