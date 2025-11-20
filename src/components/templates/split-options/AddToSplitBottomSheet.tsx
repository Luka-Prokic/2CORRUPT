import React, { forwardRef, useState } from "react";
import {
  BottomSheetBackdrop,
  BottomSheetModal,
  BottomSheetView,
} from "@gorhom/bottom-sheet";
import { useWorkoutStore, WorkoutTemplate } from "../../../stores/workout";
import { useSettingsStore } from "../../../stores/settingsStore";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { SplitListView } from "./SplitListView";
import { NoSplitsView } from "./NoSplitsView";
import { SplitDaysView } from "./SplitDaysView";
import { SplitPlan } from "../../../stores/workout/types";
import { BackgroundText } from "../../ui/text/BackgroundText";
import { useTranslation } from "react-i18next";
interface AddToSplitBottomSheetProps {
  templates: WorkoutTemplate[];
}

export const AddToSplitBottomSheet = forwardRef<
  BottomSheetModal,
  AddToSplitBottomSheetProps
>(({ templates }, ref) => {
  const { theme } = useSettingsStore();
  const { splitPlans } = useWorkoutStore();
  const insets = useSafeAreaInsets();
  const [selectedSplit, setSelectedSplit] = useState<SplitPlan | null>(null);
  const { t } = useTranslation();

  function visibleView() {
    if (splitPlans.length === 0) {
      return <NoSplitsView templates={templates} ref={ref} />;
    }
    if (selectedSplit) {
      return (
        <SplitDaysView split={selectedSplit} templates={templates} ref={ref} />
      );
    }
    return (
      <SplitListView
        templates={templates}
        onSelectSplit={setSelectedSplit}
        ref={ref}
      />
    );
  }

  return (
    <BottomSheetModal
      ref={ref}
      enablePanDownToClose
      enableDismissOnClose
      keyboardBehavior="fillParent"
      keyboardBlurBehavior="restore"
      handleIndicatorStyle={{ backgroundColor: theme.info }}
      backgroundStyle={{ backgroundColor: theme.navBackground }}
      backdropComponent={(props) => (
        <BottomSheetBackdrop
          {...props}
          disappearsOnIndex={-1}
          appearsOnIndex={0}
          pressBehavior="close"
          opacity={0.2}
        />
      )}
      onChange={(idx) => {
        if (idx === -1) {
          setSelectedSplit(null);
        }
      }}
      onDismiss={() => setSelectedSplit(null)}
    >
      <BottomSheetView
        style={[
          {
            flex: 1,
            padding: 16,
            justifyContent: "flex-start",
            borderTopColor: theme.border,
            borderTopWidth: 1,
            paddingBottom: insets.bottom,
            gap: 16,
          },
        ]}
      >
        <BackgroundText
          text={`${t("button.add")} ${
            templates.length > 1
              ? `${templates.length} ${t("templates.template").toLowerCase()}`
              : `${templates[0].name}`
          } ${t("dialog.to")} ${
            selectedSplit?.name ?? t("splits.split").toLowerCase()
          }`}
          style={{ textAlign: "left", color: theme.grayText }}
        />
        {visibleView()}
      </BottomSheetView>
    </BottomSheetModal>
  );
});
