import { View } from "react-native";
import { useSettingsStore } from "../../../../stores/settingsStore";
import { InfoText } from "../../../ui/text/InfoText";
import { WIDTH } from "../../../../utils/Dimensions";
import { useTranslation } from "react-i18next";

interface RirRpeCheatSheetProps {
  mode: "rir" | "rpe";
}

export function RirRpeCheatSheet({ mode }: RirRpeCheatSheetProps) {
  const { theme } = useSettingsStore();
  const { t } = useTranslation();

  return (
    <View
      style={{
        width: WIDTH - 32,
        padding: 8,
        backgroundColor: theme.input,
        borderWidth: 1,
        borderColor: theme.border,
        borderRadius: 8,
        alignItems: "flex-start",
        gap: 8,
      }}
    >
      {mode === "rir" ? (
        <>
          <InfoText text={`• 5+ RIR → ${t(`workout-view.rir-1`)}`} />
          <InfoText text={`• 3 RIR → ${t(`workout-view.rir-2`)}`} />
          <InfoText text={`• 1 RIR → ${t(`workout-view.rir-3`)}`} />
          <InfoText text={`• 0 RIR → ${t(`workout-view.rir-4`)}`} />
        </>
      ) : (
        <>
          <InfoText text={`• 0-2 → ${t(`workout-view.rpe-1`)}`} />
          <InfoText text={`• 3-5 → ${t(`workout-view.rpe-2`)}`} />
          <InfoText text={`• 6-8 → ${t(`workout-view.rpe-3`)}`} />
          <InfoText text={`• 9-10 → ${t(`workout-view.rpe-4`)}`} />
        </>
      )}
    </View>
  );
}
