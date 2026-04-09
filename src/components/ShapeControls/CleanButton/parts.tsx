import styled from "styled-components";

export const Wrapper = styled.div<{ $isVisible: boolean }>`
  transition: 0.3s opacity;
  opacity: ${({ $isVisible }) => ($isVisible ? "1" : "0")};
`;
