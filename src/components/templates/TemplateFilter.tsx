import { useTranslation } from "react-i18next";
import { View, ViewStyle } from "react-native";
import { WorkoutTemplate } from "../../stores/workout/types";
import { SearchBar } from "../ui/input/SearchBar";
import { FilterFlatList } from "../ui/FilterFlatList";
import { WIDTH } from "../../features/Dimensions";
import { useSettingsStore } from "../../stores/settingsStore";
import { useFilterTemplates } from "../../features/workout/useFilterTemplates";
import { useEffect } from "react";
import * as Haptics from "expo-haptics";
import { useWorkoutStore } from "../../stores/workout/useWorkoutStore";

interface TemplateFilterProps {
  setFilteredTemplates: (templates: WorkoutTemplate[]) => void;
  style?: ViewStyle | ViewStyle[];
}

export function TemplateFilter({
  setFilteredTemplates,
  style,
}: TemplateFilterProps) {
  const { t } = useTranslation();
  const { theme } = useSettingsStore();
  const { templates } = useWorkoutStore();
  const {
    templatesFiltered,
    searchQuery,
    setSearchQuery,
    selectedTag,
    setSelectedTag,
    selectedSplit,
    setSelectedSplit,
    availableTags,
    availableSplits,
  } = useFilterTemplates();

  function handleSelectTag(tag: string) {
    setSelectedTag(tag.toLowerCase());
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Rigid);
  }

  function handleSelectSplit(split: string) {
    setSelectedSplit(split.toLowerCase());
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Rigid);
  }

  useEffect(() => {
    setFilteredTemplates(templatesFiltered);
  }, [searchQuery, selectedTag, selectedSplit]);

  if (templates.length === 0) return null;

  return (
    <View style={style}>
      <SearchBar
        value={searchQuery}
        onChangeText={setSearchQuery}
        placeholder={t("templates.search")}
        style={{ marginHorizontal: 16, ...style }}
      />

      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          marginHorizontal: 16,
          marginBottom: 8,
        }}
      >
        <FilterFlatList
          title={t("templates.tag")}
          data={availableTags}
          onSelect={handleSelectTag}
          itemHeight={50}
          contentContainerStyle={{
            height: 54,
            width: WIDTH * 0.5 - 20,
            paddingVertical: 2,
            backgroundColor: theme.primaryBackground,
            borderTopLeftRadius: 32,
            borderBottomLeftRadius: 32,
            borderRadius: 12,
          }}
        />
        <FilterFlatList
          title={t("splits.split")}
          data={availableSplits}
          onSelect={handleSelectSplit}
          itemHeight={50}
          contentContainerStyle={{
            height: 54,
            width: WIDTH * 0.5 - 20,
            paddingVertical: 2,
            backgroundColor: theme.primaryBackground,
            borderTopRightRadius: 32,
            borderBottomRightRadius: 32,
            borderRadius: 12,
          }}
        />
      </View>
    </View>
  );
}
