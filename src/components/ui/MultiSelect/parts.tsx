import styled from "styled-components";
import * as Popover from "@radix-ui/react-popover";
import { ChevronDown } from "lucide-react";
import {
  color,
  font,
  space,
  radius,
  duration,
  elementBase,
  disabledState,
} from "../tokens";
import { hoverGlow } from "../animations";

export const Trigger = styled(Popover.Trigger)<{
  $w?: number;
}>`
  ${elementBase}
  ${hoverGlow}
  ${disabledState}
  background:      ${color.surface};
  color: ${color.fg};
  justify-content: space-between;
  width: ${({ $w }) => ($w !== undefined ? `calc(40px * ${$w})` : "100%")};
`;

export const Value = styled.span`
  flex: 1;
  text-align: left;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  font-size: ${font.sm};
  line-height: normal;
`;

export const Placeholder = styled(Value)`
  color: ${color.fgMuted};
`;

export const Chevron = styled(ChevronDown)`
  flex-shrink: 0;
  width: 14px;
  height: 14px;
  transition: transform ${duration.fast} ease;
  [data-state="open"] & {
    transform: rotate(180deg);
  }
`;

export const Content = styled(Popover.Content)`
  width: var(--radix-popover-trigger-width);
  background: ${color.surface};
  border: 1px solid ${color.border};
  border-radius: ${radius.sm};
  overflow: hidden;
  z-index: 500;
  list-style: none;
  padding: ${space._1} 0;
  box-shadow: 0 4px 16px color-mix(in oklab, var(--void) 60%, transparent);
`;

export const Option = styled.li<{ $isSharedNote: boolean }>`
  display: flex;
  align-items: center;
  gap: ${space._2};
  padding: ${space._2} ${space._3};
  cursor: pointer;
  font-size: ${font.sm};
  opacity: ${({ $isSharedNote }) => ($isSharedNote ? 1 : 0.35)};
  pointer-events: ${({ $isSharedNote }) => ($isSharedNote ? "all" : "none")};
  transition: background ${duration.fast} ease;

  &:hover {
    background: ${color.surfaceHigh};
  }
`;

export const NoteName = styled.span`
  font-weight: ${font.bold};
  min-width: 20px;
`;

export const IntervalName = styled.span`
  color: ${color.fgMuted};
  font-size: ${font.xs};
`;
