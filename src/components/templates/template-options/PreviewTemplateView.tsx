import { TemplateBottomSheetViews } from "./TemplateBottomSheet";
import { WorkoutTemplate, useWorkoutStore } from "../../../stores/workout";
import { CardSlider } from "../../ui/sliders/CardSlider";
import { HEIGHT, WIDTH } from "../../../utils/Dimensions";
import { ActiveSessionAlert } from "../../ui/alerts/ActiveSessionAlert";
import { TwoOptionStrobeButtons } from "../../ui/buttons/TwoOptionStrobeButtons";
import { useSettingsStore } from "../../../stores/settings";
import { useTranslation } from "react-i18next";
import { router } from "expo-router";
import { useUIStore } from "../../../stores/ui";
import Animated, { FadeIn } from "react-native-reanimated";
import { useLayoutPreviewHeight } from "../../../features/ui/useGetExercisePreviewCardHeight";
import { ExercisePreviewCard } from "../../summary/cards/ExercisePreviewCard";
import { TemplateName } from "../../board-template/sheets/template/TemplateName";
import { DescriptionText } from "../../ui/text/DescriptionText";
import { BottomSheetModal } from "@gorhom/bottom-sheet";
import { Pressable } from "react-native";

interface PreviewTempalteViewProps {
  template: WorkoutTemplate;
  setView: (view: TemplateBottomSheetViews) => void;
  ref: React.RefObject<BottomSheetModal>;
}

export function PreviewTempalteView({
  template,
  setView,
  ref,
}: PreviewTempalteViewProps) {
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

    ref.current?.close();
  }

  return (
    <Animated.View entering={FadeIn}>
      <TemplateName
        template={template}
        fontSize={32}
        style={{ marginVertical: 16, width: WIDTH - 32, textAlign: "center" }}
      />

      {template.description && (
        <DescriptionText
          text={template.description}
          style={{ marginBottom: 16 }}
        />
      )}

      <CardSlider
        data={template.layout}
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

      <ActiveSessionAlert type="template" style={{ marginHorizontal: 16 }} />
      <TwoOptionStrobeButtons
        labelOne={t("button.start")}
        labelTwo={t("button.edit")}
        onOptionOne={handleStartWorkout}
        onOptionTwo={() => setView("options")}
        styleOne={{ backgroundColor: theme.fifthAccent }}
        styleTwo={{ backgroundColor: theme.primaryBackground }}
        disabledOne={!!activeSession}
        style={{ margin: 16 }}
      />
    </Animated.View>
  );
}
