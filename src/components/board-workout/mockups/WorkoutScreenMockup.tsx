import { useRef } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  Dimensions,
} from "react-native";
import { Swipeable } from "react-native-gesture-handler";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { StrobeBlur } from "../../ui/misc/StrobeBlur";
import { BounceButton } from "../../ui/buttons/BounceButton";
import { hexToRGBA } from "../../../features/HEXtoRGB";
import { useSettingsStore } from "../../../stores/settingsStore";
import {
  useWorkoutStore,
  Set,
  SessionExercise,
} from "../../../stores/workoutStore";
import { IButton } from "../../ui/buttons/IButton";

const HEIGHT = Dimensions.get("window").height;

// Individual Set Row Component
function SetRow({
  set,
  exercise,
  setIndex,
}: {
  set: any;
  exercise: SessionExercise;
  setIndex: number;
}) {
  const { theme, themeName } = useSettingsStore();
  const swipeableRef = useRef<Swipeable>(null);
  const {
    updateSetInActiveExercise,
    addDropSetToActiveExercise,
    removeSetFromActiveExercise,
    updateDropSetInActiveExercise,
    removeDropSetFromActiveExercise,
  } = useWorkoutStore();

  const handleToggleComplete = () => {
    console.log("handleToggleComplete", set.id);
    updateSetInActiveExercise(set.id, { isCompleted: !set.isCompleted });
  };

  const handleDropUpdate = (dropId: string, update: any) => {
    console.log("handleDropUpdate", dropId, update);
    updateDropSetInActiveExercise(set.id, dropId, update);
  };

  const handleRemoveDrop = (dropId: string) => {
    console.log("handleRemoveDrop", dropId);
    removeDropSetFromActiveExercise(set.id, dropId);
  };

  const handleAddDropSet = (setId: string) => {
    console.log("handleAddDropSet", setId);
    addDropSetToActiveExercise(setId, 0, 0);
  };

  const handleUncheckSet = (setId: string) => {
    console.log("handleUncheckSet", setId);
    updateSetInActiveExercise(setId, { isCompleted: false });
  };

  const handleRemoveSet = (setId: string) => {
    console.log("handleRemoveSet", setId);
    removeSetFromActiveExercise(setId);
  };

  const handleUpdateSet = (setId: string, updates: any) => {
    console.log("handleUpdateSet", setId, updates);
    updateSetInActiveExercise(setId, updates);
  };

  const renderRightActions = () => (
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

  return (
    <Swipeable ref={swipeableRef} renderRightActions={renderRightActions}>
      <View>
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
          tint={
            ["light", "peachy", "oldschool"].includes(themeName) ||
            set.isCompleted
              ? "light"
              : "dark"
          }
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
                onChangeText={(text) =>
                  handleUpdateSet(set.id, { weight: text })
                }
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
                  name={
                    set.isCompleted ? "checkmark-circle" : "ellipse-outline"
                  }
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
            <View
              key={`${set.id}-${drop.id}-${index}`}
              style={{
                flexDirection: "row",
                alignItems: "center",
                backgroundColor: hexToRGBA(
                  theme.fifthBackground,
                  set.isCompleted ? 1 : 0.2
                ),
                height: 44,
              }}
            >
              <View
                style={{
                  width: "25%",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Text
                  style={{
                    width: 28,
                    fontSize: 16,
                    fontWeight: "700",
                    color: set.isCompleted
                      ? theme.secondaryText
                      : theme.grayText,
                    textAlign: "center",
                  }}
                >
                  {index + 1}'
                </Text>
              </View>

              <TextInput
                style={{
                  flex: 1,
                  textAlign: "center",
                  fontSize: 16,
                  color: set.isCompleted ? theme.secondaryText : theme.grayText,
                  width: "25%",
                }}
                value={drop.reps}
                onChangeText={(text) =>
                  handleDropUpdate(drop.id, { reps: text })
                }
                placeholder="0"
                placeholderTextColor={theme.grayText}
                keyboardType="numeric"
              />

              <TextInput
                style={{
                  flex: 1,
                  textAlign: "center",
                  fontSize: 16,
                  color: set.isCompleted ? theme.secondaryText : theme.grayText,
                  width: "25%",
                }}
                value={drop.weight}
                onChangeText={(text) =>
                  handleDropUpdate(drop.id, { weight: text })
                }
                placeholder="0"
                placeholderTextColor={theme.grayText}
                keyboardType="numeric"
              />

              <TouchableOpacity
                onPress={() => handleRemoveDrop(drop.id)}
                style={{
                  width: "25%",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Ionicons
                  name={
                    set.isCompleted ? "remove-circle" : "remove-circle-outline"
                  }
                  size={22}
                  color={set.isCompleted ? theme.error : theme.grayText}
                />
              </TouchableOpacity>
            </View>
          ))}
      </View>
    </Swipeable>
  );
}

export function WorkoutScreenMockup() {
  const { theme, themeName } = useSettingsStore();
  const {
    activeSession,
    activeExercise,
    addSetToActiveExercise,
    setActiveExercise,
  } = useWorkoutStore();

  if (!activeSession) return <Text>No active session</Text>;

  if (!activeSession.layout.length)
    return <IButton title="Add Exercise" onPress={() => {}} />;

  // Select first exercise if none is active
  if (!activeExercise && activeSession.layout[0]) {
    const firstItem = activeSession.layout[0];
    const firstExerciseId =
      firstItem.type === "exercise"
        ? firstItem.exercise.id
        : firstItem.type === "superset" || firstItem.type === "circuit"
        ? firstItem.exercises[0]?.id
        : null;
    if (firstExerciseId) setActiveExercise(firstExerciseId);
  }

  if (!activeExercise) return <Text>No active exercise</Text>;

  const sets = activeExercise?.sets ?? [];

  const completedSets = sets.filter((s: Set) => s.isCompleted).length;
  const totalSets = sets.length;

  const handleAddSet = () => {
    console.log("handleAddSet");
    addSetToActiveExercise();
  };

  return (
    <View
      style={{
        flex: 1,
        height: HEIGHT - 162,
        position: "absolute",
        top: 0,
        width: "100%",
      }}
    >
      {/* Header */}
      <StrobeBlur
        colors={[theme.caka, theme.primaryBackground, theme.accent, theme.tint]}
        tint={
          ["light", "peachy", "oldschool"].includes(themeName)
            ? "light"
            : "dark"
        }
        style={{
          backgroundColor: theme.background,
          height: 188,
          width: "100%",
        }}
      >
        <LinearGradient
          colors={[
            theme.background,
            hexToRGBA(theme.background, 0),
            hexToRGBA(theme.background, 0),
          ]}
          start={{ x: 0, y: 0 }}
          end={{ x: 0, y: 1 }}
          style={{
            height: 188,
            width: "100%",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text
            style={{
              fontSize: 16,
              opacity: 0.7,
              color: completedSets === totalSets ? theme.tint : theme.grayText,
            }}
          >
            {completedSets} of {totalSets} sets completed
          </Text>
          <Text
            style={{
              fontSize: 56,
              fontWeight: "bold",
              color: theme.text,
            }}
            numberOfLines={1}
            adjustsFontSizeToFit
            minimumFontScale={0.6}
          >
            {activeExercise.name}
          </Text>
          <View
            style={{
              flexDirection: "row",
              position: "absolute",
              bottom: 16,
              left: 0,
              right: 0,
            }}
          >
            {["SET", "REPS", "KG", "DONE"].map((label) => (
              <Text
                key={label}
                style={{
                  fontSize: 16,
                  fontWeight: "bold",
                  flex: 1,
                  textAlign: "center",
                  color: theme.grayText,
                }}
              >
                {label}
              </Text>
            ))}
          </View>
        </LinearGradient>
      </StrobeBlur>

      {/* Sets Table */}
      <FlatList
        data={sets}
        keyExtractor={(item) => `${item.id}-${sets.length}`}
        renderItem={({ item, index }) => (
          <SetRow set={item} exercise={activeExercise} setIndex={index} />
        )}
        contentContainerStyle={{ paddingBottom: 96 }}
        showsVerticalScrollIndicator={false}
      />

      {/* Add Set Button */}
      <LinearGradient
        style={{
          padding: 16,
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
        }}
        colors={[theme.background, hexToRGBA(theme.background, 0)]}
        start={{ x: 0, y: 1 }}
        end={{ x: 0, y: 0 }}
      >
        <BounceButton
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            height: 64,
            borderRadius: 32,
          }}
          color={theme.tint}
          onPress={handleAddSet}
        >
          <Text
            style={{
              color: theme.secondaryText,
              fontSize: 24,
              fontWeight: "bold",
            }}
          >
            Add Set
          </Text>
        </BounceButton>
      </LinearGradient>
    </View>
  );
}
