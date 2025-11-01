import { Fragment } from "react";
import { ScreenContent } from "../components/ui/utils/ScreenContent";
import { Stack } from "expo-router";
import { SummarySection } from "../components/all-screen/SummarySection";
import { SplitsSection } from "../components/all-screen/SplitsSection";
import { TemplatesSection } from "../components/all-screen/TemplatesSection";
import { ExercisesSection } from "../components/all-screen/ExercisesSection";
import { View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function AllScreen() {
  const insets = useSafeAreaInsets();
  return (
    <Fragment>
      <Stack.Screen options={{}} />
      <ScreenContent>
        <View style={{ paddingVertical: 64 + insets.top }}>
          <SummarySection />
          <SplitsSection />
          <TemplatesSection />
          <ExercisesSection />
        </View>
      </ScreenContent>
    </Fragment>
  );
}
