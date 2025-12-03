import { TouchableOpacity } from "react-native";
import { useSettingsStore } from "../../../stores/settingsStore";
import { WIDTH } from "../../../utils/Dimensions";
import { TemplateName } from "../sheets/template/TemplateName";
import { TemplateSheetType } from "../../../app/template-board";

interface TemplateBoardHeaderTitleProps {
  sheetType: TemplateSheetType;
  setSheetType: (sheetType: TemplateSheetType) => void;
}
export function TemplateBoardHeaderTitle({
  sheetType,
  setSheetType,
}: TemplateBoardHeaderTitleProps) {
  const { theme } = useSettingsStore();

  function handlePressTitle() {
    setSheetType("template");
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
    >
      <TemplateName
        fontSize={18}
        textColor={!!sheetType ? theme.text : theme.grayText}
      />
    </TouchableOpacity>
  );
}
