import { useProgressStore, useMusicStore } from "@/store";
import { ControlWrapper } from "../parts";
import { Button } from "@/components/ui/button";
import { Heart } from "lucide-react";
import { toast } from "sonner";

export function AddToList() {
  const { learned, toggleLearned } = useProgressStore();
  const currentLocation = useMusicStore((state) => state.currentShapeVariantLocationData);

  const currentId = currentLocation
    ? `${currentLocation.shapeId}-${currentLocation.stringId}-${currentLocation.variantId}`
    : null;

  const isFavorite = !!(currentId && learned.includes(currentId));

  const MESSAGES = {
    SELECT_PROMPT: "Please select a scale or arpeggio first.",
    ADDED: "Added to your collection.",
    REMOVED: "Removed from your collection.",
  };

  const handleToggle = () => {
    if (!currentId) {
      toast(MESSAGES.SELECT_PROMPT);
      return;
    }

    toggleLearned(currentId);

    const notification = isFavorite ? MESSAGES.REMOVED : MESSAGES.ADDED;
    toast(notification);
  };

  return (
    <ControlWrapper>
      <Button
        variant={isFavorite ? "active" : "outline"}
        onClick={handleToggle}
        className={!currentId ? "opacity-50 cursor-not-allowed" : ""}
      >
        <span className="flex items-center justify-center">
          <Heart className={`h-3.5 w-3.5 ${isFavorite ? "fill-current" : "opacity-50"}`} />
        </span>
      </Button>
    </ControlWrapper>
  );
}
