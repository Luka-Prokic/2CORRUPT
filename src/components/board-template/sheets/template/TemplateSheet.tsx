import { useWorkoutStore } from "../../../../stores/workout";
import { HEIGHT, WIDTH } from "../../../../features/Dimensions";
import { TemplateNameEditor } from "../../../view-template/TemplateNameEditor";
import { TagTextLayout } from "../../../view-template/TagTextLayout";
import { TemplateDescriptionInput } from "../../TemplateDescritionInput";
import { DescriptionText } from "../../../ui/text/DescriptionText";
import { useTranslation } from "react-i18next";
import Animated, { FadeIn, FadeOut } from "react-native-reanimated";

//Testing template zustand
export function TemplateSheet() {
  const { activeTemplate } = useWorkoutStore();
  const { t } = useTranslation();

  if (activeTemplate)
    return (
      <Animated.View
        entering={FadeIn}
        exiting={FadeOut}
        style={{
          width: WIDTH,
          height: HEIGHT - 200,
          paddingHorizontal: 16,
        }}
      >
        <TemplateNameEditor templateId={activeTemplate.id} />
        <DescriptionText
          text={t("template-board.template-name")}
          style={{ marginBottom: 16, marginTop: 8 }}
        />
        <TemplateDescriptionInput style={{ height: 144 }} />
        <DescriptionText
          text={t("template-board.template-description")}
          style={{ marginBottom: 16, marginTop: 8 }}
        />
        <TagTextLayout fontSize={22} />
        <DescriptionText
          text={t("template-board.select-tags")}
          style={{ marginTop: 8 }}
        />
      </Animated.View>
    );
}
