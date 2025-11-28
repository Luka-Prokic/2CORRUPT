import { PlanedSessionSelect } from "./PlanedSessionSelect";
import { QuickStartSelect } from "./QuickStartSelect";
import { CreateTemplateSelect } from "./CreateTemplateSelect";
import { UIView } from "../ui/UIView";
import { View } from "react-native";
import { CORRUPT_BUTTON_HEIGHT_FROM_BOTTOM } from "../corrupt/LegacyCorruptButton";

export function StartView() {
  return (
    <UIView type="start">
      <View
        style={{
          flex: 1,
          justifyContent: "flex-end",
          alignItems: "center",
          paddingBottom: CORRUPT_BUTTON_HEIGHT_FROM_BOTTOM + 8,
          gap: 8,
        }}
      >
        <PlanedSessionSelect />
        <QuickStartSelect />
        <CreateTemplateSelect />
      </View>
    </UIView>
  );
}
