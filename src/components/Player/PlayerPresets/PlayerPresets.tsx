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
import { PRESETS } from "@/data";
import * as S from "./parts";
import { playerIconSize } from "../constants";
import { useCloseEdit } from "../hooks/useCloseEdit";

export function PlayerPresets() {
  const [open, setOpen] = useState(false);
  const setBricks = usePlayerStore((state) => state.setBricks);
  const setTuneKeyId = useControlsStore((state) => state.setTuneKeyId);
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

    setTuneKeyId(keyId);
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
      <S.Button
        variant={"playerOutline"}
        onClick={handleClick}
        disabled={isPlaying}
      >
        <FolderOpen size={playerIconSize} />
      </S.Button>

      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput placeholder="Search for exercises..." />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandGroup heading="Built-in PRESETS">
            {PRESETS.map(({ name, bricks }) => (
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
