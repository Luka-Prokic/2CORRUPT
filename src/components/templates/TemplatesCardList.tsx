import { useWorkoutStore, WorkoutTemplate } from "../../stores/workout";
import { CenterCardSlider } from "../ui/sliders/CenterCardSlider";
import { TemplateAlbumCard } from "./cards/TemplateAlbumCard";
import { router } from "expo-router";
import { useUIStore } from "../../stores/ui";
import { NoTamplatesAlert } from "../ui/alerts/NoTamplatesAlert";
import { WIDTH } from "../../utils/Dimensions";
import {
  TemplateShowBy,
  useTemplateShowBy,
} from "../../features/filter/useTemplateShowBy";
import { BottomSheetModal } from "@gorhom/bottom-sheet";
import { Fragment, useRef, useState } from "react";
import { StartWorkoutBottomSheet } from "../splits/planned-workout/StartWorkoutBottomSheet";
import { useTranslation } from "react-i18next";

interface TemplatesCardListProps {
  templates?: WorkoutTemplate[];
  showBy?: TemplateShowBy;

  sliderWidth?: number;

  useType?: "startSession" | "addToSession" | "addToTemplate" | "preview";
  useBottomSheet?: boolean;
}

export function TemplatesCardList({
  templates: templatesProp,
  showBy,
  sliderWidth = WIDTH,
  useType = "preview",
  useBottomSheet = true,
}: TemplatesCardListProps) {
  const { t } = useTranslation();
  const {
    startSession,
    updateTemplateField,
    updateSessionField,
    activeSession,
    activeTemplate,
    setActiveExercise,
    getTemplateById,
  } = useWorkoutStore();
  const { setTypeOfView } = useUIStore();
  const storeTemplates = useWorkoutStore((s) => s.templates);
  const templates = templatesProp ?? storeTemplates;
  const filteredTemplates = useTemplateShowBy(templates, showBy);
  const ref = useRef<BottomSheetModal>(null);

  const [templateId, setTemplateId] = useState<string>(templates[0]?.id ?? "");

  function handlePress(templateId: string) {
    if (useBottomSheet) {
      setTemplateId(templateId);
      ref.current?.present();
    } else {
      handleUseTemplate(templateId);
    }
  }

  function handleUseTemplate(templateId: string) {
    const template = getTemplateById(templateId);
    if (useType === "preview") {
    } else if (useType === "startSession") {
      startSession(template);
      setTypeOfView("workout");
      router.dismissTo("/");
    } else if (useType === "addToSession") {
      updateSessionField(activeSession.id, "layout", [...template.layout]);
      setActiveExercise(template.layout[0].id);
      setTypeOfView("workout");
      router.dismissTo("/");
    } else if (useType === "addToTemplate") {
      updateTemplateField(activeTemplate.id, "layout", [...template.layout]);
      setActiveExercise(template.layout[0].id);
      setTypeOfView("template");
      router.dismissTo("/");
    }
  }

  function useButtonText() {
    if (useType === "startSession") {
      return t("button.start");
    } else if (useType === "addToSession" || useType === "addToTemplate") {
      return t("start.use-exercises");
    }
  }

  return (
    <Fragment>
      <CenterCardSlider
        data={filteredTemplates}
        cardWidth={
          filteredTemplates.length <= 1 && showBy?.userMadeOnly
            ? sliderWidth
            : WIDTH / 3
        }
        cardHeight={WIDTH / 3}
        sliderWidth={sliderWidth}
        disableScroll={filteredTemplates.length <= 1}
        emptyCard={
          showBy?.userMadeOnly ? (
            <NoTamplatesAlert
              style={{ width: sliderWidth, height: WIDTH / 3 }}
            />
          ) : null
        }
        card={({ item }) => (
          <TemplateAlbumCard
            template={item}
            onPress={() => handlePress(item.id)}
            cardWidth={WIDTH / 3}
            cardHeight={WIDTH / 3}
          />
        )}
      />
      <StartWorkoutBottomSheet
        ref={ref}
        templateId={templateId}
        onPress={() => handleUseTemplate(templateId ?? "")}
        buttonText={useButtonText()}
      />
    </Fragment>
  );
}
