import styled, { css } from "styled-components";
import { Button } from "@/components/ui/button";
import { ToggleGroup as ToggleG } from "@/components/ui/toggle-group";

const shadow = css`
  border: unset;
  box-shadow:
    0px 0px 1px 0px color-mix(in oklab, var(--foreground) 20%, transparent),
    -2px -2px 6px 1px color-mix(in oklab, var(--foreground) 20%, transparent),
    1px 1px 4px 0px color-mix(in oklab, var(--background) 100%, transparent),
    0px 0px 6px 0px color-mix(in oklab, var(--background) 100%, transparent),
    0px 0px 8px 0px color-mix(in oklab, var(--background) 100%, transparent),
    0px 0px 10px 1px color-mix(in oklab, var(--background) 100%, transparent);
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
