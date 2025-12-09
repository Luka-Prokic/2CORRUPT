import { useRef } from "react";
import { View, TextInput, ViewStyle, TextInputProps } from "react-native";
import { useSettingsStore } from "../../stores/settingsStore";
import { ExerciseInfo } from "../../stores/workoutStore";
import { useTranslation } from "react-i18next";
import { useWorkoutStore } from "../../stores/workout/useWorkoutStore";

export interface ExerciseInfoNameInputProps extends TextInputProps {
  exercise?: ExerciseInfo;
  fontSize?: number;
  textColor?: string;
  styleView?: ViewStyle | ViewStyle[];
  onBlurCustom?: () => void;
  disabled?: boolean;
  locale?: keyof ExerciseInfo["defaultName"];
}

export function ExerciseInfoNameInput({
  exercise,
  fontSize = 64,
  textColor,
  styleView,
  onBlurCustom,
  disabled = false,
  locale = "en",
  ...textInputProps
}: ExerciseInfoNameInputProps) {
  const { t } = useTranslation();
  const { theme } = useSettingsStore();
  const { updateDraftExercise } = useWorkoutStore();

  const inputRef = useRef<TextInput>(null);

  const value = exercise?.defaultName?.[locale] ?? "";
  const color = textColor ?? theme.text;

  const handleChange = (newValue: string) => {
    updateDraftExercise({
      defaultName: {
        ...exercise?.defaultName,
        [locale]: newValue,
      },
    });
  };

  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        gap: 8,
        height: 44,
        width: "100%",
        ...styleView,
      }}
    >
      <TextInput
        ref={inputRef}
        value={value}
        onChangeText={handleChange}
        placeholder={t("exercise.exercise-name-input")}
        placeholderTextColor={theme.grayText}
        editable={!disabled}
        {...textInputProps}
        style={{
          fontSize: 24,
          fontWeight: "bold",
          color,
          flex: 1,
          borderBottomWidth: 1,
          borderBottomColor: color,
        }}
        onBlur={(e) => {
          onBlurCustom?.();
          textInputProps.onBlur?.(e);
        }}
      />
    </View>
  );
}
