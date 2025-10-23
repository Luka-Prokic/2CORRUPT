import { View } from "react-native";
import { WIDTH } from "../../../features/Dimensions";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export function EmptyHeader() {
  const insets = useSafeAreaInsets();
  return <View style={{ height: insets.top, width: WIDTH }} />;
}
