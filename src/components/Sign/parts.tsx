import styled from "styled-components";

export const Sign = styled.div`
  font-weight: 100;
  font-style: italic;
  font-size: 15px;
  color: color-mix(in oklab, var(--accent) 80%, var(--secondary-foreground));
  text-align: center;
  width: 100%;
  padding: 0 15px;
  margin-top: 20px;
  @media (min-width: 768px) {
    margin: 0;
    text-align: right;
  }
`;
