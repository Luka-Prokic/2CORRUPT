import { View, Text, FlatList, ViewStyle } from "react-native";
import { useSettingsStore } from "../../../stores/settings";
import { WIDTH } from "../../../features/Dimensions";
import { SessionExercise } from "../../../stores/workout";
import { hexToRGBA } from "../../../features/HEXtoRGB";
import { ExerciseName } from "../../view-workout/table/header/ExerciseName";
import { PreviewSetRow } from "../session-options/PreviewSetRow";
import { useExercisePreviewHeight } from "../../../features/ui/useGetExercisePreviewCardHeight";
import { useTranslation } from "react-i18next";

interface ExercisePreviewCardProps {
  exercise: SessionExercise;
  maxHeight: number;
  cardStyle?: ViewStyle | ViewStyle[];
}

export function ExercisePreviewCard({
  exercise,
  maxHeight,
  cardStyle,
}: ExercisePreviewCardProps) {
  const { theme } = useSettingsStore();
  const { t } = useTranslation();
  const cardHeight = useExercisePreviewHeight(exercise);

  const finalHeight = Math.min(cardHeight, maxHeight);

  return (
    <View
      style={{
        width: WIDTH - 32,
        height: finalHeight,
        borderRadius: 32,
        overflow: "hidden",
        backgroundColor: hexToRGBA(theme.thirdBackground, 0.6),
        ...cardStyle,
      }}
    >
      <View
        style={{
          height: 64,
          justifyContent: "center",
          alignItems: "center",
          paddingHorizontal: 16,
        }}
      >
        <ExerciseName exercise={exercise} />
      </View>

      {exercise.notes && (
        <Text
          style={{
            color: theme.tint,
            fontSize: 16,
            fontWeight: "500",
            textAlign: "center",
            paddingHorizontal: 8,
            height: 64,
            lineHeight: 16,
          }}
          adjustsFontSizeToFit
          numberOfLines={4}
        >
          {exercise.notes}
        </Text>
      )}

      <FlatList
        data={exercise.sets}
        keyExtractor={(_, index) => `set-${index}`}
        renderItem={({ item, index }) => (
          <PreviewSetRow
            execise={exercise}
            set={item}
            setIndex={index}
            width={WIDTH - 32}
          />
        )}
        scrollEnabled={cardHeight > maxHeight}
        nestedScrollEnabled
      />
      {cardHeight > maxHeight && (
        <View
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            alignItems: "center",
            padding: 8,
          }}
        >
          <Text
            style={{
              color: theme.info,
              fontSize: 14,
              fontWeight: "500",
            }}
          >
            {t("button.scrollable").toLowerCase()}
          </Text>
        </View>
      )}
    </View>
  );
}
