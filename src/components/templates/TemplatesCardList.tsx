import { useMemo } from "react";
import {
  IsoDateString,
  useWorkoutStore,
  WorkoutTemplate,
} from "../../stores/workout";
import { CenterCardSlider } from "../ui/sliders/CenterCardSlider";
import { TemplateAlbumCard } from "./cards/TemplateAlbumCard";
import { router } from "expo-router";
import { useUIStore } from "../../stores/ui";
import { NoTamplatesAlert } from "../ui/alerts/NoTamplatesAlert";
import { WIDTH } from "../../features/Dimensions";
import { useUserStore } from "../../stores/userStore";
import { EmptyTemplateComponent } from "./EmptyTemplateComponent";

interface TemplateFilters {
  name?: string[];
  tags?: string[];
  id?: string;
  userMadeOnly?: boolean;
  appMadeOnly?: boolean;
  updatedAfter?: IsoDateString;
  updatedBefore?: IsoDateString;
  groups?: string[];
}

interface TemplatesCardListProps {
  templates?: WorkoutTemplate[];
  filters?: TemplateFilters;

  sliderWidth?: number;

  emptyState?: React.ReactNode;
}

export function TemplatesCardList({
  templates: templatesProp,
  filters,
  sliderWidth = WIDTH,
  emptyState,
}: TemplatesCardListProps) {
  const { startSession } = useWorkoutStore();
  const { setTypeOfView } = useUIStore();
  const storeTemplates = useWorkoutStore((s) => s.templates);
  const templates = templatesProp ?? storeTemplates;
  const { user } = useUserStore();

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

      // User-made templates only
      if (filters?.userMadeOnly) {
        if (t.userId !== user?.id) return false;
      }

      // App-made templates only
      if (filters?.appMadeOnly) {
        if (t.userId !== undefined) return false;
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

  return (
    <CenterCardSlider
      data={filtered}
      cardWidth={WIDTH / 2}
      cardHeight={WIDTH / 2}
      sliderWidth={sliderWidth}
      disableScroll={filtered.length <= 1}
      emptyCard={
        filters?.userMadeOnly ? (
          <NoTamplatesAlert style={{ width: WIDTH / 2, height: WIDTH / 2 }} />
        ) : null
      }
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
