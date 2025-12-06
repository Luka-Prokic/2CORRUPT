import { View, TouchableOpacity, Text } from "react-native";
import { useSettingsStore } from "../../../../stores/settingsStore";
import { Swipeable } from "react-native-gesture-handler";
import { Set, useWorkoutStore } from "../../../../stores/workoutStore";
import { useTranslation } from "react-i18next";
import { useHaptics } from "../../../../features/ui/useHaptics";

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
  const triggerHapticsRigid = useHaptics({
    modeType: "on",
    hapticType: "rigid",
  });
  const triggerHapticsMedium = useHaptics({
    modeType: "gentle",
    hapticType: "medium",
  });
  const triggerHapticsHeavy = useHaptics({
    modeType: "gentle",
    hapticType: "heavy",
  });

  const handleAddDropSet = (setId: string) => {
    triggerHapticsRigid();
    addDropSetToActiveExercise(setId, 0, 0);
  };

  const handleUncheckSet = (setId: string) => {
    triggerHapticsMedium();
    updateSetInActiveExercise(setId, { isCompleted: false });
    updateSetInActiveExercise(setId, { restSeconds: null });
  };

  const handleRemoveSet = (setId: string) => {
    triggerHapticsHeavy();
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
