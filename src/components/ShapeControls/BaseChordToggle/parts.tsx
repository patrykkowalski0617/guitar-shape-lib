import styled, { css } from "styled-components";
import { Button } from "@/components/ui/button";
import { ToggleGroup as ToggleG } from "@/components/ui/toggle-group";

const shadow = css`
  border: unset;
  box-shadow:
    inset 1px 1px 1px color-mix(in oklab, var(--foreground) 5%, transparent),
    inset 0px 0px 2px color-mix(in oklab, var(--background) 40%, transparent),
    -2px -2px 4px 0px color-mix(in oklab, var(--foreground) 20%, transparent),
    0px 0px 6px 4px color-mix(in oklab, var(--background) 70%, transparent);

  /* box-shadow:
    -1px -1px 1px 0px color-mix(in oklab, var(--foreground) 6%, transparent),
    1px 1px 2px 0px color-mix(in oklab, var(--background) 80%, transparent); */
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
