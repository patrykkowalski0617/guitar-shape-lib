import { Button as _Button } from "@/components/ui/button";
import styled from "styled-components";
import { playerButtonCommon, playerElementCommon } from "../constants";

export const Button = styled(_Button)`
  ${playerElementCommon}
  ${playerButtonCommon}
    color: var(--background);
`;
