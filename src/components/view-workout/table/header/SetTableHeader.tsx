import { View, Text, TouchableOpacity, ViewStyle } from "react-native";
import { useSettingsStore } from "../../../../stores/settingsStore";
import { useTranslation } from "react-i18next";
import {
  SessionExercise,
  useWorkoutStore,
} from "../../../../stores/workoutStore";
import { WIDTH } from "../../../../utils/Dimensions";
import { useHaptics } from "../../../../features/ui/useHaptics";

interface SetTableHeaderProps {
  exercise?: SessionExercise;
  style?: ViewStyle | ViewStyle[];
  width?: number;
  color?: string;
}

export function SetTableHeader({
  exercise,
  style,
  width = WIDTH,
  color,
}: SetTableHeaderProps) {
  const { theme } = useSettingsStore();
  const { t } = useTranslation();
  const { units, setUnits } = useSettingsStore();
  const { activeExercise } = useWorkoutStore();
  const triggerHapticsSoft = useHaptics({
    modeType: "gentle",
    hapticType: "soft",
  });

  const exerciseColumns =
    exercise?.columns ?? (activeExercise?.columns || ["Reps", "Weight"]);
  const columns = ["Set", ...exerciseColumns, "Done"];

  function handleChangeUnits() {
    setUnits({ ...units, weight: units.weight === "kg" ? "lbs" : "kg" });
    triggerHapticsSoft();
  }

  function TextLabel({ label }: { label: string }) {
    return (
      <View
        key={label}
        style={{
          width: width / columns.length,
          height: 34,
          justifyContent: "center",
          alignItems: "center",
          paddingHorizontal: 4,
        }}
      >
        <Text
          style={{
            fontSize: 16,
            fontWeight: "bold",
            textAlign: "center",
            color: color ?? theme.grayText,
          }}
          numberOfLines={1}
          adjustsFontSizeToFit
          minimumFontScale={0.6}
        >
          {t(`workout-view.${label.toLowerCase()}`).toUpperCase()}
        </Text>
      </View>
    );
  }

  function ButtonLabel({ label }: { label: string }) {
    return (
      <TouchableOpacity
        key={label}
        onPress={handleChangeUnits}
        style={{
          width: width / columns.length,
          height: 34,
          justifyContent: "center",
          alignItems: "center",
          paddingHorizontal: 4,
        }}
      >
        <Text
          style={{
            fontSize: 16,
            fontWeight: "bold",
            textAlign: "center",
            color: color ?? theme.grayText,
          }}
          numberOfLines={1}
          adjustsFontSizeToFit
          minimumFontScale={0.6}
        >
          {t(`workout-view.${units.weight.toLowerCase()}`).toUpperCase()}
        </Text>
      </TouchableOpacity>
    );
  }

  return (
    <View
      style={{
        flexDirection: "row",
        position: "absolute",
        height: 34,
        bottom: 0,
        left: 0,
        right: 0,
        alignItems: "center",
        width: width,
        ...style,
      }}
    >
      {columns.map((label: string) => {
        if (label === "Weight") {
          return ButtonLabel({ label });
        }
        return TextLabel({ label });
      })}
    </View>
  );
}
