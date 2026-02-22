import { useState, useRef, useCallback, useEffect } from "react";
import { Check, Plus, Trash2, Play, Square } from "lucide-react";
import { useHorizontalScroll } from "@/hooks/useHorizontalScroll";
import { useMetronome } from "./hooks/useMetronome";
import * as S from "./parts";
import PlayerBrick from "./PlayerBrick/PlayerBrick";
import { useMusicStore } from "@/store/useMusicStore";

export default function Player() {
  const setLockedShapeVariantLocationData = useMusicStore((state) => state.setLockedShapeVariantLocationData);
  const currentShapeVariantLocationData = useMusicStore((state) => state.currentShapeVariantLocationData);

  const [bricks, setBricks] = useState<{ id: number; width: number }[]>([]);
  const [activeBrickId, setActiveBrickId] = useState<number | null>(null);
  const [bpm, setBpm] = useState<number>(70);
  const [isPlaying, setIsPlaying] = useState(false);

  const scrollRef = useRef<HTMLDivElement>(null);
  useHorizontalScroll(scrollRef);

  const handleTick = useCallback(() => {
    console.log("Tick at BPM:", bpm);
  }, [bpm]);

  const { toggleMetronome } = useMetronome(bpm, handleTick);

  useEffect(() => {
    toggleMetronome(isPlaying);

    return () => toggleMetronome(false);
  }, [isPlaying, toggleMetronome]);

  const addBrick = () => {
    setLockedShapeVariantLocationData(currentShapeVariantLocationData);
    const newId = Date.now();
    setBricks((prev) => [...prev, { id: newId, width: 4 }]);
    setActiveBrickId(newId);
  };

  const removeBrick = (idToRemove: number) => {
    setBricks((prev) => prev.filter((b) => b.id !== idToRemove));
    if (activeBrickId === idToRemove) setActiveBrickId(null);
  };

  const updateBrickWidth = (id: number, newWidth: number) => {
    setBricks((prev) => prev.map((b) => (b.id === id ? { ...b, width: Math.max(1, Math.min(8, newWidth)) } : b)));
  };

  const handleBpmChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    if (!isNaN(value)) {
      setBpm(Math.max(20, Math.min(360, value)));
    }
  };

  const togglePlay = () => setIsPlaying((prev) => !prev);

  return (
    <S.PlayerContainer>
      <S.PlayerScrollWrapper ref={scrollRef}>
        <S.PlayerRow>
          {bricks.map((brick) => (
            <PlayerBrick
              key={brick.id}
              width={brick.width}
              isEditable={activeBrickId === brick.id}
              onToggleEdit={() => {
                setActiveBrickId(activeBrickId === brick.id ? null : brick.id);
              }}
              onWidthChange={(newWidth) => updateBrickWidth(brick.id, newWidth)}
            />
          ))}
          <S.AddBrickButton onClick={addBrick}>
            <Plus size={16} />
          </S.AddBrickButton>
          {activeBrickId !== null && (
            <>
              <S.DeleteButton
                onClick={() => {
                  removeBrick(activeBrickId);
                  setLockedShapeVariantLocationData(null);
                }}
              >
                <Trash2 size={14} />
              </S.DeleteButton>
              <S.CheckButton
                onClick={() => {
                  setActiveBrickId(null);
                  setLockedShapeVariantLocationData(null);
                }}
              >
                <Check size={16} />
              </S.CheckButton>
            </>
          )}
        </S.PlayerRow>
      </S.PlayerScrollWrapper>

      <S.ControlsRow>
        <S.PlayButton $isPlaying={isPlaying} onClick={togglePlay} $bpm={bpm}>
          {isPlaying ? <Square size={14} fill="currentColor" /> : <Play size={14} fill="currentColor" />}
        </S.PlayButton>
        <S.BpmInput type="number" value={bpm} onChange={handleBpmChange} min={20} max={360} />
      </S.ControlsRow>
    </S.PlayerContainer>
  );
}
