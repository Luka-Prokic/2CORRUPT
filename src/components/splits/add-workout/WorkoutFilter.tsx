import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { View, ViewStyle } from "react-native";
import { WorkoutTemplate } from "../../../stores/workout/types";
import { SearchBar } from "../../ui/input/SearchBar";
import { useWorkoutStore } from "../../../stores/workout/useWorkoutStore";
import { useFilterTemplates } from "../../../features/workout/useFilterTemplates";

interface WorkoutFilterProps {
  setFilteredTemplates: (templates: WorkoutTemplate[]) => void;
  style?: ViewStyle | ViewStyle[];
}

export function WorkoutFilter({
  setFilteredTemplates,
  style,
}: WorkoutFilterProps) {
  const { t } = useTranslation();
  const { templates } = useWorkoutStore();
  const { templatesFiltered, searchQuery, setSearchQuery } =
    useFilterTemplates();

  useEffect(() => {
    setFilteredTemplates(templatesFiltered);
  }, [searchQuery, templates]);

  if (templates.length === 0) return null;
  return (
    <View style={style}>
      <SearchBar
        value={searchQuery}
        onChangeText={setSearchQuery}
        placeholder={t("templates.search")}
        style={{ marginHorizontal: 16, ...style }}
      />
    </View>
  );
}
