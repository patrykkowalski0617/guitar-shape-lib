import styled, { css } from "styled-components";
import { Button } from "@/components/ui/button";
import { ToggleGroup as ToggleG } from "@/components/ui/toggle-group";

const shadow = css`
  border: unset;
  box-shadow:
    -3px -3px 8px 2px color-mix(in oklab, var(--foreground) 15%, transparent),
    3px 3px 10px 2px color-mix(in oklab, var(--background) 100%, transparent),
    inset 3px 3px 6px color-mix(in oklab, var(--foreground) 30%, transparent),
    inset -3px -3px 8px color-mix(in oklab, var(--background) 40%, transparent),
    5px 5px 12px color-mix(in oklab, var(--background) 80%, transparent);
`;

export const ControlContainer = styled(Button)`
  ${shadow}
`;

export const KeySelectButton = styled(Button)`
  ${shadow}
`;

export const ToggleGroup = styled(ToggleG)`
  ${shadow}
`;
