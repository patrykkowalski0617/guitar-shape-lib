import { useState } from "react";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { FolderOpen } from "lucide-react";
import {
  useControlsStore,
  useMusicStore,
  usePlayerStore,
  type Brick,
} from "@/store";
import { presets } from "@/data/presets";
import { Button } from "@/components/ui/button";
import { playerIconSize } from "../constants";
import { useCloseEdit } from "../PlayerBricksControls/CloseEditButton/hooks/useCloseEdit";

export function PlayerPresets() {
  const [open, setOpen] = useState(false);
  const setBricks = usePlayerStore((state) => state.setBricks);
  const setTuneKeyId = useControlsStore((state) => state.setTuneKeyId);
  const setIsMajorMode = useControlsStore((state) => state.setIsMajorMode);
  // const setRoleId = useControlsStore((state) => state.setRoleId);
  const setShapeVariantLocationData = useMusicStore(
    (state) => state.setShapeVariantLocationData,
  );
  const setShapeVariantLocationData_locked = useMusicStore(
    (state) => state.setShapeVariantLocationData_locked,
  );
  const isPlaying = usePlayerStore((state) => state.isPlaying);
  const { closeEdit } = useCloseEdit();

  const handleSelect = (bricks: Brick[]) => {
    setBricks(bricks);

    if (!bricks[0].snapshot) return;

    const keyId = bricks[0].snapshot.keyId;
    const isMajorMode = bricks[0].snapshot.isMajorMode;
    setTuneKeyId(keyId);
    setIsMajorMode(isMajorMode);
    // setRoleId("all-matching-key");
    setShapeVariantLocationData(null);
    setShapeVariantLocationData_locked(null);

    setOpen(false);
  };

  const handleClick = () => {
    setOpen(true);
    closeEdit();
  };

  return (
    <>
      <Button
        variant={"playerOutline"}
        onClick={handleClick}
        disabled={isPlaying}
      >
        <FolderOpen size={playerIconSize} />
      </Button>
      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput placeholder="Search for exercises..." />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandGroup heading="Built-in presets">
            {presets.map(({ name, bricks }) => (
              <CommandItem key={name} onSelect={() => handleSelect(bricks)}>
                {name}
              </CommandItem>
            ))}
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </>
  );
}
