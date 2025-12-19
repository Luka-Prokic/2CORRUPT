import Animated, { FadeIn, FadeOut } from "react-native-reanimated";
import { useSettingsStore } from "../../../../stores/settings";
import { Ionicons } from "@expo/vector-icons";

interface SplitFlashProps {
  noSplit: boolean;
}

export function SplitFlash({ noSplit }: SplitFlashProps) {
  const { theme } = useSettingsStore();

  return (
    <Animated.View entering={FadeIn} exiting={FadeOut}>
      <Ionicons
        name={noSplit ? "flash-outline" : "flash"}
        size={44}
        color={noSplit ? theme.info : theme.fifthBackground}
        style={{
          shadowColor: theme.fifthBackground,
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: noSplit ? 0 : 0.6,
          shadowRadius: 16,
          elevation: noSplit ? 0 : 10,
          zIndex: 1,
        }}
      />
      {noSplit && (
        <Ionicons
          name={"flash"}
          size={44}
          color={theme.info + "40"}
          style={{
            position: "absolute",
          }}
        />
      )}
    </Animated.View>
  );
}
