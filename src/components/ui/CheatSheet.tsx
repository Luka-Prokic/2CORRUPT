import { ViewStyle } from "react-native";
import { InfoText } from "./text/InfoText";
import { useSettingsStore } from "../../stores/settingsStore";
import { WIDTH } from "../../utils/Dimensions";
import { DescriptionText } from "./text/DescriptionText";
import Animated, { FadeIn } from "react-native-reanimated";

interface CheatSheetProps {
  title: string;
  items: string[];
  description?: string;
  useBullets?: boolean;
  style?: ViewStyle | ViewStyle[];
  fadeIn?: boolean;
}

export function CheatSheet({
  title,
  items,
  description,
  useBullets = false,
  style,
  fadeIn = false,
}: CheatSheetProps) {
  const { theme } = useSettingsStore();

  return (
    <Animated.View
      entering={fadeIn ? FadeIn : undefined}
      style={{
        width: WIDTH - 32,
        backgroundColor: theme.input,
        gap: 8,
        borderWidth: 1,
        borderColor: theme.border,
        borderRadius: 32,
        alignItems: "flex-start",
        marginBottom: 16,
        padding: 16,
        ...style,
      }}
    >
      {title && <DescriptionText text={title} style={{ marginBottom: 8 }} />}

      {items &&
        items.map((item: string, index: number) => (
          <InfoText key={index} text={useBullets ? "• " + item : item} />
        ))}

      {description && <DescriptionText text={description} />}
    </Animated.View>
  );
}
