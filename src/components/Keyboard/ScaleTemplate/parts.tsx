import styled from "styled-components";

interface KeyProps {
  $isWhiteKey: boolean;
  $isInitialScaleNote: boolean;
}

export const Key = styled.div<KeyProps>`
  flex: 1;
  width: 0;
  position: relative;
  height: 10px;
  background-color: ${({ $isInitialScaleNote }) => ($isInitialScaleNote ? "green" : "transparent")};
  margin: 1px;
`;
