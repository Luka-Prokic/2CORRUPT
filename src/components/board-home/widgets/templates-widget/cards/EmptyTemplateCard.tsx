import { useSettingsStore } from "../../../../../stores/settings";
import { useWidgetUnit } from "../../../../../features/widgets/useWidgetUnit";
import { Ionicons } from "@expo/vector-icons";
import { useWorkoutStore } from "../../../../../stores/workout";
import { StrobeButton } from "../../../../ui/buttons/StrobeButton";
import { ActiveSessionAlert } from "../../../../ui/alerts/ActiveSessionAlert";
import { useEditTemplate } from "../../../../../features/start/useEditTemplate";

export function EmptyTemplateCard() {
  const { theme } = useSettingsStore();
  const { widgetUnit } = useWidgetUnit();
  const { activeSession } = useWorkoutStore();

  function handlePress() {
    useEditTemplate();
  }

  return (
    <StrobeButton
      onPress={handlePress}
      style={{
        width: widgetUnit * 0.8,
        height: widgetUnit - 84,
        marginHorizontal: widgetUnit * 0.1 - 5,
        backgroundColor: theme.fifthBackground,
        borderColor: theme.fifthBackground,
        borderRadius: 16,
        borderWidth: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
      activeOpacity={0.7}
    >
      {!activeSession && (
        <Ionicons name="add" size={44} color={theme.secondaryText} />
      )}
      <ActiveSessionAlert
        type="icon"
        style={{
          height: "100%",
          justifyContent: "center",
          alignItems: "center",
        }}
        styleIcon={{ name: "alert", color: theme.background, size: 44 }}
      />
    </StrobeButton>
  );
}
