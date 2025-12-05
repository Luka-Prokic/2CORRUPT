import { useSettingsStore } from "../../../stores/settings";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { BottomSheetBackdrop } from "@gorhom/bottom-sheet";
import { BottomSheetView } from "@gorhom/bottom-sheet";
import { BottomSheetModal } from "@gorhom/bottom-sheet";
import { useWorkoutStore } from "../../../stores/workout";
import { ExercisePreviewCard } from "../../sessions/cards/ExercisePreviewCard";
import { CardSlider } from "../../ui/sliders/CardSlider";
import { useLayoutPreviewHeight } from "../../../features/ui/useGetExercisePreviewCardHeight";
import { HEIGHT, WIDTH } from "../../../utils/Dimensions";
import { StrobeButton } from "../../ui/buttons/StrobeButton";
import { useTranslation } from "react-i18next";
import { TemplateName } from "../../board-template/sheets/template/TemplateName";
import { DescriptionText } from "../../ui/text/DescriptionText";

interface StartWorkoutBottomSheetProps {
  ref: React.RefObject<BottomSheetModal>;
  templateId: string;
  buttonText?: string;
  onPress?: () => void;
}

export function StartWorkoutBottomSheet({
  ref,
  templateId,
  buttonText ,
  onPress,
}: StartWorkoutBottomSheetProps) {
  const { theme } = useSettingsStore();
  const { t } = useTranslation();
  const insets = useSafeAreaInsets();
  const { getTemplateById } = useWorkoutStore();
  const template = getTemplateById(templateId);
  if (!template) return null;
  const cardHeight = useLayoutPreviewHeight(template.layout);
  const finalHeight = Math.min(cardHeight, HEIGHT * 0.5);

  function handleStartWorkout() {
    onPress?.();
    (ref as React.RefObject<BottomSheetModal>)?.current?.close();
  }

  return (
    <BottomSheetModal
      ref={ref}
      enablePanDownToClose
      enableDismissOnClose
      keyboardBlurBehavior="restore"
      keyboardBehavior="fillParent"
      handleIndicatorStyle={{ backgroundColor: theme.info }}
      backgroundStyle={{ backgroundColor: theme.navBackground }}
      backdropComponent={(props) => (
        <BottomSheetBackdrop
          {...props}
          disappearsOnIndex={-1}
          appearsOnIndex={0}
          pressBehavior="close"
          opacity={0.2}
        />
      )}
    >
      <BottomSheetView
        style={[
          {
            flex: 1,
            paddingHorizontal: 16,
            justifyContent: "flex-start",
            borderTopColor: theme.border,
            borderTopWidth: 1,
            paddingBottom: insets.bottom,
            alignItems: "center",
            gap: 8,
          },
        ]}
      >
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
          styleContent={{
            justifyContent: "center",
            alignItems: "center",
          }}
          textColor={theme.background}
        />
      </BottomSheetView>
    </BottomSheetModal>
  );
}
