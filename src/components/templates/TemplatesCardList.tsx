import { useWorkoutStore, WorkoutTemplate } from "../../stores/workout";
import { CenterCardSlider } from "../ui/sliders/CenterCardSlider";
import { TemplateAlbumCard } from "./cards/TemplateAlbumCard";
import { router } from "expo-router";
import { useUIStore } from "../../stores/ui";
import { NoTamplatesAlert } from "../ui/alerts/NoTamplatesAlert";
import { WIDTH } from "../../features/Dimensions";
import {
  TemplateShowBy,
  useTemplateShowBy,
} from "../../features/filter/useTempalteShowBy";

interface TemplatesCardListProps {
  templates?: WorkoutTemplate[];
  showBy?: TemplateShowBy;

  sliderWidth?: number;

  useType?: "startSession" | "addToSession" | "addToTemplate" | "preview";
}

export function TemplatesCardList({
  templates: templatesProp,
  showBy,
  sliderWidth = WIDTH,
  useType = "preview",
}: TemplatesCardListProps) {
  const {
    startSession,
    updateTemplateField,
    updateSessionField,
    activeSession,
    activeTemplate,
    setActiveExercise,
  } = useWorkoutStore();
  const { setTypeOfView } = useUIStore();
  const storeTemplates = useWorkoutStore((s) => s.templates);
  const templates = templatesProp ?? storeTemplates;
  const filteredTemplates = useTemplateShowBy(templates, showBy);

  function handlePress(template: WorkoutTemplate) {
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

  return (
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
          <NoTamplatesAlert style={{ width: sliderWidth, height: WIDTH / 3 }} />
        ) : null
      }
      card={({ item }) => (
        <TemplateAlbumCard
          template={item}
          onPress={() => handlePress(item)}
          cardWidth={WIDTH / 3}
          cardHeight={WIDTH / 3}
        />
      )}
    />
  );
}
