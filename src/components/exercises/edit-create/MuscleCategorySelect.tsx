import { WIDTH } from "../../../utils/Dimensions";
import { CenterCardSlider } from "../../ui/sliders/CenterCardSlider";
import { useSettingsStore } from "../../../stores/settings";
import { useHaptics } from "../../../features/ui/useHaptics";
import { MuscleCategory, useWorkoutStore } from "../../../stores/workout";
import { useMemo } from "react";
import { InfoText } from "../../ui/text/InfoText";
import { IButton } from "../../ui/buttons/IButton";
import { useTranslation } from "react-i18next";
import { View } from "react-native";

export function MuscleCategorySelect() {
  const { theme } = useSettingsStore();
  const { t } = useTranslation();

  const { updateDraftExercise, muscleCategories, draftExercise } =
    useWorkoutStore();

  const triggerHapticsHeavy = useHaptics({
    modeType: "on",
    hapticType: "heavy",
  });

  const handleSelect = (item: MuscleCategory) => {
    updateDraftExercise({ category: item.id });
    triggerHapticsHeavy();
  };

  const initialSelectedIndex = useMemo(() => {
    return muscleCategories.findIndex(
      (category) => category.id === draftExercise?.category
    );
  }, [draftExercise?.category]);

  return (
    <View style={{ gap: 4 }}>
      <CenterCardSlider
        data={muscleCategories}
        cardWidth={WIDTH / 3}
        cardHeight={WIDTH / 5}
        selectedIndex={initialSelectedIndex}
        selectedCardIndex={initialSelectedIndex}
        initialScrollIndex={initialSelectedIndex}
        getItemLayout={(_, index) => ({
          length: WIDTH / 3,
          offset: (WIDTH / 5) * index,
          index,
        })}
        sliderWidth={WIDTH}
        animationType="wheel"
        showDistanceBubble
        distanceTolerance={1}
        hideDots
        hapticFeedback
        card={({ item }) => (
          <IButton
            title={item.name}
            onPress={() => handleSelect(item)}
            style={{
              height: WIDTH / 5,
              width: WIDTH / 3,
              justifyContent: "center",
              alignItems: "center",
            }}
            textColor={
              item.id === draftExercise?.category
                ? theme.fifthBackground
                : theme.grayText
            }
          />
        )}
      />
      <InfoText text={t("exercise.select-category")} />
    </View>
  );
}
