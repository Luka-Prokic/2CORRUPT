import { Text, View } from "react-native";
import { useSettingsStore } from "../../stores/settings";
import { useWidgetUnit } from "../../features/widgets/useWidgetUnit";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { useUIStore } from "../../stores/ui";
import { useWorkoutStore } from "../../stores/workout";
import { StrobeButton } from "../ui/buttons/StrobeButton";
import { useTranslation } from "react-i18next";
import { Fragment } from "react";
import { ActiveSessionAlert } from "../ui/alerts/ActiveSessionAlert";
import { BackgroundText } from "../ui/misc/BackgroundText";

export function EmptyTemplateComponent() {
  const { theme } = useSettingsStore();
  const { widgetUnit, fullWidth } = useWidgetUnit();
  const { setTypeOfView } = useUIStore();
  const { editTemplate, activeSession } = useWorkoutStore();
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
          backgroundColor: theme.tint,
          borderColor: theme.border,
          borderRadius: 32,
          borderWidth: 1,
          justifyContent: "center",
          alignItems: "center",
        }}
        activeOpacity={0.7}
      >
        {!activeSession && (
          <Ionicons name="add" size={64} color={theme.secondaryText} />
        )}
        <ActiveSessionAlert
          type="icon"
          style={{
            height: "100%",
            justifyContent: "center",
            alignItems: "center",
          }}
          styleIcon={{ name: "alert", color: theme.background, size: 64 }}
        />
      </StrobeButton>
      <View
        style={{
          width: fullWidth,
          marginTop: 16,
        }}
      >
        <BackgroundText
          text={t("templates.empty-info")}
          style={{ textAlign: "justify" }}
        />
      </View>
    </Fragment>
  );
}
