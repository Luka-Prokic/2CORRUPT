import { PlanedSessionSelect } from "./PlanedSessionSelect";
import { QuickStartSelect } from "./QuickStartSelect";
import { CreateTemplateSelect } from "./CreateTemplateSelect";
import { UIView } from "../ui/UIView";
import { View } from "react-native";

export function StartView() {
  return (
    <UIView type="start">
      <View
        style={{
          flex: 1,
          justifyContent: "flex-end",
          alignItems: "center",
          paddingBottom: 178,
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
