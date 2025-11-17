import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { ViewStyle } from "react-native";
import { WorkoutTemplate } from "../../stores/workout/types";
import { SearchBar } from "../ui/input/SearchBar";
import { useWorkoutStore } from "../../stores/workout";

interface TemplateFilterProps {
  setFilteredTemplates: (templates: WorkoutTemplate[]) => void;
  style?: ViewStyle | ViewStyle[];
}

export function TemplateFilter({
  setFilteredTemplates,
  style,
}: TemplateFilterProps) {
  const { t } = useTranslation();
  const { templates } = useWorkoutStore();
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    setFilteredTemplates(
      templates.filter((template) =>
        template.name.toLowerCase().includes(searchQuery.toLowerCase())
      )
    );
  }, [searchQuery, templates.length]);

  return (
    <SearchBar
      value={searchQuery}
      onChangeText={setSearchQuery}
      placeholder={t("templates.search")}
      style={{ marginHorizontal: 16, ...style }}
    />
  );
}
