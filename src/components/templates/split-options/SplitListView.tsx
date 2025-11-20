import { forwardRef, Fragment } from "react";
import { SplitPlan, WorkoutTemplate } from "../../../stores/workout";
import { BottomSheetModal } from "@gorhom/bottom-sheet";
import { useSettingsStore } from "../../../stores/settings";
import { useTranslation } from "react-i18next";
import { FlatList } from "react-native";
import { useWorkoutStore } from "../../../stores/workout";
import { OptionButton } from "../../ui/buttons/OptionButton";
import { Ionicons } from "@expo/vector-icons";
import { EmptyFooter } from "../../ui/containers/EmptyFooter";
import { Text } from "react-native";

interface SplitListViewProps {
  templates: WorkoutTemplate[];
  onSelectSplit: (split: SplitPlan) => void;
}

export const SplitListView = forwardRef<BottomSheetModal, SplitListViewProps>(
  ({ templates, onSelectSplit }, ref) => {
    const { splitPlans, activeSplitPlan } = useWorkoutStore();
    const { theme } = useSettingsStore();
    const { t } = useTranslation();

    function handleSelectSplit(split: SplitPlan) {
      onSelectSplit(split);
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
        ListHeaderComponent={
          activeSplitPlan?.plan.id !== "no-split" && (
            <OptionButton
              title={activeSplitPlan?.plan.name}
              onPress={() => handleSelectSplit(activeSplitPlan?.plan)}
              height={44}
              icon={
                <Ionicons name="chevron-forward" size={24} color={theme.text} />
              }
            />
          )
        }
        ListFooterComponent={<EmptyFooter />}
      />
    );
  }
);
