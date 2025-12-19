import { WorkoutTemplate } from "../../../stores/workout";
import { Text, TouchableOpacity } from "react-native";
import { useSettingsStore } from "../../../stores/settingsStore";
import { Fragment, useCallback, useRef } from "react";
import { BottomSheetModal } from "@gorhom/bottom-sheet";
import { useWidgetUnit } from "../../../features/widgets/useWidgetUnit";
import { TemplateBottomSheet } from "../template-options/TemplateBottomSheet";
import { AddToSplitBottomSheet } from "../split-options/AddToSplitBottomSheet";
import { useTranslation } from "react-i18next";
import { InfoText } from "../../ui/text/InfoText";
import { DescriptionText } from "../../ui/text/DescriptionText";
import { MidText } from "../../ui/text/MidText";
import { StrobeButton } from "../../ui/buttons/StrobeButton";

interface TemplateSelectCardProps {
  template: WorkoutTemplate;
  selectMode: boolean;
  onSelect: React.Dispatch<React.SetStateAction<WorkoutTemplate[]>>;
  selected: WorkoutTemplate[];
}

export function TemplateSelectCard({
  template,
  selectMode,
  onSelect,
  selected,
}: TemplateSelectCardProps) {
  const { theme } = useSettingsStore();
  const { widgetUnit } = useWidgetUnit();
  const { t } = useTranslation();

  const templateBottomSheetRef = useRef<BottomSheetModal>(null);
  const addToSplitBottomSheetRef = useRef<BottomSheetModal>(null);

  const isSelected = selected.includes(template);

  function handlePress() {
    if (selectMode) {
      onSelect((prevSelected) => {
        const isAlreadySelected = prevSelected.some(
          (t) => t.id === template.id
        );
        if (isAlreadySelected) {
          return prevSelected.filter((t) => t.id !== template.id);
        } else {
          return [...prevSelected, template];
        }
      });
    } else {
      presentModal();
    }
  }

  const tags = template.tags?.map((tag, i) => {
    if (template.tags.length > i + 1) return `${tag}, `;
    return `${tag}`;
  });

  const presentModal = useCallback(() => {
    templateBottomSheetRef.current?.present();
  }, []);

  const presentAddToSplitModal = useCallback(() => {
    templateBottomSheetRef.current?.dismiss();
    addToSplitBottomSheetRef.current?.present();
  }, []);

  return (
    <Fragment>
      <StrobeButton
        onPress={handlePress}
        style={{
          height: widgetUnit,
          width: widgetUnit,
          backgroundColor: theme.secondaryAccent,
          borderColor: theme.secondaryAccent + "40",
          borderWidth: 1,
          borderRadius: 32,
        }}
        styleContent={{
          padding: 16,
          justifyContent: "space-between",
          backgroundColor: isSelected ? theme.caka + "40" : "",
        }}
        strobeDisabled={!isSelected}
      >
        <MidText
          text={`${template.name}`}
          color={theme.secondaryBackground}
          align="left"
          weight="bold"
          numberOfLines={2}
          ellipsizeMode="tail"
          style={{ width: "100%" }}
        />
        <MidText
          text={`v${template.version}`}
          color={theme.secondaryBackground}
          align="left"
          weight="bold"
          numberOfLines={2}
          ellipsizeMode="tail"
          style={{ width: "100%" }}
        />

        <MidText
          text={`${template.id}`}
          color={theme.secondaryBackground}
          align="left"
          weight="bold"
          numberOfLines={4}
          ellipsizeMode="tail"
          style={{ width: "100%" }}
        />

        {/* <DescriptionText
          text={template.tags?.join(", ")}
          color={theme.secondaryText}
          align="left"
        /> 
         <InfoText
          text={`${template.layout?.length} ${
            template.layout?.length > 1
              ? t("templates.exercises")
              : t("templates.exercise")
          }`}
          color={theme.navBackground}
          align="right"
          style={{ width: "100%" }}
        /> */}
      </StrobeButton>

      <TemplateBottomSheet
        template={template}
        ref={templateBottomSheetRef}
        onAddToSplit={presentAddToSplitModal}
        startView="preview"
      />

      <AddToSplitBottomSheet
        templates={[template]}
        ref={addToSplitBottomSheetRef}
      />
    </Fragment>
  );
}
