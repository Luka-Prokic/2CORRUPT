import { useSettingsStore } from "../../../stores/settingsStore";
import { View, Text } from "react-native";
import { WorkoutSession } from "../../../stores/workout/types";
import { DashLine } from "../../ui/misc/DashLine";
import { useTranslation } from "react-i18next";
import { WIDTH } from "../../../features/Dimensions";

interface WorkoutHeaderProps {
  session: WorkoutSession;
}

export function WorkoutHeader({ session }: WorkoutHeaderProps) {
  const { t } = useTranslation();
  const { theme } = useSettingsStore();

  return (
    <View style={{ paddingHorizontal: 16 }}>
      <View
        style={{
          marginBottom: 32,
          width: WIDTH - 32,
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <Text
          style={{
            fontSize: 36,
            fontWeight: "bold",
            color: theme.text,
            textAlign: "left",
            width: WIDTH * 0.5 - 16,
          }}
          numberOfLines={1}
          adjustsFontSizeToFit={true}
          minimumFontScale={0.5}
        >
          {t("recap.exercises")}
        </Text>
        <DashLine width={WIDTH * 0.4} />
        <Text
          style={{
            width: WIDTH * 0.1 - 16,
            fontSize: 32,
            fontWeight: "bold",
            textAlign: "right",
            color: theme.text,
          }}
          numberOfLines={1}
          adjustsFontSizeToFit={true}
          minimumFontScale={0.5}
        >
          {session.layout.length}
        </Text>
      </View>
    </View>
  );
}
