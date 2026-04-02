import { css } from "styled-components";
import type { WhiteKeyTypes } from "./whiteKeys";
import type { BlackKeyTypes } from "./blackKeys";

export type HighlightType = "secondary" | "accent";

export interface KeyHighlightProps {
  isHighlight: boolean;
  pianoKeyShape: WhiteKeyTypes | BlackKeyTypes | undefined;
  highlightColor: string;
}

export const getKeyHighlight = ({
  isHighlight,
  pianoKeyShape,
  highlightColor,
}: KeyHighlightProps) => {
  const shadowSize = 25;
  const boxShadowColor = `color-mix(in oklab, ${highlightColor} 80%, var(--background))`;
  const regularBorderColor = `color-mix(in oklab, var(--border) 60%, var(--background))`;
  const defaultShadow = `inset 0 0 ${shadowSize}px 0 ${boxShadowColor}`;

  const blackKeyShadow = css`
    &::before {
      box-shadow: ${defaultShadow};
    }
  `;

  const leftEdgeShadow = css`
    box-shadow: -${shadowSize}px ${shadowSize}px
      ${shadowSize}px -${shadowSize}px ${boxShadowColor};
  `;

  const rightEdgeShadow = css`
    box-shadow: ${shadowSize}px ${shadowSize}px ${shadowSize}px -${shadowSize}px
      ${boxShadowColor};
  `;

  const keySpecificStyles: Record<
    WhiteKeyTypes | BlackKeyTypes,
    ReturnType<typeof css>
  > = {
    C: css`
      box-shadow: ${defaultShadow};
      &::before {
        ${leftEdgeShadow}
      }
    `,
    D: css`
      box-shadow: ${defaultShadow};
      &::before {
        ${leftEdgeShadow}
      }
      &::after {
        ${rightEdgeShadow}
      }
    `,
    E: css`
      box-shadow: ${defaultShadow};
      &::before {
        ${rightEdgeShadow}
      }
    `,
    F: css`
      box-shadow: ${defaultShadow};
      &::before {
        ${leftEdgeShadow}
      }
    `,
    G: css`
      box-shadow: ${defaultShadow};
      &::before {
        ${leftEdgeShadow}
      }
      &::after {
        ${rightEdgeShadow}
      }
    `,
    A: css`
      box-shadow: ${defaultShadow};
      &::before {
        ${leftEdgeShadow}
      }
      &::after {
        ${rightEdgeShadow}
      }
    `,
    B: css`
      box-shadow: ${defaultShadow};
      &::before {
        ${rightEdgeShadow}
      }
    `,
    "C#": blackKeyShadow,
    "D#": blackKeyShadow,
    "F#": blackKeyShadow,
    "G#": blackKeyShadow,
    "A#": blackKeyShadow,
  };

  const activeShapeStyle = pianoKeyShape
    ? keySpecificStyles[pianoKeyShape]
    : css``;

  const activeStyle = css`
    border-color: ${highlightColor};
    ${activeShapeStyle}
    &::before,
    &::after {
      border-color: ${highlightColor};
    }
  `;

  const standardStyle = css`
    border-color: ${regularBorderColor};
    &::before,
    &::after {
      border-color: ${regularBorderColor};
    }
  `;

  return isHighlight ? activeStyle : standardStyle;
};
