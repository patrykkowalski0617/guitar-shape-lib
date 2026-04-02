import styled, { css } from "styled-components";
import { Note } from "@/components/NoteLabel/parts";
import {
  blackKeyH,
  commonStyleForKeyBase,
  instrumentElBRadius,
  keyBorderWidth,
  keysGap,
  narrowCutWidth,
  narrowerCutWidth,
  pseudoElKeyBase,
  simpleCutWidth,
  wideCutWidth,
  widerCutWidth,
} from "./constants";

export type WhiteKeyTypes = "C" | "D" | "E" | "F" | "G" | "A" | "B";

export const WhiteKeyJustifyContainer = styled.div`
  position: relative;
`;

export const whiteKeyStyles: Record<WhiteKeyTypes, ReturnType<typeof css>> = {
  C: css`
    justify-content: flex-start;
    &::after {
      display: none;
    }
    &::before {
      right: -1px;
      width: ${wideCutWidth};
      border-right: calc(${keyBorderWidth}px) solid var(--background);
      border-radius: 0 0 0 6px;
    }
    ${WhiteKeyJustifyContainer} {
      width: calc(100% - ${wideCutWidth});
    }
    ${Note} {
      left: 50%;
    }
  `,
  F: css`
    justify-content: flex-start;
    &::after {
      display: none;
    }
    &::before {
      right: -1px;
      width: ${widerCutWidth};
      border-right: calc(${keyBorderWidth}px) solid var(--background);
      border-radius: 0 0 0 6px;
    }
    ${WhiteKeyJustifyContainer} {
      width: calc(100% - ${widerCutWidth});
    }
    ${Note} {
      left: 50%;
    }
  `,
  E: css`
    justify-content: flex-end;
    &::after {
      display: none;
    }
    &::before {
      left: -1px;
      width: ${wideCutWidth};
      border-left: calc(${keyBorderWidth}px) solid var(--background);
      border-radius: 0 0 6px 0;
    }
    ${WhiteKeyJustifyContainer} {
      width: calc(100% - ${wideCutWidth});
    }
    ${Note} {
      left: 50%;
    }
  `,
  B: css`
    justify-content: flex-end;
    &::after {
      display: none;
    }
    &::before {
      left: -1px;
      width: ${widerCutWidth};
      border-left: calc(${keyBorderWidth}px) solid var(--background);
      border-radius: 0 0 6px 0;
    }
    ${WhiteKeyJustifyContainer} {
      width: calc(100% - ${widerCutWidth});
    }
    ${Note} {
      left: 50%;
    }
  `,
  D: css`
    &::after {
      left: calc(${keyBorderWidth} * -1px);
      width: ${narrowCutWidth};
      border-left: calc(${keyBorderWidth}px) solid var(--background);
      border-radius: 0 0 6px 0;
    }
    &::before {
      right: calc(${keyBorderWidth} * -1px);
      width: ${narrowCutWidth};
      border-right: calc(${keyBorderWidth}px) solid var(--background);
      border-radius: 0 0 0 6px;
    }
    ${WhiteKeyJustifyContainer} {
      width: calc(100% - ${narrowCutWidth} - ${narrowCutWidth});
    }
    ${Note} {
      left: 50%;
    }
  `,
  G: css`
    justify-content: flex-start;
    &::after {
      left: calc(${keyBorderWidth} * -1px);
      width: ${narrowerCutWidth};
      border-left: calc(${keyBorderWidth}px) solid var(--background);
      border-radius: 0 0 6px 0;
    }
    &::before {
      right: calc(${keyBorderWidth} * -1px);
      width: ${simpleCutWidth};
      border-right: calc(${keyBorderWidth}px) solid var(--background);
      border-radius: 0 0 0 6px;
    }
    ${WhiteKeyJustifyContainer} {
      width: calc(100% - ${narrowerCutWidth} - ${simpleCutWidth});
      left: ${narrowerCutWidth};
    }
    ${Note} {
      left: 50%;
    }
  `,
  A: css`
    justify-content: flex-start;
    &::after {
      left: calc(${keyBorderWidth} * -1px);
      width: ${simpleCutWidth};
      border-left: calc(${keyBorderWidth}px) solid var(--background);
      border-radius: 0 0 6px 0;
    }
    &::before {
      right: calc(${keyBorderWidth} * -1px);
      width: ${narrowerCutWidth};
      border-right: calc(${keyBorderWidth}px) solid var(--background);
      border-radius: 0 0 0 6px;
    }
    ${WhiteKeyJustifyContainer} {
      width: calc(100% - ${simpleCutWidth} - ${narrowerCutWidth});
      left: ${simpleCutWidth};
    }
    ${Note} {
      left: 50%;
    }
  `,
};

export const whiteKeyCommon = css`
  ${commonStyleForKeyBase}
  position: relative;
  border-width: ${keyBorderWidth}px;
  border-style: solid;
  margin: 0 ${keysGap}px;
  border-radius: 0 0 ${instrumentElBRadius} ${instrumentElBRadius};
  height: 140px;
  &::after,
  &::before {
    ${pseudoElKeyBase}
    height: calc(${blackKeyH}px + ${keysGap}px + 2px);
    background-color: var(--background);
    border-top: calc(${keyBorderWidth}px + 3px) solid var(--background);
    z-index: 1;
    top: -1px;
  }
`;
