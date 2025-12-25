import { useSettingsStore } from "../../../stores/settings";
import { BottomSheetModal } from "@gorhom/bottom-sheet";
import { useWorkoutStore } from "../../../stores/workout";
import { ExercisePreviewCard } from "../../summary/cards/ExercisePreviewCard";
import { CardSlider } from "../../ui/sliders/CardSlider";
import { useLayoutPreviewHeight } from "../../../features/ui/useGetExercisePreviewCardHeight";
import { HEIGHT, WIDTH } from "../../../utils/Dimensions";
import { StrobeButton } from "../../ui/buttons/StrobeButton";
import { useTranslation } from "react-i18next";
import { TemplateName } from "../../board-template/sheets/template/TemplateName";
import { DescriptionText } from "../../ui/text/DescriptionText";
import { useStartWorkoutOfTemplate } from "../../../features/start/useStartWorkout";
import { IBottomSheet } from "../../ui/IBottomSheet";

interface StartWorkoutBottomSheetProps {
  ref: React.RefObject<BottomSheetModal>;
  templateId: string;
  buttonText?: string;
  onPress?: () => void;
}

export function StartWorkoutBottomSheet({
  ref,
  templateId,
  buttonText,
  onPress,
}: StartWorkoutBottomSheetProps) {
  const { theme } = useSettingsStore();
  const { t } = useTranslation();

  const { getTemplateById } = useWorkoutStore();
  const template = getTemplateById(templateId);

  const cardHeight = useLayoutPreviewHeight(template?.layout ?? []);
  const finalHeight = Math.min(cardHeight, HEIGHT * 0.5);

  const startWorkout = useStartWorkoutOfTemplate(templateId);

  function handleStartWorkout() {
    startWorkout();
    onPress?.();
    (ref as React.RefObject<BottomSheetModal>)?.current?.close();
  }

  if (!template) return null;

  return (
    <IBottomSheet ref={ref}>
      <TemplateName template={template} />
      <DescriptionText text={template.description ?? ""} />
      <CardSlider
        data={template?.layout ?? []}
        card={({ item }) => (
          <ExercisePreviewCard exercise={item} maxHeight={finalHeight} />
        )}
        cardWidth={WIDTH - 32}
        cardHeight={finalHeight}
        styleDots={{
          width: WIDTH - 32,
          justifyContent: "center",
          alignItems: "center",
        }}
      />
      <StrobeButton
        title={buttonText ?? t("button.start")}
        onPress={handleStartWorkout}
        style={{
          marginVertical: 16,
          width: WIDTH - 32,
          height: 64,
          borderRadius: 32,
          backgroundColor: theme.tint,
        }}
        textColor={theme.background}
      />
    </IBottomSheet>
  );
}
