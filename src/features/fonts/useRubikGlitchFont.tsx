import { useFonts } from "expo-font";

export function useRubikGlitchFont() {
  const [fontsLoaded] = useFonts({
    "RubikGlitch-Regular": require("../../../assets/fonts/RubikGlitch-Regular.ttf"),
  });

  return fontsLoaded ? { fontFamily: "RubikGlitch-Regular" } : {};
}
