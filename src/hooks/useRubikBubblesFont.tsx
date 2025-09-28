import { useFonts } from "expo-font";

export const useRubikBubblesFont = () => {
  const [fontsLoaded] = useFonts({
    "RubikBubbles-Regular": require("../../assets/fonts/RubikBubbles-Regular.ttf"),
  });

  return fontsLoaded ? { fontFamily: "RubikBubbles-Regular" } : {};
};
