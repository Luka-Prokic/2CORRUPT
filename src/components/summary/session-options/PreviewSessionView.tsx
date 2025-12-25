import { BottomSheetModal } from "@gorhom/bottom-sheet";
import { forwardRef } from "react";
import { SessionBottomSheetViews } from "./SessionBottomSheet";
import { WorkoutSession, useWorkoutStore } from "../../../stores/workout";
import { CardSlider } from "../../ui/sliders/CardSlider";
import { HEIGHT, WIDTH } from "../../../utils/Dimensions";
import { ActiveSessionAlert } from "../../ui/alerts/ActiveSessionAlert";
import { TwoOptionStrobeButtons } from "../../ui/buttons/TwoOptionStrobeButtons";
import { useSettingsStore } from "../../../stores/settings";
import { useTranslation } from "react-i18next";
import { ExercisePreviewCard } from "../cards/ExercisePreviewCard";
import Animated, { FadeIn } from "react-native-reanimated";
import { useLayoutPreviewHeight } from "../../../features/ui/useGetExercisePreviewCardHeight";
import { SessionName } from "../../board-workout/sheets/session/SessionName";
import { DescriptionText } from "../../ui/text/DescriptionText";
import {
  useStartWorkoutOfSession,
  useStartWorkoutOfTemplate,
} from "../../../features/start/useStartWorkout";
import { Pressable } from "react-native";

interface PreviewSessionViewProps {
  session: WorkoutSession;
  setView?: (view: SessionBottomSheetViews) => void;
  ref: React.RefObject<BottomSheetModal>;
}

export function PreviewSessionView({
  session,
  setView,
  ref,
}: PreviewSessionViewProps) {
  const { theme } = useSettingsStore();
  const { t } = useTranslation();
  const { activeSession, getTemplateById } = useWorkoutStore();
  const cardHeight = useLayoutPreviewHeight(session.layout);
  const finalHeight = Math.min(cardHeight, HEIGHT * 0.5);
  const startWorkout = useStartWorkoutOfSession(session.id);
  const startWorkoutOfTemplate = useStartWorkoutOfTemplate(session.templateId);

  function handleStartWorkout() {
    const template = getTemplateById(session.templateId);

    if (template) startWorkoutOfTemplate();
    else startWorkout();

    (ref as React.RefObject<BottomSheetModal>)?.current?.close();
  }

  return (
    <Animated.View entering={FadeIn}>
      <SessionName
        session={session}
        styleView={{ marginVertical: 16 }}
        fontSize={32}
      />
      {session.notes && (
        <DescriptionText text={session.notes} style={{ marginBottom: 16 }} />
      )}
      <CardSlider
        data={session.layout}
        card={({ item }) => (
          <Pressable style={{ width: WIDTH, alignItems: "center" }}>
            <ExercisePreviewCard exercise={item} maxHeight={finalHeight} />
          </Pressable>
        )}
        cardWidth={WIDTH}
        cardHeight={finalHeight}
        styleDots={{
          width: WIDTH,
          justifyContent: "center",
          alignItems: "center",
        }}
      />

      <ActiveSessionAlert type="session" style={{ marginHorizontal: 16 }} />
      <TwoOptionStrobeButtons
        labelOne={t("button.repeat")}
        labelTwo={t("button.more")}
        onOptionOne={handleStartWorkout}
        onOptionTwo={() => setView("options")}
        styleOne={{ backgroundColor: theme.thirdBackground }}
        disabledOne={!!activeSession}
        style={{ margin: 16 }}
      />
    </Animated.View>
  );
}
