import { useTranslation } from "react-i18next";
import { View } from "react-native";
import { useSettingsStore } from "../../../stores/settingsStore";
import { useWorkoutStore } from "../../../stores/workout";
import { InfoText } from "../../ui/text/InfoText";
import { IButton } from "../../ui/buttons/IButton";

export function ExerciseEquipmentSelect() {
  const { t } = useTranslation();
  const { theme } = useSettingsStore();

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
    <View style={{ gap: 4 }}>
      <View
        style={{
          flexDirection: "row",
          flexWrap: "wrap",
          alignItems: "center",
          justifyContent: "center",
          gap: 4,
        }}
      >
        {equipment.map((eq) => {
          const isSelected = selected.includes(eq.id);

          return (
            <IButton
              key={eq.id}
              onPress={() => toggle(eq.id)}
              title={eq.name}
              color={isSelected ? theme.fifthBackground : theme.border}
              textColor={isSelected ? theme.border : theme.text}
              haptics="gentle"
              style={{
                height: 44,
                paddingHorizontal: 8,
                borderRadius: 22,
              }}
            />
          );
        })}
      </View>
      <InfoText text={t("exercise.select-equipment")} />
    </View>
  );
}
