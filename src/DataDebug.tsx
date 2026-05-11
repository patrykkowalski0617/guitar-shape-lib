import { useDataKeyStore } from "./store";

export const DataDebug = () => {
  const baseChordDataKey = useDataKeyStore((state) => state.baseChordDataKey);
  const currentKeyDataKey = useDataKeyStore(
    (state) => state.unifiedMusicKeysDataKey,
  );
  return (
    <>
      <div>baseChordDataKey: {baseChordDataKey}</div>
      <div>currentKeyDataKey: {currentKeyDataKey}</div>
    </>
  );
};
