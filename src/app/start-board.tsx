import { Stack } from "expo-router";
import { Fragment } from "react";
import { ScreenContent } from "../components/ui/utils/ScreenContent";
import { ModalBackButton } from "./_layout";
import { TemplatesCardList } from "../components/templates/TemplatesCardList";
import { ScreenView } from "../components/ui/containers/ScreenView";
import { useTranslation } from "react-i18next";
import { BigText } from "../components/ui/text/BigText";
import { WIDTH } from "../features/Dimensions";

export default function StartBoard() {
  const { t } = useTranslation();
  return (
    <Fragment>
      <Stack.Screen
        options={{
          headerLeft: () => <ModalBackButton />,
          title: t("start.choose-template"),
        }}
      />

      <ScreenContent edges={["top", "bottom"]} scroll={true}>
        <ScreenView>
          <BigText text={t("templates.your-templates")} />
          <TemplatesCardList sliderWidth={WIDTH} />
        </ScreenView>
      </ScreenContent>
    </Fragment>
  );
}
