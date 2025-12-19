import { useState } from "react";
import { BottomSheetModal } from "@gorhom/bottom-sheet";
import { useWorkoutStore, WorkoutTemplate } from "../../../stores/workout";
import { useSettingsStore } from "../../../stores/settingsStore";
import { SplitListView } from "./SplitListView";
import { NoSplitsView } from "./NoSplitsView";
import { SplitDaysView } from "./SplitDaysView";
import { SplitPlan } from "../../../stores/workout/types";
import { BackgroundText } from "../../ui/text/BackgroundText";
import { useTranslation } from "react-i18next";
import { IBottomSheet } from "../../ui/IBottomSheet";
import { WIDTH } from "../../../utils/Dimensions";
interface AddToSplitBottomSheetProps {
  templates: WorkoutTemplate[];
  ref: React.RefObject<BottomSheetModal>;
}

export function AddToSplitBottomSheet({
  templates,
  ref,
}: AddToSplitBottomSheetProps) {
  const { theme } = useSettingsStore();
  const { splitPlans } = useWorkoutStore();

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

  const message = `${t("button.add")} ${
    templates.length > 1
      ? `${templates.length} ${t("templates.templates").toLowerCase()}`
      : `${templates[0]?.name ?? ""}`
  } ${t("dialog.to")} ${
    selectedSplit?.name ?? t("splits.split").toLowerCase()
  }`;

  return (
    <IBottomSheet
      ref={ref}
      onDismiss={() => setSelectedSplit(null)}
      bottomSheetStyle={{ gap: 16, paddingTop: 8 }}
    >
      <BackgroundText
        text={message}
        style={{
          color: theme.grayText,
        }}
        align="left"
      />
      {visibleView()}
    </IBottomSheet>
  );
}
