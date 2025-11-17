import { TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useSettingsStore } from "../../../stores/settingsStore";
import { router } from "expo-router";
import { Fragment } from "react";
import { TemplateSheetType } from "../../../app/template-board";

interface TemplateBoardHeaderLeftProps {
  listOpen: boolean;
  setListOpen: (listOpen: boolean) => void;
  setListType: (listType: TemplateSheetType) => void;
}

export function TemplateBoardHeaderLeft({
  listOpen,
  setListOpen,
  setListType,
}: TemplateBoardHeaderLeftProps) {
  const { theme } = useSettingsStore();

  function handlePressCog() {
    setListOpen(true);
    setListType("template");
  }

  function handleGoBack() {
    router.back();
  }
  return (
    <Fragment>
      <TouchableOpacity onPress={handleGoBack}>
        <Ionicons name="chevron-back-circle" size={44} color={theme.text} />
      </TouchableOpacity>
      <TouchableOpacity onPress={handlePressCog} disabled={listOpen}>
        <Ionicons
          name="cog"
          size={44}
          color={listOpen ? theme.glow : theme.grayText}
        />
      </TouchableOpacity>
    </Fragment>
  );
}
