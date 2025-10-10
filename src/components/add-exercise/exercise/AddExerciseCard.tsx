import { useSettingsStore } from "../../../stores/settingsStore";
import { ExerciseInfo } from "../../../stores/workout/types";
import { WIDTH } from "../../../features/Dimensions";
import { hexToRGBA } from "../../../features/HEXtoRGB";
import { TouchableOpacity, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { StrobeBlur } from "../../ui/misc/StrobeBlur";
import { useTranslatedExerciseName } from "../../../features/translate/useTranslatedExercisesNames";
import { useTranslatedBodyPart } from "../../../features/translate/useTranslatedBodyPart";

interface AddExerciseCardProps {
  exercise: ExerciseInfo;
  onSelect: (exercise: ExerciseInfo) => void;
  unSelect: (exercise: ExerciseInfo) => void;
  selectedTotal: number;
}

export function AddExerciseCard({
  exercise,
  onSelect,
  unSelect,
  selectedTotal,
}: AddExerciseCardProps) {
  const { theme } = useSettingsStore();
  const { translatedName } = useTranslatedExerciseName(exercise);

  const translatedPrimary = exercise.primaryMuscles?.map((m) =>
    useTranslatedBodyPart(m).toLowerCase()
  );
  const translatedSecondary = exercise.secondaryMuscles?.map((m) =>
    useTranslatedBodyPart(m).toLowerCase()
  );

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={() => onSelect(exercise)}
      style={{
        minHeight: 72,
        marginBottom: 1,
        backgroundColor: theme.secondaryBackground,
        shadowColor: theme.shadow,
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.4,
        shadowRadius: 2,
        elevation: 4,
      }}
    >
      <StrobeBlur
        colors={[theme.caka, theme.primaryBackground, theme.accent, theme.tint]}
        tint="light"
        style={{
          minHeight: 72,
          width: WIDTH,
        }}
        disable={selectedTotal === 0}
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
              {translatedName}
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
      </StrobeBlur>
    </TouchableOpacity>
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
      }}
    >
      {/* Selected count pill */}
      <View
        style={{
          backgroundColor: hexToRGBA(theme.grayText, 0.4),
          padding: 10,
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
          backgroundColor: hexToRGBA(theme.grayText, 0.4),
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
