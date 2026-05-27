import styled from "styled-components";
import { hoverGlowBorder, color, space } from "../ui";

export const ShapePicker = styled.div`
  padding: ${space._3};
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
  list-style: none;
`;

export const ListItem = styled.li`
  padding: 0.5rem 1rem;
  font-size: 0.875rem;
  cursor: pointer;
  transition: background-color 0.2s;
  ${hoverGlowBorder({ color: color.secondary })}
`;

export const RootNote = styled.span`
  opacity: 0.5;
  margin-right: 0.5rem;
`;

export const ShapeName = styled.span``;
