import { Text, View } from "react-native";

interface ExerciseNameSheetProps {
  listOpen: boolean;
  togglePanel: () => void;
}

export function ExerciseNameSheet({
  listOpen,
  togglePanel,
}: ExerciseNameSheetProps) {
  return (
    <View>
      <Text>Exercise Name Sheet</Text>
    </View>
  );
}
