import { Fragment, useState } from "react";
import { InfoText } from "../ui/text/InfoText";
import { ExerciseInfoNameInput } from "../exercise-list/ExerciseInfoNameInput";
import { useTranslation } from "react-i18next";
import { ExerciseInfo } from "../../stores/workout";
import { IBubble } from "../ui/containers/IBubble";
import { useSettingsStore } from "../../stores/settingsStore";
import { StrobeOptionButton } from "../ui/buttons/StrobeOptionButton";
import { View } from "react-native";

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
    <IBubble
      size="flexible"
      style={{ paddingTop: 16 }}
      styleContent={{ gap: 16 }}
    >
      <View style={{ paddingHorizontal: 16 }}>
        <ExerciseInfoNameInput exercise={exercise} locale={locale} />
        <InfoText text={`${t(`language.${locale}`)} ${t("exercise.name")}`} />
      </View>

      {showLocale && (
        <View style={{ paddingHorizontal: 16 }}>
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
      )}
      <StrobeOptionButton
        title={showLocale ? t("dialog.show-less") : t("dialog.show-more")}
        onPress={handleToggleLocale}
        color={theme.tint}
        justifyContent="center"
      />
    </IBubble>
  );
}
