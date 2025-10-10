import { View, Pressable, Text } from "react-native";
import { useSettingsStore } from "../../../stores/settingsStore";
import { useTranslation } from "react-i18next";

interface ListHeaderProps {
  listOpen: boolean;
  togglePanel: () => void;
}

export function ListHeader({ listOpen, togglePanel }: ListHeaderProps) {
  const { theme } = useSettingsStore();
  const { t } = useTranslation();

  return (
    <View
      style={{
        position: "absolute",
        height: 88,
        padding: 10,
        bottom: 0,
        right: 0,
        left: 0,
        flexDirection: "row",
        backgroundColor: theme.background,
        borderTopLeftRadius: 32,
        borderTopRightRadius: 32,
      }}
    >
      <Pressable
        onPress={togglePanel}
        style={{
          flex: 1,
          alignItems: "center",
        }}
      >
        <Text
          style={{
            fontSize: 18,
            fontWeight: "bold",
            color: listOpen ? theme.text : theme.grayText,
          }}
        >
          {t("workout-board.up-next")}
        </Text>
      </Pressable>
    </View>
  );
}
