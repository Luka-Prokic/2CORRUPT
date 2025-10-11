import { SafeAreaView } from "react-native-safe-area-context";
import { useLocalSearchParams } from "expo-router";
import { useSettingsStore } from "../stores/settingsStore";
import { useWorkoutStore } from "../stores/workout/useWorkoutStore";
import { FlatList, Text, View } from "react-native";
import { SessionExercise, DropSet, Set } from "../stores/workout/types";
import { useTranslation } from "react-i18next";
import { DashLine } from "../components/ui/misc/DashLine";

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
        ListHeaderComponent={<SessionHeader session={session} />}
        renderItem={({ item }) => <ExerciseItem exercise={item} />}
      />
    </SafeAreaView>
  );
}

function SessionHeader({ session }: { session: any }) {
    const { theme } = useSettingsStore();
    return (
      <View style={{ padding: 16 }}>
        <Text style={{ fontSize: 16, fontWeight: "bold", color: theme.text }}>
          {session.totals?.totalSets} sets | {session.totals?.totalReps} reps | {session.totals?.totalVolumeKg} kg
        </Text>
  
        <Text
          style={{
            fontSize: 18,
            fontWeight: "bold",
            color: theme.text,
            marginTop: 16,
            marginBottom: 8,
          }}
        >
          Exercises
        </Text>
  
        <DashLine />
      </View>
    );
  }
  
  function ExerciseItem({ exercise }: { exercise: SessionExercise }) {
    const { theme } = useSettingsStore();
    return (
      <View style={{ paddingHorizontal: 16, marginBottom: 16 }}>
        <Text
          style={{
            fontSize: 16,
            fontWeight: "600",
            color: theme.text,
            fontFamily: "monospace",
          }}
        >
          {exercise.prefix ?? ""}{exercise.name}
        </Text>
  
        {exercise.sets.map((set: Set, index: number) => (
          <View key={`${exercise.id}-${set.id}`} style={{ marginLeft: 8, marginTop: 4 }}>
            <Text
              style={{
                fontSize: 14,
                color: theme.text,
                fontFamily: "monospace",
              }}
            >
              {index + 1}. {set.reps} x {set.weight} | {set.rpe} | {set.rir}
            </Text>
  
            {set.dropSets?.map((dropSet: DropSet, dropIndex: number) => (
              <Text
                key={`${exercise.id}-${dropSet.id}-${dropIndex}`}
                style={{
                  fontSize: 12,
                  color: theme.grayText,
                  marginLeft: 12,
                  fontFamily: "monospace",
                }}
              >
                {dropIndex + 1}' {dropSet.reps} x {dropSet.weight}
              </Text>
            ))}
          </View>
        ))}
  
        <DashLine />
      </View>
    );
  }
  