import { StrobeButton } from "../../ui/buttons/StrobeButton";
import { useSettingsStore } from "../../../stores/settingsStore";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";

interface EmptyDayCardProps {
  splitId: string;
  width: number;
  height: number;
}

export function EmptyDayCard({ splitId, width, height }: EmptyDayCardProps) {
  const { theme } = useSettingsStore();

  function handlePress() {
    router.push({
      pathname: "/splits/[splitId]/edit",
      params: { splitId: `${splitId}` },
    });
  }

  return (
    <StrobeButton
      onPress={handlePress}
      style={{
        height: height,
        width: width,
        backgroundColor: theme.thirdBackground,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 32,
        borderWidth: 1,
        borderColor: theme.thirdBackground,
      }}
    >
      <Ionicons name="chevron-forward" size={34} color={theme.text} />
    </StrobeButton>
  );
}
