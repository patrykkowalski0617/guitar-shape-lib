import styled, { css } from "styled-components";
import { color, elementBase, disabledState } from "../tokens";
import { hoverGlow } from "../animations";

type Variant =
  | "default"
  | "outline"
  | "ghost"
  | "active"
  | "warn"
  | "secondary";

const variantStyles = {
  default: css`
    background: ${color.surface};
    color: ${color.fg};
    ${hoverGlow()};
  `,
  outline: css`
    background: transparent !important;
    color: ${color.fgMuted};
    ${hoverGlow()}
    &:hover:not(:disabled) {
      color: ${color.fg};
      background: ${color.surface};
    }
  `,
  ghost: css`
    background: transparent !important;
    border-color: transparent;
    color: ${color.fgMuted};

    &:hover:not(:disabled) {
      color: ${color.fg};
      background: ${color.surface};
    }
  `,
  active: css`
    background: color-mix(in oklab, ${color.primary} 12%, ${color.surface});
    border-color: color-mix(in oklab, ${color.primary} 45%, transparent);
    color: ${color.primary};
    ${hoverGlow()}
  `,
  warn: css`
    background: color-mix(in oklab, ${color.warn} 0%, ${color.bg});
    border-color: color-mix(in oklab, ${color.warn} 100%, transparent);
    color: color-mix(in oklab, ${color.warn} 100%, transparent);
    ${hoverGlow()} &:hover:not(:disabled) {
      filter: saturate(1.5);
    }
  `,
  secondary: css`
    background: color-mix(
      in oklab,
      ${color.secondary} 100%,
      ${color.surfaceHigh}
    );
    border-color: color-mix(in oklab, ${color.secondary} 100%, transparent);
    color: ${color.void};
    ${hoverGlow({ color: color.secondary })}
    &:hover:not(:disabled) {
      filter: saturate(2);
    }
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
