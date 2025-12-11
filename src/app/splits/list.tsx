import { Stack } from "expo-router";
import { Fragment } from "react";
import { ScreenContent } from "../../components/ui/utils/ScreenContent";
import { FlatList } from "react-native-gesture-handler";
import { useWorkoutStore } from "../../stores/workout";
import { BackgroundText } from "../../components/ui/text/BackgroundText";
import { CreateSplitButton } from "../../components/splits/header/CreateSplitButton";
import { SplitCard } from "../../components/splits/edit-split/SplitCard";
import { NoSplitCard } from "../../components/splits/edit-split/NoSplitCard";
import { useTranslation } from "react-i18next";
import { useWidgetUnit } from "../../features/widgets/useWidgetUnit";
import { ScreenView } from "../../components/ui/containers/ScreenView";
import { IText } from "../../components/ui/text/IText";

export default function SplitListScreen() {
  const { splitPlans } = useWorkoutStore();
  const { t } = useTranslation();
  const { fullWidth } = useWidgetUnit();

  function headerRight() {
    return <CreateSplitButton />;
  }

  return (
    <Fragment>
      <Stack.Screen
        options={{
          headerTitle: () => <IText text={t("splits.title")} />,
          headerRight: headerRight,
        }}
      />
      <ScreenContent>
        <ScreenView>
          <NoSplitCard />
          <FlatList
            data={splitPlans}
            showsVerticalScrollIndicator={false}
            scrollEnabled={false}
            keyExtractor={(item, index) => `${item.createdAt}-${index}`}
            renderItem={({ item }) => <SplitCard split={item} />}
            contentContainerStyle={{
              gap: 8,
              marginVertical: 8,
            }}
          />
          <BackgroundText
            style={{ textAlign: "justify", width: fullWidth }}
            text={t("splits.list-info")}
          />
        </ScreenView>
      </ScreenContent>
    </Fragment>
  );
}
