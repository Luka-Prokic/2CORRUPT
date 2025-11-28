import { useMemo } from "react";
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
import { NoTamplatesAlert } from "../ui/alerts/NoTamplatesAlert";
import { WIDTH } from "../../features/Dimensions";

interface TemplateFilters {
  name?: string[];
  tags?: string[];
  id?: string;
  updatedAfter?: IsoDateString;
  updatedBefore?: IsoDateString;
  groups?: string[];
}

interface TemplatesCardListProps {
  templates?: WorkoutTemplate[];
  filters?: TemplateFilters;

  cardWidth?: number;
  cardHeight?: number;

  sliderWidth?: number;

  emptyState?: React.ReactNode;
}

export function TemplatesCardList({
  templates: templatesProp,
  filters,
  cardWidth = WIDTH / 3,
  cardHeight = WIDTH / 3,
  sliderWidth = WIDTH,
  emptyState,
}: TemplatesCardListProps) {
  const { startSession } = useWorkoutStore();
  const { setTypeOfView } = useUIStore();
  const storeTemplates = useWorkoutStore((s) => s.templates);
  const templates = templatesProp ?? storeTemplates;

  const filtered = useMemo(() => {
    return templates.filter((t) => {
      // Name
      if (filters?.name) {
        if (
          !filters.name.some((name) =>
            t.name.toLowerCase().includes(name.toLowerCase())
          )
        )
          return false;
      }

      // Tags
      if (filters?.tags?.length) {
        if (!filters.tags.some((tag) => t.tags?.includes(tag))) return false;
      }

      // ID
      if (filters?.id) {
        if (t.id === filters.id) return false;
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

  if (filtered.length === 0) return emptyState ?? <NoTamplatesAlert />;

  return (
    <CenterCardSlider
      data={filtered}
      cardWidth={WIDTH / 2}
      cardHeight={WIDTH / 2}
      sliderWidth={sliderWidth}
      card={({ item }) => (
        <TemplateAlbumCard
          template={item}
          onPress={() => handlePress(item)}
          cardWidth={WIDTH / 2}
          cardHeight={WIDTH / 2}
        />
      )}
    />
  );
}
