import { Fragment } from "react";
import { Stack } from "expo-router";
import { ScreenContent } from "../../components/ui/utils/ScreenContent";
import { useTranslation } from "react-i18next";
import { ScreenView } from "../../components/ui/containers/ScreenView";
import { ModalExitButton } from "../_layout";
import { FlatList } from "react-native";
import { DescriptionText } from "../../components/ui/text/DescriptionText";
import { EmptyFooter } from "../../components/ui/containers/EmptyFooter";
import { generalSettingsConfig } from "../../config/settings/generalSettings";
import { SettingsField } from "../../components/ui/settings-fields/SettingsField";
import { IText } from "../../components/ui/text/IText";
import { ModalView } from "../../components/ui/containers/ModalView";

export default function AppSettings() {
  const { t } = useTranslation();

  return (
    <Fragment>
      <Stack.Screen
        options={{
          headerTitle: () => (
            <IText
              text={t("settings.app")}
              adjustsFontSizeToFit
              numberOfLines={1}
            />
          ),
          headerRight: () => <ModalExitButton />,
        }}
      />

      <ScreenContent>
        <ModalView style={{ paddingHorizontal: 16, gap: 16 }}>
          <DescriptionText text={t("settings.general-settings.description")} />
          <FlatList
            data={generalSettingsConfig}
            scrollEnabled={false}
            contentContainerStyle={{ gap: 8 }}
            renderItem={({ item }) => <SettingsField setting={item} />}
            ListFooterComponent={<EmptyFooter />}
          />
        </ModalView>
      </ScreenContent>
    </Fragment>
  );
}
