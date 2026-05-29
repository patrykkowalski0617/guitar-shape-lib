import React from "react";
import { useUiStore } from "./store";

export const CheckView = () => {
  const selectedViewIndices = useUiStore((state) => state.selectedViewIndices);
  const setViewIndices = useUiStore((state) => state.setViewIndices);
  const names = [
    "led",
    "base",
    "shape",
    "target",
    "counter",
    "slider",
    "delete",
    "grab",
    "baseShort",
  ];
  const TOTAL_OPTIONS_COUNT = names.length;
  const checkboxOptions = Array.from(
    { length: TOTAL_OPTIONS_COUNT },
    (_, index) => ({
      id: `checkbox-option-${index}`,
      label: `${names[index]} ${index}`,
      value: index,
    }),
  );

  const handleSelectionChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const parsedIndex = parseInt(event.target.value, 10);
    const isAlreadySelected = selectedViewIndices.includes(parsedIndex);

    const updatedIndices = isAlreadySelected
      ? selectedViewIndices.filter((index) => index !== parsedIndex)
      : [...selectedViewIndices, parsedIndex];

    setViewIndices(updatedIndices);
  };

  return (
    <div className="checkbox-group-container">
      {checkboxOptions.map((option) => {
        const isCurrentOptionSelected = selectedViewIndices.includes(
          option.value,
        );

        return (
          <label key={option.id} className="checkbox-option-label">
            <input
              type="checkbox"
              name="custom-options-group"
              value={option.value}
              checked={isCurrentOptionSelected}
              onChange={handleSelectionChange}
              className="checkbox-option-input"
            />
            <span className="checkbox-option-text">{option.label}</span>
          </label>
        );
      })}
    </div>
  );
};
