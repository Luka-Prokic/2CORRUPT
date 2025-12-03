import { useMemo } from "react";
import { IsoDateString, WorkoutTemplate } from "../../stores/workout/types";
import { useUserStore } from "../../stores/userStore";

export interface TemplateShowBy {
  byName?: string[];
  byTags?: string[];
  byId?: string;

  butName?: string[];
  butTags?: string[];
  butId?: string;

  userMadeOnly?: boolean;
  appMadeOnly?: boolean;

  updatedAfter?: IsoDateString;
  updatedBefore?: IsoDateString;
}

export const useTemplateShowBy = (
  templates: WorkoutTemplate[],
  showBy: TemplateShowBy
) => {
  const { user } = useUserStore();
  if (!templates) return [];
  if (!showBy) return templates;

  return useMemo(() => {
    return templates.filter((t) => {
      const tName = t.name.toLowerCase();

      // ---------------------
      // BY FILTERS (must match)
      // ---------------------

      // byName
      if (showBy.byName?.length) {
        const nameMatches = showBy.byName.some((n) =>
          tName.includes(n.toLowerCase())
        );
        if (!nameMatches) return false;
      }

      // byTags
      if (showBy.byTags?.length) {
        const tagMatches = showBy.byTags.some((tag) => t.tags?.includes(tag));
        if (!tagMatches) return false;
      }

      // byId
      if (showBy.byId) {
        if (t.id !== showBy.byId) return false;
      }

      // ---------------------
      // BUT FILTERS (must NOT match)
      // ---------------------

      // butName
      if (showBy.butName?.length) {
        const nameBlocked = showBy.butName.some((n) =>
          tName.includes(n.toLowerCase())
        );
        if (nameBlocked) return false;
      }

      // butTags
      if (showBy.butTags?.length) {
        const tagBlocked = showBy.butTags.some((tag) => t.tags?.includes(tag));
        if (tagBlocked) return false;
      }

      // butId
      if (showBy.butId) {
        if (t.id === showBy.butId) return false;
      }

      // ---------------------
      // USER / APP TEMPLATE FILTERS
      // ---------------------

      if (showBy.userMadeOnly) {
        if (t.userId !== user?.id) return false;
      }

      if (showBy.appMadeOnly) {
        // app-made = no userId
        if (t.userId !== undefined) return false;
      }

      // ---------------------
      // DATE FILTERS
      // ---------------------

      if (showBy.updatedAfter) {
        const updated = t.updatedAt ? new Date(t.updatedAt) : null;
        if (!updated || updated < new Date(showBy.updatedAfter)) return false;
      }

      if (showBy.updatedBefore) {
        const updated = t.updatedAt ? new Date(t.updatedAt) : null;
        if (!updated || updated > new Date(showBy.updatedBefore)) return false;
      }

      return true;
    });
  }, [templates, showBy, user?.id]);
};
