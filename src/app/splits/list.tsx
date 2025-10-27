import { router, Stack } from "expo-router";
import { Fragment } from "react";
import { ScreenContent } from "../../components/ui/utils/ScreenContent";
import { FlatList } from "react-native-gesture-handler";
import { EmptyHeader } from "../../components/ui/containers/EmptyHeader";
import { EmptyFooter } from "../../components/ui/containers/EmptyFooter";
import { useWorkoutStore } from "../../stores/workout";
import { Text } from "react-native";
import { ModalExitButton } from "../_layout";
import { useSettingsStore } from "../../stores/settings";
import { BounceButton } from "../../components/ui/buttons/BounceButton";
import { WIDTH } from "../../features/Dimensions";

export default function TemplatesScreen() {
  const { splitPlans } = useWorkoutStore();
  const { theme } = useSettingsStore();

  function headerLeft() {
    return null;
  }

  function headerTitle() {
    return null;
  }
  function headerRight() {
    return null;
  }

  return (
    <Fragment>
      <Stack.Screen
        options={{
          headerLeft: headerLeft,
          headerTitle: headerTitle,
          headerRight: headerRight,
        }}
      />
      <ScreenContent edges={["top"]} scroll={false}>
        <Text style={{ color: theme.text, fontSize: 36 }}>Split List</Text>
        <BounceButton
          title="split 1"
          onPress={() => router.push("/splits/edit")}
          style={{ height: 64, width: WIDTH }}
        />
        <FlatList
          data={splitPlans}
          keyExtractor={(item, index) => `${item.createdAt}-${index}`}
          renderItem={({ item }) => <Text>{item.name}</Text>}
          ListHeaderComponent={() => <EmptyHeader />}
          ListFooterComponent={() => <EmptyFooter />}
        />
      </ScreenContent>
    </Fragment>
  );
}
