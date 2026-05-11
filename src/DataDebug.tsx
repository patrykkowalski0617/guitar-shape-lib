import { useDataKeyStore } from "./store";

export const DataDebug = () => {
  const baseChordDataKey = useDataKeyStore((state) => state.baseChordDataKey);
  const unifiedMusicKeysDataKey = useDataKeyStore(
    (state) => state.unifiedMusicKeysDataKey,
  );
  return (
    <>
      <div>baseChordDataKey: {baseChordDataKey}</div>
      <div>unifiedMusicKeysDataKey: {unifiedMusicKeysDataKey}</div>
    </>
  );
};
