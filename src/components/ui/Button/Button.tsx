import styled, { css } from "styled-components";
import { color, elementBase, disabledState, breakPoint } from "../tokens";
import { hoverGlow } from "../animations";

type Variant =
  | "default"
  | "outline"
  | "ghost"
  | "active"
  | "warn"
  | "secondary"
  | "side";

const variantStyles = {
  default: css`
    background: ${color.surface};
    color: ${color.fg};
    ${hoverGlow()};
    ${breakPoint.mobileOnly(css`
      border: 1px solid
        color-mix(in oklab, ${color.border} 60%, ${color.primary});
    `)}
  `,
  outline: css`
    background: transparent !important;
    color: ${color.fgMuted};
    ${hoverGlow()}
    &:hover:not(:disabled) {
      color: ${color.fg};
      background: ${color.surface};
    }
    ${breakPoint.mobileOnly(css`
      border: 1px solid
        color-mix(in oklab, ${color.border} 60%, ${color.primary});
    `)}
  `,
  side: css`
    background: ${color.surface};
    color: ${color.fg};
    ${hoverGlow()};
    ${breakPoint.mobileOnly(css`
      border: 1px solid
        color-mix(in oklab, ${color.border} 60%, ${color.primary});
    `)}
    justify-content: flex-start;
  `,
  ghost: css`
    background: transparent !important;
    border-color: transparent;
    color: ${color.fg};

    &:hover:not(:disabled) {
      color: ${color.fgMuted};
      background: ${color.surface};
    }
  `,
  active: css`
    background: color-mix(in oklab, ${color.primary} 12%, ${color.surface});
    color: ${color.primary};
    ${hoverGlow()};
    ${breakPoint.mobileOnly(css`
      border: 1px solid color-mix(in oklab, ${color.primary} 45%, transparent);
    `)}
  `,
  warn: css`
    background: color-mix(in oklab, ${color.warn} 10%, ${color.bg});
    color: color-mix(in oklab, ${color.fg} 100%, transparent);
    ${hoverGlow()} &:hover:not(:disabled) {
      filter: saturate(1.5);
    }
    border: 1px solid ${color.warn};
  `,
  secondary: css`
    background: color-mix(
      in oklab,
      ${color.secondary} 100%,
      ${color.surfaceHigh}
    );
    color: ${color.void};
    ${hoverGlow({ color: color.secondary })}
    &:hover:not(:disabled) {
      filter: saturate(2);
    }
    ${breakPoint.mobileOnly(css`
      border: 1px solid ${color.void};
    `)}
  `,
};

export const Button = styled.button<{ $variant?: Variant; $w?: number }>`
  ${elementBase}
  ${({ $variant = "default" }) => variantStyles[$variant]}
  ${disabledState}
`;

Button.defaultProps = {
  $variant: "default",
  $w: 2,
};
