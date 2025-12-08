import { Fragment } from "react";
import { InfoText } from "../../ui/text/InfoText";
import { ExerciseInfoNameInput } from "../ExerciseInfoNameInput";
import { useTranslation } from "react-i18next";
import { ExerciseInfo } from "../../../stores/workout/types";
import { SyncExerciseName } from "./SyncExerciseName";
import { useWorkoutStore } from "../../../stores/workout";

interface EditExerciseNameProps {
  exercise: ExerciseInfo;
}

export function EditExerciseName({ exercise }: EditExerciseNameProps) {
  const { t } = useTranslation();
  const locale = t("locale");
  const { updateDraftExercise } = useWorkoutStore();

  const handleSync = () => {
    updateDraftExercise({
      defaultName: {
        en: exercise.defaultName[locale],
        rs: exercise.defaultName[locale],
      },
    });
  };

  return (
    <Fragment>
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

      <SyncExerciseName
        names={[exercise.defaultName.en, exercise.defaultName.rs]}
        onSync={handleSync}
      />
    </Fragment>
  );
}
