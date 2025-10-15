import { View, Text } from "react-native";
import { useSettingsStore } from "../../../../../stores/settings";
import { Ionicons } from "@expo/vector-icons";
import { hexToRGBA } from "../../../../../features/HEXtoRGB";
import { WorkoutSession } from "../../../../../stores/workout";
import { router } from "expo-router";
import { StrobeButton } from "../../../../ui/buttons/StrobeButton";

interface WorkoutInDayCardProps {
  session: WorkoutSession;
}

export function WorkoutInDayCard({ session }: WorkoutInDayCardProps) {
  const { theme } = useSettingsStore();
  const exerciseCount = session.layout?.length || 0;

  function handlePress() {
    router.push({
      pathname: "/recap/[sessionId]",
      params: { sessionId: session.id },
    });
  }

  return (
    <StrobeButton
      onPress={handlePress}
      style={{
        padding: 16,
        borderRadius: 24,
        borderWidth: 1,
        borderColor: theme.border,
        height: 64,
      }}
      strobeDisabled={exerciseCount === 0}
    >
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          padding: 8,
        }}
      >
        <View
          style={{
            width: 48,
            height: 48,
            borderRadius: 24,
            backgroundColor: hexToRGBA(theme.handle, 0.8),
            justifyContent: "center",
            alignItems: "center",
            marginRight: 12,
          }}
        >
          <Ionicons name="barbell" size={32} color={theme.accent} />
        </View>
        <View style={{ flex: 1 }}>
          <Text
            style={{
              fontSize: 16,
              fontWeight: "bold",
              marginBottom: 4,
              color: theme.text,
            }}
          >
            {session.name}
          </Text>
          <Text
            style={{
              fontSize: 12,
              marginTop: 2,
              opacity: 0.7,
              color: theme.grayText,
            }}
          >
            {exerciseCount} exercises
          </Text>
        </View>
      </View>

      {session.notes && (
        <Text
          style={{
            fontSize: 12,
            marginTop: 8,
            lineHeight: 16,
            opacity: 0.7,
            color: theme.grayText,
          }}
        >
          {session.notes}
        </Text>
      )}
    </StrobeButton>
  );
}
