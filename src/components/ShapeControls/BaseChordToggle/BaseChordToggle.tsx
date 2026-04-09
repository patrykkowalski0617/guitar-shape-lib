import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import { useBaseChordOptions } from "./hooks/useBaseChordOptions";
import { useBaseChordToggle } from "./hooks/useBaseChordToggle";
import { useShapeSelection } from "../ShapeSelect/hooks/useShapeSelection";
import { BaseChordExpandedList } from "./BaseChordExpandedList";
import { BaseChordCollapsedView } from "./BaseChordCollapsedView";
import { BaseChordLabel } from "./BaseChordLabel";
import type { TuneKeyId } from "@/data";

export default function BaseChordToggle() {
  const [isExpanded, setIsExpanded] = useState(false);
  const optionsPerKey = useBaseChordOptions();
  const { isShapeSelectOpen, setIsShapeSelectOpen } = useShapeSelection();
  const {
    currentValue,
    handleValueChange,
    handleKeyOnlyChange,
    currentTuneKeyId,
  } = useBaseChordToggle();

  const activeIndex = optionsPerKey.findIndex(
    (g) => g.tuneKeyId === currentTuneKeyId,
  );
  const activeGroup = optionsPerKey[activeIndex] || optionsPerKey[0];

  const handleExpandList = () => {
    setIsShapeSelectOpen(false);
    setIsExpanded(true);
  };

  const handleSelectKey = (tuneKeyId: TuneKeyId) => {
    handleKeyOnlyChange(tuneKeyId);
    setIsExpanded(false);
  };

  const handleBaseChordSelect = (
    combinedValue: string,
    shouldCloseExpanded = true,
  ) => {
    const effectiveValue = combinedValue === "" ? currentValue : combinedValue;
    const isClickingActiveChord = effectiveValue === currentValue;

    if (isClickingActiveChord) {
      const nextState = !isShapeSelectOpen;

      setIsShapeSelectOpen(nextState);
    } else {
      handleValueChange(effectiveValue);
      setIsShapeSelectOpen(true);
    }

    if (shouldCloseExpanded) {
      setIsExpanded(false);
    }
  };

  return (
    <div className="relative w-full" data-chord-area="true">
      <BaseChordLabel />
      <div className="relative w-full h-8">
        <AnimatePresence>
          {isExpanded ? (
            <BaseChordExpandedList
              optionsPerKey={optionsPerKey}
              currentTuneKeyId={currentTuneKeyId}
              currentValue={currentValue}
              activeIndex={activeIndex}
              onClose={() => setIsExpanded(false)}
              onSelectKey={handleSelectKey}
              onSelectChord={handleBaseChordSelect}
            />
          ) : (
            <BaseChordCollapsedView
              activeGroup={activeGroup}
              currentValue={currentValue}
              onExpand={handleExpandList}
              onSelectChord={(val) => handleBaseChordSelect(val, false)}
            />
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
