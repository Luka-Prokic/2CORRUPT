import { FlatList, Text, View } from "react-native";
import { WorkoutSession } from "../../../stores/workout";
import { WorkoutHeader } from "./WorkoutHeader";
import { ExerciseRecap } from "./ExerciseRecap";
import { WorkoutFooter } from "./WorkoutFooter";
import { useSettingsStore } from "../../../stores/settings";
import { useTranslation } from "react-i18next";
import { useSafeAreaInsets } from "react-native-safe-area-context";
interface WorkoutRecapProps {
  session: WorkoutSession;
}

export function WorkoutRecap({ session }: WorkoutRecapProps) {
  const { theme } = useSettingsStore();
  const { t } = useTranslation();
  const inserts = useSafeAreaInsets();

  if (!session)
    return (
      <View
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
      </View>
    );

  return (
    <FlatList
      data={session.layout}
      keyExtractor={(item) => item.id}
      ListHeaderComponent={<WorkoutHeader session={session} />}
      renderItem={({ item }) => <ExerciseRecap exercise={item} />}
      ListFooterComponent={<WorkoutFooter session={session} />}
      contentContainerStyle={{ paddingTop: inserts.top }}
    />
  );
}
