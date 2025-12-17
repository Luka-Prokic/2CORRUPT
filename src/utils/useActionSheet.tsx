import { useSettingsStore } from "../stores/settingsStore";
import { useTranslation } from "react-i18next";
import { Platform, ActionSheetIOS, Alert, AlertButton } from "react-native";

/**
 * Custom hook for showing an ActionSheet / Alert with theme awareness.
 * Works consistently on modals, headers, and normal screens.
 */
export function useActionSheet() {
  const { themeMode } = useSettingsStore(); // "light" | "dark"
  const { t } = useTranslation();

  const showActionSheet = ({
    title,
    message,
    options,
    destructiveIndex,
    cancelIndex = 0,
    onSelect,
  }: {
    title: string;
    message?: string;
    options: string[];
    destructiveIndex?: number;
    cancelIndex?: number;
    onSelect: (index: number) => void;
  }) => {
    if (Platform.OS === "ios") {
      setTimeout(() => {
        ActionSheetIOS.showActionSheetWithOptions(
          {
            options,
            cancelButtonIndex: cancelIndex,
            destructiveButtonIndex: destructiveIndex,
            title,
            message,
            userInterfaceStyle: themeMode, // "light" | "dark"
          },
          onSelect
        );
      }, 0);
    } else {
      const buttons: AlertButton[] = options.map((opt, i) => ({
        text: opt,
        style:
          i === cancelIndex
            ? "cancel"
            : i === destructiveIndex
            ? "destructive"
            : "default",
        onPress: () => onSelect(i),
      }));
      Alert.alert(title, message, buttons);
    }
  };

  return { showActionSheet, t };
}
