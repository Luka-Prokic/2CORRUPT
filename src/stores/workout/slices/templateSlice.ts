import { StateCreator } from "zustand";
import { nanoid } from "nanoid/non-secure";
import {
  WorkoutStore,
  WorkoutTemplate,
  TemplateSlice,
  SessionExercise,
} from "../types";

export const createTemplateSlice: StateCreator<
  WorkoutStore,
  [],
  [],
  TemplateSlice
> = (set, get) => ({
  templates: [],
  historyTemplates: [],
  activeTemplate: null,

  /**
   * Creates a new template or a copy of an existing template
   * If `template` is passed, we create a new version (draft)
   */
  createTemplate: (template?: WorkoutTemplate) => {
    const newTemplate: WorkoutTemplate = template
      ? {
          ...template,
          id: `template-${nanoid()}`,
          version: template.version + 1,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        }
      : {
          id: `template-${nanoid()}`,
          name: "New Template",
          description: "",
          layout: [],
          version: 1,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        };

    if (template) {
      // Remove old version from templates (drafting) and add to history
      set((state) => {
        const newTemplates = state.templates
          .filter((t) => t.id !== template.id)
          .concat(newTemplate); // add the new version/draft

        return {
          templates: newTemplates,
          historyTemplates: [...state.historyTemplates, template],
          // activeTemplate stays unchanged
        };
      });
    } else {
      // Just add new template to templates, activeTemplate stays unchanged
      set((state) => ({
        templates: [...state.templates, newTemplate],
      }));
    }

    return newTemplate.id;
  },

  editTemplate: (templateId?: string) => {
    const {
      getTemplateById,
      createTemplate,
      setActiveTemplate,
      activeTemplate,
    } = get();
    if (activeTemplate) return;

    let template: WorkoutTemplate | null = null;

    if (templateId) {
      // Get existing template
      template = getTemplateById(templateId);
      if (!template) return null; // invalid id
    } else {
      // No id → create new template in the background
      const newId = createTemplate();
      template = getTemplateById(newId);
    }

    if (template) setActiveTemplate(template);
    return template?.id || null;
  },

  /** Update a specific field on template and increment version */
  updateTemplateField: (
    templateId: string,
    field: keyof WorkoutTemplate,
    value: WorkoutTemplate[keyof WorkoutTemplate]
  ) =>
    set((state) => {
      const updatedTemplates = state.templates.map((t) =>
        t.id === templateId
          ? {
              ...t,
              [field]: value,
              version: t.version + 1,
              updatedAt: new Date().toISOString(),
            }
          : t
      );

      const updatedActiveTemplate =
        state.activeTemplate?.id === templateId
          ? {
              ...state.activeTemplate,
              [field]: value,
              version: state.activeTemplate.version + 1,
              updatedAt: new Date().toISOString(),
            }
          : state.activeTemplate;

      return {
        templates: updatedTemplates,
        activeTemplate: updatedActiveTemplate,
      };
    }),

  /** Confirm changes: keep new version in templates and history */
  confirmTemplate: () => {
    const { clearActiveExercise, activeTemplate } = get();
    set((state) => {
      if (!activeTemplate) return null;
      const confirmedTemplate = activeTemplate;
      return {
        historyTemplates: confirmedTemplate
          ? [...state.historyTemplates, confirmedTemplate]
          : state.historyTemplates,
        activeTemplate: null,
      };
    });
    clearActiveExercise();
  },

  /** Discard changes: restore old template and remove draft */
  discardTemplate: () => {
    const { clearActiveExercise, activeTemplate } = get();
    if (!activeTemplate) return;

    set((state) => {
      const draft = activeTemplate;

      // Check if this template ever existed before (by version or presence in history)
      const previous = state.historyTemplates
        .filter((t) => t.name === draft.name)
        .sort((a, b) => b.version - a.version)[0];

      // Always remove the current one
      const newTemplates = state.templates.filter((t) => t.id !== draft.id);

      // Build new state depending on whether it's new or existing
      const nextState = {
        templates: previous ? [...newTemplates, previous] : newTemplates,
        activeTemplate: null,
        historyTemplates: previous
          ? state.historyTemplates
          : state.historyTemplates.filter((t) => t.id !== draft.id),
      };

      return nextState;
    });

    clearActiveExercise();
  },

  /** Set active template directly */
  setActiveTemplate: (template: WorkoutTemplate) =>
    set({ activeTemplate: template, activeSession: null }),

  /**
   * Add a new exercise to the session layout
   */
  addExerciseToTemplate: (exercise: SessionExercise, afterItemId?: string) => {
    const {
      activeTemplate,
      activeExercise,
      setActiveExercise,
      updateNavigationFlags,
    } = get();
    if (!activeTemplate) return;

    const newExercise: SessionExercise = {
      ...exercise,
    };

    const layout = activeTemplate.layout;
    const insertIndex = afterItemId
      ? layout.findIndex((item: SessionExercise) => item.id === afterItemId) + 1
      : layout.length;

    const updatedLayout = [...layout];
    updatedLayout.splice(insertIndex, 0, newExercise);

    set((state) => ({
      activeTemplate: { ...state.activeTemplate!, layout: updatedLayout },
    }));

    //if layout has no active exercise, set the new exercise as active
    if (!activeExercise) {
      setActiveExercise(newExercise.id);
    }

    //update navigation flags in flowSlice
    updateNavigationFlags();
  },

  /**
   * Remove multiple exercises from a template layout
   */
  removeExercisesFromTemplate: (exerciseIds: string[]) => {
    const {
      activeTemplate,
      activeExercise,
      updateNavigationFlags,
      setActiveExercise,
      clearActiveExercise,
    } = get();
    if (!activeTemplate) return;

    const newLayout = activeTemplate.layout.filter(
      (item: SessionExercise) => !exerciseIds.includes(item.id)
    );

    let newActiveExerciseId = activeExercise?.id;
    if (exerciseIds.includes(activeExercise?.id ?? "")) {
      newActiveExerciseId = newLayout.length > 0 ? newLayout[0].id : null;
    }

    set({
      activeTemplate: { ...activeTemplate, layout: newLayout },
    });

    if (newActiveExerciseId) setActiveExercise(newActiveExerciseId);
    else clearActiveExercise();

    updateNavigationFlags();
  },

  /**
   * Reorder items in a template layout
   */
  reorderTemplateItems: (newOrder: SessionExercise[]) => {
    const { activeTemplate } = get();
    if (!activeTemplate) return;

    set((state) => ({
      activeTemplate: {
        ...state.activeTemplate!,
        layout: newOrder,
      },
    }));
  },

  /** Get template by id */
  getTemplateById: (templateId: string) =>
    get().templates.find((t) => t.id === templateId) || null,
});
