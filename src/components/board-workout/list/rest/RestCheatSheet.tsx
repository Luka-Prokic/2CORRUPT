import { WIDTH } from "../../../../features/Dimensions";
import { View, Text } from "react-native";
import { useSettingsStore } from "../../../../stores/settingsStore";
import { useTranslation } from "react-i18next";

export function RestCheatSheet() {
  const { theme } = useSettingsStore();
  const { t } = useTranslation();

  return (
    <View
      style={{
        width: WIDTH - 32,
        padding: 12,
        backgroundColor: theme.input,
        borderWidth: 1,
        borderColor: theme.border,
        borderRadius: 12,
        marginBottom: 16,
      }}
    >
      <Text
        style={{
          fontSize: 14,
          fontWeight: "bold",
          color: theme.text,
          marginBottom: 4,
        }}
      >
        {t("workout-board.typical-rest-times")}
      </Text>
      <Text style={{ fontSize: 12, color: theme.grayText }}>
        • {t("workout-board.heavy-lifts")}
      </Text>
      <Text style={{ fontSize: 12, color: theme.grayText }}>
        • {t("workout-board.compound-lifts")}
      </Text>
      <Text style={{ fontSize: 12, color: theme.grayText }}>
        • {t("workout-board.accessory-lifts")}
      </Text>
      <Text style={{ fontSize: 12, color: theme.grayText }}>
        • {t("workout-board.accessory-lifts-supersets")}
      </Text>
      <Text style={{ fontSize: 12, color: theme.grayText }}>
        • {t("workout-board.cardio-or-warm-up-sets")}
      </Text>
    </View>
  );
}
