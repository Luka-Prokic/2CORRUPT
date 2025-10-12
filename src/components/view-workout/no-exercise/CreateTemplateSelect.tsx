import { Fragment, useState } from "react";
import { IButton } from "../../ui/buttons/IButton";
import { useSettingsStore } from "../../../stores/settingsStore";
import { WIDTH } from "../../../features/Dimensions";
import { NoExerciseViewSelected } from "../NoExerciseView";
import { Animated, Text } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { useTranslation } from "react-i18next";
import { StrobeBlur } from "../../ui/misc/StrobeBlur";
import { TemplateNameInput } from "../../ui/input/TemplateNameInput";

interface CreateTemplateSelectProps {
  onSelect: (selected: NoExerciseViewSelected) => void;
  selected: NoExerciseViewSelected;
}

export function CreateTemplateSelect({
  onSelect,
  selected,
}: CreateTemplateSelectProps) {
  const { theme } = useSettingsStore();
  const { t } = useTranslation();

  const [templateName, setTemplateName] = useState("");

  function handlePress() {
    onSelect("create-template");
  }

  function mainButton() {
    return (
      <IButton
        onPress={handlePress}
        color={theme.primaryBackground}
        style={{ width: WIDTH - 32, height: 64, borderRadius: 32 }}
      >
        <StrobeBlur
          colors={[
            theme.caka,
            theme.primaryBackground,
            theme.accent,
            theme.tint,
          ]}
          tint="light"
          style={{ width: WIDTH - 32, height: 64, borderRadius: 32 }}
          disable={selected === "none"}
        >
          <Text style={{ color: theme.text, fontSize: 24, fontWeight: "bold" }}>
            {selected === "create-template"
              ? t("workout-view.add-exercise")
              : t("workout-view.create-template")}
          </Text>
        </StrobeBlur>
      </IButton>
    );
  }

  if (selected === "create-template")
    return (
      <Fragment>
        <KeyboardAwareScrollView
          contentContainerStyle={{
            flexGrow: 1,
            width: WIDTH,
            paddingHorizontal: 12,
            justifyContent: "flex-end",
          }}
          enableOnAndroid
          enableAutomaticScroll={true}
          extraScrollHeight={0}
          keyboardOpeningTime={0}
          scrollEnabled={false}
        >
          <TemplateNameInput
            value={templateName}
            onChangeText={setTemplateName}
            placeholder={t("workout-view.template-name")}
          />
        </KeyboardAwareScrollView>
        {mainButton()}
      </Fragment>
    );

  if (selected === "none") return <Fragment>{mainButton()}</Fragment>;
  return null;
}
