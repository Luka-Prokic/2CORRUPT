import { useSettingsStore } from "../../stores/settingsStore";
import { BounceButton } from "../ui/buttons/BounceButton";
import { HEIGHT } from "../../utils/Dimensions";
import { useTranslation } from "react-i18next";
import { useUIStore } from "../../stores/ui";
import { useWorkoutStore } from "../../stores/workout";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { ShineText } from "../ui/text/ShineText";
import { hexToRGBA } from "../../utils/HEXtoRGB";
import { useWidgetUnit } from "../../features/widgets/useWidgetUnit";

export function StartWorkoutButton() {
  const { theme } = useSettingsStore();
  const { t } = useTranslation();
  const { fullWidth } = useWidgetUnit();
  const { setTypeOfView } = useUIStore();
  const { activeSession, activeTemplate } = useWorkoutStore();
  const insets = useSafeAreaInsets();

  const isItActive = activeSession !== null;
  const isItEditing = activeTemplate !== null;

  function handlePress() {
    if (isItActive) {
      setTypeOfView("workout");
    } else if (isItEditing) {
      setTypeOfView("template");
    } else {
      setTypeOfView("start");
    }
  }

  return (
    <BounceButton
      onPress={handlePress}
      style={{
        height: 64,
        borderRadius: 32,
        marginHorizontal: 16,
        bottom: HEIGHT / 2 - insets.bottom,
        position: "absolute",
        left: 0,
        right: 0,
        alignItems: "center",
        backgroundColor: hexToRGBA(theme.thirdBackground, 0.6),
        borderWidth: 1,
        borderColor: hexToRGBA(theme.thirdBackground, 0.4),
      }}
      haptics
    >
      <ShineText
        text={
          isItActive
            ? t("app.continue-workout")
            : isItEditing
            ? t("app.continue-template")
            : t("app.start-workout")
        }
        width={fullWidth}
        color={theme.tint}
        constant
        focused
      />
    </BounceButton>
  );
}
