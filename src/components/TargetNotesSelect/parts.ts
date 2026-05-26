import { CheckLineIcon, ChevronDown } from "lucide-react";
import styled from "styled-components";

export const SelectWrapper = styled.div`
  position: relative;
  width: 100%;
`;

export const SelectTrigger = styled.button`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
  width: 100%;
  height: 36px;
  padding: 0 10px;
  border: 0.5px solid var(--border);
  border-radius: var(--radius-sm);
  background: var(--background);
  cursor: pointer;
  font-size: 14px;

  &:hover {
    border-color: var(--border);
  }
  &:focus {
    outline: none;
    box-shadow: 0 0 0 2px var(--background);
  }
`;

export const SelectValue = styled.span`
  flex: 1;
  text-align: left;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`;

export const SelectPlaceholder = styled(SelectValue)`
  color: var(--muted-foreground);
`;

export const SelectChevron = styled(ChevronDown)<{
  $isOpen: boolean;
}>`
  transition: transform 0.15s;
  ${({ $isOpen }) => $isOpen && `transform: rotate(180deg);`}
`;

export const SelectDropdown = styled.ul`
  position: absolute;
  top: calc(36px + 4px);
  left: 0;
  right: 0;
  border: 0.5px solid var(--border);
  border-radius: var(--radius-sm);
  background: var(--background);
  z-index: 100;
  overflow: hidden;
  list-style: none;
  padding: 0;
  margin: 0;
`;

export const SelectOption = styled.li<{
  $isSharedNote: boolean;
}>`
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 8px 10px;
  cursor: pointer;
  font-size: 14px;
  opacity: ${({ $isSharedNote }) => ($isSharedNote ? `1` : `0.5`)};
  pointer-events: ${({ $isSharedNote }) => ($isSharedNote ? `all` : `none`)};
  &:hover {
    background: var(--muted);
  }
`;

export const SelectCheckbox = styled.span<{ $isSelected: boolean }>`
  width: 16px;
  height: 16px;
  border: 0.5px solid var(--border);
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
`;

export const SelectNoteName = styled.span`
  font-weight: 500;
  min-width: 24px;
`;

export const SelectIntervalName = styled.span`
  color: var(var(--muted-foreground));
  font-size: 13px;
`;

export const CheckIcon = styled(CheckLineIcon)`
  width: 12px;
  height: 12px;
`;
