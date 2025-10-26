import { Text, View } from "react-native";
import { useSettingsStore } from "../../stores/settings";
import { useWidgetUnit } from "../../features/widgets/useWidgetUnit";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { useUIStore } from "../../stores/ui";
import { useWorkoutStore } from "../../stores/workout";
import { Fragment } from "react";
import { StrobeButton } from "../ui/buttons/StrobeButton";
import { useTranslation } from "react-i18next";

export function EmptyTemplateComponent() {
  const { theme } = useSettingsStore();
  const { widgetUnit, fullWidth } = useWidgetUnit();
  const { setTypeOfView } = useUIStore();
  const { editTemplate } = useWorkoutStore();
  const { t } = useTranslation();

  function handlePress() {
    router.back();
    router.back();
    setTypeOfView("template");
    editTemplate();
  }

  return (
    <Fragment>
      <StrobeButton
        onPress={handlePress}
        style={{
          height: widgetUnit,
          width: widgetUnit,
          backgroundColor: theme.fifthBackground,
          borderColor: theme.border,
          borderRadius: 32,
          borderWidth: 1,
          justifyContent: "center",
          alignItems: "center",
        }}
        activeOpacity={0.7}
      >
        <Ionicons name="add" size={64} color={theme.secondaryText} />
      </StrobeButton>
      <View
        style={{
          height: widgetUnit,
          width: fullWidth,
        }}
      >
        <Text
          style={{
            color: theme.grayText,
            textAlign: "justify",
            fontSize: 14,
          }}
        >
          {t("templates.empty-info")}
        </Text>
      </View>
    </Fragment>
  );
}
