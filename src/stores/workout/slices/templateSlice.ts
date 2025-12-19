import { StateCreator } from "zustand";
import { nanoid } from "nanoid/non-secure";
import {
  WorkoutStore,
  WorkoutTemplate,
  TemplateSlice,
  SessionExercise,
} from "../types";
import {
  templateLegsDay,
  templatePullDay,
  templatePushDay,
  templateUpperDay,
  templateFullBody,
} from "../../../config/constants/premade";
import { useUserStore } from "../../user/useUserStore";

export const createTemplateSlice: StateCreator<
  WorkoutStore,
  [],
  [],
  TemplateSlice
> = (set, get) => ({
  templates: [
    templatePushDay,
    templatePullDay,
    templateLegsDay,
    templateUpperDay,
    templateFullBody,
  ],

  historyTemplates: [],

  activeTemplate: null,

  createTemplate: (template?: WorkoutTemplate) => {
    const userId = useUserStore.getState().user?.id;
    const date = new Date().toISOString();

    const newTemplate: WorkoutTemplate = template
      ? {
          ...template,
          id: `template-${nanoid()}`,
          createdAt: date,
          updatedAt: date,
        }
      : {
          id: `template-${nanoid()}`,
          primeId: `template-${nanoid()}`,
          name: "New Template",
          description: "",
          layout: [],
          version: 1,
          userId,
          createdAt: date,
          updatedAt: date,
        };

    set((state) => ({
      templates: [...state.templates, newTemplate],
    }));

    return newTemplate.id;
  },

  editTemplate: (templateId?: string) => {
    const { getTemplateById, activeTemplate } = get();
    if (activeTemplate) return null;

    const userId = useUserStore.getState().user?.id;
    const date = new Date().toISOString();

    let draft: WorkoutTemplate;

    if (templateId) {
      const base = getTemplateById(templateId);
      if (!base) return null;

      draft = {
        ...base,
        id: `draft-${base.id}`,
        updatedAt: date,
        userId,
      };
    } else {
      draft = {
        id: `draft-new-${nanoid()}`,
        primeId: `template-${nanoid()}`,
        name: "New Template",
        description: "",
        layout: [],
        version: 1,
        userId,
        createdAt: date,
        updatedAt: date,
      };
    }

    set({ activeTemplate: draft });
    return draft.id;
  },

  confirmTemplate: () => {
    const { activeTemplate, templates, clearActiveExercise } = get();
    if (!activeTemplate) return;

    const date = new Date().toISOString();
    const isEdit = activeTemplate.id.startsWith("draft-");

    let newTemplates: WorkoutTemplate[];

    if (isEdit) {
      const targetId = activeTemplate.id.replace("draft-", "");

      const previous = templates.find((t) => t.id === targetId);
      if (previous) {
        set((state) => ({
          historyTemplates: [...state.historyTemplates, previous],
        }));
      }

      newTemplates = templates.map((t) =>
        t.id === targetId
          ? {
              ...activeTemplate,
              id: targetId,
              updatedAt: date,
            }
          : t
      );
    } else {
      newTemplates = [
        ...templates,
        {
          ...activeTemplate,
          id: `template-${nanoid()}`,
          updatedAt: date,
        },
      ];
    }

    set({
      templates: newTemplates,
      activeTemplate: null,
    });

    clearActiveExercise();
  },

  discardTemplate: () => {
    const { clearActiveExercise } = get();
    set({ activeTemplate: null });
    clearActiveExercise();
  },

  setActiveTemplate: (template: WorkoutTemplate) =>
    set({ activeTemplate: template, activeSession: null }),

  updateTemplateField: (templateId, field, value) =>
    set((state) => {
      if (!state.activeTemplate || state.activeTemplate.id !== templateId)
        return state;

      return {
        activeTemplate: {
          ...state.activeTemplate,
          [field]: value,
          updatedAt: new Date().toISOString(),
        },
      };
    }),

  addExerciseToTemplate: (exercise, afterItemId) => {
    const {
      activeTemplate,
      activeExercise,
      setActiveExercise,
      updateNavigationFlags,
    } = get();
    if (!activeTemplate) return;

    const layout = activeTemplate.layout;
    const insertIndex = afterItemId
      ? layout.findIndex((i) => i.id === afterItemId) + 1
      : layout.length;

    const updatedLayout = [...layout];
    updatedLayout.splice(insertIndex, 0, exercise);

    set({
      activeTemplate: { ...activeTemplate, layout: updatedLayout },
    });

    if (!activeExercise) setActiveExercise(exercise.id);
    updateNavigationFlags();
  },

  removeExercisesFromTemplate: (exerciseIds) => {
    const {
      activeTemplate,
      activeExercise,
      setActiveExercise,
      clearActiveExercise,
      updateNavigationFlags,
    } = get();
    if (!activeTemplate) return;

    const newLayout = activeTemplate.layout.filter(
      (e) => !exerciseIds.includes(e.id)
    );

    let nextActive = activeExercise?.id ?? null;
    if (exerciseIds.includes(activeExercise?.id ?? "")) {
      nextActive = newLayout[0]?.id ?? null;
    }

    set({
      activeTemplate: { ...activeTemplate, layout: newLayout },
    });

    if (nextActive) setActiveExercise(nextActive);
    else clearActiveExercise();

    updateNavigationFlags();
  },

  reorderTemplateItems: (newOrder) => {
    const { activeTemplate } = get();
    if (!activeTemplate) return;

    set({
      activeTemplate: { ...activeTemplate, layout: newOrder },
    });
  },

  deleteTemplate: (templateId) => {
    const { clearActiveExercise, templates, removeTemplateFromSplits } = get();

    removeTemplateFromSplits(templateId);

    set({
      templates: templates.filter((t) => t.id !== templateId),
      activeTemplate: null,
    });

    clearActiveExercise();
  },

  cloneTemplate: (templateId, tempName) => {
    const { templates } = get();
    const user = useUserStore.getState().user;
    const base = templates.find((t) => t.id === templateId);
    if (!base) return;

    const cloned: WorkoutTemplate = {
      ...base,
      id: `template-${nanoid()}`,
      name: tempName,
      userId: user?.id ?? null,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    set({ templates: [...templates, cloned] });
  },

  getTemplateById: (templateId) =>
    get().templates.find((t) => t.id === templateId) || null,
});
