import styled, { css } from "styled-components";
import { Button } from "@/components/ui/button";
import { ToggleGroup as ToggleG } from "@/components/ui/toggle-group";
import { motion } from "framer-motion";
import { expandedListCommon } from "../constants";
import { outsideShadow } from "@/constants";

const buttonBarShadow = css`
  border: unset;
  ${outsideShadow}
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
