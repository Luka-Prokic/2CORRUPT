import { StateCreator } from "zustand";
import { WorkoutStore, WorkoutTemplate,  TemplateSlice, SessionExercise } from "../types";
import { nanoid } from "nanoid/non-secure";

/**
 * Template slice: manages workout templates and selection
 */
export const createTemplateSlice: StateCreator<WorkoutStore, [], [], TemplateSlice> = (set, get) => ({
  templates: [],
  activeTemplateId: null,

  createTemplate: (name: string, description: string | undefined, layout: SessionExercise[]) => {
    const newTemplate: WorkoutTemplate = {
      id: `template-${nanoid()}`,
      name,
      description,
      version: 1,
      createdAt: new Date().toISOString(),
      layout,
    };
    set((state) => ({ templates: [...state.templates, newTemplate] }));
    return newTemplate.id;
  },

  updateTemplate: (templateId: string, updates: Partial<WorkoutTemplate>) => {
    set((state) => ({
      templates: state.templates.map((template: WorkoutTemplate) =>
        template.id === templateId
          ? {
              ...template,
              ...updates,
              version: template.version + 1,
              updatedAt: new Date().toISOString(),
            }
          : template
      ),
    }));
  },

  deleteTemplate: (templateId: string) => {
    set((state) => ({
      templates: state.templates.filter((template: WorkoutTemplate) => template.id !== templateId),
      activeTemplateId: state.activeTemplateId === templateId ? null : state.activeTemplateId,
    }));
  },

  getTemplateById: (templateId: string) => {
    const { templates } = get();
    return templates.find((template: WorkoutTemplate) => template.id === templateId) || null;
  },
  

  setActiveTemplate: (templateId: string) => set({ activeTemplateId: templateId }),
});