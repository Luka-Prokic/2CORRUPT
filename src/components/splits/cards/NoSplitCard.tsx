import { useSettingsStore } from "../../../stores/settings";
import { useWidgetUnit } from "../../../features/widgets/useWidgetUnit";
import { router } from "expo-router";
import { StrobeButton } from "../../ui/buttons/StrobeButton";
import { Text } from "react-native";

export function NoSplitCard() {
  const { theme } = useSettingsStore();
  const { fullWidth, widgetUnit } = useWidgetUnit();

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
        backgroundColor: theme.thirdBackground,
        borderRadius: 32,
        borderColor: theme.border,
        borderWidth: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
      activeOpacity={0.7}
    >
      <Text
        style={{
          fontSize: 28,
          fontWeight: "bold",
          color: theme.background,
        }}
        numberOfLines={2}
      >
        No Split
      </Text>
      <Text
        style={{
          position: "absolute",
          bottom: 16,
          right: 16,
          fontSize: 16,
          fontWeight: "bold",
          color: theme.background,
          alignSelf: "flex-end",
        }}
      >
        goal: 5
      </Text>
    </StrobeButton>
  );
}
