import { useState } from "react";
import { BottomSheetModal } from "@gorhom/bottom-sheet";
import { WorkoutTemplate } from "../../../stores/workout";
import { TemplateOptionsView } from "./TemplateOptionsView";
import { TemplateDeleteView } from "./TemplateDeleteView";
import { TemplateCloneView } from "./TemplateCloneView";
import { PreviewTempalteView } from "./PreviewTemplateView";
import { IBottomSheet } from "../../ui/IBottomSheet";

export type TemplateBottomSheetViews =
  | "options"
  | "clone"
  | "delete"
  | "preview"
  | "null";

interface TemplateBottomSheetProps {
  template: WorkoutTemplate;
  startView: TemplateBottomSheetViews;
  onAddToSplit: () => void;
  ref: React.RefObject<BottomSheetModal>;
}

export function TemplateBottomSheet({
  template,
  startView = "options",
  onAddToSplit,
  ref,
}: TemplateBottomSheetProps) {
  const [view, setView] = useState<TemplateBottomSheetViews>(startView);

  function visibleView() {
    switch (view) {
      case "options":
        return (
          <TemplateOptionsView
            template={template}
            setView={setView}
            ref={ref}
            onAddToSplit={onAddToSplit}
          />
        );

      case "preview":
        return (
          <PreviewTempalteView
            template={template}
            setView={setView}
            ref={ref}
          />
        );

      case "clone":
        return (
          <TemplateCloneView template={template} setView={setView} ref={ref} />
        );

      case "delete":
        return (
          <TemplateDeleteView template={template} setView={setView} ref={ref} />
        );

      default:
        return null;
    }
  }

  return (
    <IBottomSheet
      ref={ref}
      onDismiss={() => setView(startView)}
      bottomSheetStyle={{ paddingTop: 0 }}
    >
      {visibleView()}
    </IBottomSheet>
  );
}
