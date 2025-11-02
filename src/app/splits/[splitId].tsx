import { Stack, useLocalSearchParams } from "expo-router";
import { Fragment, useState } from "react";
import { ScreenContent } from "../../components/ui/utils/ScreenContent";
import { Text } from "react-native";
import { useSettingsStore } from "../../stores/settings";
import { useWorkoutStore } from "../../stores/workout";
import { DeleteSplitButton } from "../../components/splits/header/DeleteSplitButton";
import { CardSlider } from "../../components/ui/CardSlider";
import { SplitDayCard } from "../../components/splits/SplitDayCard";
import { useWidgetUnit } from "../../features/widgets/useWidgetUnit";
import { FlatList } from "react-native-gesture-handler";
import { View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { AddSplitDayCard } from "../../components/splits/AddSplitDayCard";

export default function TemplatesScreen() {
  const { theme } = useSettingsStore();
  const { splitId } = useLocalSearchParams<{ splitId: string }>();
  const { getSplitById } = useWorkoutStore();
  const insets = useSafeAreaInsets();

  const { fullWidth } = useWidgetUnit();

  const [isListView, setIsListView] = useState(false);

  const split = getSplitById(splitId);
  if (!split) return null;

  function headerLeft() {
    return null;
  }

  function headerRight() {
    return (
      <Fragment>
        <Text
          style={{ color: theme.tint, fontSize: 16, marginRight: 8 }}
          onPress={() => setIsListView(!isListView)}
        >
          {isListView ? "Cards" : "List"}
        </Text>
        <DeleteSplitButton split={split} />
      </Fragment>
    );
  }

  function addDayCard() {
    return (
      <AddSplitDayCard
        split={split}
        style={{ height: fullWidth, width: fullWidth }}
      />
    );
  }

  return (
    <Fragment>
      <Stack.Screen
        options={{
          title: `${split.name}`,
          headerLeft: headerLeft,
          headerRight: headerRight,
        }}
      />
      <ScreenContent>
        <View
          style={{
            marginTop: insets.top + 16,
            alignItems: "center",
          }}
        >
          {isListView ? (
            <FlatList
              data={split.split}
              scrollEnabled={false}
              keyExtractor={(item, index) => `${item}-${index}`}
              renderItem={({ item, index }) => (
                <SplitDayCard
                  split={split}
                  day={item}
                  style={{ height: fullWidth, width: fullWidth }}
                  index={index}
                />
              )}
              ListFooterComponent={addDayCard}
              contentContainerStyle={{ gap: 8 }}
            />
          ) : (
            <CardSlider
              data={split.split}
              card={({ item, index }) => (
                <SplitDayCard split={split} day={item} index={index} />
              )}
              cardWidth={fullWidth}
              cardHeight={fullWidth}
              showDots={true}
              styleSlider={{ width: fullWidth }}
              styleDots={{
                width: fullWidth,
                justifyContent: "center",
                alignItems: "center",
              }}
              ListFooterComponent={addDayCard}
            />
          )}
        </View>
      </ScreenContent>
    </Fragment>
  );
}
