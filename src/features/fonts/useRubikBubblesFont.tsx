import { useFonts } from "expo-font";

export function useRubikBubblesFont() {
  const [fontsLoaded] = useFonts({
    "RubikBubbles-Regular": require("../../../assets/fonts/RubikBubbles-Regular.ttf"),
  });

  return fontsLoaded ? { fontFamily: "RubikBubbles-Regular" } : {};
}
