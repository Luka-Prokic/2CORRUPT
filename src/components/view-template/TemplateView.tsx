import { View } from "react-native";
import { HEIGHT, WIDTH } from "../../features/Dimensions";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { CreateTemplateView } from "./CreateTemplateView";
import { UIView } from "../ui/UIView";
import { BackHomeButton } from "../view-home/BackHomeButton";

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
        <KeyboardAwareScrollView
          contentContainerStyle={{
            flexGrow: 1,
          }}
          enableOnAndroid
          enableAutomaticScroll={true}
          extraScrollHeight={0}
          keyboardOpeningTime={0}
          scrollEnabled={false}
        >
          <CreateTemplateView />
        </KeyboardAwareScrollView>
      </View>
    </UIView>
  );
}
