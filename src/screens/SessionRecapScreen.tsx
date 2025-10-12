import { SafeAreaView } from "react-native-safe-area-context";
import { useLocalSearchParams } from "expo-router";
import { useSettingsStore } from "../stores/settingsStore";
import { useWorkoutStore } from "../stores/workout/useWorkoutStore";
import { FlatList, Text } from "react-native";
import { useTranslation } from "react-i18next";
import { WorkoutHeader } from "../components/recap/workout/WorkoutHeader";
import { ExerciseRecap } from "../components/recap/workout/ExerciseRecap";
import { WorkoutFooter } from "../components/recap/workout/WorkoutFooter";

export function SessionRecapScreen() {
  const { theme } = useSettingsStore();
  const { completedSessions } = useWorkoutStore();
  const { t } = useTranslation();
  const { sessionId } = useLocalSearchParams();

  const session = completedSessions.find((s) => s.id === sessionId);

  if (!session) {
    return (
      <SafeAreaView
        style={{
          flex: 1,
          backgroundColor: theme.primaryBackground,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Text style={{ color: theme.text }}>
          {t("recap.session-not-found")}
        </Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: theme.primaryBackground }}>
      <FlatList
        data={session.layout}
        keyExtractor={(item) => item.id}
        ListHeaderComponent={<WorkoutHeader session={session} />}
        renderItem={({ item }) => <ExerciseRecap exercise={item} />}
        ListFooterComponent={<WorkoutFooter session={session} />}
      />
    </SafeAreaView>
  );
}
