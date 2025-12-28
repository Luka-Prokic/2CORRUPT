import { View } from "react-native";
import { ExerciseInfo } from "../../stores/workout/types";
import { IText } from "../ui/text/IText";
import { useTranslation } from "react-i18next";
import { InfoText } from "../ui/text/InfoText";
import { parseISO } from "../../features/calendar/useDate";
import { useFormatFriendlyDate } from "../../features/format/useFormatDate";

interface ExerciseInfoViewProps {
  exercise: ExerciseInfo;
}

export function ExerciseInfoView({ exercise }: ExerciseInfoViewProps) {
  const { t } = useTranslation();
  const locale = t("locale");

  const primaryMuscles =
    t("exercise.primary-muscles") +
    ": " +
    exercise.primaryMuscles
      ?.map((muscle) => t(`body-parts.${muscle}`))
      .join(", ");
  const secondaryMuscles =
    t("exercise.secondary-muscles") +
    ": " +
    exercise.secondaryMuscles
      ?.map((muscle) => t(`body-parts.${muscle}`))
      .join(", ");
  const equipment =
    t("exercise.equipment") +
    ": " +
    exercise.equipment
      ?.map((equipment) => t(`equipment.${equipment}`))
      .join(", ");

  return (
    <View>
      <IText text={exercise.defaultName?.[locale]} />
      <InfoText text={primaryMuscles} align="left" />
      <InfoText text={secondaryMuscles} align="left" />
      <InfoText text={equipment} align="left" />
    </View>
  );
}
