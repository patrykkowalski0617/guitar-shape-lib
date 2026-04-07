import { css } from "styled-components";
import type { WhiteKeyTypes } from "./whiteKeys";
import type { BlackKeyTypes } from "./blackKeys";

export type HighlightType = "secondary" | "accent";

export interface KeyHighlightProps {
  isHighlight: boolean;
  pianoKeyShape: WhiteKeyTypes | BlackKeyTypes | undefined;
  highlightColor: string;
}

const getRandomOffset = (range: number) =>
  Math.floor(Math.random() * (range * 2 + 1)) - range;

export const generateRandomRadialGradient = () => {
  const posX = getRandomOffset(5);
  const posY = getRandomOffset(10);

  return css`
    background: radial-gradient(
      circle,
      rgba(63, 94, 251, 0.5) 0%,
      rgba(252, 70, 107, 0.5) 100%
    );
    background-position: ${posX}px ${posY}px;
  `;
};

export const getKeyHighlight = ({
  isHighlight,
  pianoKeyShape,
  highlightColor,
}: KeyHighlightProps) => {
  const whiteKeyShadowSize = 35;
  const blackKeyShadowSize = 25;
  const boxShadowColor = `color-mix(in oklab, ${highlightColor} 100%, var(--background))`;
  const regularBorderColor = `color-mix(in oklab, var(--border) 70%, var(--background))`;
  const whiteKeyShadow = `inset 0 0 ${whiteKeyShadowSize}px 0 ${boxShadowColor}`;
  const blackKeyShadow = `inset 0 0 ${blackKeyShadowSize}px 0 ${boxShadowColor}`;

  const blackKeyHighlightStyle = css`
    &::before {
      box-shadow: ${blackKeyShadow};
      ${generateRandomRadialGradient()}
    }
  `;

  const whiteKeyPseudoElShadow = css`
    box-shadow: 0px 0px ${whiteKeyShadowSize / 2}px 0px ${boxShadowColor};
  `;

  const keySpecificStyles: Record<
    WhiteKeyTypes | BlackKeyTypes,
    ReturnType<typeof css>
  > = {
    C: css`
      box-shadow: ${whiteKeyShadow};
      &::before {
        ${whiteKeyPseudoElShadow}
      }
    `,
    D: css`
      box-shadow: ${whiteKeyShadow};
      &::before {
        ${whiteKeyPseudoElShadow}
      }
      &::after {
        ${whiteKeyPseudoElShadow}
      }
    `,
    E: css`
      box-shadow: ${whiteKeyShadow};
      &::before {
        ${whiteKeyPseudoElShadow}
      }
    `,
    F: css`
      box-shadow: ${whiteKeyShadow};
      &::before {
        ${whiteKeyPseudoElShadow}
      }
    `,
    G: css`
      box-shadow: ${whiteKeyShadow};
      &::before {
        ${whiteKeyPseudoElShadow}
      }
      &::after {
        ${whiteKeyPseudoElShadow}
      }
    `,
    A: css`
      box-shadow: ${whiteKeyShadow};
      &::before {
        ${whiteKeyPseudoElShadow}
      }
      &::after {
        ${whiteKeyPseudoElShadow}
      }
    `,
    B: css`
      box-shadow: ${whiteKeyShadow};
      &::before {
        ${whiteKeyPseudoElShadow}
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
