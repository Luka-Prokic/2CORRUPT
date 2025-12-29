import { View } from "react-native";
import { ExerciseInfo } from "../../stores/workout/types";
import { IText } from "../ui/text/IText";
import { useTranslation } from "react-i18next";
import { useMemo } from "react";

interface ExerciseTipsProps {
  exercise: ExerciseInfo;
}

export function ExerciseTips({ exercise }: ExerciseTipsProps) {
  const { t } = useTranslation();
  const locale = t("locale");

  const tips = useMemo(() => {
    return exercise.metadata.tips?.map((tip: string) => tip);
  }, [exercise.metadata.tips]);

  return (
    <View>
      <IText text={tips.join("\n")} />
    </View>
  );
}
