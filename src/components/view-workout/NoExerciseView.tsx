import { router } from "expo-router";
import { IButton } from "../ui/buttons/IButton";
import { useSettingsStore } from "../../stores/settings";

export function NoExerciseView() {
  const { theme } = useSettingsStore();
  return (
    <IButton
      title="Add Exercise"
      onPress={() => {
        router.push("/add-exercise");
      }}
      textColor={theme.text}
    />
  );
}
