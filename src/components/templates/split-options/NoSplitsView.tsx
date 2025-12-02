import { forwardRef } from "react";
import { BottomSheetModal } from "@gorhom/bottom-sheet";
import { useSettingsStore } from "../../../stores/settings";
import { useTranslation } from "react-i18next";
import { View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { BackgroundText } from "../../ui/text/BackgroundText";
import { TextButton } from "../../ui/buttons/TextButton";
import { router } from "expo-router";
import { useWorkoutStore, WorkoutTemplate } from "../../../stores/workout";

interface NoSplitsViewProps {
  templates: WorkoutTemplate[];
}

export const NoSplitsView = forwardRef<BottomSheetModal, NoSplitsViewProps>(
  ({ templates }, ref) => {
    const { theme } = useSettingsStore();
    const { t } = useTranslation();
    const { createSplitPlan, addDayToSplit, addWorkoutToDay } =
      useWorkoutStore();

    function handlePress() {
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

    const message =
      t("splits.create-split-using-this") +
      " " +
      (templates.length > 1
        ? t("templates.templates").toLowerCase()
        : t("templates.template").toLowerCase());

    return (
      <View
        style={{
          alignItems: "center",
          justifyContent: "center",
          gap: 16,
          marginVertical: 16,
        }}
      >
        <Ionicons name="bandage-outline" size={48} color={theme.grayText} />

        <BackgroundText
          text={t("splits.create-split-using-this-description")}
          style={{ color: theme.grayText }}
        />
        <TextButton text={message} onPress={handlePress} />
      </View>
    );
  }
);
