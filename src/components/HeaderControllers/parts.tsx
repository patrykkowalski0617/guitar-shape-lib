import styled, { css } from "styled-components";
import { breakPoint, space } from "../ui";

export const ShapePlayerControllers = styled.div`
  display: flex;
  overflow-x: auto;
  overflow-y: visible;
  padding: 15px 0;
  margin: -15px 0;
  -ms-overflow-style: none;
  scrollbar-width: none;
  gap: ${space._3};
  ${breakPoint.desktopLarge(css`
    justify-content: center;
  `)}
`;

export const Section = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${space._2};
`;

export const ExerciseTitleMobileWrapper = styled.div`
  margin-bottom: ${space._6};
  width: 100%;
`;
