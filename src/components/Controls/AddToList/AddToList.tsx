import { useProgressStore, useMusicStore } from "@/store";
import { ControlWrapper, iconSize } from "../parts";
import { Button } from "@/components/ui/button";
import { Heart } from "lucide-react";
import { toast } from "sonner";
import { USER_LIST_MESSAGES } from "@/data/constants";

export function AddToList() {
  const { userList, toggleUserList } = useProgressStore();
  const shapeVariantLocationData = useMusicStore(
    (state) => state.shapeVariantLocationData,
  );

  const currentId = shapeVariantLocationData
    ? `${shapeVariantLocationData.shapeId}-${shapeVariantLocationData.stringId}-${shapeVariantLocationData.variantId}`
    : null;

  const isFavorite = !!(currentId && userList.includes(currentId));

  const handleToggle = () => {
    if (!currentId) {
      toast(USER_LIST_MESSAGES.SELECT_PROMPT);
      return;
    }

    toggleUserList(currentId);

    const notification = isFavorite
      ? USER_LIST_MESSAGES.REMOVED
      : USER_LIST_MESSAGES.ADDED;
    toast(notification);
  };

  return (
    <ControlWrapper>
      <Button
        variant={isFavorite ? "active" : "default"}
        className={!currentId ? "opacity-50" : ""}
        onClick={handleToggle}
      >
        <Heart size={iconSize} />
      </Button>
    </ControlWrapper>
  );
}
