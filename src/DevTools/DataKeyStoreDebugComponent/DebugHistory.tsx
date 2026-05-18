import * as S from "./parts";

export const DebugHistory = ({ history }: { history: string[] }) => {
  return (
    <S.Column>
      <S.HistoryHeader>Full History</S.HistoryHeader>
      <S.HistoryScrollArea>
        {history.map((entry, index) => (
          <S.HistoryEntry key={index}>{entry}</S.HistoryEntry>
        ))}
      </S.HistoryScrollArea>
    </S.Column>
  );
};
