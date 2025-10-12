import { useSettingsStore } from "../../stores/settingsStore";
import { router } from "expo-router";
import { WIDTH } from "../../features/Dimensions";
import { Text, View } from "react-native";
import { useTranslation } from "react-i18next";
import { StrobeButton } from "../ui/buttons/StrobeButton";

export function NoExerciseView() {
  const { theme } = useSettingsStore();
  const { t } = useTranslation();

  function handlePress() {
    router.push("/add-exercise");
  }

  return (
    <View style={{ flex: 1, padding: 16, justifyContent: "flex-end" }}>
      <StrobeButton
        onPress={handlePress}
        style={{
          width: WIDTH - 32,
          height: 64,
          borderRadius: 32,
          backgroundColor: theme.primaryBackground,
        }}
      >
        <Text style={{ color: theme.text, fontSize: 24, fontWeight: "bold" }}>
          {t("workout-view.add-exercise")}
        </Text>
      </StrobeButton>
      <View
        style={{
          width: WIDTH - 32,
          height: 64,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Text
          style={{ color: theme.grayText, fontSize: 16, fontWeight: "bold" }}
        >
          {t("workout-view.got-back-empty-handed")}
        </Text>
        <Text style={{ color: theme.grayText, fontSize: 16 }}>
          {t("workout-view.select-exercises")}
        </Text>
      </View>
    </View>
  );
}
