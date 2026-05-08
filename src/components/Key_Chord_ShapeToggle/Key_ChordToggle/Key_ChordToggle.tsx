import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import { useBaseChordOptions } from "./hooks/useBaseChordOptions";
import type { TuneKeyId } from "@/data";
import { useShapeSelection } from "../ShapeSelect/hooks/useShapeSelection";
import { useBaseChordToggle } from "./hooks/useBaseChordToggle";
import { Key_ChordLabel } from "./Key_ChordLabel";
import { Key_ChordExpandedList } from "./Key_ChordExpandedList";
import { Key_ChordCollapsedView } from "./Key_ChordCollapsedView";

export default function Key_ChordToggle() {
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

  const handleChordSelect = (
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
      <div className="relative w-full h-8">
        <div className="absolute w-full top-[-27px]">
          <Key_ChordLabel />
        </div>
        <AnimatePresence>
          {isExpanded ? (
            <Key_ChordExpandedList
              optionsPerKey={optionsPerKey}
              currentTuneKeyId={currentTuneKeyId}
              currentValue={currentValue}
              activeIndex={activeIndex}
              onClose={() => setIsExpanded(false)}
              onSelectKey={handleSelectKey}
              onSelectChord={handleChordSelect}
            />
          ) : (
            <Key_ChordCollapsedView
              activeGroup={activeGroup}
              currentValue={currentValue}
              onExpand={handleExpandList}
              onSelectChord={(val) => handleChordSelect(val, false)}
            />
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
