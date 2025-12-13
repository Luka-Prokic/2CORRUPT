import { useTranslation } from "react-i18next";
import { View, ViewStyle } from "react-native";
import { WorkoutTemplate } from "../../stores/workout/types";
import { SearchBar } from "../ui/input/SearchBar";
import { useFilterTemplates } from "../../features/workout/useFilterTemplates";
import { Fragment, useEffect } from "react";
import { useWorkoutStore } from "../../stores/workout/useWorkoutStore";
import { EmptyHeader } from "../ui/containers/EmptyHeader";
import { useWidgetUnit } from "../../features/widgets/useWidgetUnit";
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
  const { fullWidth } = useWidgetUnit();
  const { templatesFiltered, searchQuery, setSearchQuery } =
    useFilterTemplates();

  useEffect(() => {
    setFilteredTemplates(templatesFiltered);
  }, [searchQuery, templates]);

  function content() {
    if (templates.length === 0) return <EmptyHeader />;
    else
      return (
        <Fragment>
          <SearchBar
            value={searchQuery}
            onChangeText={setSearchQuery}
            placeholder={t("templates.search")}
            style={{ marginHorizontal: 16, width: fullWidth, ...style }}
          />
        </Fragment>
      );
  }
  return <View style={style}>{content()}</View>;
}
