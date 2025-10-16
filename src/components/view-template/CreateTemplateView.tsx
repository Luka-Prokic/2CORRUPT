import { TemplateNameInput } from "../ui/input/TemplateNameInput";
import { useState } from "react";
import { router } from "expo-router";
import { useSettingsStore } from "../../stores/settings";
import { useTranslation } from "react-i18next";
import { WIDTH } from "../../features/Dimensions";
import { Text, View } from "react-native";
import { StrobeButton } from "../ui/buttons/StrobeButton";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import {
  CORRUPT_BUTTON_FROM_BOTTOM,
  CORRUPT_BUTTON_HEIGHT_FROM_BOTTOM,
} from "../corrupt/CorruptButton";

export function CreateTemplateView() {
  const { theme } = useSettingsStore();
  const { t } = useTranslation();
  const [templateName, setTemplateName] = useState("");
  const inserts = useSafeAreaInsets();

  function handlePress() {
    router.push("/add-exercise");
  }

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "flex-end",
        paddingBottom: CORRUPT_BUTTON_HEIGHT_FROM_BOTTOM + 8,
        paddingHorizontal: 16,
      }}
    >
      <TemplateNameInput
        value={templateName}
        onChangeText={setTemplateName}
        placeholder={t("template-view.template-name")}
        autoFocus={true}
      />

      <StrobeButton
        onPress={handlePress}
        style={{
          width: WIDTH - 32,
          height: 64,
          borderRadius: 32,
          backgroundColor: theme.primaryBackground,
        }}
        disabled={templateName.length === 0}
      >
        <Text style={{ color: theme.text, fontSize: 24, fontWeight: "bold" }}>
          {t("workout-view.add-exercise")}
        </Text>
      </StrobeButton>
    </View>
  );
}
