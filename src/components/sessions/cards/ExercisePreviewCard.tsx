import { View, Text, FlatList, ViewStyle } from "react-native";
import { useSettingsStore } from "../../../stores/settings";
import { WIDTH } from "../../../features/Dimensions";
import { SessionExercise } from "../../../stores/workout";
import { hexToRGBA } from "../../../features/HEXtoRGB";
import { ExerciseName } from "../../view-workout/table/header/ExerciseName";
import { PreviewSetRow } from "../session-options/PreviewSetRow";
import { useExercisePreviewHeight } from "../../../features/ui/useGetExercisePreviewCardHeight";
import { useTranslation } from "react-i18next";
import { useWidgetUnit } from "../../../features/widgets/useWidgetUnit";

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
  const { theme, units } = useSettingsStore();
  const { t } = useTranslation();
  const { fullWidth } = useWidgetUnit();
  const cardHeight = useExercisePreviewHeight(exercise);

  const finalHeight = Math.min(cardHeight, maxHeight);
  const exColumns = exercise.columns.map((column) =>
    column === "Weight" ? `${units.weight.toLowerCase()}` : column.toLowerCase()
  );
  const columns = ["Set", ...exColumns, "Done"];

  return (
    <View
      style={{
        width: fullWidth,
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
            height: 48,
            lineHeight: 16,
          }}
          adjustsFontSizeToFit
          numberOfLines={3}
        >
          {exercise.notes}
        </Text>
      )}

      <View
        style={{
          flexDirection: "row",
          height: 34,
          alignItems: "center",
        }}
      >
        {columns.map((label: string) => (
          <View
            key={label}
            style={{
              width: fullWidth / columns.length,
              height: 34,
              justifyContent: "center",
              alignItems: "center",
              paddingHorizontal: 4,
            }}
          >
            <Text
              style={{
                fontSize: 16,
                fontWeight: "bold",
                textAlign: "center",
                color: theme.info,
              }}
              numberOfLines={1}
              adjustsFontSizeToFit
              minimumFontScale={0.6}
            >
              {t(`workout-view.${label.toLowerCase()}`).toUpperCase()}
            </Text>
          </View>
        ))}
      </View>

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
