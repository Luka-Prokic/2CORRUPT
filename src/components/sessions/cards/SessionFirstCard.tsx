import { View, Text, ViewStyle } from "react-native";
import { useSettingsStore } from "../../../stores/settings";
import { WIDTH } from "../../../features/Dimensions";
import { WorkoutSession } from "../../../stores/workout";
import { hexToRGBA } from "../../../features/HEXtoRGB";
import { SessionNameInput } from "../../board-workout/sheets/session/SessionNameInput";

interface SessionFirstCardProps {
  session: WorkoutSession;
  cardStyle?: ViewStyle | ViewStyle[];
}

export function SessionFirstCard({
  session,
  cardStyle,
}: SessionFirstCardProps) {
  const { theme } = useSettingsStore();

  return (
    <View
      style={{
        width: WIDTH - 32,
        height: "100%",
        borderRadius: 32,
        overflow: "hidden",
        backgroundColor: hexToRGBA(theme.thirdBackground, 0.6),
        ...cardStyle,
      }}
    >
      <SessionNameInput
        session={session}
        styleView={{ marginVertical: 16 }}
        disabled
      />
      {session.notes && (
        <Text
          style={{
            color: theme.info,
            fontSize: 16,
            fontWeight: "500",
            marginBottom: 16,
            textAlign: "center",
          }}
        >
          {session.notes}
        </Text>
      )}
    </View>
  );
}
