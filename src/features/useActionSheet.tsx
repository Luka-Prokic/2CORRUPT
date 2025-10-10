import { ActionSheetIOS, Alert, AlertButton, Platform } from "react-native";
import { useSettingsStore } from "../stores/settingsStore";
import { useTranslation } from "react-i18next";

export function useActionSheet() {
  const { themeName } = useSettingsStore();
  const { t } = useTranslation();

  const isLightTheme = ["light", "oldschool", "peachy"].includes(themeName);
  const userInterfaceStyle = isLightTheme ? "light" : "dark";

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
      ActionSheetIOS.showActionSheetWithOptions(
        {
          options,
          cancelButtonIndex: cancelIndex,
          destructiveButtonIndex: destructiveIndex,
          title,
          message,
          userInterfaceStyle,
        },
        onSelect
      );
    } else {
      // fallback to Alert on Android
      const buttons = options.map((opt, i) => ({
        text: opt,
        style:
          i === cancelIndex
            ? "cancel"
            : i === destructiveIndex
            ? "destructive"
            : "default",
        onPress: () => onSelect(i),
      }));
      Alert.alert(title, message, buttons as AlertButton[]);
    }
  };

  return { showActionSheet, t };
}
