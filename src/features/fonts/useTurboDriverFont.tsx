import { useFonts } from "expo-font";

export function useTurboDriverFont (){
    const [fontsLoaded] = useFonts({
        "Turbo Driver Italic": require("../../../assets/fonts/Turbo Driver Italic.otf"),
    });

    return fontsLoaded ? { fontFamily: "Turbo Driver Italic" } : {};
};
