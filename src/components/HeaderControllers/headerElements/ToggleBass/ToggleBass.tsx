import styled from "styled-components";
import { useMetronomeStore } from "@/store";
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

export const ToggleBass = () => {
  const toggleIsMetronomeWithBass = useMetronomeStore(
    (s) => s.toggleIsMetronomeWithBass,
  );
  const isMetronomeWithBass = useMetronomeStore((s) => s.isMetronomeWithBass);

  return (
    <PlaybackButton onClick={toggleIsMetronomeWithBass} $w={2.5}>
      <LedSlot>
        <Led $active={isMetronomeWithBass} />
      </LedSlot>
      Play bass
    </PlaybackButton>
  );
};
