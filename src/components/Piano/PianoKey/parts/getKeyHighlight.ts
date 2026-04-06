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
  const whiteKeyShadowSize = 35;
  const blackKeyShadowSize = 20;
  const boxShadowColor = `color-mix(in oklab, ${highlightColor} 80%, var(--background))`;
  const regularBorderColor = `color-mix(in oklab, var(--border) 70%, var(--background))`;
  const whiteKeyShadow = `inset 0 0 ${whiteKeyShadowSize}px 0 ${boxShadowColor}`;
  const blackKeyShadow = `inset 0 0 ${blackKeyShadowSize}px 0 ${boxShadowColor}`;

  const blackKeyHighlightStyle = css`
    &::before {
      box-shadow: ${blackKeyShadow};
      background: radial-gradient(
        circle,
        rgba(63, 94, 251, 0.5) 0%,
        rgba(252, 70, 107, 0.5) 100%
      );
    }
  `;

  const leftEdgeShadow = css`
    box-shadow: -${whiteKeyShadowSize}px ${whiteKeyShadowSize}px
      ${whiteKeyShadowSize}px -${whiteKeyShadowSize}px ${boxShadowColor};
  `;

  const rightEdgeShadow = css`
    box-shadow: ${whiteKeyShadowSize}px ${whiteKeyShadowSize}px
      ${whiteKeyShadowSize}px -${whiteKeyShadowSize}px ${boxShadowColor};
  `;

  const keySpecificStyles: Record<
    WhiteKeyTypes | BlackKeyTypes,
    ReturnType<typeof css>
  > = {
    C: css`
      box-shadow: ${whiteKeyShadow};
      &::before {
        ${leftEdgeShadow}
      }
    `,
    D: css`
      box-shadow: ${whiteKeyShadow};
      &::before {
        ${leftEdgeShadow}
      }
      &::after {
        ${rightEdgeShadow}
      }
    `,
    E: css`
      box-shadow: ${whiteKeyShadow};
      &::before {
        ${rightEdgeShadow}
      }
    `,
    F: css`
      box-shadow: ${whiteKeyShadow};
      &::before {
        ${leftEdgeShadow}
      }
    `,
    G: css`
      box-shadow: ${whiteKeyShadow};
      &::before {
        ${leftEdgeShadow}
      }
      &::after {
        ${rightEdgeShadow}
      }
    `,
    A: css`
      box-shadow: ${whiteKeyShadow};
      &::before {
        ${leftEdgeShadow}
      }
      &::after {
        ${rightEdgeShadow}
      }
    `,
    B: css`
      box-shadow: ${whiteKeyShadow};
      &::before {
        ${rightEdgeShadow}
      }
    `,
    "C#": blackKeyHighlightStyle,
    "D#": blackKeyHighlightStyle,
    "F#": blackKeyHighlightStyle,
    "G#": blackKeyHighlightStyle,
    "A#": blackKeyHighlightStyle,
  };

  const activeShapeStyle = pianoKeyShape
    ? keySpecificStyles[pianoKeyShape]
    : "";

  const activeStyle = css`
    border-color: ${highlightColor};
    background: radial-gradient(
      circle,
      rgba(63, 94, 251, 0.5) 0%,
      rgba(252, 70, 107, 0.5) 100%
    );
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
