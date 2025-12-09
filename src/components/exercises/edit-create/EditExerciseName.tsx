import { Fragment } from "react";
import { InfoText } from "../../ui/text/InfoText";
import { ExerciseInfoNameInput } from "../ExerciseInfoNameInput";
import { useTranslation } from "react-i18next";
import { ExerciseInfo } from "../../../stores/workout/types";
import { View } from "react-native";

interface EditExerciseNameProps {
  exercise: ExerciseInfo;
}

export function EditExerciseName({ exercise }: EditExerciseNameProps) {
  const { t } = useTranslation();
  const locale = t("locale");

  return (
    <View style={{ gap: 4 }}>
      <ExerciseInfoNameInput
        exercise={exercise}
        locale={locale}
        placeholder={t("exercise.name")}
      />
      <InfoText text={`${t(`language.${locale}`)} ${t("exercise.name")}`} />

      {locale !== "en" && (
        <Fragment>
          <ExerciseInfoNameInput exercise={exercise} locale="en" />
          <InfoText text={`${t("language.en")} ${t("exercise.name")}`} />
        </Fragment>
      )}

      {locale !== "rs" && (
        <Fragment>
          <ExerciseInfoNameInput exercise={exercise} locale="rs" />
          <InfoText text={`${t("language.rs")} ${t("exercise.name")}`} />
        </Fragment>
      )}
    </View>
  );
}
