import { motion } from "framer-motion";
import { BaseChordSingleRow } from "./BaseChordSingleRow";
import type { TuneKeyId } from "@/data";
import { BaseChordLabel } from "./BaseChordLabel";

interface Props {
  optionsPerKey: any[];
  currentTuneKeyId: TuneKeyId | null;
  currentValue: string | undefined;
  activeIndex: number;
  onClose: () => void;
  onSelectKey: (id: TuneKeyId) => void;
  onSelectChord: (val: string) => void;
}

export function BaseChordExpandedList({
  optionsPerKey,
  currentTuneKeyId,
  currentValue,
  activeIndex,
  onClose,
  onSelectKey,
  onSelectChord,
}: Props) {
  const ROW_HEIGHT = 32;
  const topOffset = activeIndex * ROW_HEIGHT;

  return (
    <>
      <div className="fixed inset-0 z-[40]" onClick={onClose} />
      <motion.div
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.98 }}
        transition={{ duration: 0.1, ease: "easeOut" }}
        style={{ top: `-${topOffset + 23}px` }}
        className="absolute left-0 w-full z-[50] bg-background shadow-2xl rounded-sm border border-background/20 overflow-hidden"
      >
        <BaseChordLabel />

        <div className="rounded-sm overflow-hidden">
          {optionsPerKey.map((group, index) => (
            <BaseChordSingleRow
              key={group.tuneKeyId}
              group={group}
              isCurrentKey={currentTuneKeyId === group.tuneKeyId}
              currentValue={currentValue}
              isLastRow={index === optionsPerKey.length - 1}
              onSelectKey={() => onSelectKey(group.tuneKeyId)}
              onSelectChord={onSelectChord}
              onClose={onClose}
            />
          ))}
        </div>
      </motion.div>
    </>
  );
}
