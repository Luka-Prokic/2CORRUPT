import { useSettingsStore } from "../../stores/settingsStore";
import { ExerciseInfo } from "../../stores/workout/types";
import { hexToRGBA } from "../../utils/HEXtoRGB";
import { Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { memo, useMemo, useRef } from "react";
import { useTranslation } from "react-i18next";
import { router } from "expo-router";
import { IButton } from "../ui/buttons/IButton";
import { Swipeable } from "react-native-gesture-handler";
import { WIDTH } from "../../utils/Dimensions";
import { InfoExerciseSwipeActions } from "./InfoExerciseSwipeActions";
import Animated, { FadeIn, FadeOut } from "react-native-reanimated";
import { Shine } from "../ui/misc/Shine";

interface InfoExerciseCardProps {
  exercise: ExerciseInfo;
}

export const MemoizedInfoExerciseCard = memo(InfoExerciseCard);

export function InfoExerciseCard({ exercise }: InfoExerciseCardProps) {
  const { theme } = useSettingsStore();
  const { t } = useTranslation();
  const swipeableRef = useRef<Swipeable>(null);

  const translatedPrimary = useMemo(
    () => exercise.primaryMuscles?.map((m) => t(`body-parts.${m}`)),
    [exercise.primaryMuscles]
  );

  const translatedSecondary = useMemo(
    () => exercise.secondaryMuscles?.map((m) => t(`body-parts.${m}`)),
    [exercise.secondaryMuscles]
  );

  return (
    <Swipeable
      ref={swipeableRef}
      renderRightActions={() => (
        <InfoExerciseSwipeActions
          exercise={exercise}
          swipeableRef={swipeableRef}
        />
      )}
    >
      <Animated.View
        entering={FadeIn}
        exiting={FadeOut}
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          paddingHorizontal: 16,
          paddingVertical: 12,
          height: 72,
          width: WIDTH,
          borderRadius: 0,
          backgroundColor: theme.secondaryBackground,
        }}
      >
        {/* Exercise info section */}
        <Shine
          style={{
            flex: 1,
            borderRadius: 0,
            justifyContent: "center",
            padding: 8,
          }}
        >
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
        </Shine>

        {/* Selection button section */}
        <OptionButtons exercise={exercise} />
      </Animated.View>
    </Swipeable>
  );
}

interface OptionButtonsProps {
  exercise: ExerciseInfo;
}

function OptionButtons({ exercise }: OptionButtonsProps) {
  const { theme } = useSettingsStore();

  function handlePress() {
    router.push({
      pathname: "/exercise/[exerciseId]/info",
      params: { exerciseId: exercise.id },
    });
  }

  return (
    <IButton
      style={{
        backgroundColor: hexToRGBA(theme.handle, 0.8),
        padding: 8,
        minWidth: 44,
        height: 44,
        borderRadius: 22,
        alignItems: "center",
        justifyContent: "center",
        position: "absolute",
        right: 16,
        top: 16,
      }}
      onPress={handlePress}
    >
      <Ionicons name="chevron-forward" size={24} color={theme.text} />
    </IButton>
  );
}
