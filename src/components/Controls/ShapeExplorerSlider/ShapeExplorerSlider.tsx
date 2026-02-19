import { useMemo } from "react";
import { useControlsStore } from "@/store/useControlsStore";
import { useMusicStore } from "@/store/useMusicStore";
import { useProgressStore } from "@/store/useProgressStore";
import { getNotes } from "@/utils";
import { ControlWrapper } from "@/parts";
import { getOrderedShapeLocations } from "./helpers/getOrderedShapeLocations";
import { DiscreteSlider } from "@/components/ui/DiscreteSlider";
import { Check, Plus } from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

export function ShapeExplorerSlider() {
  const currentShapeId = useControlsStore((state) => state.currentShapeId);
  const currentKeyId = useControlsStore((state) => state.currentKeyId);
  const offset = useControlsStore((state) => state.currentShapeSemitoneOffsetFromC);

  const { learned, toggleLearned } = useProgressStore();
  const currentLocation = useMusicStore((state) => state.currentShapeVariantLocationData);
  const setCurrentLocation = useMusicStore((state) => state.setCurrentShapeVariantLocationData);

  const rootNoteName = useMemo(() => {
    if (offset === null) return null;
    return getNotes({ firstNote: currentKeyId })[offset % 12].sharpNoteName;
  }, [currentKeyId, offset]);

  const options = useMemo(
    () => getOrderedShapeLocations(currentShapeId, rootNoteName, learned),
    [currentShapeId, rootNoteName, learned],
  );

  const currentIndex = useMemo(() => {
    if (!currentLocation) return 0;
    const foundIdx = options.findIndex(
      (opt) =>
        opt.fretIndex === currentLocation.fretIndex &&
        opt.stringId === currentLocation.stringId &&
        opt.variantId === currentLocation.variantId,
    );
    return foundIdx !== -1 ? foundIdx + 1 : 0;
  }, [currentLocation, options]);

  const learnedIndexes = useMemo(
    () => options.map((opt, i) => (opt.isLearned ? i + 1 : null)).filter((v): v is number => v !== null),
    [options],
  );

  const currentOption = currentIndex > 0 ? options[currentIndex - 1] : null;

  const handleToggleLearned = () => {
    if (currentOption) {
      toggleLearned(currentOption.id);
      const isAdding = !learned.includes(currentOption.id);
      toast(isAdding ? "Added to learned." : "Removed from learned.");
    }
  };

  return (
    <ControlWrapper style={{ width: "96%", maxWidth: "unset", margin: "16px auto" }}>
      <DiscreteSlider
        value={[currentIndex]}
        max={options.length}
        step={1}
        learnedIndexes={learnedIndexes}
        onValueChange={(v) => {
          const val = v[0];
          setCurrentLocation(val === 0 ? null : options[val - 1]);
        }}
        disabled={!currentShapeId || options.length === 0}
        style={{ "--slider-color": "var(--primary)" } as React.CSSProperties}
      />

      <div className="flex justify-end items-center gap-3 mt-2 px-1 h-6">
        <button
          onClick={handleToggleLearned}
          disabled={currentIndex === 0}
          className={cn(
            "flex items-center gap-1.5 px-2 py-1 rounded-md text-[9px] font-bold uppercase transition-all border",
            currentIndex === 0
              ? "opacity-50 cursor-not-allowed bg-muted text-muted-foreground border-transparent"
              : currentOption?.isLearned
                ? "bg-accent/10 text-accent border-accent/20 hover:bg-accent/20"
                : "bg-muted text-muted-foreground border-transparent hover:bg-muted/80",
          )}
        >
          {currentOption?.isLearned ? <Check size={10} strokeWidth={3} /> : <Plus size={10} strokeWidth={3} />}
          {currentOption?.isLearned ? "Learned" : "Mark learned"}
        </button>

        <span className="text-[10px] font-bold text-primary uppercase tracking-widest min-w-[70px] text-right">
          {currentIndex > 0 ? `Variant ${currentIndex}` : "Explorer"}
        </span>
      </div>
    </ControlWrapper>
  );
}
