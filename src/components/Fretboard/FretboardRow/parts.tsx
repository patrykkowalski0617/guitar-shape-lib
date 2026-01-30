import styled from "styled-components";

export const FretboardRow = styled.div`
  display: flex;
  margin-bottom: 2px;
  flex-direction: row;

  & > :first-child {
    margin-right: 16px;
    position: relative;
  }
`;
