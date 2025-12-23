import { Fragment, useState } from "react";
import { InfoText } from "../../ui/text/InfoText";
import { ExerciseInfoNameInput } from "../ExerciseInfoNameInput";
import { useTranslation } from "react-i18next";
import { ExerciseInfo } from "../../../stores/workout/types";
import { IBubble } from "../../ui/containers/IBubble";
import { TextButton } from "../../ui/buttons/TextButton";

interface EditExerciseNameProps {
  exercise: ExerciseInfo;
}

export function EditExerciseName({ exercise }: EditExerciseNameProps) {
  const { t } = useTranslation();
  const locale = t("locale");
  const [showLocale, setShowLocale] = useState(false);

  function handleToggleLocale() {
    setShowLocale(!showLocale);
  }

  return (
    <IBubble size="flexible" style={{ padding: 16 }}>
      <ExerciseInfoNameInput
        exercise={exercise}
        locale={locale}
        placeholder={t("exercise.name")}
      />
      <InfoText text={`${t(`language.${locale}`)} ${t("exercise.name")}`} />

      {showLocale && (
        <Fragment>
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
        </Fragment>
      )}
      <TextButton
        text={showLocale ? t("dialog.show-less") : t("dialog.show-more")}
        onPress={handleToggleLocale}
        style={{ marginTop: 16 }}
      />
    </IBubble>
  );
}
