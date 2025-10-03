import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  FlatList,
  Alert,
  Dimensions,
} from "react-native";
import { Swipeable } from "react-native-gesture-handler";
import { useSettingsStore } from "../../../stores/settingsStore";
import { Ionicons } from "@expo/vector-icons";
import StrobeBlur from "../../ui/misc/StrobeBlur";
import BounceButton from "../../ui/buttons/BounceButton";
import { LinearGradient } from "expo-linear-gradient";
import hexToRGBA from "../../../features/HEXtoRGB";

// Types for dummy data
interface DummySet {
  id: string;
  setNumber: number;
  reps: string;
  weight: string;
  isCompleted: boolean;
  isDropSet?: boolean;
}

interface SetRowProps {
  set: DummySet;
  onUpdateSet: (setId: string, updates: Partial<DummySet>) => void;
  onRemoveSet: (setId: string) => void;
  onAddDropSet: (setId: string) => void;
  onUncheck: (setId: string) => void;
}

const HEIGHT = Dimensions.get("window").height;

// Individual Set Row Component
const SetRow: React.FC<SetRowProps> = ({
  set,
  onUpdateSet,
  onRemoveSet,
  onAddDropSet,
  onUncheck,
}) => {
  const { theme, themeName } = useSettingsStore();

  const handleToggleComplete = () => {
    onUpdateSet(set.id, { isCompleted: !set.isCompleted });
  };

  const renderRightActions = () => (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
      }}
    >
      {set.isCompleted && (
        <TouchableOpacity
          style={{
            height: 66,
            alignItems: "center",
            justifyContent: "center",
            minWidth: 80,
            backgroundColor: theme.secondaryText,
          }}
          onPress={() => onUncheck(set.id)}
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
        onPress={() => onAddDropSet(set.id)}
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
        onPress={() => onRemoveSet(set.id)}
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
    <Swipeable renderRightActions={renderRightActions}>
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
        style={{
          flexDirection: "row",
          width: "100%",
          height: 66,
        }}
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
                {set.isDropSet ? "D" : set.setNumber}
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
              onChangeText={(text) => onUpdateSet(set.id, { reps: text })}
              placeholder="Reps"
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
              onChangeText={(text) => onUpdateSet(set.id, { weight: text })}
              placeholder="Weight"
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
    </Swipeable>
  );
};

// Main Workout Screen Mockup Component
const WorkoutScreenMockup: React.FC = () => {
  const { theme, themeName } = useSettingsStore();
  const [sets, setSets] = useState<DummySet[]>([
    { id: "1", setNumber: 1, reps: "10", weight: "135", isCompleted: false },
    { id: "2", setNumber: 2, reps: "8", weight: "145", isCompleted: true },
    { id: "3", setNumber: 3, reps: "6", weight: "155", isCompleted: false },
    { id: "4", setNumber: 4, reps: "4", weight: "165", isCompleted: false },
  ]);
  const [isEditMode, setIsEditMode] = useState(false);

  const updateSet = (setId: string, updates: Partial<DummySet>) => {
    setSets((prevSets) =>
      prevSets.map((set) => (set.id === setId ? { ...set, ...updates } : set))
    );
  };

  const removeSet = (setId: string) => {
    setSets((prevSets) => prevSets.filter((set) => set.id !== setId));
  };

  const addDropSet = (setId: string) => {
    const baseSet = sets.find((set) => set.id === setId);
    if (baseSet) {
      const newDropSet: DummySet = {
        id: `${setId}-drop-${Date.now()}`,
        setNumber: baseSet.setNumber,
        reps: Math.max(1, parseInt(baseSet.reps) - 2).toString(),
        weight: Math.max(45, parseInt(baseSet.weight) - 10).toString(),
        isCompleted: false,
        isDropSet: true,
      };
      setSets((prevSets) => [...prevSets, newDropSet]);
    }
  };

  const uncheckSet = (setId: string) => {
    updateSet(setId, { isCompleted: false });
  };

  const addSet = () => {
    const nextSetNumber = Math.max(...sets.map((s) => s.setNumber)) + 1;
    const newSet: DummySet = {
      id: `set-${Date.now()}`,
      setNumber: nextSetNumber,
      reps: "10",
      weight: "135",
      isCompleted: false,
    };
    setSets((prevSets) => [...prevSets, newSet]);
  };

  const completedSets = sets.filter((set) => set.isCompleted).length;
  const totalSets = sets.length;

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
          >
            Bench Press
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
            <Text
              style={{
                fontSize: 16,
                fontWeight: "bold",
                flex: 1,
                textAlign: "center",
                color: theme.grayText,
              }}
            >
              SET
            </Text>
            <Text
              style={{
                fontSize: 16,
                fontWeight: "bold",
                flex: 1,
                textAlign: "center",
                color: theme.grayText,
              }}
            >
              REPS
            </Text>
            <Text
              style={{
                fontSize: 16,
                fontWeight: "bold",
                flex: 1,
                textAlign: "center",
                color: theme.grayText,
              }}
            >
              KG
            </Text>
            <Text
              style={{
                fontSize: 16,
                fontWeight: "bold",
                flex: 1,
                textAlign: "center",
                color: theme.grayText,
              }}
            >
              DONE
            </Text>
          </View>
        </LinearGradient>
      </StrobeBlur>

      {/* Sets Table */}
      <View
        style={{
          flex: 1,
        }}
      >
        <FlatList
          data={sets}
          keyExtractor={(item: any) => item.id}
          renderItem={({ item }) => (
            <SetRow
              set={item}
              onUpdateSet={updateSet}
              onRemoveSet={removeSet}
              onAddDropSet={addDropSet}
              onUncheck={uncheckSet}
            />
          )}
          style={{
            flex: 1,
          }}
          contentContainerStyle={{
            paddingBottom: 96,
          }}
          showsVerticalScrollIndicator={false}
        />
      </View>
      {/* Add Set Button */}
      <LinearGradient
        style={{
          padding: 16,
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
        }}
        colors={[
          hexToRGBA(theme.background, 1),
          hexToRGBA(theme.background, 0),
        ]}
        start={{ x: 0, y: 1 }}
        end={{ x: 0, y: 0 }}
      >
        <BounceButton
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            height: 64,
            borderRadius: 33,
          }}
          color={theme.tint}
          onPress={addSet}
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
};

export default WorkoutScreenMockup;
