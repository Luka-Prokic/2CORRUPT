import { Fragment, useState } from "react";
import { InfoText } from "../../ui/text/InfoText";
import { ExerciseInfoNameInput } from "../ExerciseInfoNameInput";
import { useTranslation } from "react-i18next";
import { ExerciseInfo } from "../../../stores/workout/types";
import { IBubble } from "../../ui/containers/IBubble";
import { IButton } from "../../ui/buttons/IButton";
import { useSettingsStore } from "../../../stores/settingsStore";

interface EditExerciseNameProps {
  exercise: ExerciseInfo;
}

export function EditExerciseName({ exercise }: EditExerciseNameProps) {
  const { t } = useTranslation();
  const { theme } = useSettingsStore();
  const locale = t("locale");
  const [showLocale, setShowLocale] = useState(false);

  function handleToggleLocale() {
    setShowLocale(!showLocale);
  }

  return (
    <IBubble size="flexible" style={{ padding: 16 }}>
      <ExerciseInfoNameInput exercise={exercise} locale={locale} />
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
      <IButton
        style={{
          height: 34,
          width: "100%",
          alignItems: "flex-end",
        }}
        onPress={handleToggleLocale}
      >
        <InfoText
          text={showLocale ? t("dialog.show-less") : t("dialog.show-more")}
          color={theme.tint}
        />
      </IButton>
    </IBubble>
  );
}
