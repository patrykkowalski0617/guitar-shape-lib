import styled from "styled-components";
import { space } from "../ui";

export const PlayerHeaderWrapper = styled.div`
  padding-left: 60px;
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  justify-content: space-between;
`;

export const Buttons = styled.div`
  display: flex;
  gap: ${space._3};
`;
