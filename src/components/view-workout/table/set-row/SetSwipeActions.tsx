import { View, TouchableOpacity, Text } from "react-native";
import { useSettingsStore } from "../../../../stores/settingsStore";
import { Swipeable } from "react-native-gesture-handler";
import { Set, useWorkoutStore } from "../../../../stores/workoutStore";

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
  } = useWorkoutStore();

  const handleAddDropSet = (setId: string) => {
    addDropSetToActiveExercise(setId, 0, 0);
  };

  const handleUncheckSet = (setId: string) => {
    updateSetInActiveExercise(setId, { isCompleted: false });
  };

  const handleRemoveSet = (setId: string) => {
    removeSetFromActiveExercise(setId);
  };

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
            Uncheck
          </Text>
        </TouchableOpacity>
      )}

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
          Add Drop
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={{
          height: 66,
          alignItems: "center",
          justifyContent: "center",
          minWidth: 80,
          backgroundColor: theme.error,
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
          Remove
        </Text>
      </TouchableOpacity>
    </View>
  );
}
