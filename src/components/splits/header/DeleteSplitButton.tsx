import { router } from "expo-router";
import { useSettingsStore } from "../../../stores/settings";
import { SplitPlan, useWorkoutStore } from "../../../stores/workout";
import { IButton } from "../../ui/buttons/IButton";
import { Text } from "react-native";
import { useActionSheet } from "../../../features/useActionSheet";

interface DeleteSplitButtonProps {
  split: SplitPlan;
}

export function DeleteSplitButton({ split }: DeleteSplitButtonProps) {
  const { deleteSplitPlan } = useWorkoutStore();
  const { theme } = useSettingsStore();
  const { t, showActionSheet } = useActionSheet();

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

  return (
    <IButton
      onPress={handleDelete}
      style={{
        height: 24,
        marginRight: 8,
      }}
    >
      <Text
        style={{
          fontSize: 16,
          color: theme.error,
        }}
      >
        {t("button.delete")}
      </Text>
    </IButton>
  );
}
