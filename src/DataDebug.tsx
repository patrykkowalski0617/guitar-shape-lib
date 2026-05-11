import { useDataKeyStore } from "./store";

export const DataDebug = () => {
  const baseChordDataKey = useDataKeyStore((state) => state.baseChordDataKey);
  const currentKeyId = useDataKeyStore(
    (state) => state.unifiedMusicKeysDataKey,
  );
  return (
    <>
      <div>baseChordDataKey: {baseChordDataKey}</div>
      <div>currentKeyId: {currentKeyId}</div>
    </>
  );
};
