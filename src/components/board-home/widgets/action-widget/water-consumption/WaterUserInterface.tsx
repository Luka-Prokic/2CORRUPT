import { InfoText } from "../../../../ui/text/InfoText";
import { IText } from "../../../../ui/text/IText";
import { TouchableOpacity, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useSettingsStore } from "../../../../../stores/settingsStore";
import { useWidgetUnit } from "../../../../../features/widgets/useWidgetUnit";

interface WaterUserInterfaceProps {
  drinkAmount: number;
  setDrinkAmount: (amount: (prev: number) => number) => void;
  increment: number;
}

export function WaterUserInterface({
  drinkAmount,
  setDrinkAmount,
  increment,
}: WaterUserInterfaceProps) {
  const { theme } = useSettingsStore();
  const { widgetUnit } = useWidgetUnit();

  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
        gap: 8,
        height: widgetUnit - 32,
      }}
    >
      <IText
        text={`${(drinkAmount / 1000).toFixed(1)} L`}
        color={theme.border}
      />
      <TouchableOpacity
        onPress={() => {}} //TODO: Bottom Sheet
        style={{
          position: "absolute",
          right: 16,
          bottom: 0,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Ionicons name="ellipse" size={64} color={theme.background} />
        <Ionicons
          name="water-outline"
          size={32}
          color={theme.accent}
          style={{ position: "absolute" }}
        />
      </TouchableOpacity>
      <View style={{ flexDirection: "row" }}>
        <TouchableOpacity
          onPress={() =>
            setDrinkAmount((prev: number) =>
              prev - increment <= 0 ? 0 : prev - increment
            )
          }
          disabled={drinkAmount <= 0}
          style={{ opacity: drinkAmount <= 0 ? 0.4 : 1 }}
        >
          <Ionicons name="remove-circle" size={64} color={theme.background} />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setDrinkAmount((prev: number) => prev + increment)}
        >
          <Ionicons name="add-circle" size={64} color={theme.background} />
        </TouchableOpacity>
      </View>
      <InfoText text={`Increment by ${increment}ml`} color={theme.border} />
    </View>
  );
}
