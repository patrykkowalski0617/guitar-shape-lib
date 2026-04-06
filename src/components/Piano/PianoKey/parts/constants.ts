import { css } from "styled-components";

export const instrumentElBRadius = "4px";
export const instrumentBRadius = "var(--radius-lg)";

export const keyBorderWidth = 1;
export const blackKeyH = 85;
export const blackKeyW = 23;
export const keysGap = 2;
export const tripleBlackKeysOffset = blackKeyW / 4 + 2;
export const doubleBlackKeysOffset = tripleBlackKeysOffset - 3;

export const baseCutCalc = `${blackKeyW}px / 2 + ${keysGap}px + 1px`;
export const wideCutWidth = css`calc(${baseCutCalc} + ${doubleBlackKeysOffset}px)`;
export const widerCutWidth = css`calc(${baseCutCalc} + ${tripleBlackKeysOffset}px)`;
export const narrowCutWidth = css`calc(${baseCutCalc} - ${doubleBlackKeysOffset}px)`;
export const narrowerCutWidth = css`calc(${baseCutCalc} - ${tripleBlackKeysOffset}px)`;
export const simpleCutWidth = css`calc(${baseCutCalc})`;

export const commonStyleForKeyBase = css`
  flex: 1 1 0;
  display: flex;
  justify-content: center;
  border-radius: 0 0 ${instrumentElBRadius} ${instrumentElBRadius};
  background-color: color-mix(in oklab, var(--accent) 35%, transparent);
`;

export const pseudoElKeyBase = css`
  content: "";
  display: block;
  border-width: ${keyBorderWidth}px;
  border-style: solid;
  border-radius: 0 0 ${instrumentElBRadius} ${instrumentElBRadius};
  position: absolute;
`;
