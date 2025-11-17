import { View, Text } from "react-native";
import { useSettingsStore } from "../../../../stores/settingsStore";
import { Ionicons } from "@expo/vector-icons";

interface SetIndexProps {
  setIndex: number;
  disabled?: boolean;
}

export function SetIndex({ setIndex, disabled }: SetIndexProps) {
  const { theme } = useSettingsStore();

  return (
    <View
      style={{
        width: 44,
        height: 44,
        borderRadius: 22,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Ionicons
        name="ellipse"
        color={disabled ? theme.handle : theme.background}
        size={44}
        style={{ position: "absolute" }}
      />
      <Text
        style={{
          fontSize: 16,
          fontWeight: "bold",
          color: theme.info,
        }}
      >
        {setIndex + 1}
      </Text>
    </View>
  );
}
