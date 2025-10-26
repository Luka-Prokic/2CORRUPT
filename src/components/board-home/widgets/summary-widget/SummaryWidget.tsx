import { router } from "expo-router";
import { TouchableOpacity } from "react-native";
import { useWidgetUnit } from "../../../../features/widgets/useWidgetUnit";
import { useSettingsStore } from "../../../../stores/settings";
import { hexToRGBA } from "../../../../features/HEXtoRGB";
import { SummaryHeader } from "./SummaryHeader";
import { SummaryFooter } from "./SummaryFooter";
import { ProgressRing } from "../../../ui/misc/ProgressRing";
import { BounceButton } from "../../../ui/buttons/BounceButton";
import { Text } from "react-native";
import { useDracoFont } from "../../../../features/fonts/useDracoFont";
import { useSessionsByDate } from "../../../../features/workout";
import { SummaryWeek } from "./SummaryWeek";

export function SummaryWidget() {
  const { widgetUnit } = useWidgetUnit();
  const { theme } = useSettingsStore();
  const { fontFamily } = useDracoFont();

  const today = new Date();
  const sessionsToday = useSessionsByDate(today);

  function handleWidgetPress() {
    router.push("/sessions");
  }
  return (
    <TouchableOpacity
      onPress={handleWidgetPress}
      style={{
        width: widgetUnit,
        height: widgetUnit,
        borderRadius: 32,
        backgroundColor: hexToRGBA(theme.thirdBackground, 0.6),
        borderWidth: 1,
        borderColor: theme.border,
        padding: 4,
        marginBottom: 8,
        flexDirection: "row",
        flexWrap: "wrap",
      }}
    >
      <SummaryHeader />
      <ProgressRing
        compareWith={sessionsToday.length}
        compareTo={5} //TODO: now its dummy goal, in future change it so user can set it
        content={
          <BounceButton
            style={{
              backgroundColor: "transaprent",
            }}
          >
            <Text
              style={{
                fontSize: 48,
                fontWeight: "bold",
                color: theme.text,
                fontFamily,
              }}
              adjustsFontSizeToFit
              numberOfLines={1}
              minimumFontScale={0.5}
            >
              {sessionsToday.length}
            </Text>
          </BounceButton>
        }
      />
      <SummaryWeek />
      <SummaryFooter />
    </TouchableOpacity>
  );
}
