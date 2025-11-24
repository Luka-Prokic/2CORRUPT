import { useMemo, useState } from "react";
import { SplitPlan, WorkoutTemplate } from "../../stores/workout/types";
import { useWorkoutStore } from "../../stores/workout/useWorkoutStore";
import { useTranslation } from "react-i18next";
import { mockTags } from "../../components/view-template/TagTextLayout";

export function useFilterTemplates() {
  const { templates, splitPlans } = useWorkoutStore();
  const { t } = useTranslation();

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTag, setSelectedTag] = useState("-"); // "-" means no tag filter
  const [selectedSplit, setSelectedSplit] = useState("-"); // "-" means no split filter

  const availableSplits = useMemo(() => {
    if (!splitPlans || splitPlans.length === 0) return ["-"];
    return ["-", ...splitPlans.map((s: SplitPlan) => s.name)];
  }, [splitPlans]);

  const templatesFiltered = useMemo(() => {
    return templates
      .filter((tpl: WorkoutTemplate) => {
        // Search query
        const translatedName = t(`templates.${tpl.name}`);
        const nameToSearch = [tpl.name, translatedName];
        const matchesSearch = nameToSearch.some((name) =>
          name.toLowerCase().includes(searchQuery.toLowerCase())
        );

        // Tag filter
        const matchesTag =
          selectedTag === "-" || tpl.tags?.includes(selectedTag);

        // Split filter
        const matchesSplit =
          selectedSplit === "-" ||
          splitPlans.some((s: SplitPlan) => {
            if (s.name !== selectedSplit) return false;
            return s.split.some((day) =>
              day.workouts.some((w) => w.templateId === tpl.id)
            );
          });

        return matchesSearch && matchesTag && matchesSplit;
      })
      .sort((a, b) => a.name.localeCompare(b.name));
  }, [templates, splitPlans, searchQuery, selectedTag, selectedSplit, t]);

  return {
    templatesFiltered,
    searchQuery,
    setSearchQuery,
    selectedTag,
    setSelectedTag,
    selectedSplit,
    setSelectedSplit,
    availableTags: ["-", ...mockTags],
    availableSplits,
  };
}
