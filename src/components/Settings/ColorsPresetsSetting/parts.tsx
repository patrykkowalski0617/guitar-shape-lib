import styled from "styled-components";
import { instrumentElBRadius } from "@/parts";

export const PresetItemWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  width: 100%;
  justify-content: center;
`;

export const ColorPreviewContainer = styled.div`
  width: 50px;
  height: 26px;
  background-color: var(--background);
  border-radius: ${instrumentElBRadius};
  display: flex;
`;

export const ColorPreview = styled.div<{ $color: string }>`
  flex: 1;
  border-radius: ${instrumentElBRadius};
  background-color: color-mix(in oklab, var(--accent) 5%, transparent);
  border: 3px solid ${({ $color }) => $color};
  box-shadow: inset 0 0px 10px 0px ${({ $color }) => $color};
`;

export const Label = styled.span`
  white-space: nowrap;
  width: 100px;
`;
