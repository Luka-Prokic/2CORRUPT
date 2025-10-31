import React, { forwardRef, useMemo, useState } from "react";
import {
  BottomSheetBackdrop,
  BottomSheetModal,
  BottomSheetView,
} from "@gorhom/bottom-sheet";
import { WorkoutSession } from "../../../stores/workout";
import { useSettingsStore } from "../../../stores/settingsStore";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { SessionOptionsView } from "./SessionOptionsView";
import { SessionRemoveView } from "./SessionRemoveView";
import { PullTemplateFromSessionView } from "./PullTemplateFromSessionView";
import { UpdateTemplateView } from "./UpdateTemplateView";
import { PreviewSessionView } from "./PreviewSessionView";

export type SessionBottomSheetViews =
  | "options"
  | "make"
  | "update"
  | "remove"
  | "preview"
  | "null";

const VIEW_INDEX_MAP: Record<string, number> = {
  options: 2,
  make: 1,
  update: 1,
  remove: 1,
  preview: 3,
};

interface SessionBottomSheetProps {
  session: WorkoutSession;
  startView?: SessionBottomSheetViews;
}

export const SessionBottomSheet = forwardRef<
  BottomSheetModal,
  SessionBottomSheetProps
>(({ session, startView = "options" }, ref) => {
  const { theme } = useSettingsStore();
  const insets = useSafeAreaInsets();
  const snapPoints = useMemo(() => ["40%", "60%", "80%"], []);
  const [view, setView] = useState<SessionBottomSheetViews>(startView);

  function visibleView() {
    switch (view) {
      case "options":
        (ref as React.RefObject<BottomSheetModal>)?.current?.snapToIndex(2);
        return (
          <SessionOptionsView session={session} setView={setView} ref={ref} />
        );

      case "preview":
        (ref as React.RefObject<BottomSheetModal>)?.current?.snapToIndex(3);
        return (
          <PreviewSessionView session={session} setView={setView} ref={ref} />
        );

      case "make":
        (ref as React.RefObject<BottomSheetModal>)?.current?.snapToIndex(1);
        return (
          <PullTemplateFromSessionView
            session={session}
            setView={setView}
            ref={ref}
          />
        );

      case "update":
        (ref as React.RefObject<BottomSheetModal>)?.current?.snapToIndex(1);
        return (
          <UpdateTemplateView session={session} setView={setView} ref={ref} />
        );

      case "remove":
        (ref as React.RefObject<BottomSheetModal>)?.current?.snapToIndex(1);
        return (
          <SessionRemoveView session={session} setView={setView} ref={ref} />
        );

      default:
        return null;
    }
  }

  if (session)
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
  return null;
});
