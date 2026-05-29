import * as Dialog from "@radix-ui/react-dialog";
import { Menu } from "lucide-react";
import { useControllersStore, useMetronomeStore } from "@/store";
import { Button, Led } from "@/components/ui";
import * as S from "./parts";
import { FullscreenButton, Open, Save } from "./elements";

export const SideMenu = () => {
  const togglePlayBackingtrack = useControllersStore(
    (s) => s.togglePlayBackingtrack,
  );
  const playback = useControllersStore((s) => s.playback);
  const toggleIsMetronomeWithBass = useMetronomeStore(
    (s) => s.toggleIsMetronomeWithBass,
  );
  const isMetronomeWithBass = useMetronomeStore((s) => s.isMetronomeWithBass);

  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>
        <S.HamburgerButton aria-label="Open menu">
          <Menu size={16} />
        </S.HamburgerButton>
      </Dialog.Trigger>

      <Dialog.Portal>
        <S.Overlay />
        <S.Panel>
          <S.Section>
            <FullscreenButton />
          </S.Section>
          <S.Section>
            <Button $variant="side" onClick={togglePlayBackingtrack}>
              <Led $active={playback} />
              Play chords
            </Button>
            <Button $variant="side" onClick={toggleIsMetronomeWithBass}>
              <Led $active={isMetronomeWithBass} />
              Play bass
            </Button>
          </S.Section>
          <S.Section>
            <Save />
            <Open />
          </S.Section>
        </S.Panel>
      </Dialog.Portal>
    </Dialog.Root>
  );
};
