import { useRef } from "react";
import { useSettingsStore } from "../../../../stores/settingsStore";
import { Swipeable } from "react-native-gesture-handler";
import { useWorkoutStore } from "../../../../stores/workoutStore";
import { View, TouchableOpacity, Text, TextInput } from "react-native";
import { StrobeBlur } from "../../../ui/misc/StrobeBlur";
import { Ionicons } from "@expo/vector-icons";
import { SetSwipeActions } from "./SetSwipeActions";
import { DropSetRow } from "./DropSetRow";

export function SetRow({ set, setIndex }: { set: any; setIndex: number }) {
  const { theme } = useSettingsStore();
  const swipeableRef = useRef<Swipeable>(null);
  const { updateSetInActiveExercise } = useWorkoutStore();

  const handleToggleComplete = () => {
    console.log("handleToggleComplete", set.id);
    updateSetInActiveExercise(set.id, { isCompleted: !set.isCompleted });
  };

  const handleUpdateSet = (setId: string, updates: any) => {
    console.log("handleUpdateSet", setId, updates);
    updateSetInActiveExercise(setId, updates);
  };

  return (
    <Swipeable
      ref={swipeableRef}
      renderRightActions={() => (
        <SetSwipeActions set={set} swipeableRef={swipeableRef} />
      )}
    >
      {/* Main Set Row */}
      <StrobeBlur
        colors={
          set.isCompleted
            ? [theme.text, theme.caka, theme.accent, theme.tint]
            : [
                theme.secondaryBackground,
                theme.border,
                theme.grayText,
                theme.handle,
              ]
        }
        tint={set.isCompleted ? "light" : "auto"}
        style={{ flexDirection: "row", width: "100%", height: 66 }}
      >
        <View style={{ flexDirection: "row", width: "100%", height: 66 }}>
          <View
            style={{
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
              width: "25%",
            }}
          >
            <View
              style={{
                width: 44,
                height: 44,
                borderRadius: 22,
                backgroundColor: theme.secondaryBackground,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Text
                style={{
                  fontSize: 16,
                  fontWeight: "bold",
                  color: theme.text,
                }}
              >
                {setIndex + 1}
              </Text>
            </View>
          </View>

          <View
            style={{
              flex: 1,
              width: "25%",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <TextInput
              style={{
                height: 66,
                fontSize: 16,
                textAlign: "center",
                color: theme.text,
              }}
              value={set.reps}
              onChangeText={(text) => handleUpdateSet(set.id, { reps: text })}
              placeholder="0"
              placeholderTextColor={theme.grayText}
              keyboardType="numeric"
            />
          </View>

          <View
            style={{
              flex: 1,
              width: "25%",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <TextInput
              style={{
                height: 66,
                fontSize: 16,
                textAlign: "center",
                color: theme.text,
              }}
              value={set.weight}
              onChangeText={(text) => handleUpdateSet(set.id, { weight: text })}
              placeholder="0"
              placeholderTextColor={theme.grayText}
              keyboardType="numeric"
            />
          </View>

          <View
            style={{
              flex: 1,
              width: "25%",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <TouchableOpacity
              style={{
                alignItems: "center",
                justifyContent: "center",
                width: 44,
                height: 44,
              }}
              onPress={handleToggleComplete}
              disabled={set.isCompleted}
            >
              <Ionicons
                name={set.isCompleted ? "checkmark-circle" : "ellipse-outline"}
                size={44}
                color={set.isCompleted ? theme.text : theme.grayText}
              />
            </TouchableOpacity>
          </View>
        </View>
      </StrobeBlur>

      {/* Drop Sets */}
      {set.dropSets?.length > 0 &&
        set.dropSets.map((drop: any, index: number) => (
          <DropSetRow set={set} drop={drop} index={index} />
        ))}
    </Swipeable>
  );
}
