import { useTranslation } from "react-i18next";
import { BackgroundText } from "../text/BackgroundText";
import { TextButton } from "../buttons/TextButton";
import { router } from "expo-router";
import { useUIStore } from "../../../stores/ui";
import { useWorkoutStore } from "../../../stores/workout";
import { View } from "react-native";
import { ViewStyle } from "react-native";

export function NoTamplatesAlert({ style }: { style?: ViewStyle }) {
  const { setTypeOfView } = useUIStore();
  const { editTemplate } = useWorkoutStore();
  const { t } = useTranslation();

  function handlePress() {
    router.dismissTo("/");
    setTypeOfView("template");
    editTemplate();
  }

  return (
    <View
      style={{
        flex: 1,
        gap: 8,
        justifyContent: "center",
        alignItems: "center",
        ...style,
      }}
    >
      <BackgroundText text={t("templates.no-templates")} />
      <TextButton
        text={`+ ${t("templates.create-template")}`}
        onPress={handlePress}
      />
    </View>
  );
}
