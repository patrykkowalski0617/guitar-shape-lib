import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useBaseChordOptions } from "./hooks/useBaseChordOptions";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { useBaseChordToggle } from "./hooks/useBaseChordToggle";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { TuneKeyId } from "@/data";
import { useShapeSelection } from "../ShapeSelect/hooks/useShapeSelection";

export default function BaseChordToggle() {
  const {
    currentValue,
    handleValueChange,
    handleKeyOnlyChange,
    currentTuneKeyId,
  } = useBaseChordToggle();
  const { setIsShapeSelectOpen } = useShapeSelection();

  const optionsPerKey = useBaseChordOptions();
  const [isExpanded, setIsExpanded] = useState(false);

  const activeIndex = optionsPerKey.findIndex(
    (g) => g.tuneKeyId === currentTuneKeyId,
  );

  const activeGroup = optionsPerKey[activeIndex] || optionsPerKey[0];
  const rowHeight = 32;
  const topOffset = activeIndex * rowHeight;

  const handleSelectKey = (tuneKeyId: TuneKeyId) => {
    handleKeyOnlyChange(tuneKeyId);
    setIsExpanded(false);
  };

  const handleBaseChordSelect = (combinedValue: string) => {
    handleValueChange(combinedValue);
    setIsExpanded(false);
    setIsShapeSelectOpen(true);
  };

  const handleBaseChordSelectOnClosedList = (combinedValue: string) => {
    handleValueChange(combinedValue);
    setIsShapeSelectOpen(true);
  };

  return (
    <div className="relative w-full h-8">
      <AnimatePresence>
        {isExpanded ? (
          <>
            <div
              className="fixed inset-0 z-[40]"
              onClick={() => setIsExpanded(false)}
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.1, ease: "easeOut" }}
              style={{ top: `-${topOffset}px` }}
              className="absolute left-0 w-full z-[50] bg-background shadow-2xl rounded-sm border border-background/20 overflow-hidden"
            >
              {optionsPerKey.map((group, index) => {
                const isCurrentKey = currentTuneKeyId === group.tuneKeyId;
                const isLastRow = index === optionsPerKey.length - 1;

                return (
                  <div
                    key={group.tuneKeyId}
                    className={cn(
                      "flex flex-row w-full items-center bg-background transition-opacity duration-200",
                      !isCurrentKey && "opacity-40 hover:opacity-100",
                    )}
                  >
                    <Button
                      variant={isCurrentKey ? "active" : "default"}
                      onClick={() =>
                        isCurrentKey
                          ? setIsExpanded(false)
                          : handleSelectKey(group.tuneKeyId)
                      }
                      className={cn(
                        "h-8 !rounded-none min-w-[70px] border-l border-b border-background/20",
                        isLastRow && "border-b-0",
                      )}
                    >
                      {group.label}
                    </Button>
                    <div style={{ width: "4px" }}></div>
                    <ToggleGroup
                      type="single"
                      value={currentValue}
                      onValueChange={handleBaseChordSelect}
                      className="max-w-none flex-1"
                    >
                      {group.chords.map((item) => (
                        <ToggleGroupItem
                          key={item.combinedId}
                          value={item.combinedId}
                          className={cn(
                            "!rounded-none border-b border-background/20",
                            isLastRow && "border-b-0",
                          )}
                        >
                          {item.chordName}
                        </ToggleGroupItem>
                      ))}
                    </ToggleGroup>
                  </div>
                );
              })}
            </motion.div>
          </>
        ) : (
          <div className="absolute inset-0 flex flex-row w-full items-center z-10">
            <Button
              variant="active"
              onClick={() => setIsExpanded(true)}
              className="rounded-r-none rounded-l-sm min-w-[70px]"
            >
              {activeGroup.label}
            </Button>
            <div style={{ width: "4px" }}></div>
            <ToggleGroup
              type="single"
              value={currentValue}
              onValueChange={handleBaseChordSelectOnClosedList}
              className="max-w-none flex-1"
            >
              {activeGroup.chords.map((item, idx) => {
                const isFirstInRow = idx === activeGroup.chords.length - 1;
                return (
                  <ToggleGroupItem
                    key={item.combinedId}
                    value={item.combinedId}
                    className={cn(
                      "!rounded-none border-y border-background/20",
                      isFirstInRow && "border-r !rounded-r-sm",
                    )}
                  >
                    {item.chordName}
                  </ToggleGroupItem>
                );
              })}
            </ToggleGroup>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
