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
  const { setIsShapeSelectOpen } = useShapeSelection();
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

  const handleSelectKey = (tuneKeyId: TuneKeyId) => {
    handleKeyOnlyChange(tuneKeyId);
    setIsExpanded(false);
  };

  const handleBaseChordSelect = (combinedValue: string, shouldClose = true) => {
    handleValueChange(combinedValue);
    setIsShapeSelectOpen(true);
    if (shouldClose) setIsExpanded(false);
  };

  return (
    <div className="relative w-full">
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
              onExpand={() => setIsExpanded(true)}
              onSelectChord={(val) => handleBaseChordSelect(val, false)}
            />
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
