import { css } from "styled-components";
import type { KeyTypes } from "../../constants";

export type PushedType = "secondary" | "accent";

export interface KeyPushedProps {
  isPushed: boolean;
  pianoKeyShape: KeyTypes | undefined;
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

export const getKeyPushEffect = ({
  isPushed = false,
  pianoKeyShape,
}: KeyPushedProps) => {
  const whiteKeyShadowSize = 5;
  const boxShadowColor = `color-mix(in oklab, var(--background) 100%, transparent)`;
  const regularBorderColor = `color-mix(in oklab, var(--fretboard) 70%, var(--background))`;
  const whiteKeyShadow = `inset 0 0 ${whiteKeyShadowSize}px 0 ${boxShadowColor}`;

  const blackKeyPushedStyle = css`
    &::before {
      transform: scale(0.99) translateY(-1px);
      box-shadow: 1px 1px 3px 1px
        color-mix(in oklab, var(--background) 100%, transparent) !important;

      border-color: color-mix(
        in oklab,
        var(--fretboard) 20%,
        var(--muted)
      ) !important;
    }
  `;

  const whiteKeyPseudoElShadow = css`
    box-shadow: 0px 0px ${whiteKeyShadowSize * 2}px 0px ${boxShadowColor};
    border-color: var(--muted);
  `;

  const keySpecificStyles: Record<KeyTypes, ReturnType<typeof css>> = {
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
    "C#": blackKeyPushedStyle,
    "D#": blackKeyPushedStyle,
    "F#": blackKeyPushedStyle,
    "G#": blackKeyPushedStyle,
    "A#": blackKeyPushedStyle,
  };

  const activeShapeStyle = pianoKeyShape
    ? keySpecificStyles[pianoKeyShape]
    : "";

  const activeStyle = css<{ $isWhitePianoKey: boolean }>`
    ${({ $isWhitePianoKey }) => {
      const whitePianoKeyCommonPushedStyle = $isWhitePianoKey
        ? css`
            transform: scale(0.95) translateY(-2px);
            opacity: 0.95;
            outline: 1px solid var(--foreground);
          `
        : "";

      return css`
        ${whitePianoKeyCommonPushedStyle};

        ${activeShapeStyle}
      `;
    }}
  `;

  const standardStyle = css`
    border-color: ${regularBorderColor};
    &::before,
    &::after {
      border-color: ${regularBorderColor};
    }
  `;

  return isPushed ? activeStyle : standardStyle;
};
