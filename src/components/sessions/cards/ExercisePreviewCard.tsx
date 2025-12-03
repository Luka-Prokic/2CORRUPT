import { View, FlatList, ViewStyle } from "react-native";
import { useSettingsStore } from "../../../stores/settings";
import { SessionExercise } from "../../../stores/workout";
import { hexToRGBA } from "../../../utils/HEXtoRGB";
import { ExerciseName } from "../../view-workout/table/header/ExerciseName";
import { PreviewSetRow } from "../session-options/PreviewSetRow";
import { useExercisePreviewHeight } from "../../../features/ui/useGetExercisePreviewCardHeight";
import { useTranslation } from "react-i18next";
import { useWidgetUnit } from "../../../features/widgets/useWidgetUnit";
import { DescriptionText } from "../../ui/text/DescriptionText";
import { MidText } from "../../ui/text/MidText";
import { InfoText } from "../../ui/text/InfoText";

interface ExercisePreviewCardProps {
  exercise: SessionExercise;
  maxHeight?: number;
  cardStyle?: ViewStyle | ViewStyle[];
  hollow?: boolean;
  square?: boolean;
  width?: number;
}

export function ExercisePreviewCard({
  exercise,
  maxHeight = Infinity,
  cardStyle,
  hollow = false,
  square = false,
  width,
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
        width: width ?? fullWidth,
        height: finalHeight,
        borderRadius: square ? 0 : 32,
        overflow: "hidden",
        backgroundColor: hollow
          ? "transparent"
          : hexToRGBA(theme.thirdBackground, 0.6),
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
        <DescriptionText
          style={{
            color: hollow ? theme.info : theme.info,
            paddingHorizontal: 8,
            height: 48,
          }}
          text={exercise.notes}
        />
      )}

      <FlatList
        data={columns}
        style={{ flexDirection: "row", width: width ?? fullWidth }}
        horizontal
        scrollEnabled={false}
        renderItem={({ item }) => (
          <View
            style={{
              width: width
                ? width / columns.length
                : fullWidth / columns.length,
              height: 34,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <MidText
              style={{
                fontWeight: "bold",
                color: hollow ? theme.handle : theme.info,
              }}
              text={t(`workout-view.${item.toLowerCase()}`).toUpperCase()}
            />
          </View>
        )}
      />

      <FlatList
        data={exercise.sets}
        keyExtractor={(_, index) => `set-${index}`}
        renderItem={({ item, index }) => (
          <PreviewSetRow
            execise={exercise}
            set={item}
            setIndex={index}
            width={width ?? fullWidth}
          />
        )}
        scrollEnabled={cardHeight > maxHeight}
        nestedScrollEnabled
      />
      {cardHeight > maxHeight && (
        <InfoText
          text={t("button.scrollable").toLowerCase()}
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            alignItems: "center",
            padding: 8,
          }}
        />
      )}
    </View>
  );
}
