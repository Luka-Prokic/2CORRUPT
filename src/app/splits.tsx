import { Stack } from "expo-router";
import { Fragment } from "react";
import { ScreenContent } from "../components/ui/utils/ScreenContent";
import { FlatList } from "react-native-gesture-handler";
import { EmptyHeader } from "../components/ui/containers/EmptyHeader";
import { EmptyFooter } from "../components/ui/containers/EmptyFooter";
import { useWorkoutStore } from "../stores/workout";
import { Text } from "react-native";

export default function TemplatesScreen() {
  const { splitPlans } = useWorkoutStore();

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
