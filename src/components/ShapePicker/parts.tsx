import styled from "styled-components"; // zakładam styled-components po składni S.*

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

export const InfoText = styled.div`
  text-align: center;
  padding: 0.25rem 0;
  font-size: 0.75rem;
  color: hsl(var(--muted-foreground));
`;

export const List = styled.ul`
  display: flex;
  flex-direction: column;
  border: 1px solid hsl(var(--border));
  border-radius: var(--radius);
  overflow: hidden;
`;

export const ListItem = styled.li`
  padding: 0.5rem 1rem;
  font-size: 0.875rem;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background-color: hsl(var(--accent));
  }
`;

export const RootNote = styled.span`
  opacity: 0.5;
  margin-right: 0.5rem;
`;

export const ShapeName = styled.span``;
