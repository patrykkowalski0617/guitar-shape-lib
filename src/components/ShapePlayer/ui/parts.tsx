import styled from "styled-components";
import { elementBase } from "./constants";

export const Button = styled.button<{ $widthMultiplier?: number }>`
  ${elementBase}
`;
