interface UseStepSliderLogicProps {
  value: number[] | undefined;
  options: string[];
}

export function useStepSliderLogic({
  value,
  options,
}: UseStepSliderLogicProps) {
  const currentValue = value?.[0] ?? 0;
  const lastOptionIndex = options.length - 1;
  const effectiveMax = Math.max(0, lastOptionIndex);

  const handleToggleAction = () => {};

  return {
    currentValue,
    effectiveMax,
    handleToggleAction,
  };
}
