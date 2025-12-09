import { useSettingsStore } from "../../stores/settingsStore";
import { ExerciseInfo } from "../../stores/workout/types";
import { hexToRGBA } from "../../utils/HEXtoRGB";
import { Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { router } from "expo-router";
import { useWorkoutStore } from "../../stores/workout";
import { useUserStore } from "../../stores/user/useUserStore";
import { IButton } from "../ui/buttons/IButton";

interface InfoExerciseCardProps {
  exercise: ExerciseInfo;
}

export function InfoExerciseCard({ exercise }: InfoExerciseCardProps) {
  const { theme } = useSettingsStore();
  const { t } = useTranslation();
  const { user } = useUserStore();
  const { removeExercise } = useWorkoutStore();

  const translatedPrimary = useMemo(
    () => exercise.primaryMuscles?.map((m) => t(`body-parts.${m}`)),
    [exercise.primaryMuscles]
  );

  const translatedSecondary = useMemo(
    () => exercise.secondaryMuscles?.map((m) => t(`body-parts.${m}`)),
    [exercise.secondaryMuscles]
  );

  function handlePress() {
    router.push({
      pathname: "/exercise/[exerciseId]/info",
      params: { exerciseId: exercise.id },
    });
  }

  function handleLongPress() {
    if (exercise.userId !== user?.id) return;

    removeExercise(exercise.id);
  }

  return (
    <IButton
      style={{
        flex: 1,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingHorizontal: 16,
        paddingVertical: 12,
        height: 72,
        borderRadius: 0,
        backgroundColor: theme.secondaryBackground,
      }}
      onPress={handlePress}
      onLongPress={handleLongPress}
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
      <OptionButtons exercise={exercise} />
    </IButton>
  );
}

interface OptionButtonsProps {
  exercise: ExerciseInfo;
}

function OptionButtons({ exercise }: OptionButtonsProps) {
  const { theme } = useSettingsStore();
  const { user } = useUserStore();
  const { startDraftExercise } = useWorkoutStore();

  const isOwnExercise = exercise.userId === user?.id;

  function handleEditPress() {
    startDraftExercise(exercise);
    router.push({
      pathname: "/exercise/[exerciseId]/edit",
      params: { exerciseId: exercise.id },
    });
  }

  function handleCreatePress() {
    startDraftExercise(exercise);
    router.push({
      pathname: "/exercise/[exerciseId]/create",
      params: { exerciseId: exercise.id },
    });
  }

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
      {/* Edit button */}
      {isOwnExercise && (
        <IButton
          style={{
            backgroundColor: hexToRGBA(theme.handle, 0.8),
            padding: 8,
            minWidth: 44,
            height: 44,
            borderRadius: 22,
            alignItems: "center",
            justifyContent: "center",
          }}
          onPress={handleEditPress}
        >
          <Ionicons name="pencil" size={24} color={theme.text} />
        </IButton>
      )}

      {/* Create exercise using this one as base button */}
      <IButton
        style={{
          backgroundColor: hexToRGBA(theme.handle, 0.8),
          padding: 8,
          minWidth: 44,
          height: 44,
          borderRadius: 22,
          alignItems: "center",
          justifyContent: "center",
        }}
        onPress={handleCreatePress}
      >
        <Ionicons name="create" size={24} color={theme.text} />
      </IButton>
    </View>
  );
}
