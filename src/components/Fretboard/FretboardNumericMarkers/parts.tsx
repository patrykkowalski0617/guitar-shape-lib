import styled from "styled-components";

export const Marker = styled.div<{
  $singleDot?: boolean;
  $doubleDot?: boolean;
}>`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  font-size: 12px;
  font-weight: 600;
  color: var(--border);
  user-select: none;
  margin-bottom: 5px;
`;
