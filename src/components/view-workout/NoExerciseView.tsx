import { useSettingsStore } from "../../stores/settingsStore";
import { router } from "expo-router";
import { WIDTH } from "../../utils/Dimensions";
import { Text, View } from "react-native";
import { useTranslation } from "react-i18next";
import { StrobeButton } from "../ui/buttons/StrobeButton";
import { CORRUPT_BUTTON_HEIGHT_FROM_BOTTOM } from "../corrupt/LegacyCorruptButton";
import { DescriptionText } from "../ui/text/DescriptionText";
import { IText } from "../ui/text/IText";

export function NoExerciseView() {
  const { theme } = useSettingsStore();
  const { t } = useTranslation();

  function handlePress() {
    router.push({
      pathname: "/add-exercise/[type]",
      params: {
        type: "session",
      },
    });
  }

  return (
    <View
      style={{
        flex: 1,
        padding: 16,
        justifyContent: "flex-end",
        paddingBottom: CORRUPT_BUTTON_HEIGHT_FROM_BOTTOM,
      }}
    >
      <StrobeButton
        onPress={handlePress}
        style={{
          width: WIDTH - 32,
          height: 64,
          borderRadius: 32,
          backgroundColor: theme.primaryBackground,
        }}
        strobeColors={[theme.handle, theme.handle, theme.handle, theme.handle]}
      >
        <IText text={t("workout-view.add-exercise")} color={theme.text} />
      </StrobeButton>
      <View
        style={{
          width: WIDTH - 32,
          height: 64,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <DescriptionText text={t("workout-view.got-back-empty-handed")} />
        <IText
          size={16}
          color={theme.grayText}
          weight="400"
          text={t("workout-view.select-exercises")}
        />
      </View>
    </View>
  );
}
