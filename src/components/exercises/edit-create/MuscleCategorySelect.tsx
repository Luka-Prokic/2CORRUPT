import { WIDTH } from "../../../utils/Dimensions";
import { CenterCardSlider } from "../../ui/sliders/CenterCardSlider";
import { useSettingsStore } from "../../../stores/settings";
import { useHaptics } from "../../../features/ui/useHaptics";
import { MuscleCategory, useWorkoutStore } from "../../../stores/workout";
import { useMemo } from "react";
import { InfoText } from "../../ui/text/InfoText";
import { useTranslation } from "react-i18next";
import { View } from "react-native";
import { StrobeButton } from "../../ui/buttons/StrobeButton";
import { MidText } from "../../ui/text/MidText";
import { Ionicons } from "@expo/vector-icons";

export function MuscleCategorySelect() {
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
        cardHeight={WIDTH / 3}
        cardWidth={WIDTH / 3}
        sliderWidth={WIDTH}
        animationType="flat"
        hapticFeedback
        hideDots
        selectedIndex={initialSelectedIndex}
        selectedCardIndex={initialSelectedIndex}
        initialScrollIndex={initialSelectedIndex}
        getItemLayout={(_, index) => ({
          length: WIDTH / 3,
          offset: (WIDTH / 5) * index,
          index,
        })}
        distanceTolerance={1}
        card={({ item }) => (
          <MuscleCategoryCard
            icon={"dice"}
            selected={item.id === draftExercise?.category}
            id={item.id}
            onPress={() => handleSelect(item)}
          />
        )}
      />
      <InfoText text={t("exercise.select-category")} />
    </View>
  );
}

function MuscleCategoryCard({
  icon,
  selected,
  id,
  onPress,
}: {
  icon: keyof typeof Ionicons.glyphMap;
  selected: boolean;
  id: string;
  onPress: () => void;
}) {
  const { theme } = useSettingsStore();
  const { t } = useTranslation();

  function handlePress() {
    onPress();
  }
  return (
    <StrobeButton
      onPress={handlePress}
      strobeDisabled={!selected}
      style={{
        alignItems: "center",
        justifyContent: "space-between",
        width: WIDTH / 3,
        height: WIDTH / 3,
        backgroundColor: selected ? theme.caka + "20" : theme.text + "10",
        padding: 8,
        paddingTop: 16,
        borderRadius: 32,
      }}
    >
      <MidText text={t(`categories.${id}`)} />
      <Ionicons name={icon} size={44} color={theme.info} />
    </StrobeButton>
  );
}
