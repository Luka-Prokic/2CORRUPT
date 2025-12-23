import { IButtonSwipe } from "../../../../ui/buttons/IButtonSwipe";
import { useWidgetUnit } from "../../../../../features/widgets/useWidgetUnit";
import { useSettingsStore } from "../../../../../stores/settingsStore";
import { useDracoFont } from "../../../../../features/fonts/useDracoFont";
import { useCreatineStore } from "../../../../../stores/creatine/useCreatineStore";
import { IText } from "../../../../ui/text/IText";
import { StrobeBlur } from "../../../../ui/misc/StrobeBlur";
import { useTranslation } from "react-i18next";
import { useTodayCreatine } from "../../../../../features/creatine/useCreatine";

export function CreatineSlide() {
  const { theme } = useSettingsStore();
  const { fullWidth } = useWidgetUnit();
  const { fontFamily } = useDracoFont();
  const { t } = useTranslation();
  const { dailyCreatineGoal, addCreatine, resetTodaysCreatine } =
    useCreatineStore();

  const { dose, remaining, finalSwipe, confirmed } = useTodayCreatine();

  function handleSwipeComplete() {
    addCreatine(finalSwipe ? remaining : dose);
  }

  function handleSwipeCancel() {
    resetTodaysCreatine();
  }

  const sliderMessage = confirmed
    ? t("button.done")
    : finalSwipe
    ? `+${remaining.toFixed(1).replace(/\.0$/, "")}g`
    : `+${dose.toFixed(1).replace(/\.0$/, "")}g`;

  return (
    <IButtonSwipe
      key={`${dailyCreatineGoal}`}
      width={fullWidth - 16}
      height={64}
      confirmed={confirmed}
      onSwipeComplete={handleSwipeComplete}
      onCancel={handleSwipeCancel}
      style={{
        backgroundColor: confirmed ? "" : theme.border + "60",
        borderColor: theme.border + "40",
        borderWidth: 1,
      }}
      slideChild={
        <StrobeBlur
          style={{
            position: "absolute",
            width: fullWidth - 16,
            height: 64,
          }}
          disabled={!confirmed}
        >
          <IText
            text={sliderMessage}
            style={{
              fontFamily,
              width: fullWidth - 160,
            }}
            size={24}
            align="center"
            adjustsFontSizeToFit
            numberOfLines={1}
          />
        </StrobeBlur>
      }
      haptics
      finalSwipe={finalSwipe}
    />
  );
}
