import styled, { css } from "styled-components";
import { breakPoint, space } from "../ui";

export const ShapePlayerControllers = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${space._3};
  ${breakPoint.desktop(css`
    padding-left: 60px;
  `)}
`;

export const Section = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${space._2};
`;
