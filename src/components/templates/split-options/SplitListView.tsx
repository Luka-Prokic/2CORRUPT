import { Fragment } from "react";
import { SplitPlan, WorkoutTemplate } from "../../../stores/workout";
import { BottomSheetModal } from "@gorhom/bottom-sheet";
import { useSettingsStore } from "../../../stores/settings";
import { useTranslation } from "react-i18next";
import { FlatList } from "react-native";
import { useWorkoutStore } from "../../../stores/workout";
import { OptionButton } from "../../ui/buttons/OptionButton";
import { Ionicons } from "@expo/vector-icons";
import { InfoText } from "../../ui/text/InfoText";
import { router } from "expo-router";
import { HEIGHT } from "../../../utils/Dimensions";
import { useSafeAreaInsets } from "react-native-safe-area-context";

interface SplitListViewProps {
  templates: WorkoutTemplate[];
  onSelectSplit: (split: SplitPlan) => void;
  ref: React.RefObject<BottomSheetModal>;
}

export function SplitListView({
  templates,
  onSelectSplit,
  ref,
}: SplitListViewProps) {
  const { splitPlans, createSplitPlan, addDayToSplit, addWorkoutToDay } =
    useWorkoutStore();
  const { theme } = useSettingsStore();
  const { t } = useTranslation();
  const insets = useSafeAreaInsets();

  function handleSelectSplit(split: SplitPlan) {
    onSelectSplit(split);
  }

  function handleCreateSplit() {
    (ref as React.RefObject<BottomSheetModal>)?.current?.close();
    const splitId = createSplitPlan();
    addDayToSplit(splitId);
    templates.forEach((template) => {
      addWorkoutToDay(splitId, 0, template.id);
    });
    setTimeout(
      () =>
        router.push({
          pathname: "/splits/[splitId]/edit",
          params: { splitId },
        }),
      200
    );
  }

  return (
    <FlatList
      data={splitPlans}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <OptionButton
          title={item.name}
          onPress={() => handleSelectSplit(item)}
          height={44}
          icon={
            <Ionicons name="chevron-forward" size={24} color={theme.text} />
          }
        />
      )}
      ListFooterComponent={
        <Fragment>
          <OptionButton
            title={t("splits.create-split-using-this")}
            onPress={handleCreateSplit}
            height={44}
            color={theme.tint}
            icon={<Ionicons name="add-outline" size={24} color={theme.tint} />}
          />
          <InfoText
            text={t("splits.select-a-split")}
            style={{ marginVertical: 16 }}
          />
        </Fragment>
      }
      style={{
        maxHeight: HEIGHT - insets.top - insets.bottom - 160, // caps the height
      }}
    />
  );
}
