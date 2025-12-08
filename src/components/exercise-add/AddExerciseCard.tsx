import { useSettingsStore } from "../../stores/settingsStore";
import { ExerciseInfo } from "../../stores/workout/types";
import { hexToRGBA } from "../../utils/HEXtoRGB";
import { TouchableOpacity, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { StrobeButton } from "../ui/buttons/StrobeButton";
import { useMemo } from "react";
import { useTranslation } from "react-i18next";

interface AddExerciseCardProps {
  exercise: ExerciseInfo;
  onSelect: (exercise: ExerciseInfo) => void;
  unSelect: (exercise: ExerciseInfo) => void;
  selectedExercises: ExerciseInfo[];
}

export function AddExerciseCard({
  exercise,
  onSelect,
  unSelect,
  selectedExercises,
}: AddExerciseCardProps) {
  const { theme } = useSettingsStore();
  const { t } = useTranslation();

  const translatedPrimary = useMemo(
    () => exercise.primaryMuscles?.map((m) => t(`body-parts.${m}`)),
    [exercise.primaryMuscles]
  );

  const translatedSecondary = useMemo(
    () => exercise.secondaryMuscles?.map((m) => t(`body-parts.${m}`)),
    [exercise.secondaryMuscles]
  );

  const selectedTotal = useMemo(
    () => selectedExercises?.filter((ex) => ex.id === exercise.id).length,
    [selectedExercises?.length, exercise.id]
  );

  return (
    <StrobeButton
      onPress={() => onSelect(exercise)}
      style={{
        height: 72,
        backgroundColor: theme.secondaryBackground,
      }}
      strobeDisabled={selectedTotal === 0}
    >
      <View
        style={{
          flex: 1,
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          paddingHorizontal: 16,
          paddingVertical: 12,
        }}
      >
        {/* Exercise info section */}
        <View style={{ flex: 1 }}>
          <Text
            style={{
              color: theme.text,
              fontSize: 16,
              fontWeight: "600",
              marginBottom: 2,
            }}
          >
            {exercise.defaultName[t("locale")]}
          </Text>

          {/* body parts detail line */}
          <Text
            style={{
              color: theme.text,
              fontSize: 14,
            }}
          >
            {translatedPrimary?.join(", ")}

            <Text
              style={{
                color: theme.grayText,
                opacity: translatedSecondary?.length ? 1 : 0,
              }}
            >
              {" - "}
              {translatedSecondary?.join(", ")}
            </Text>
          </Text>
        </View>

        {/* Selection button section */}
        <SelectionButton
          unSelect={unSelect}
          selectedTotal={selectedTotal}
          exercise={exercise}
        />
      </View>
    </StrobeButton>
  );
}

interface SelectionButtonProps {
  unSelect: (exercise: ExerciseInfo) => void;
  selectedTotal: number;
  exercise: ExerciseInfo;
}

function SelectionButton({
  unSelect,
  selectedTotal,
  exercise,
}: SelectionButtonProps) {
  const { theme } = useSettingsStore();

  if (selectedTotal <= 0) return null;

  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        gap: 8,
        position: "absolute",
        right: 16,
        top: 16,
      }}
    >
      {/* Selected count pill */}
      <View
        style={{
          backgroundColor: hexToRGBA(theme.handle, 0.8),
          padding: 8,
          minWidth: 44,
          height: 44,
          borderRadius: 22,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Text
          style={{
            color: theme.text,
            fontWeight: "600",
            fontSize: 18,
          }}
        >
          {selectedTotal}x
        </Text>
      </View>

      {/* Unselect button */}
      <TouchableOpacity
        onPress={() => unSelect(exercise)}
        style={{
          backgroundColor: hexToRGBA(theme.handle, 0.8),
          width: 44,
          height: 44,
          borderRadius: 22,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Ionicons name="close" size={24} color={theme.text} />
      </TouchableOpacity>
    </View>
  );
}
