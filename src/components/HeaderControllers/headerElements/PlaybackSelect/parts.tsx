import {
  color,
  disabledState,
  elementBase,
  Content as BaseContent,
} from "@/components/ui";
import { hoverGlow } from "@/components/ui";
import * as Popover from "@radix-ui/react-popover";
import styled from "styled-components";

export const Trigger = styled(Popover.Trigger)<{ $w?: number }>`
  ${elementBase}
  ${hoverGlow()}
  ${disabledState}
  background:      ${color.surface};
  color: ${color.fg};
  justify-content: space-between;

  @media (max-width: 1023px) {
    min-width: auto;
    width: auto;
    padding: 0 8px;

    .trigger-label {
      display: none;
    }
    .trigger-icon {
      display: flex;
    }
    .trigger-chevron {
      display: none;
    }
  }

  @media (min-width: 1024px) {
    .trigger-label {
      display: block;
    }
    .trigger-icon {
      display: none;
    }
    .trigger-chevron {
      display: flex;
    }
  }
`;

export const MobileContent = styled(BaseContent)`
  @media (max-width: 1023px) {
    width: max-content;
  }
`;
