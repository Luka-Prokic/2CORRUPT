import React, { useMemo } from "react";
import { Text } from "react-native";
import {
  IsoDateString,
  useWorkoutStore,
  WorkoutTemplate,
} from "../../stores/workout";
import { useWidgetUnit } from "../../features/widgets/useWidgetUnit";
import { CenterCardSlider } from "../ui/sliders/CenterCardSlider";
import { TemplateAlbumCard } from "./cards/TemplateAlbumCard";
import { router } from "expo-router";
import { useUIStore } from "../../stores/ui";

interface TemplateFilters {
  name?: string;
  tags?: string[];
  updatedAfter?: IsoDateString;
  updatedBefore?: IsoDateString;
  groups?: string[];
}

interface TemplatesCardListProps {
  templates?: WorkoutTemplate[];
  filters?: TemplateFilters;

  cardWidth?: number;
  cardHeight?: number;

  emptyState?: React.ReactNode;
}

export function TemplatesCardList({
  templates: templatesProp,
  filters,
  cardWidth,
  cardHeight,
  emptyState,
}: TemplatesCardListProps) {
  const { widgetUnit } = useWidgetUnit();
  const { startSession } = useWorkoutStore();
  const { setTypeOfView } = useUIStore();
  const storeTemplates = useWorkoutStore((s) => s.templates);
  const templates = templatesProp ?? storeTemplates;

  const cardWidthValue = cardWidth ?? widgetUnit;
  const cardHeightValue = cardHeight ?? widgetUnit;

  const filtered = useMemo(() => {
    return templates.filter((t) => {
      // Name
      if (filters?.name) {
        if (!t.name.toLowerCase().includes(filters.name.toLowerCase()))
          return false;
      }

      // Tags
      if (filters?.tags?.length) {
        if (!filters.tags.some((tag) => t.tags?.includes(tag))) return false;
      }

      // UpdatedAfter
      if (filters?.updatedAfter) {
        if (
          !t.updatedAt ||
          new Date(t.updatedAt) < new Date(filters.updatedAfter)
        )
          return false;
      }

      // UpdatedBefore
      if (filters?.updatedBefore) {
        if (
          !t.updatedAt ||
          new Date(t.updatedAt) > new Date(filters.updatedBefore)
        )
          return false;
      }

      // Group (metadata.group)
      if (filters?.groups?.length) {
        const group = t.metadata?.group;
        if (!group || !filters.groups.includes(group)) return false;
      }

      return true;
    });
  }, [templates, filters]);

  function handlePress(template: WorkoutTemplate) {
    if (template) startSession(template);
    else startSession(template);
    setTypeOfView("workout");
    router.dismissTo("/");
  }

  if (filtered.length === 0) return emptyState ?? <Text>No templates</Text>;

  return (
    <CenterCardSlider
      data={filtered}
      cardWidth={cardWidthValue}
      cardHeight={cardHeightValue}
      styleSlider={{
        height: cardHeightValue,
      }}
      card={({ item }) => (
        <TemplateAlbumCard template={item} onPress={() => handlePress(item)} />
      )}
    />
  );
}
