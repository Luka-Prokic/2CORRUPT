import { View } from "react-native";
import { useSettingsStore } from "../stores/settingsStore";
import { WorkoutView } from "../components/view-workout/WorkoutView";
import { SafeAreaView } from "react-native-safe-area-context";
import { HomeView } from "../components/view-home/HomeView";
import { CorruptButton } from "../components/corrupt/CorruptButton";
import { TemplateView } from "../components/view-template/TemplateView";

export function HomeScreen() {
  const { theme } = useSettingsStore();

  return (
    <SafeAreaView style={{ backgroundColor: theme.background, flex: 1 }}>
      <View style={{ flex: 1, position: "relative" }}>
        <CorruptButton />
        <HomeView />
        <WorkoutView />
        <TemplateView />
      </View>
    </SafeAreaView>
  );
}
