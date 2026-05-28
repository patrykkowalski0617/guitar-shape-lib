import * as Popover from "@radix-ui/react-popover";
import { useControllersStore, useMetronomeStore } from "@/store";
import { Chevron, Led, NoteName, Option } from "@/components/ui";
import * as S from "./parts";

const getTriggerLabel = (chords: boolean, bass: boolean) => {
  if (chords && bass) return "Playback chords and bass";
  if (chords) return "Playback chords";
  if (bass) return "Playback bass";
  return "No playback";
};

export const PlaybackSelect = () => {
  const togglePlayBackingtrack = useControllersStore(
    (s) => s.togglePlayBackingtrack,
  );
  const playback = useControllersStore((s) => s.playback);
  const toggleIsMetronomeWithBass = useMetronomeStore(
    (s) => s.toggleIsMetronomeWithBass,
  );
  const isMetronomeWithBass = useMetronomeStore((s) => s.isMetronomeWithBass);

  return (
    <Popover.Root>
      <S.Trigger aria-haspopup="listbox">
        <span className="trigger-label">
          {getTriggerLabel(playback, isMetronomeWithBass)}
        </span>
        <Chevron className="trigger-chevron" />
      </S.Trigger>

      <Popover.Portal>
        <S.MobileContent
          sideOffset={4}
          collisionPadding={8}
          role="listbox"
          aria-multiselectable="true"
          asChild
        >
          <ul>
            <Option
              role="option"
              aria-selected={playback}
              $isSharedNote={true}
              onClick={togglePlayBackingtrack}
            >
              <Led $active={playback} />
              <NoteName>Play chords</NoteName>
            </Option>
            <Option
              role="option"
              aria-selected={isMetronomeWithBass}
              $isSharedNote={true}
              onClick={toggleIsMetronomeWithBass}
            >
              <Led $active={isMetronomeWithBass} />
              <NoteName>Play bass</NoteName>
            </Option>
          </ul>
        </S.MobileContent>
      </Popover.Portal>
    </Popover.Root>
  );
};
