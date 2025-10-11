import { Text, View } from "react-native";
import { HEIGHT, WIDTH } from "../../features/Dimensions";
import { useSettingsStore } from "../../stores/settingsStore";
import { useWorkoutStore } from "../../stores/workout/useWorkoutStore";
import { ExerciseName } from "./../view-workout/table/header/ExerciseName";
import { StrobeBlur } from "../ui/misc/StrobeBlur";
import { BounceButton } from "../ui/buttons/BounceButton";

interface RestTimerSheetProps {
  listOpen: boolean;
  togglePanel: () => void;
}

export function RestTimerSheet({ listOpen, togglePanel }: RestTimerSheetProps) {
  const { theme } = useSettingsStore();
  const { activeExercise, updateActiveExercise } = useWorkoutStore();
  const restTime = activeExercise?.restTime ?? 180;

  const minutes = String(Math.floor(restTime / 60));
  const seconds = String(restTime % 60).padStart(2, "0");

  function handleChangeRestTime(value: number) {
    updateActiveExercise({ restTime: restTime + value });
  }
  return (
    <View
      style={{
        width: WIDTH,
        height: HEIGHT - 200,
        padding: 16,
        paddingTop: 88,
        gap: 8,
        alignItems: "center",
      }}
    >
      <ExerciseName exercise={activeExercise} textColor={theme.accent} />
      <Text style={{ fontSize: 24, color: theme.grayText }}>Rest Time</Text>

      <Text style={{ fontSize: 52, fontWeight: "bold", color: theme.text }}>
        {minutes}min {seconds}s
      </Text>

      <View
        style={{
          width: WIDTH - 32,
          height: 68,
          paddingVertical: 2,
          flexDirection: "row",
          gap: 8,
          marginTop: 24,
        }}
      >
        {["-15", "+15"].map((label: string, index: number) => (
          <BounceButton
            key={index}
            style={{
              width: WIDTH / 2 - 20,
              height: 64,
              backgroundColor: theme.handle,
              borderTopLeftRadius: index === 0 ? 32 : 8,
              borderBottomLeftRadius: index === 0 ? 32 : 8,
              borderTopRightRadius: index === 1 ? 32 : 8,
              borderBottomRightRadius: index === 1 ? 32 : 8,
              overflow: "hidden",
            }}
            onPress={() => handleChangeRestTime(label === "-15" ? -15 : 15)}
          >
            <StrobeBlur
              colors={[
                theme.caka,
                theme.primaryBackground,
                theme.accent,
                theme.tint,
              ]}
              tint="light"
              style={{
                width: WIDTH / 2 - 20,
                height: 64,
              }}
            >
              <Text
                style={{ fontSize: 24, fontWeight: "bold", color: theme.text }}
              >
                {label}
              </Text>
            </StrobeBlur>
          </BounceButton>
        ))}
      </View>
    </View>
  );
}
