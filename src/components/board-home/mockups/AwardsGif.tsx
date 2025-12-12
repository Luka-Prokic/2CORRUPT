import { useSettingsStore } from "../../../stores/settingsStore";
import { FrameAnimation } from "./FrameAnimation";
import { useWidgetUnit } from "../../../features/widgets/useWidgetUnit";
import { hexToRGBA } from "../../../utils/HEXtoRGB";
import { BounceButton } from "../../ui/buttons/BounceButton";
import { BlurView } from "expo-blur";
import { LinearGradient } from "expo-linear-gradient";
import { Text } from "react-native";
import { View } from "react-native";

export function AwardsGif() {
  const { theme } = useSettingsStore();
  const { widgetUnit } = useWidgetUnit();

  return (
    <View
      style={[
        {
          width: widgetUnit,
          height: widgetUnit,
        },
      ]}
    >
      <LinearGradient
        colors={[
          "transparent",
          "transparent",
          hexToRGBA(theme.tint, 0.2),
          "transparent",
        ]}
        start={{ x: 0, y: 0.1 }}
        end={{ x: 0, y: 0.9 }}
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <BounceButton
          style={{
            width: "100%",
            height: "100%",
            backgroundColor: "transparent",
          }}
          onPress={() => {}}
        >
          {/* <FrameAnimation
            model="nudls"
            width={widgetUnit}
            height={widgetUnit}
          /> */}
          <BlurView
            intensity={10}
            tint="light"
            style={{
              position: "absolute",
              bottom: 2,
              left: 0,
              right: 0,
              overflow: "hidden",
              borderWidth: 1,
              borderColor: theme.border,
              borderRadius: 22,
              height: 44,
            }}
          >
            <LinearGradient
              colors={[
                hexToRGBA(theme.text, 0),
                hexToRGBA(theme.text, 0.3),
                hexToRGBA(theme.text, 0.3),
                hexToRGBA(theme.text, 0.3),
                hexToRGBA(theme.text, 0),
              ]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Text
                style={{
                  color: theme.caka,
                  fontSize: 18,
                  textAlign: "center",
                  fontWeight: "bold",
                }}
              >
                CREATINE
              </Text>
              <Text
                style={{
                  color: theme.secondaryText,
                  fontSize: 12,
                  textAlign: "center",
                  marginTop: 4,
                }}
              >
                30 days streak!
              </Text>
            </LinearGradient>
          </BlurView>
        </BounceButton>
      </LinearGradient>
    </View>
  );
}
