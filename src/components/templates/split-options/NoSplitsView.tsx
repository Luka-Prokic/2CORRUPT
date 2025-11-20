import { forwardRef } from "react";
import { BottomSheetModal } from "@gorhom/bottom-sheet";
import { useSettingsStore } from "../../../stores/settings";
import { useTranslation } from "react-i18next";
import { Text } from "react-native";

interface NoSplitsViewProps {}

export const NoSplitsView = forwardRef<BottomSheetModal, NoSplitsViewProps>(
  ({}, ref) => {
    const { theme } = useSettingsStore();
    const { t } = useTranslation();

    return <Text>No Splits</Text>;
  }
);
