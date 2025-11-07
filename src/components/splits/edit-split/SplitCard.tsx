import { SplitPlan, useWorkoutStore } from "../../../stores/workout";
import { Text, View, Switch } from "react-native";
import { useSettingsStore } from "../../../stores/settings";
import { useWidgetUnit } from "../../../features/widgets/useWidgetUnit";
import { router } from "expo-router";
import { StrobeButton } from "../../ui/buttons/StrobeButton";
interface SplitCardProps {
  split: SplitPlan;
}

export function SplitCard({ split }: SplitCardProps) {
  const { theme } = useSettingsStore();
  const { widgetUnit, fullWidth } = useWidgetUnit();
  const { activeSplitPlan, setActiveSplitPlan, endActiveSplitPlan } =
    useWorkoutStore();

  const isActive = activeSplitPlan?.id === split.id;

  const toggleActive = () => {
    if (isActive) {
      endActiveSplitPlan(); // sets "no-split" as active
    } else {
      setActiveSplitPlan(split);
    }
  };

  function handlePress() {
    router.push({
      pathname: "/splits/[splitId]/edit",
      params: { splitId: `${split.id}` },
    });
  }

  return (
    <StrobeButton
      style={{
        height: widgetUnit,
        width: fullWidth,
        backgroundColor: isActive
          ? theme.thirdBackground
          : theme.secondaryBackground,
        borderRadius: 32,
        borderColor: theme.border,
        borderWidth: 1,
      }}
      contentContainerStyle={{
        justifyContent: "center",
        alignItems: "center",
        padding: 16,
      }}
      onPress={handlePress}
      strobeDisabled={!isActive}
    >
      <View style={{ alignItems: "center" }}>
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
            fontSize: 13,
            color: theme.grayText,
            marginTop: 4,
          }}
        >
          {split.activeLength} active days out of {split.splitLength} total
        </Text>
      </View>

      <Switch
        value={isActive}
        onValueChange={toggleActive}
        trackColor={{
          false: theme.handle,
          true: theme.tint,
        }}
        thumbColor={theme.background}
        style={{ position: "absolute", top: 16, right: 16 }}
      />
    </StrobeButton>
  );
}
