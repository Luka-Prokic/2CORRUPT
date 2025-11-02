import { SplitPlan } from "../../stores/workout";
import { Text, TouchableOpacity } from "react-native";
import { useSettingsStore } from "../../stores/settingsStore";
import { useWidgetUnit } from "../../features/widgets/useWidgetUnit";
import { router } from "expo-router";

interface SplitCardProps {
  split: SplitPlan;
}

export function SplitCard({ split }: SplitCardProps) {
  const { theme } = useSettingsStore();
  const { widgetUnit, fullWidth } = useWidgetUnit();

  function handlePress() {
    router.push({
      pathname: "/splits/[splitId]",
      params: { splitId: `${split.id}` },
    });
  }

  return (
    <TouchableOpacity
      style={{
        height: widgetUnit,
        width: fullWidth,
        backgroundColor: theme.primaryBackground,
        borderRadius: 32,
        borderColor: theme.border,
        borderWidth: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
      onPress={handlePress}
      activeOpacity={0.7}
    >
      <Text
        style={{
          fontSize: 28,
          fontWeight: "bold",
          color: theme.text,
        }}
        numberOfLines={2}
      >
        {split.name}
      </Text>

      <Text
        style={{
          position: "absolute",
          bottom: 16,
          right: 16,
          fontSize: 16,
          fontWeight: "bold",
          color: theme.info,
          alignSelf: "flex-end",
        }}
      >
        {split.split?.length} days split
      </Text>
    </TouchableOpacity>
  );
}
