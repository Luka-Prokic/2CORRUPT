import { TouchableOpacity } from "react-native";
import { useSettingsStore } from "../../../stores/settingsStore";
import { WIDTH } from "../../../features/Dimensions";
import { TemplateName } from "../sheets/template/TemplateName";
import { TemplateSheetType } from "../../../app/template-board";

interface TemplateBoardHeaderTitleProps {
  listOpen: boolean;
  setListOpen: (listOpen: boolean) => void;
  setListType: (listType: TemplateSheetType) => void;
}
export function TemplateBoardHeaderTitle({
  listOpen,
  setListOpen,
  setListType,
}: TemplateBoardHeaderTitleProps) {
  const { theme } = useSettingsStore();

  function handlePressTitle() {
    setListOpen(true);
    setListType("template");
  }

  return (
    <TouchableOpacity
      onPress={handlePressTitle}
      style={{
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        gap: 4,
        padding: 8,
        width: WIDTH - 160,
      }}
      disabled={listOpen}
    >
      <TemplateName
        fontSize={18}
        textColor={listOpen ? theme.glow : theme.grayText}
      />
    </TouchableOpacity>
  );
}
