import { ExerciseTip } from "../../../stores/workout/types";
import { useWidgetUnit } from "../../../features/widgets/useWidgetUnit";
import { useSettingsStore } from "../../../stores/settingsStore";
import { useWorkoutStore } from "../../../stores/workout/useWorkoutStore";
import { IBubble } from "../../ui/containers/IBubble";
import { IText } from "../../ui/text/IText";
import { BlurView } from "expo-blur";
import { Pressable } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useActionSheet } from "../../../utils/useActionSheet";
import { useTranslation } from "react-i18next";

interface TipCardProps {
  tip: ExerciseTip;
  onCopy: (tip: ExerciseTip) => void;
}

export function TipCard({ tip, onCopy }: TipCardProps) {
  const { fullWidth } = useWidgetUnit();
  const { theme } = useSettingsStore();
  const { removeExerciseTip } = useWorkoutStore();
  const { showActionSheet } = useActionSheet();
  const { t } = useTranslation();

  function handleDeleteTip() {
    showActionSheet({
      title: `${t("button.delete")} ${tip.title}?`,
      message: t("exercise.delete-tip-message"),
      options: [t("button.delete"), t("button.cancel")],
      destructiveIndex: 0,
      cancelIndex: 1,
      onSelect: (index) => {
        if (index === 0) removeExerciseTip(tip.id);
      },
    });
  }

  function handleCopyTip() {
    onCopy(tip);
  }

  return (
    <IBubble
      width={fullWidth}
      height={fullWidth}
      styleContent={{ justifyContent: "space-between", paddingTop: 16 }}
    >
      <IText text={tip.title} />
      <IText text={tip.tip} />
      <BlurView
        intensity={100}
        style={{
          flexDirection: "row",
          justifyContent: "space-evenly",
          alignItems: "center",
          height: 34,
          width: fullWidth,
          paddingHorizontal: 16,
        }}
      >
        <Pressable onPress={handleDeleteTip}>
          <Ionicons name="trash-outline" size={24} color={theme.error} />
        </Pressable>
        <Pressable onPress={handleCopyTip}>
          <Ionicons name="arrow-undo-outline" size={24} color={theme.accent} />
        </Pressable>
      </BlurView>
    </IBubble>
  );
}
