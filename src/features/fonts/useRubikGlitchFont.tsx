import { useFonts } from "expo-font";

export const useRubikGlitchFont = () => {
    const [fontsLoaded] = useFonts({
        "RubikGlitch-Regular": require("../../../assets/fonts/RubikGlitch-Regular.ttf"),
    });

    return fontsLoaded ? { fontFamily: "RubikGlitch-Regular" } : {};
};
