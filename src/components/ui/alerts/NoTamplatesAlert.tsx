import { useTranslation } from "react-i18next";
import { BackgroundText } from "../text/BackgroundText";
import { TextButton } from "../buttons/TextButton";
import { useEditTemplate } from "../../../features/start/useEditTemplate";
import { View } from "react-native";
import { ViewStyle } from "react-native";

export function NoTamplatesAlert({ style }: { style?: ViewStyle }) {
  const { t } = useTranslation();

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
        onPress={useEditTemplate()}
      />
    </View>
  );
}
