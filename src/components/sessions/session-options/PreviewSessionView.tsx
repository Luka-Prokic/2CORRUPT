import { BottomSheetModal } from "@gorhom/bottom-sheet";
import { forwardRef } from "react";
import { SessionBottomSheetViews } from "./SessionBottomSheet";
import { WorkoutSession, useWorkoutStore } from "../../../stores/workout";
import { Text } from "react-native";
import { CardSlider } from "../../ui/CardSlider";
import { HEIGHT, WIDTH } from "../../../features/Dimensions";
import { SessionNameInput } from "../../board-workout/sheets/session/SessionNameInput";
import { ActiveSessionAlert } from "../../ui/alerts/ActiveSessionAlert";
import { TwoOptionStrobeButtons } from "../../ui/buttons/TwoOptionStrobeButtons";
import { useSettingsStore } from "../../../stores/settings";
import { useTranslation } from "react-i18next";
import { router } from "expo-router";
import { useUIStore } from "../../../stores/ui";
import { ExercisePreviewCard } from "../cards/ExercisePreviewCard";
import Animated, { FadeIn } from "react-native-reanimated";
import { useLayoutPreviewHeight } from "../../../features/ui/useGetExercisePreviewCardHeight";

interface PreviewSessionViewProps {
  session: WorkoutSession;
  setView: (view: SessionBottomSheetViews) => void;
}

export const PreviewSessionView = forwardRef<
  BottomSheetModal,
  PreviewSessionViewProps
>(({ session, setView }, ref) => {
  const { theme } = useSettingsStore();
  const { t } = useTranslation();
  const { startSession, activeSession, getTemplateById } = useWorkoutStore();
  const { setTypeOfView } = useUIStore();
  const cardHeight = useLayoutPreviewHeight(session.layout);
  const finalHeight = Math.min(cardHeight, HEIGHT * 0.5);

  function handleStartWorkout() {
    const template = getTemplateById(session.templateId);

    setTimeout(() => {
      if (template) startSession(template);
      else startSession(null, session);
      setTypeOfView("workout");
      router.dismissTo("/");
    }, 200);

    (ref as React.RefObject<BottomSheetModal>)?.current?.close();
  }

  return (
    <Animated.View entering={FadeIn}>
      <SessionNameInput
        session={session}
        styleView={{ marginVertical: 16 }}
        disabled
      />
      {session.notes && (
        <Text
          style={{
            color: theme.info,
            fontSize: 16,
            fontWeight: "500",
            marginBottom: 16,
            textAlign: "center",
          }}
        >
          {session.notes}
        </Text>
      )}

      <CardSlider
        data={session.layout}
        card={({ item }) => (
          <ExercisePreviewCard exercise={item} maxHeight={finalHeight} />
        )}
        cardWidth={WIDTH - 32}
        cardHeight={finalHeight}
        showDots={true}
        styleDots={{
          width: WIDTH - 32,
          justifyContent: "center",
          alignItems: "center",
        }}
      />

      <ActiveSessionAlert type="session" style={{ marginHorizontal: 16 }} />
      <TwoOptionStrobeButtons
        labelOne={t("button.repeat")}
        labelTwo={t("button.edit")}
        onOptionOne={handleStartWorkout}
        onOptionTwo={() => setView("options")}
        styleOne={{ backgroundColor: theme.thirdBackground }}
        disabledOne={!!activeSession}
        style={{ marginVertical: 16 }}
      />
    </Animated.View>
  );
});
