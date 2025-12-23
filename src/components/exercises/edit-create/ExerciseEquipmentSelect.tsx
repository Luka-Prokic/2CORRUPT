import { useTranslation } from "react-i18next";
import { View } from "react-native";
import { useSettingsStore } from "../../../stores/settingsStore";
import { useWorkoutStore } from "../../../stores/workout";
import { InfoText } from "../../ui/text/InfoText";
import { Ionicons } from "@expo/vector-icons";
import { MidText } from "../../ui/text/MidText";
import { CenterCardSlider } from "../../ui/sliders/CenterCardSlider";
import { StrobeButton } from "../../ui/buttons/StrobeButton";
import { WIDTH } from "../../../utils/Dimensions";

export function ExerciseEquipmentSelect() {
  const { t } = useTranslation();

  const { equipment, draftExercise, updateDraftExercise } = useWorkoutStore();

  const selected = draftExercise?.equipment ?? [];

  const toggle = (id: string) => {
    const already = selected.includes(id);
    const updated = already
      ? selected.filter((e) => e !== id)
      : [...selected, id];

    updateDraftExercise({ equipment: updated });
  };

  return (
    <View style={{ gap: 8 }}>
      <CenterCardSlider
        data={equipment}
        cardHeight={WIDTH / 3}
        cardWidth={WIDTH / 3}
        sliderWidth={WIDTH}
        animationType="flat"
        hapticFeedback
        hideDots
        card={({ item }) => (
          <EquipmentCard
            icon={"barbell"}
            selected={selected.includes(item.id)}
            id={item.id}
            onPress={() => toggle(item.id)}
          />
        )}
      />
      <InfoText text={t("exercise.select-equipment")} />
    </View>
  );
}

function EquipmentCard({
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
      <MidText text={t(`equipment.${id.toLowerCase()}`)} />
      <Ionicons name={icon} size={44} color={theme.info} />
    </StrobeButton>
  );
}
