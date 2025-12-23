import { View } from "react-native";
import { useTranslation } from "react-i18next";
import { useSettingsStore } from "../../../stores/settingsStore";
import { useWorkoutStore } from "../../../stores/workout";
import { SwitchButton } from "../../ui/buttons/SwitchButton";
import { InfoText } from "../../ui/text/InfoText";
import { IButton } from "../../ui/buttons/IButton";
import { CenterCardSlider } from "../../ui/sliders/CenterCardSlider";
import { useWidgetUnit } from "../../../features/widgets/useWidgetUnit";
import { useMemo, useState } from "react";
import { TextButton } from "../../ui/buttons/TextButton";
import { WIDTH } from "../../../utils/Dimensions";
import { IBubble } from "../../ui/containers/IBubble";

type MuscleType = "primary" | "secondary";

export function ExerciseMuscleSelect() {
  const { t } = useTranslation();
  const { theme } = useSettingsStore();
  const { fullWidth } = useWidgetUnit();
  const { muscleCategories, draftExercise, updateDraftExercise } =
    useWorkoutStore();

  const [type, setType] = useState<MuscleType>("primary");

  // --- Dropdown state derived with useMemo ---
  const initialOpen = useMemo(() => {
    const init: Record<string, boolean> = {};
    muscleCategories.forEach((cat) => {
      const ids = cat.muscles.map((m) => m.id);
      const hasSelected =
        ids.some((id) => draftExercise?.primaryMuscles.includes(id)) ||
        ids.some((id) => draftExercise?.secondaryMuscles.includes(id));
      init[cat.id] = hasSelected;
    });
    return init;
  }, [
    muscleCategories,
    draftExercise?.primaryMuscles,
    draftExercise?.secondaryMuscles,
  ]);

  // Local state for toggling open/close
  const [open, setOpen] = useState<Record<string, boolean>>(initialOpen);

  const toggleMuscle = (id: string) => {
    const key = type === "primary" ? "primaryMuscles" : "secondaryMuscles";
    const list = draftExercise?.[key] ?? [];
    const updated = list.includes(id)
      ? list.filter((m) => m !== id)
      : [...list, id];
    updateDraftExercise({ [key]: updated });
  };

  return (
    <IBubble
      size="flexible"
      style={{ alignItems: "center", paddingVertical: 8 }}
    >
      {/* Switch */}
      <SwitchButton
        option1={t("exercise.primary").toUpperCase()}
        option2={t("exercise.secondary").toUpperCase()}
        value={type.toUpperCase()}
        onChange={(v: MuscleType) => setType(v.toLowerCase() as MuscleType)}
        width={fullWidth - 16}
        haptics
      />

      {/* Category dropdowns */}
      {muscleCategories.map((cat) => {
        const items = cat.muscles;
        const selected =
          type === "primary"
            ? draftExercise?.primaryMuscles ?? []
            : draftExercise?.secondaryMuscles ?? [];
        const isOpen = open[cat.id];

        return (
          <View key={cat.id} style={{ gap: 4, width: "100%" }}>
            {/* Category title */}
            <TextButton
              text={`${t(`categories.${cat.id}`)} ${isOpen ? "▲" : "▼"}`}
              onPress={() => setOpen((s) => ({ ...s, [cat.id]: !s[cat.id] }))}
            />

            {/* Slider (only if open) */}
            {isOpen && (
              <CenterCardSlider
                data={items}
                sliderWidth={WIDTH}
                cardWidth={WIDTH / 3}
                cardHeight={44}
                hideDots
                animationType="flat"
                hapticFeedback
                startAtMiddle
                getItemLayout={(_, index) => ({
                  length: WIDTH / 3,
                  offset: (WIDTH / 3) * index,
                  index,
                })}
                card={({ item }) => {
                  const isSelected = selected.includes(item.id);

                  return (
                    <IButton
                      title={item.name}
                      onPress={() => toggleMuscle(item.id)}
                      style={{
                        height: 44,
                        width: WIDTH / 3,
                        justifyContent: "center",
                        alignItems: "center",
                        paddingHorizontal: 4,
                      }}
                      textColor={
                        isSelected ? theme.fifthBackground : theme.grayText
                      }
                    />
                  );
                }}
              />
            )}
          </View>
        );
      })}

      <InfoText text={t("exercise.select-muscles")} />
    </IBubble>
  );
}
