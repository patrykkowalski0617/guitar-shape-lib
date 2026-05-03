import { playerElementCommon } from "@/components/Player/constants";
import { Button as _Button } from "@/components/ui/button";
import styled from "styled-components";

export const Button = styled(_Button)`
  ${playerElementCommon} svg {
    filter: drop-shadow(0px 0px 1px black);
  }
`;
