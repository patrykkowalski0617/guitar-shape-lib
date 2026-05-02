import styled, { css } from "styled-components";
import { Button } from "@/components/ui/button";
import { ToggleGroup as ToggleG } from "@/components/ui/toggle-group";
import { motion } from "framer-motion";
import { expandedListCommon } from "../constants";

const buttonBarShadow = css`
  border: unset;
  box-shadow:
    inset 1px 1px 1px 0px color-mix(in oklab, var(--foreground) 5%, transparent),
    inset -1px -1px 1px 0px
      color-mix(in oklab, var(--background) 50%, transparent),
    0px 0px 1px 0px color-mix(in oklab, var(--foreground) 20%, transparent),
    -2px -2px 6px 1px color-mix(in oklab, var(--foreground) 20%, transparent),
    1px 1px 4px 0px color-mix(in oklab, var(--background) 100%, transparent),
    0px 0px 6px 0px color-mix(in oklab, var(--background) 100%, transparent),
    0px 0px 8px 0px color-mix(in oklab, var(--background) 100%, transparent),
    0px 0px 10px 1px color-mix(in oklab, var(--background) 100%, transparent);
`;

export const KeySelectButton = styled(Button)`
  ${buttonBarShadow}
`;

export const ToggleGroup = styled(ToggleG)`
  ${buttonBarShadow}
`;

export const StyledMotionDiv = styled(motion.div)`
  position: absolute;
  left: 0;
  width: 100%;
  z-index: 50;
  border-radius: var(--radius-sm, 0.125rem);
  border: 1px solid color-mix(in srgb, var(--background), transparent 80%);
  display: flex;
  flex-direction: column;
  overflow: hidden;
  background: color-mix(in oklab, var(--background) 60%, var(--muted));
  ${expandedListCommon}
`;
