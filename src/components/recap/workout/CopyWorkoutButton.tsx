import { Ionicons } from "@expo/vector-icons";
import { useCopyWorkoutRecap } from "../../../features/workout/copyWorkoutRecap";
import { WorkoutSession } from "../../../stores/workout/types";
import { useSettingsStore } from "../../../stores/settingsStore";
import { BounceButton } from "../../ui/buttons/BounceButton";
import { useState } from "react";
import { TouchableOpacity } from "react-native";

interface CopyWorkoutButtonProps {
  session: WorkoutSession;
}

export function CopyWorkoutButton({ session }: CopyWorkoutButtonProps) {
  const { theme } = useSettingsStore();
  const { copyWorkoutRecap } = useCopyWorkoutRecap();
  const [clicked, setClicked] = useState<boolean>(false);

  if (!session) {
    return null;
  }

  function handlePress() {
    copyWorkoutRecap(session);
    setClicked(true);
    setTimeout(() => {
      setClicked(false);
    }, 500);
  }

  return (
    <TouchableOpacity
      onPress={handlePress}
      style={{ width: 44, height: 44, padding: 10 }}
      disabled={clicked}
    >
      {clicked ? (
        <Ionicons name="checkmark" size={24} color={theme.text} />
      ) : (
        <Ionicons name="copy-outline" size={24} color={theme.text} />
      )}
    </TouchableOpacity>
  );
}
