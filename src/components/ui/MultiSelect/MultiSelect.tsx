import * as Popover from "@radix-ui/react-popover";
import * as S from "./parts";
import { Led } from "../";

export interface MultiSelectOption {
  key: string;
  triggerLabel: string;
  optionLabel: string;
  intervalName?: string;
  isSelected: boolean;
  isShared: boolean;
}

interface MultiSelectProps {
  options: MultiSelectOption[];
  onToggle: (key: string) => void;
  placeholder?: string;
  $w?: number;
  triggerPrefix?: (count: number) => string;
}

export const MultiSelect = ({
  options,
  onToggle,
  placeholder = "Select...",
  $w,
  triggerPrefix,
}: MultiSelectProps) => {
  const selected = options.filter((o) => o.isSelected);
  const selectedLabels = selected.map((o) => o.triggerLabel).join(", ");
  const prefix = triggerPrefix?.(selected.length);
  const displayLabel =
    prefix && selectedLabels ? `${prefix} ${selectedLabels}` : selectedLabels;

  return (
    <Popover.Root>
      <S.Trigger $w={$w} aria-haspopup="listbox">
        {displayLabel ? (
          <S.Value>{displayLabel}</S.Value>
        ) : (
          <S.Placeholder>{placeholder}</S.Placeholder>
        )}
        <S.Chevron />
      </S.Trigger>

      <Popover.Portal>
        <S.Content
          sideOffset={4}
          collisionPadding={8}
          role="listbox"
          aria-multiselectable="true"
          asChild
        >
          <ul>
            {options.map(
              ({ key, optionLabel, intervalName, isSelected, isShared }) => (
                <S.Option
                  key={key}
                  role="option"
                  aria-selected={isSelected}
                  $isSharedNote={isShared}
                  onClick={() => onToggle(key)}
                >
                  <Led $active={isSelected} />
                  <S.NoteName>{optionLabel}</S.NoteName>
                  {intervalName && (
                    <S.IntervalName>{intervalName}</S.IntervalName>
                  )}
                </S.Option>
              ),
            )}
          </ul>
        </S.Content>
      </Popover.Portal>
    </Popover.Root>
  );
};
