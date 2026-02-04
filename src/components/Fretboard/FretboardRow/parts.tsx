import styled from "styled-components";

export const FretboardRow = styled.div`
  display: flex;
  flex-direction: row;

  & > :first-child {
    margin-right: 16px;
    position: relative;
  }
`;
