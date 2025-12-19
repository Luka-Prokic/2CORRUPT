import { useSettingsStore } from "../../stores/settings";
import { useWidgetUnit } from "../../features/widgets/useWidgetUnit";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { useUIStore } from "../../stores/ui";
import { useWorkoutStore } from "../../stores/workout";
import { StrobeButton } from "../ui/buttons/StrobeButton";
import { ActiveSessionAlert } from "../ui/alerts/ActiveSessionAlert";
import { BackgroundText } from "../ui/text/BackgroundText";
import { useTranslation } from "react-i18next";
import { View } from "react-native";

export function EmptyTemplateComponent() {
  const { theme } = useSettingsStore();
  const { widgetUnit } = useWidgetUnit();
  const { setTypeOfView } = useUIStore();
  const { editTemplate, activeSession } = useWorkoutStore();
  const { t } = useTranslation();

  function handlePress() {
    router.dismissTo("/");
    setTypeOfView("template");
    editTemplate();
  }

  return (
    <View
      style={{
        padding: 16,
        gap: 16,
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <StrobeButton
        onPress={handlePress}
        style={{
          height: widgetUnit,
          width: widgetUnit,
          backgroundColor: theme.secondaryAccent,
          borderColor: theme.secondaryAccent + "40",
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
      <BackgroundText
        text={t("templates.empty-info")}
        style={{ textAlign: "justify" }}
      />
    </View>
  );
}
