import React, { forwardRef, useMemo, useState } from "react";
import {
  BottomSheetBackdrop,
  BottomSheetModal,
  BottomSheetView,
} from "@gorhom/bottom-sheet";
import { WorkoutTemplate } from "../../../stores/workout";
import { useSettingsStore } from "../../../stores/settingsStore";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { TemplateFirstView } from "./TemplateFirstView";
import { TemplateDeleteView } from "./TemplateDeleteView";
import { TemplateCloneView } from "./TemplateCloneView";

export type TemplateBottomSheetViews = "first" | "clone" | "delete" | "null";

interface TemplateBottomSheetProps {
  template: WorkoutTemplate;
}

export const TemplateBottomSheet = forwardRef<
  BottomSheetModal,
  TemplateBottomSheetProps
>(({ template }, ref) => {
  const { theme } = useSettingsStore();
  const insets = useSafeAreaInsets();
  const snapPoints = useMemo(() => ["40%", "60%", "80%"], []);
  const [view, setView] = useState<TemplateBottomSheetViews>("first");

  const index = view === "first" ? 2 : 1;

  function visibleView() {
    if (view === "first")
      return (
        <TemplateFirstView template={template} setView={setView} ref={ref} />
      );
    if (view === "clone")
      return (
        <TemplateCloneView template={template} setView={setView} ref={ref} />
      );
    if (view === "delete")
      return (
        <TemplateDeleteView template={template} setView={setView} ref={ref} />
      );
    return null;
  }

  return (
    <BottomSheetModal
      ref={ref}
      index={index}
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
      onDismiss={() => setView("first")}
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
