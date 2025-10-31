import React, { forwardRef, useMemo, useState } from "react";
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

const VIEW_INDEX_MAP: Record<string, number> = {
  options: 2,
  clone: 1,
  delete: 1,
  preview: 3,
};

interface TemplateBottomSheetProps {
  template: WorkoutTemplate;
  startView: TemplateBottomSheetViews;
}

export const TemplateBottomSheet = forwardRef<
  BottomSheetModal,
  TemplateBottomSheetProps
>(({ template, startView = "options" }, ref) => {
  const { theme } = useSettingsStore();
  const insets = useSafeAreaInsets();
  const snapPoints = useMemo(() => ["40%", "60%", "80%"], []);
  const [view, setView] = useState<TemplateBottomSheetViews>(startView);

  function visibleView() {
    switch (view) {
      case "options":
        (ref as React.RefObject<BottomSheetModal>)?.current?.snapToIndex(2);
        return (
          <TemplateOptionsView
            template={template}
            setView={setView}
            ref={ref}
          />
        );

      case "preview":
        (ref as React.RefObject<BottomSheetModal>)?.current?.snapToIndex(3);
        return (
          <PreviewTempalteView
            template={template}
            setView={setView}
            ref={ref}
          />
        );

      case "clone":
        (ref as React.RefObject<BottomSheetModal>)?.current?.snapToIndex(1);
        return (
          <TemplateCloneView template={template} setView={setView} ref={ref} />
        );

      case "delete":
        (ref as React.RefObject<BottomSheetModal>)?.current?.snapToIndex(1);
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
      index={VIEW_INDEX_MAP[view]}
      enablePanDownToClose
      enableDismissOnClose
      keyboardBehavior="fillParent"
      keyboardBlurBehavior="restore"
      snapPoints={snapPoints}
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
