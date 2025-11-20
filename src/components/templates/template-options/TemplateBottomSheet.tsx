import React, { forwardRef, useState } from "react";
import {
  BottomSheetBackdrop,
  BottomSheetModal,
  BottomSheetView,
} from "@gorhom/bottom-sheet";
import { WorkoutTemplate } from "../../../stores/workout";
import { useSettingsStore } from "../../../stores/settingsStore";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { TemplateOptionsView } from "./TemplateOptionsView";
import { TemplateDeleteView } from "./TemplateDeleteView";
import { TemplateCloneView } from "./TemplateCloneView";
import { PreviewTempalteView } from "./PreviewTemplateView";

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
}

export const TemplateBottomSheet = forwardRef<
  BottomSheetModal,
  TemplateBottomSheetProps
>(({ template, startView = "options", onAddToSplit }, ref) => {
  const { theme } = useSettingsStore();
  const insets = useSafeAreaInsets();
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
    <BottomSheetModal
      ref={ref}
      enablePanDownToClose
      enableDismissOnClose
      keyboardBehavior="fillParent"
      keyboardBlurBehavior="restore"
      handleIndicatorStyle={{ backgroundColor: theme.info }}
      backgroundStyle={{ backgroundColor: theme.navBackground }}
      backdropComponent={(props) => (
        <BottomSheetBackdrop
          {...props}
          disappearsOnIndex={-1}
          appearsOnIndex={0}
          pressBehavior="close"
          opacity={0.2}
        />
      )}
      onDismiss={() => setView(startView)}
    >
      <BottomSheetView
        style={[
          {
            flex: 1,
            paddingHorizontal: 16,
            justifyContent: "flex-start",
            borderTopColor: theme.border,
            borderTopWidth: 1,
            paddingBottom: insets.bottom,
          },
        ]}
      >
        {visibleView()}
      </BottomSheetView>
    </BottomSheetModal>
  );
});
