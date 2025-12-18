import { BounceButton } from "../../../../ui/buttons/BounceButton";
import { useSettingsStore } from "../../../../../stores/settingsStore";
import { Ionicons } from "@expo/vector-icons";
import { IText } from "../../../../ui/text/IText";
import { useCreatineStore } from "../../../../../stores/creatine/useCreatineStore";

export function DailyCreatineButton() {
  const { theme } = useSettingsStore();
  const { dailyCreatineGoal } = useCreatineStore();

  return (
    <BounceButton
      onPress={() => {}}
      style={{
        position: "absolute",
        top: 0,
        right: 0,
        padding: 4,
        zIndex: 1,
        alignItems: "center",
        justifyContent: "center",
        shadowColor: theme.shadow,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        elevation: 5,
      }}
      haptics
    >
      <Ionicons name="ellipse" size={64} color={theme.secondaryAccent} />

      <IText
        text={dailyCreatineGoal.toString() + "g"}
        size={18}
        style={{ position: "absolute" }}
        adjustsFontSizeToFit
        numberOfLines={1}
        color={theme.background}
      />
    </BounceButton>
  );
}
