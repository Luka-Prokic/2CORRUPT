import { router } from "expo-router";
import { useWidgetUnit } from "../../features/widgets/useWidgetUnit";
import { StrobeButton } from "../ui/buttons/StrobeButton";
import { useSettingsStore } from "../../stores/settings";
import { IText } from "../ui/text/IText";
import { useWorkoutStore } from "../../stores/workout";
import { useUIStore } from "../../stores/ui";
import { SplitPlan, SplitPlanWorkout } from "../../stores/workout/types";
import { isWorkoutAlreadyDoneToday } from "../../features/stats/isWorkoutAlreadyDoneToday";
import { View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { FlatList } from "react-native-gesture-handler";
import { MidText } from "../ui/text/MidText";
import { formatTimeOnly } from "../../features/format/useFormatTime";

interface PlannedActiveSplitWorkoutCardProps {
  splitPlan: SplitPlan;
  workout: SplitPlanWorkout;
  date: Date;
}

const ITEM_HEIGHT = 24; // your MidText lineHeight
const VERTICAL_PADDING = 8; // FlatList padding top+bottom

export function PlannedActiveSplitWorkoutCard({
  splitPlan,
  workout,
  date,
}: PlannedActiveSplitWorkoutCardProps) {
  const { fullWidth, widgetUnit } = useWidgetUnit();
  const { theme } = useSettingsStore();
  const { startSession, getTemplateById } = useWorkoutStore();
  const { setTypeOfView } = useUIStore();

  if (!splitPlan) return null;
  if (!workout) return null;

  const isDoneToday = isWorkoutAlreadyDoneToday(workout, date);
  const template = getTemplateById(workout.templateId);
  if (!template) return null;

  function handlePress() {
    router.dismissTo("/");
    setTypeOfView("workout");
    startSession(template);
  }

  const visibleCount = Math.floor(
    (widgetUnit - 44 - VERTICAL_PADDING * 2) / ITEM_HEIGHT
  );
  const exceeds = template.layout.length > visibleCount;

  const scheduledAt = workout.scheduledAt
    ? formatTimeOnly(new Date(workout.scheduledAt))
    : null;

  return (
    <StrobeButton
      style={{
        height: widgetUnit,
        width: fullWidth,
        backgroundColor: theme.thirdBackground,
        borderWidth: 1,
        borderColor: theme.border,
        borderRadius: 32,
      }}
      onPress={handlePress}
      strobeDisabled={isDoneToday}
    >
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
          gap: 8,
          height: 44,
          width: fullWidth,
        }}
      >
        <Ionicons name="flash" size={24} color={theme.fifthBackground} />
        <IText text={splitPlan.name} color={theme.text} />
      </View>
      <View
        style={{
          flex: 1,
          width: fullWidth,
          backgroundColor: theme.primaryBackground,
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <View
          style={{
            width: fullWidth / 2,
            height: widgetUnit - 44,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <IText text={template.name} color={theme.text} />
          <MidText text={scheduledAt} color={theme.text} />
        </View>
        <FlatList
          data={
            exceeds
              ? [...template.layout.slice(0, visibleCount - 1), { name: "..." }]
              : template.layout
          }
          style={{
            width: fullWidth / 2,
            height: widgetUnit - 44,
            padding: 8,
          }}
          renderItem={({ item }) => (
            <MidText
              text={`• ${item.name}`}
              color={theme.text}
              style={{ textAlign: "left", lineHeight: ITEM_HEIGHT }}
              adjustsFontSizeToFit
              numberOfLines={1}
            />
          )}
        />
      </View>
    </StrobeButton>
  );
}
