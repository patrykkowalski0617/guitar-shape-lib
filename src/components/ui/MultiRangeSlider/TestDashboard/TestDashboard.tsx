import * as S from "./parts";
import { useTestDashboard } from "./useTestDashboard";
import { MultiSlider } from "../MultiSlider/MultiSlider";

export default function TestDashboard() {
  const { title } = useTestDashboard();

  return (
    <S.DashboardWrapper>
      <S.DashboardTitle>{title}</S.DashboardTitle>
      <MultiSlider />
    </S.DashboardWrapper>
  );
}
