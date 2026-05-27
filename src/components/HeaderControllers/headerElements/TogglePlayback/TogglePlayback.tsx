import styled from "styled-components";
import { useControllersStore } from "@/store";
import { Button, Led } from "@/components/ui";

const PlaybackButton = styled(Button)`
  position: relative;
  padding-left: 28px;
`;

const LedSlot = styled.div`
  position: absolute;
  left: 10px;
  top: 50%;
  transform: translateY(-50%);
  display: flex;
  align-items: center;
`;

export const TogglePlayback = () => {
  const togglePlayBackingtrack = useControllersStore(
    (s) => s.togglePlayBackingtrack,
  );
  const playback = useControllersStore((s) => s.playback);

  return (
    <PlaybackButton onClick={togglePlayBackingtrack} $w={2.5}>
      <LedSlot>
        <Led $active={playback} />
      </LedSlot>
      Play chords
    </PlaybackButton>
  );
};
