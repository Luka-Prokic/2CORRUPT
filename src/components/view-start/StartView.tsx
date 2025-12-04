import { QuickStartSelect } from "./QuickStartSelect";
import { CreateTemplateSelect } from "./CreateTemplateSelect";
import { UIView } from "../ui/UIView";
import { CORRUPT_BUTTON_HEIGHT_FROM_BOTTOM } from "../corrupt/CorruptButton";
import { View } from "react-native";
import { TodaysWorkouts } from "./TodaysWorkouts";

export function StartView() {
  return (
    <UIView
      type="start"
      style={{
        flex: 1,
        justifyContent: "flex-end",
        alignItems: "center",
        paddingBottom: CORRUPT_BUTTON_HEIGHT_FROM_BOTTOM + 8,
        gap: 8,
      }}
    >
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <TodaysWorkouts />
      </View>
      <QuickStartSelect />
      <CreateTemplateSelect />
    </UIView>
  );
}
