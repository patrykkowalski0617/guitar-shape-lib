import { Button as _Button } from "@/components/ui/button";
import styled from "styled-components";
import { playerElementCommon } from "../constants";

export const Button = styled(_Button)`
  ${playerElementCommon}
  border-color: color-mix(in oklab, var(--foreground) 80%, transparent);
  color: var(--background);
  background-color: color-mix(in oklab, var(--foreground) 50%, transparent);
`;
