import { View, TouchableOpacity, Text } from "react-native";
import { useSettingsStore } from "../../../../stores/settingsStore";
import { Swipeable } from "react-native-gesture-handler";
import { Set, useWorkoutStore } from "../../../../stores/workoutStore";
import { useTranslation } from "react-i18next";
import * as Haptics from "expo-haptics";

export function SetSwipeActions({
  set,
  swipeableRef,
}: {
  set: Set;
  swipeableRef: React.RefObject<Swipeable>;
}) {
  const { theme } = useSettingsStore();
  const {
    updateSetInActiveExercise,
    addDropSetToActiveExercise,
    removeSetFromActiveExercise,
    activeExercise,
    activeTemplate,
  } = useWorkoutStore();
  const { t } = useTranslation();

  const handleAddDropSet = (setId: string) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Rigid);
    addDropSetToActiveExercise(setId, 0, 0);
  };

  const handleUncheckSet = (setId: string) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    updateSetInActiveExercise(setId, { isCompleted: false });
    updateSetInActiveExercise(setId, { restSeconds: null });
  };

  const handleRemoveSet = (setId: string) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
    removeSetFromActiveExercise(setId);
  };

  const isDropSetAllowed = activeExercise?.columns.includes("Weight");

  return (
    <View style={{ flexDirection: "row", alignItems: "flex-start" }}>
      {set.isCompleted && (
        <TouchableOpacity
          style={{
            height: 66,
            alignItems: "center",
            justifyContent: "center",
            minWidth: 80,
            backgroundColor: theme.secondaryText,
          }}
          onPress={() => {
            handleUncheckSet(set.id);
            swipeableRef.current?.close();
          }}
        >
          <Text
            style={{
              color: theme.text,
              fontSize: 14,
              fontWeight: "600",
              marginTop: 4,
            }}
          >
            {t("set.un-check")}
          </Text>
        </TouchableOpacity>
      )}

      {isDropSetAllowed && (
        <TouchableOpacity
          style={{
            height: 66,
            alignItems: "center",
            justifyContent: "center",
            minWidth: 80,
            backgroundColor: theme.fifthBackground,
          }}
          onPress={() => handleAddDropSet(set.id)}
        >
          <Text
            style={{
              color: theme.secondaryText,
              fontSize: 14,
              fontWeight: "600",
              marginTop: 4,
            }}
          >
            {t("set.add-drop-set")}
          </Text>
        </TouchableOpacity>
      )}

      <TouchableOpacity
        style={{
          height: 66,
          alignItems: "center",
          justifyContent: "center",
          minWidth: 80,
          backgroundColor: activeTemplate ? theme.tint : theme.error,
        }}
        onPress={() => handleRemoveSet(set.id)}
      >
        <Text
          style={{
            color: theme.secondaryText,
            fontSize: 14,
            fontWeight: "600",
            marginTop: 4,
          }}
        >
          {t("set.remove")}
        </Text>
      </TouchableOpacity>
    </View>
  );
}
