import { BlurView } from "expo-blur";
import { useWidgetUnit } from "../../../../../features/widgets/useWidgetUnit";
import { IText } from "../../../../ui/text/IText";
import { useWorkoutStore } from "../../../../../stores/workout";
import { useSettingsStore } from "../../../../../stores/settingsStore";
import { Ionicons } from "@expo/vector-icons";
import { TouchableOpacity, View } from "react-native";
import { useUIStore } from "../../../../../stores/ui";
import { router } from "expo-router";
import { hexToRGBA } from "../../../../../utils/HEXtoRGB";
import { WorkoutBoardHeaderRight } from "../../../../board-workout/header/WorkoutBoardHeaderRight";

export function ActiveSessionHeader() {
  const { fullWidth } = useWidgetUnit();
  const { theme, themeMode } = useSettingsStore();
  const { activeSession } = useWorkoutStore();
  const { setTypeOfView } = useUIStore();

  function handlePress() {
    router.dismissTo("/");
    setTypeOfView("workout");
  }

  if (!activeSession) return null;
  return (
    <TouchableOpacity
      style={{
        position: "absolute",
        top: 0,
        left: 0,
      }}
      onPress={handlePress}
    >
      <BlurView
        tint={themeMode}
        style={{
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "row",
          paddingHorizontal: 64,
          width: fullWidth,
          height: 44,
          borderBottomWidth: 1,
          borderBottomColor: hexToRGBA(theme.thirdAccent, 0.4),
        }}
      >
        <Ionicons
          name="chevron-back"
          size={32}
          color={theme.accent}
          style={{ position: "absolute", left: 8 }}
        />
        <IText text={activeSession.name} color={theme.text} />

        <View
          style={{
            position: "absolute",
            right: 8,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <WorkoutBoardHeaderRight />
        </View>
      </BlurView>
    </TouchableOpacity>
  );
}
