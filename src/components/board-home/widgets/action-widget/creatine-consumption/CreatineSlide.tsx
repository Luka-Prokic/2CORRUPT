import { IButtonSwipe } from "../../../../ui/buttons/IButtonSwipe";
import { useWidgetUnit } from "../../../../../features/widgets/useWidgetUnit";
import { useSettingsStore } from "../../../../../stores/settingsStore";
import { useDracoFont } from "../../../../../features/fonts/useDracoFont";
import { useCreatineStore } from "../../../../../stores/creatine/useCreatineStore";
import { IText } from "../../../../ui/text/IText";
import { StrobeBlur } from "../../../../ui/misc/StrobeBlur";

export function CreatineSlide() {
  const { theme } = useSettingsStore();
  const { fullWidth } = useWidgetUnit();
  const { fontFamily } = useDracoFont();

  const {
    creatineConsumption,
    dailyCreatineGoal,
    timesADay,
    addCreatine,
    resetCreatine,
  } = useCreatineStore();

  const dose = dailyCreatineGoal / timesADay;
  const remaining = dailyCreatineGoal - creatineConsumption;

  const finalSwipe = remaining <= dose + 0.5;

  const confirmed = creatineConsumption >= dailyCreatineGoal;

  function handleSwipeComplete() {
    addCreatine();
  }

  function handleSwipeCancel() {
    resetCreatine();
  }

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
            text={
              confirmed
                ? `DONE`
                : finalSwipe
                ? `+${remaining.toFixed(1).replace(/\.0$/, "")}g`
                : `+${dose.toFixed(1).replace(/\.0$/, "")}g`
            }
            style={{ fontFamily }}
            size={24}
          />
        </StrobeBlur>
      }
      haptics
      finalSwipe={finalSwipe}
    />
  );
}
