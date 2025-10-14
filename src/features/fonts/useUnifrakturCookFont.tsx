import { useFonts } from "expo-font";

export function useUnifrakturCookFont() {
  const [fontsLoaded] = useFonts({
    "UnifrakturCook-Bold": require("../../../assets/fonts/UnifrakturCook-Bold.ttf"),
  });

  return fontsLoaded ? { fontFamily: "UnifrakturCook-Bold" } : {};
}
