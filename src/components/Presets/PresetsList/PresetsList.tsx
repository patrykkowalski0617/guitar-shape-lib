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
import { OutlineButton } from "@/components/Player/ui/parts";
import { useControlsStore, useMusicStore, usePlayerStore, type Brick } from "@/store";
import { presets } from "@/data/presets";

export function PresetsList() {
  const [open, setOpen] = useState(false);
  const setBricks = usePlayerStore((state) => state.setBricks);
  const setCurrentKey = useControlsStore((state) => state.setCurrentKey);
  const setIsMajorMode = useControlsStore((state) => state.setIsMajorMode);
  const setCurrentRoleId = useControlsStore((state) => state.setCurrentRoleId);
  const setShape = useControlsStore((state) => state.setShape);
  const setCurrentShapeVariantLocationData = useMusicStore((state) => state.setCurrentShapeVariantLocationData);
  const setLockedShapeVariantLocationData = useMusicStore((state) => state.setLockedShapeVariantLocationData);
  const isPlaying = usePlayerStore((state) => state.isPlaying);

  const handleSelect = (bricks: Brick[]) => {
    setBricks(bricks);

    if (!bricks[0].snapshot) return;

    const keyId = bricks[0].snapshot.keyId;
    const isMajorMode = bricks[0].snapshot.isMajorMode;
    const currentRoleId = bricks[0].snapshot.currentRoleId;
    const currentShapeSemitoneOffsetFromC = bricks[0].snapshot.currentShapeSemitoneOffsetFromC;
    const currentShapeId = bricks[0].snapshot.currentShapeId;
    setCurrentKey(keyId);
    setIsMajorMode(isMajorMode);
    setCurrentRoleId(currentRoleId);
    setShape(currentShapeId, currentShapeSemitoneOffsetFromC);
    setCurrentShapeVariantLocationData(null);
    setLockedShapeVariantLocationData(null);

    setOpen(false);
  };

  return (
    <>
      <OutlineButton onClick={() => setOpen(true)} disabled={isPlaying}>
        <FolderOpen size={14} />
      </OutlineButton>
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
