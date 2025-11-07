import { Fragment } from "react";
import { StrobeButton } from "../ui/buttons/StrobeButton";
import { router } from "expo-router";
import { WIDTH } from "../../features/Dimensions";
import { useSettingsStore } from "../../stores/settings";
import { Text } from "react-native";
import { useTranslation } from "react-i18next";

export function CreateTemplateBoard() {
  const { theme } = useSettingsStore();
  const { t } = useTranslation();

  function handlePress() {
    router.push("/add-exercise");
  }
  return (
    <Fragment>
      <StrobeButton
        onPress={handlePress}
        style={{
          width: WIDTH - 32,
          height: 64,
          borderRadius: 32,
          backgroundColor: theme.primaryBackground,
          marginTop: 32,
        }}
      >
        <Text style={{ color: theme.text, fontSize: 24, fontWeight: "bold" }}>
          {t("workout-view.add-exercise")}
        </Text>
      </StrobeButton>
    </Fragment>
  );
}
