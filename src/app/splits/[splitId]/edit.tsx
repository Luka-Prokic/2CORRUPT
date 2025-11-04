import { Stack, useLocalSearchParams } from "expo-router";
import { Fragment, useState } from "react";
import { ScreenContent } from "../../../components/ui/utils/ScreenContent";
import { useSettingsStore } from "../../../stores/settings";
import { useWorkoutStore } from "../../../stores/workout";
import { TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { SplitDayList } from "../../../components/splits/SplitDayList";
import { SplitHeader } from "../../../components/splits/SplitHeader";
import { ScreenView } from "../../../components/ui/containers/ScreenView";
import { SplitFooter } from "../../../components/splits/SplitFooter";
import { EmptyFooter } from "../../../components/ui/containers/EmptyFooter";

export default function SplitEditScreen() {
  const { theme } = useSettingsStore();
  const { splitId } = useLocalSearchParams<{ splitId: string }>();
  const { getSplitById } = useWorkoutStore();

  const [isGridView, setIsGridView] = useState(false);

  const split = getSplitById(splitId);
  if (!split) return null;

  function headerRight() {
    return (
      <TouchableOpacity
        onPress={() => setIsGridView(!isGridView)}
        style={{ padding: 8 }}
      >
        <Ionicons
          name={isGridView ? "square-outline" : "grid-outline"}
          size={20}
          color={theme.info}
        />
      </TouchableOpacity>
    );
  }

  return (
    <Fragment>
      <Stack.Screen
        options={{
          title: `${split.name}`,
          headerRight: headerRight,
        }}
      />
      <ScreenContent>
        <ScreenView>
          <SplitHeader split={split} />
          <SplitDayList split={split} isGridView={isGridView} />
          <SplitFooter split={split} />
          <EmptyFooter />
        </ScreenView>
      </ScreenContent>
    </Fragment>
  );
}
