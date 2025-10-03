import { StateCreator } from "zustand";
import { WorkoutStore, WorkoutTemplate, LayoutItem, TemplateSlice } from "../types";

/**
 * Template slice: manages workout templates and selection
 */
export const createTemplateSlice: StateCreator<WorkoutStore, [], [], TemplateSlice> = (set, get) => ({
  templates: [],
  activeTemplateId: null,

  createTemplate: (name: string, description: string | undefined, layout: LayoutItem[]) => {
    const newTemplate: WorkoutTemplate = {
      id: Date.now().toString(),
      name,
      description,
      version: 1,
      createdAt: new Date().toISOString(),
      layout,
    };
    set((state: any) => ({ templates: [...state.templates, newTemplate] }));
  },

  updateTemplate: (templateId: string, updates: any) => {
    set((state: any) => ({
      templates: state.templates.map((template: any) =>
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
    set((state: any) => ({
      templates: state.templates.filter((template: any) => template.id !== templateId),
      activeTemplateId: state.activeTemplateId === templateId ? null : state.activeTemplateId,
    }));
  },

  setActiveTemplate: (templateId: string) => set({ activeTemplateId: templateId }),
});