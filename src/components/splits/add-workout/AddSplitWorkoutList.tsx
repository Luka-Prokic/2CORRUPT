import { WorkoutTemplate } from "../../../stores/workout/types";
import { AddSplitWorkoutCard } from "./AddSplitWorkoutCard";
import { SwapSplitWorkoutCard } from "./SwapSplitWorkoutCard";
import { TemplateSectionList } from "../../templates/TempalteSectionList";

interface AddSplitWorkoutListProps {
  filteredTemplates: WorkoutTemplate[];
  selectedTemplates: WorkoutTemplate[];
  setSelectedTemplates: (templates: WorkoutTemplate[]) => void;
  maxSelection?: number;
  swapTemplate?: WorkoutTemplate;
}

export function AddSplitWorkoutList({
  filteredTemplates,
  selectedTemplates,
  setSelectedTemplates,
  maxSelection,
  swapTemplate,
}: AddSplitWorkoutListProps) {
  function handleSelectWorkout(template: WorkoutTemplate) {
    // If not full → append
    if (!maxSelection || selectedTemplates.length < maxSelection) {
      setSelectedTemplates([...selectedTemplates, template]);
      return;
    }

    // If full → replace last one
    const updated = [...selectedTemplates];
    updated[updated.length - 1] = template;

    setSelectedTemplates(updated);
  }

  function handleUnselectTemplate(template: WorkoutTemplate) {
    setSelectedTemplates(selectedTemplates.filter((t) => t.id !== template.id));
  }

  return (
    <TemplateSectionList
      templates={filteredTemplates}
      renderCard={(template) =>
        swapTemplate ? (
          <SwapSplitWorkoutCard
            template={template}
            onSelect={handleSelectWorkout}
            selectedTemplates={selectedTemplates}
            disabled={template.id === swapTemplate.id}
          />
        ) : (
          <AddSplitWorkoutCard
            template={template}
            onSelect={handleSelectWorkout}
            unSelect={handleUnselectTemplate}
            selectedTemplates={selectedTemplates}
          />
        )
      }
    />
  );
}
