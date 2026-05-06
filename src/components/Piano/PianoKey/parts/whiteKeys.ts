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
  pianoBgColor,
  pseudoElKeyBase,
  simpleCutWidth,
  whiteKeyH,
  wideCutWidth,
  widerCutWidth,
} from "./constants";
import { transition, type WhiteKeyTypes } from "../../constants";

export const WhiteKeyJustifyContainer = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
`;

export const whiteKeyStyles: Record<WhiteKeyTypes, ReturnType<typeof css>> = {
  C: css`
    &::after {
      display: none;
    }
    &::before {
      right: -1px;
      width: ${wideCutWidth};
      border-radius: 0 0 0 6px;
    }
  `,
  F: css`
    &::after {
      display: none;
    }
    &::before {
      right: -1px;
      width: ${widerCutWidth};
      border-radius: 0 0 0 6px;
    }
  `,
  E: css`
    &::after {
      display: none;
    }
    &::before {
      left: -1px;
      width: ${wideCutWidth};
      border-radius: 0 0 6px 0;
    }
  `,
  B: css`
    &::after {
      display: none;
    }
    &::before {
      left: -1px;
      width: ${widerCutWidth};
      border-radius: 0 0 6px 0;
    }
  `,
  D: css`
    &::after {
      left: calc(${keyBorderWidth} * -1px);
      width: ${narrowCutWidth};
      border-radius: 0 0 6px 0;
    }
    &::before {
      right: calc(${keyBorderWidth} * -1px);
      width: ${narrowCutWidth};
      border-radius: 0 0 0 6px;
    }
  `,
  G: css`
    &::after {
      left: calc(${keyBorderWidth} * -1px);
      width: ${narrowerCutWidth};
      border-radius: 0 0 6px 0;
    }
    &::before {
      right: calc(${keyBorderWidth} * -1px);
      width: ${simpleCutWidth};
      border-radius: 0 0 0 6px;
    }
  `,
  A: css`
    &::after {
      left: calc(${keyBorderWidth} * -1px);
      width: ${simpleCutWidth};
      border-radius: 0 0 6px 0;
    }
    &::before {
      right: calc(${keyBorderWidth} * -1px);
      width: ${narrowerCutWidth};
      border-radius: 0 0 0 6px;
    }
  `,
};
export const whiteKeyWrapperStyles: Record<
  WhiteKeyTypes,
  ReturnType<typeof css>
> = {
  C: css`
    ${WhiteKeyJustifyContainer} {
      width: calc(100% - ${wideCutWidth});
      left: 0;
    }
    ${Note} {
      left: 50%;
    }
  `,
  F: css`
    ${WhiteKeyJustifyContainer} {
      width: calc(100% - ${widerCutWidth});
      left: 0;
    }
    ${Note} {
      left: 50%;
    }
  `,
  E: css`
    ${WhiteKeyJustifyContainer} {
      right: 0;
      width: calc(100% - ${wideCutWidth});
    }
    ${Note} {
      left: 50%;
    }
  `,
  B: css`
    ${WhiteKeyJustifyContainer} {
      right: 0;
      width: calc(100% - ${widerCutWidth});
    }
    ${Note} {
      left: 50%;
    }
  `,
  D: css`
    ${WhiteKeyJustifyContainer} {
      left: 50%;
      transform: translateX(-50%);
      width: calc(100% - ${narrowCutWidth} - ${narrowCutWidth});
    }
    ${Note} {
      left: 50%;
    }
  `,
  G: css`
    ${WhiteKeyJustifyContainer} {
      width: calc(100% - ${narrowerCutWidth} - ${simpleCutWidth});
      left: ${narrowerCutWidth};
    }
    ${Note} {
      left: 50%;
    }
  `,
  A: css`
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
  ${transition}
  position: relative;
  outline: 1px solid
    color-mix(in oklab, var(--instrument) 70%, var(--background));
  outline-offset: -1px;
  border-radius: 0 0 ${instrumentElBRadius} ${instrumentElBRadius};
  height: ${whiteKeyH}px;
  overflow: hidden;
  &::after,
  &::before {
    ${pseudoElKeyBase}
    height: calc(${blackKeyH}px + ${keysGap}px + 2px);
    background-color: ${pianoBgColor};
    border-top: calc(${keyBorderWidth}px + 1px) solid ${pianoBgColor};
    z-index: 1;
  }
`;

export const whiteWrapperKeyCommon = css`
  position: relative;
  padding: 0 ${keysGap}px 0 0;
`;
