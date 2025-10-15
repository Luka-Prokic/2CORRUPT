import { View } from "react-native";
import { HEIGHT, WIDTH } from "../../features/Dimensions";
import { CreateTemplateView } from "./CreateTemplateView";
import { UIView } from "../ui/UIView";

export function TemplateView() {
  return (
    <UIView type="template">
      {/* <BackHomeButton />   */}
      <View
        style={[
          {
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: HEIGHT - 162,
            width: WIDTH,
          },
        ]}
      >
        <CreateTemplateView />
      </View>
    </UIView>
  );
}
