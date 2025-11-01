import { router, Stack } from "expo-router";
import { Fragment } from "react";
import { ScreenContent } from "../../components/ui/utils/ScreenContent";
import { FlatList } from "react-native-gesture-handler";
import { EmptyHeader } from "../../components/ui/containers/EmptyHeader";
import { EmptyFooter } from "../../components/ui/containers/EmptyFooter";
import { useWorkoutStore } from "../../stores/workout";
import { Text } from "react-native";
import { useSettingsStore } from "../../stores/settings";
import { BounceButton } from "../../components/ui/buttons/BounceButton";
import { WIDTH } from "../../features/Dimensions";
import { Container } from "../../components/ui/containers/Container";
import { BackgroundText } from "../../components/ui/misc/BackgroundText";

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
        <Container>
          <BackgroundText text="Manage your workout splits here - organize and store all your training routines so you can switch between them easily. Each split represents a different plan or focus for your workouts, letting you vary your training while keeping everything tracked. One split is always active; if none is selected, the default “No Split” will be used automatically." />

          <Text style={{ color: theme.text, fontSize: 36 }}>Split List</Text>
          <BounceButton
            title="split 1"
            onPress={() =>
              router.push({
                pathname: "/splits/[splitId]",
                params: { splitId: "no-split" },
              })
            }
            style={{ height: 64, width: WIDTH }}
          />
          <FlatList
            data={splitPlans}
            keyExtractor={(item, index) => `${item.createdAt}-${index}`}
            renderItem={({ item }) => <Text>{item.name}</Text>}
            ListHeaderComponent={() => <EmptyHeader />}
            ListFooterComponent={() => <EmptyFooter />}
          />
        </Container>
      </ScreenContent>
    </Fragment>
  );
}
