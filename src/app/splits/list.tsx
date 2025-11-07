import { Stack } from "expo-router";
import { Fragment } from "react";
import { ScreenContent } from "../../components/ui/utils/ScreenContent";
import { FlatList } from "react-native-gesture-handler";
import { useWorkoutStore } from "../../stores/workout";
import { BackgroundText } from "../../components/ui/misc/BackgroundText";
import { CreateSplitButton } from "../../components/splits/header/CreateSplitButton";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { SplitCard } from "../../components/splits/edit-split/SplitCard";
import { NoSplitCard } from "../../components/splits/edit-split/NoSplitCard";
import { useTranslation } from "react-i18next";
import { useWidgetUnit } from "../../features/widgets/useWidgetUnit";

export default function SplitListScreen() {
  const { splitPlans } = useWorkoutStore();
  const { t } = useTranslation();
  const insets = useSafeAreaInsets();
  const { fullWidth } = useWidgetUnit();

  function headerRight() {
    return <CreateSplitButton />;
  }

  return (
    <Fragment>
      <Stack.Screen
        options={{
          title: t("splits.title"),
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
            <BackgroundText
              style={{ textAlign: "justify", width: fullWidth }}
              text={t("splits.list-info")}
            />
          )}
        />
      </ScreenContent>
    </Fragment>
  );
}
