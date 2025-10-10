import { View, Text } from "react-native";
import { useSettingsStore } from "../../../../stores/settingsStore";

export function SetIndex({ setIndex }: { setIndex: number }) {
  const { theme } = useSettingsStore();
  return (
    <View
      style={{
        width: 44,
        height: 44,
        borderRadius: 22,
        backgroundColor: theme.secondaryBackground,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text
        style={{
          fontSize: 16,
          fontWeight: "bold",
          color: theme.text,
        }}
      >
        {setIndex + 1}
      </Text>
    </View>
  );
}
