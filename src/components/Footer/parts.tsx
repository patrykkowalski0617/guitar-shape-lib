import styled from "styled-components";

export const Sign = styled.div`
  font-weight: 100;
  font-style: italic;
  font-size: 15px;
  color: color-mix(in oklab, var(--primary) 80%, var(--secondary-foreground));
  text-align: center;
  width: 100%;
  margin: 0;
  @media (min-width: 768px) {
    text-align: right;
  }
`;
