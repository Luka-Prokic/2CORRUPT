import { ScrollView } from "react-native";
import { useSettingsStore } from "../stores/settingsStore";
import { ThemeSettings } from "../components/settings-app/ThemeSettings";
import { IList } from "../components/ui/containers/IList";
import { LanguageSettings } from "../components/settings-app/LanguageSettings";

export function SettingsScreen() {
  const { theme } = useSettingsStore();

  return (
    <ScrollView
      style={{
        backgroundColor: theme.navBackground,
        paddingHorizontal: "5%",
        flex: 1,
        paddingTop: 22,
      }}
    >
      <IList style={{ gap: 16 }} hrStart="None">
        <ThemeSettings />

        <LanguageSettings />
      </IList>
    </ScrollView>
  );
}
