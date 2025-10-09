import { router } from "expo-router";
import { IButton } from "../ui/buttons/IButton";

export function NoExerciseView() {
  return (
    <IButton
      title="Add Exercise"
      onPress={() => {
        router.push("/add-exercise");
      }}
    />
  );
}
