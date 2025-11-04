import React from "react";
import { View, Switch, Text } from "react-native";
import { TwoOptionStrobeButtons } from "../ui/buttons/TwoOptionStrobeButtons";
import { useSettingsStore } from "../../stores/settings";
import { SplitPlan, useWorkoutStore } from "../../stores/workout";
import { router } from "expo-router";
import { useActionSheet } from "../../features/useActionSheet";
import { BackgroundText } from "../ui/misc/BackgroundText";
import { StrobeButton } from "../ui/buttons/StrobeButton";
import { useWidgetUnit } from "../../features/widgets/useWidgetUnit";
import { SplitNoteInput } from "./SplitNoteInput";

interface SplitFooterProps {
  split: SplitPlan;
}

export function SplitFooter({ split }: SplitFooterProps) {
  const { t, showActionSheet } = useActionSheet();
  const { theme } = useSettingsStore();
  const { fullWidth } = useWidgetUnit();
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
    router.replace(`/splits/${newSplitId}/edit`);
  }

  return (
    <View
      style={{
        marginTop: 16,
        alignItems: "center",
        gap: 16,
      }}
    >
      <SplitNoteInput split={split} />
      {/* Buttons */}
      <TwoOptionStrobeButtons
        labelOne={t("button.clone")}
        labelTwo={t("button.delete")}
        onOptionOne={handleClone}
        onOptionTwo={handleDelete}
        styleOne={{ backgroundColor: theme.accent }}
        styleLabelOne={{ color: theme.secondaryText }}
        styleTwo={{ backgroundColor: theme.error }}
      />
      {/* Info text */}
      <BackgroundText
        style={{ textAlign: "justify", width: fullWidth }}
        text={t("splits.footer-info")}
      />
    </View>
  );
}
