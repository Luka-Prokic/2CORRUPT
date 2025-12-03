import { Stack } from "expo-router";
import { Fragment } from "react";
import { ScreenContent } from "../components/ui/utils/ScreenContent";
import { ModalBackButton } from "./_layout";
import { TemplatesCardList } from "../components/templates/TemplatesCardList";
import { ScreenView } from "../components/ui/containers/ScreenView";
import { useTranslation } from "react-i18next";
import { BigText } from "../components/ui/text/BigText";
import { WIDTH } from "../features/Dimensions";
import { View } from "react-native";

export default function StartBoard() {
  const { t } = useTranslation();

  return (
    <Fragment>
      <Stack.Screen
        options={{
          headerLeft: () => <ModalBackButton />,
          title: t("start.pick-template"),
        }}
      />

      <ScreenContent edges={["top"]} scroll={true}>
        <ScreenView style={{ gap: 32 }}>
          <View style={{ gap: 16 }}>
            <BigText text={t("templates.made-by-you")} />
            <TemplatesCardList
              sliderWidth={WIDTH}
              showBy={{ userMadeOnly: true }}
              useType="startSession"
            />
          </View>

          <View style={{ gap: 16 }}>
            <BigText text={t("templates.made-by-app")} />
            <TemplatesCardList
              sliderWidth={WIDTH}
              showBy={{ appMadeOnly: true }}
              useType="startSession"
            />
          </View>
        </ScreenView>
      </ScreenContent>
    </Fragment>
  );
}
