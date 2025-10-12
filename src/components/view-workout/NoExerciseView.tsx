import { IButton } from "../ui/buttons/IButton";
import { useSettingsStore } from "../../stores/settingsStore";
import { router } from "expo-router";
import { WIDTH } from "../../features/Dimensions";
import { Text, View } from "react-native";
import { StrobeBlur } from "../ui/misc/StrobeBlur";
import { useTranslation } from "react-i18next";

export function NoExerciseView() {
  const { theme } = useSettingsStore();
  const { t } = useTranslation();

  function handlePress() {
    router.push("/add-exercise");
  }

  return (
    <View style={{ flex: 1, padding: 16, justifyContent: "flex-end" }}>
      <IButton
        onPress={handlePress}
        color={theme.primaryBackground}
        style={{
          width: WIDTH - 32,
          height: 64,
          borderRadius: 32,
          marginBottom: 8,
        }}
      >
        <StrobeBlur
          colors={[
            theme.caka,
            theme.primaryBackground,
            theme.accent,
            theme.tint,
          ]}
          tint="light"
          style={{ width: WIDTH - 32, height: 64, borderRadius: 32 }}
        >
          <Text style={{ color: theme.text, fontSize: 24, fontWeight: "bold" }}>
            {t("workout-view.add-exercise")}
          </Text>
        </StrobeBlur>
      </IButton>
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
