import { View, Text, TouchableOpacity } from "react-native";
import { useSettingsStore } from "../../../../stores/settingsStore";
import { useTranslation } from "react-i18next";
import { useWorkoutStore } from "../../../../stores/workoutStore";
import { WIDTH } from "../../../../features/Dimensions";

export function SetTableHeader() {
  const { theme } = useSettingsStore();
  const { t } = useTranslation();

  const { activeExercise } = useWorkoutStore();

  const exerciseColumns = activeExercise?.columns || ["Reps", "Weight"];
  const columns = ["Set", ...exerciseColumns, "Done"];

  function TextLabel({ label }: { label: string }) {
    return (
      <View
        key={label}
        style={{
          width: WIDTH / columns.length,
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
            color: theme.grayText,
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
    const weightUnit = "KG";
    return (
      <TouchableOpacity
        key={label}
        onPress={() => {
          //TODO: Toggle weight unit for whole app
        }}
        style={{
          width: WIDTH / columns.length,
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
            color: theme.grayText,
          }}
          numberOfLines={1}
          adjustsFontSizeToFit
          minimumFontScale={0.6}
        >
          {t(`workout-view.${weightUnit.toLowerCase()}`).toUpperCase()}
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
