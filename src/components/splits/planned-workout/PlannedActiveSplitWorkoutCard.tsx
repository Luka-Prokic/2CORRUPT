import { useWidgetUnit } from "../../../features/widgets/useWidgetUnit";
import { StrobeButton } from "../../ui/buttons/StrobeButton";
import { useSettingsStore } from "../../../stores/settings";
import { IText } from "../../ui/text/IText";
import { useWorkoutStore } from "../../../stores/workout";
import { SplitPlan, SplitPlanWorkout } from "../../../stores/workout/types";
import { isWorkoutAlreadyDoneToday } from "../../../features/stats/isWorkoutAlreadyDoneToday";
import { FlatList } from "react-native-gesture-handler";
import { MidText } from "../../ui/text/MidText";
import { formatTimeOnly } from "../../../features/format/useFormatTime";
import { BlurView } from "expo-blur";
import { StartWorkoutBottomSheet } from "./StartWorkoutBottomSheet";
import { Fragment, useRef } from "react";
import { BottomSheetModal } from "@gorhom/bottom-sheet";
import { router } from "expo-router";
import { useStartWorkoutOfTemplate } from "../../../features/start/useStartWorkout";

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
  const { getTemplateById } = useWorkoutStore();
  const ref = useRef<BottomSheetModal>(null);

  if (!splitPlan) return null;
  if (!workout) return null;

  const isDoneToday = isWorkoutAlreadyDoneToday(workout, date);
  const template = getTemplateById(workout.templateId);
  if (!template) return null;

  function handlePress() {
    ref.current?.present();
  }

  function handleLongPress() {
    router.push({
      pathname: "/splits/[splitId]/edit",
      params: { splitId: `${splitPlan.id}` },
    });
  }

  const visibleCount = Math.floor(
    (widgetUnit - 44 - VERTICAL_PADDING * 2) / ITEM_HEIGHT
  );
  const exceeds = template.layout.length > visibleCount;

  const scheduledAt = workout.scheduledAt
    ? formatTimeOnly(new Date(workout.scheduledAt))
    : null;

  return (
    <Fragment>
      <StrobeButton
        style={{
          height: widgetUnit,
          width: fullWidth,
          borderWidth: 1,
          borderColor: theme.thirdBackground + "40",
          borderRadius: 32,
        }}
        styleContent={{
          height: widgetUnit,
          width: fullWidth,
          alignItems: "center",
          justifyContent: "center",
        }}
        onPress={handlePress}
        onLongPress={handleLongPress}
        strobeDisabled={isDoneToday}
        freeze
      >
        <BlurView
          intensity={100}
          style={{
            width: fullWidth,
            height: 44,
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "row",
            gap: 16,
          }}
        >
          <MidText text={scheduledAt} color={theme.text} />
          <IText text={template.name} color={theme.text} />
        </BlurView>
        <FlatList
          scrollEnabled={false}
          data={
            exceeds
              ? [...template.layout.slice(0, visibleCount - 1), { name: "..." }]
              : template.layout
          }
          style={{
            width: fullWidth,
            height: widgetUnit - 44,
            padding: 8,
            paddingHorizontal: 16,
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
      </StrobeButton>
      <StartWorkoutBottomSheet
        ref={ref}
        templateId={workout.templateId}
        onPress={() => useStartWorkoutOfTemplate(workout.templateId)}
      />
    </Fragment>
  );
}
