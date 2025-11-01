import { BottomSheetModal } from "@gorhom/bottom-sheet";
import { forwardRef } from "react";
import { TemplateBottomSheetViews } from "./TemplateBottomSheet";
import { WorkoutTemplate, useWorkoutStore } from "../../../stores/workout";
import { Text } from "react-native";
import { CardSlider } from "../../ui/CardSlider";
import { HEIGHT, WIDTH } from "../../../features/Dimensions";
import { ActiveSessionAlert } from "../../ui/alerts/ActiveSessionAlert";
import { TwoOptionStrobeButtons } from "../../ui/buttons/TwoOptionStrobeButtons";
import { useSettingsStore } from "../../../stores/settings";
import { useTranslation } from "react-i18next";
import { router } from "expo-router";
import { useUIStore } from "../../../stores/ui";
import Animated, { FadeIn } from "react-native-reanimated";
import { useLayoutPreviewHeight } from "../../../features/ui/useGetExercisePreviewCardHeight";
import { ExercisePreviewCard } from "../../sessions/cards/ExercisePreviewCard";
import { TemplateName } from "../../board-template/sheets/template/TemplateName";

interface PreviewTempalteViewProps {
  template: WorkoutTemplate;
  setView: (view: TemplateBottomSheetViews) => void;
}

export const PreviewTempalteView = forwardRef<
  BottomSheetModal,
  PreviewTempalteViewProps
>(({ template, setView }, ref) => {
  const { theme } = useSettingsStore();
  const { t } = useTranslation();
  const { startSession, activeSession } = useWorkoutStore();
  const { setTypeOfView } = useUIStore();
  const cardHeight = useLayoutPreviewHeight(template.layout);
  const finalHeight = Math.min(cardHeight, HEIGHT * 0.5);

  function handleStartWorkout() {
    setTimeout(() => {
      startSession(template);
      setTypeOfView("workout");
      router.dismissTo("/");
    }, 200);

    (ref as React.RefObject<BottomSheetModal>)?.current?.close();
  }

  return (
    <Animated.View entering={FadeIn}>
      <TemplateName
        template={template}
        fontSize={32}
        style={{ marginVertical: 16, width: WIDTH - 32, textAlign: "center" }}
      />

      {template.description && (
        <Text
          style={{
            color: theme.info,
            fontSize: 16,
            fontWeight: "500",
            marginBottom: 16,
            textAlign: "center",
          }}
        >
          {template.description}
        </Text>
      )}

      <CardSlider
        data={template.layout}
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

      <ActiveSessionAlert type="template" style={{ marginHorizontal: 16 }} />
      <TwoOptionStrobeButtons
        labelOne={t("button.start")}
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
