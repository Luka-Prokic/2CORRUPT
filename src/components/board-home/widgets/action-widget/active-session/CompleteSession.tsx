import { View } from "react-native";
import { WorkoutBoardHeaderRight } from "../../../../board-workout/header/WorkoutBoardHeaderRight";

export function CompleteSession() {
  return (
    <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
      <WorkoutBoardHeaderRight />
    </View>
  );
}
