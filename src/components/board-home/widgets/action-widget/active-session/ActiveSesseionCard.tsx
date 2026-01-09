import { StrobeButton } from "../../../../ui/buttons/StrobeButton";
import { useWidgetUnit } from "../../../../../features/widgets/useWidgetUnit";
import { useSettingsStore } from "../../../../../stores/settingsStore";
import { useWorkoutStore } from "../../../../../stores/workout";
import { useUIStore } from "../../../../../stores/ui";
import { SevenSegmentSessionTimer } from "../../../../ui/timer/SevenSegmentSessionTimer";
import { CorruptRestTimer } from "../../../../corrupt/CorruptRestTimer";
import { Pressable, View } from "react-native";
import { ActiveSessionChartButton } from "./ActiveSessionChartButton";
import { ActiveSessionPreviewButton } from "./ActiveSessionPreviewButton";
import { IText } from "../../../../ui/text/IText";
import { router } from "expo-router";
import { Shine } from "../../../../ui/misc/Shine";

export function ActiveSessionCard() {
  const { widgetUnit, fullWidth } = useWidgetUnit();
  const { theme } = useSettingsStore();
  const { activeSession, restingExerciseId } = useWorkoutStore();
  const { setTypeOfView } = useUIStore();

  const softGlow = theme.fifthAccent + "80";

  function handlePress() {
    setTypeOfView("workout");
    setTimeout(() => {
      router.dismissTo("/");
    }, 100);
  }

  if (!activeSession) return null;

  return (
    <StrobeButton
      style={{
        height: widgetUnit,
        width: fullWidth,
        borderRadius: 32,
      }}
      pressable
      strobeColors={[softGlow, softGlow, softGlow, softGlow]}
    >
      <Shine
        color={theme.secondaryAccent}
        style={{
          height: widgetUnit,
          width: fullWidth,
          backgroundColor: theme.thirdAccent + "10",
          borderWidth: 1,
          borderColor: theme.thirdAccent + "20",
          borderRadius: 32,
          justifyContent: "space-between",
          padding: 16,
        }}
      >
        {restingExerciseId ? (
          <View
            style={{
              width: fullWidth - 32,
              height: 64,
            }}
          >
            <CorruptRestTimer size={64} fontSize={48} />
          </View>
        ) : (
          <SevenSegmentSessionTimer
            fitWidth={fullWidth - 32}
            color={theme.secondaryAccent}
          />
        )}
        <Pressable
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            width: fullWidth - 32,
          }}
          onPress={handlePress}
        >
          <ActiveSessionPreviewButton />
          <IText text={activeSession.name} color={theme.text} />
          <ActiveSessionChartButton />
        </Pressable>
      </Shine>
    </StrobeButton>
  );
}
