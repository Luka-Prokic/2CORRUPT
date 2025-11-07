import { useSettingsStore } from "../../../stores/settings";
import { useWidgetUnit } from "../../../features/widgets/useWidgetUnit";
import { router } from "expo-router";
import { StrobeButton } from "../../ui/buttons/StrobeButton";
import { Text } from "react-native";
import { useWorkoutStore } from "../../../stores/workout";

export function NoSplitCard() {
  const { theme } = useSettingsStore();
  const { fullWidth, widgetUnit } = useWidgetUnit();
  const { activeSplitPlan } = useWorkoutStore();

  const isActive = activeSplitPlan?.id === "no-split";
  const textColor = isActive ? theme.background : theme.grayText;

  function handlePress() {
    router.push({
      pathname: "/splits/no-split",
    });
  }

  return (
    <StrobeButton
      onPress={handlePress}
      style={{
        height: widgetUnit,
        width: fullWidth,
        backgroundColor: isActive ? theme.thirdBackground : theme.handle,
        borderRadius: 32,
        borderColor: theme.border,
        borderWidth: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
      strobeDisabled={!isActive}
    >
      <Text
        style={{
          fontSize: 28,
          fontWeight: "bold",
          color: textColor,
        }}
        numberOfLines={2}
      >
        No Split
      </Text>
      <Text
        style={{
          fontSize: 13,
          color: textColor,
          opacity: 0.7,
          marginTop: 4,
        }}
      >
        Full-body split • 3 active days per week
      </Text>
      <Text
        style={{
          position: "absolute",
          bottom: 16,
          right: 16,
          fontSize: 16,
          fontWeight: "bold",
          color: textColor,
          alignSelf: "flex-end",
        }}
      >
        goal: 5
      </Text>
    </StrobeButton>
  );
}
