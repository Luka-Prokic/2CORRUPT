import { TwoOptionStrobeButtons } from "../ui/buttons/TwoOptionStrobeButtons";
import { useTranslation } from "react-i18next";
import { useSettingsStore } from "../../stores/settings";
import { SplitPlan, useWorkoutStore } from "../../stores/workout";
import { router } from "expo-router";
import { useActionSheet } from "../../features/useActionSheet";

interface SplitFooterProps {
  split: SplitPlan;
}
export function SplitFooter({ split }: SplitFooterProps) {
  const { t, showActionSheet } = useActionSheet();
  const { theme } = useSettingsStore();
  const { createSplitPlan, deleteSplitPlan } = useWorkoutStore();

  function handleDelete() {
    const options = [t("button.cancel"), t("button.delete")].filter(Boolean);

    showActionSheet({
      title: `${t("splits.delete-title")}`,
      message: t("splits.delete-message"),
      options,
      cancelIndex: 0,
      destructiveIndex: 1,
      onSelect: (index) => {
        if (index === 1) {
          deleteSplitPlan(split.id);
          router.back();
        }
      },
    });
  }

  function handleClone() {
    const newSplit: SplitPlan = {
      ...split,
      name: `${split.name} Copy`,
    };
    const newSplitId = createSplitPlan(newSplit);
    router.replace(`/splits/${newSplitId}`);
  }

  return (
    <TwoOptionStrobeButtons
      labelOne={t("button.clone")}
      labelTwo={t("button.delete")}
      onOptionOne={handleClone}
      onOptionTwo={handleDelete}
      styleOne={{ backgroundColor: theme.accent }}
      styleLabelOne={{ color: theme.secondaryText }}
      styleTwo={{ backgroundColor: theme.error }}
    />
  );
}
