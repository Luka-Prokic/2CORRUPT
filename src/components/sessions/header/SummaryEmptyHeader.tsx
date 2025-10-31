import { View } from "react-native";
import { WIDTH } from "../../../features/Dimensions";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export function SummaryEmptyHeader() {
  const insets = useSafeAreaInsets();
  return <View style={{ height: WIDTH / 7 + 34 + insets.top }} />;
}
