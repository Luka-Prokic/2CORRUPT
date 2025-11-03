import { Stack } from "expo-router";
import { Fragment } from "react";
import { ScreenContent } from "../../components/ui/utils/ScreenContent";
import { FlatList } from "react-native-gesture-handler";
import { useWorkoutStore } from "../../stores/workout";
import { BackgroundText } from "../../components/ui/misc/BackgroundText";
import { CreateSplitButton } from "../../components/splits/header/CreateSplitButton";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { SplitCard } from "../../components/splits/cards/SplitCard";

import { NoSplitCard } from "../../components/splits/cards/NoSplitCard";

export default function TemplatesScreen() {
  const { splitPlans } = useWorkoutStore();
  const insets = useSafeAreaInsets();

  function headerLeft() {
    return null;
  }

  function headerRight() {
    return <CreateSplitButton />;
  }

  return (
    <Fragment>
      <Stack.Screen
        options={{
          title: "Splits",
          headerLeft: headerLeft,
          headerRight: headerRight,
        }}
      />
      <ScreenContent>
        <FlatList
          data={splitPlans}
          showsVerticalScrollIndicator={false}
          scrollEnabled={false}
          keyExtractor={(item, index) => `${item.createdAt}-${index}`}
          renderItem={({ item }) => <SplitCard split={item} />}
          contentContainerStyle={{
            gap: 8,
            paddingHorizontal: 16,
            marginTop: insets.top + 16,
          }}
          ListHeaderComponent={() => <NoSplitCard />}
          ListFooterComponent={() => (
            <BackgroundText text="Manage your workout splits here - organize and store all your training routines so you can switch between them easily. Each split represents a different plan or focus for your workouts, letting you vary your training while keeping everything tracked. One split is always active; if none is selected, the default “No Split” will be used automatically." />
          )}
        />
      </ScreenContent>
    </Fragment>
  );
}
