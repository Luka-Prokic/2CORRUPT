import { IButton } from "../../ui/buttons/IButton";
import { useSettingsStore } from "../../../stores/settingsStore";
import { router } from "expo-router";
import { WIDTH } from "../../../features/Dimensions";
import { NoExerciseViewSelected } from "../NoExerciseView";
import { Text, View } from "react-native";
import { Fragment } from "react";
import { StrobeBlur } from "../../ui/misc/StrobeBlur";
import { useTranslation } from "react-i18next";

interface QuickStartSelectProps {
  onSelect: (selected: NoExerciseViewSelected) => void;
  selected: NoExerciseViewSelected;
}

export function QuickStartSelect({
  onSelect,
  selected,
}: QuickStartSelectProps) {
  const { theme } = useSettingsStore();
  const { t } = useTranslation();

  function handlePress() {
    onSelect("quick-start");
    router.push("/add-exercise");
  }

  function mainButton() {
    return (
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
            {selected === "quick-start"
              ? t("workout-view.add-exercise")
              : t("workout-view.quick-start")}
          </Text>
        </StrobeBlur>
      </IButton>
    );
  }

  if (selected === "quick-start")
    return (
      <Fragment>
        {mainButton()}
        <View
          style={{
            width: WIDTH - 32,
            height: 64,
            backgroundColor: theme.handle,
            borderRadius: 32,
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
      </Fragment>
    );

  if (selected === "none") return <Fragment>{mainButton()}</Fragment>;

  return null;
}
