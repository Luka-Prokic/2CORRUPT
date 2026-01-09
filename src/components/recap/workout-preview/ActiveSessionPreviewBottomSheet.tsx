import { BottomSheetModal } from "@gorhom/bottom-sheet";
import { IBottomSheet } from "../../ui/IBottomSheet";
import { useWorkoutStore } from "../../../stores/workout";
import { HEIGHT, WIDTH } from "../../../utils/Dimensions";
import { CenterCardSlider } from "../../ui/sliders/CenterCardSlider";
import { ExercisePreviewCard } from "../../summary/cards/ExercisePreviewCard";
import { useLayoutPreviewHeight } from "../../../features/ui/useGetExercisePreviewCardHeight";
import { useWidgetUnit } from "../../../features/widgets/useWidgetUnit";
import { DescriptionText } from "../../ui/text/DescriptionText";
import { SessionName } from "../../board-workout/sheets/session/SessionName";
import { useSettingsStore } from "../../../stores/settingsStore";
import { router } from "expo-router";
import { useUIStore } from "../../../stores/ui";
import { TwoOptionStrobeButtons } from "../../ui/buttons/TwoOptionStrobeButtons";
import { useActionSheet } from "../../../utils/useActionSheet";
import { usePullTemplate } from "../../../features/workout/usePullTemplate";

interface ActiveSessionPreviewBottomSheetProps {
  ref: React.RefObject<BottomSheetModal>;
}

export function ActiveSessionPreviewBottomSheet({
  ref,
}: ActiveSessionPreviewBottomSheetProps) {
  const { theme } = useSettingsStore();
  const { setTypeOfView } = useUIStore();
  const { t, showActionSheet } = useActionSheet();
  const { fullWidth } = useWidgetUnit();
  const { activeSession, cancelSession } = useWorkoutStore();
  const cardHeight = useLayoutPreviewHeight(activeSession?.layout ?? []);
  const finalHeight = Math.min(cardHeight, HEIGHT * 0.5);
  const isItEmpty = !activeSession?.layout.length;
  const handlePullTemplate = usePullTemplate();

  function handlePressOne() {
    setTypeOfView("workout");
    setTimeout(() => {
      router.dismissTo("/");
    }, 100);
  }

  function handlePressTwo() {
    const options = [
      t("workout-board.continue"),
      t("workout-board.exit-workout"),
      !isItEmpty && t("workout-board.save-as-template"),
    ].filter(Boolean);

    showActionSheet({
      title: `${t("workout-board.exit-workout")}?`,
      message: t("workout-board.exit-workout-message"),
      options,
      destructiveIndex: 1,
      cancelIndex: 0,
      onSelect: (buttonIndex) => {
        if (buttonIndex === 1 || (buttonIndex === 2 && !isItEmpty)) {
          setTypeOfView("home");
          cancelSession();
          ref.current?.close();
        }
        if (buttonIndex === 2 && !isItEmpty) {
          setTypeOfView("home");
          ref.current?.close();
          handlePullTemplate(activeSession);
        }
      },
    });
  }
  return (
    <IBottomSheet ref={ref}>
      <SessionName
        session={activeSession}
        styleView={{ marginVertical: 16 }}
        fontSize={32}
      />
      {activeSession?.notes && (
        <DescriptionText
          text={activeSession?.notes}
          style={{ marginBottom: 16 }}
        />
      )}
      <CenterCardSlider
        data={activeSession?.layout ?? []}
        card={({ item }) => (
          <ExercisePreviewCard
            exercise={item}
            width={fullWidth}
            maxHeight={finalHeight}
          />
        )}
        cardWidth={WIDTH}
        cardHeight={finalHeight}
        sliderWidth={WIDTH}
      />
      <TwoOptionStrobeButtons
        labelOne={t("button.continue")}
        labelTwo={t("button.cancel")}
        onOptionOne={handlePressOne}
        onOptionTwo={handlePressTwo}
        styleOne={{ backgroundColor: theme.thirdBackground }}
        style={{ margin: 16 }}
        haptics
      />
    </IBottomSheet>
  );
}
