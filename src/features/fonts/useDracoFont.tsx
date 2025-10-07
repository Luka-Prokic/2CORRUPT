import { useFonts } from "expo-font";

export function useDracoFont() {
  const [fontsLoaded] = useFonts({
    Draco: require("../../../assets/fonts/Draco.otf"),
  });

  return fontsLoaded ? { fontFamily: "Draco" } : {};
}
