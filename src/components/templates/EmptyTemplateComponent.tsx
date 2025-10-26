import { Text, View } from "react-native";
import { useSettingsStore } from "../../stores/settings";
import { useWidgetUnit } from "../../features/widgets/useWidgetUnit";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { useUIStore } from "../../stores/ui";
import { useWorkoutStore } from "../../stores/workout";
import { StrobeButton } from "../ui/buttons/StrobeButton";
import { useTranslation } from "react-i18next";
import { HEIGHT } from "../../features/Dimensions";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export function EmptyTemplateComponent() {
  const insets = useSafeAreaInsets();
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
    <View
      style={{
        height: HEIGHT - insets.top - insets.bottom - 32,
        width: fullWidth,
      }}
    >
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
        <Ionicons name="add" size={64} color={theme.secondaryText} />
      </StrobeButton>
      <View
        style={{
          height: widgetUnit,
          width: fullWidth,
          position: "absolute",
          bottom: 0,
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
    </View>
  );
}
