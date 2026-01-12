import styled from "styled-components";

interface ScaleTemplateProps {
  $numberOfKeys: number;
}

interface KeyProps {
  $isWhiteKey: boolean;
}

export const ScaleTemplate = styled.div<ScaleTemplateProps>`
  display: flex;
  flex-direction: row;
  margin: auto;
  justify-content: center;
  max-width: 900px;
  position: relative;
  padding-right: ${({ $numberOfKeys }) => `calc(100% / ${$numberOfKeys} / 2)`};
  padding-top: 50px;
`;

export const Key = styled.div<KeyProps>`
  flex: 1;
  width: 0;
  position: relative;
  height: 10px;
  background-color: green;
  margin: 1px;
`;
