import React, { forwardRef, useMemo, useState } from "react";
import {
  BottomSheetBackdrop,
  BottomSheetModal,
  BottomSheetView,
} from "@gorhom/bottom-sheet";
import { WorkoutSession } from "../../../stores/workout";
import { useSettingsStore } from "../../../stores/settingsStore";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { SessionFirstView } from "./SessionFirstView";
import { SessionRemoveView } from "./SessionRemoveView";
import { PullTemplateFromSessionView } from "./PullTemplateFromSessionView";
import { UpdateTemplateView } from "./UpdateTemplateView";

export type SessionBottomSheetViews =
  | "first"
  | "make"
  | "update"
  | "remove"
  | "null";

interface SessionBottomSheetProps {
  session: WorkoutSession;
}

export const SessionBottomSheet = forwardRef<
  BottomSheetModal,
  SessionBottomSheetProps
>(({ session }, ref) => {
  const { theme } = useSettingsStore();
  const insets = useSafeAreaInsets();
  const snapPoints = useMemo(() => ["40%", "60%", "80%"], []);
  const [view, setView] = useState<SessionBottomSheetViews>("first");

  const index = view === "first" ? 2 : 1;

  function visibleView() {
    if (view === "first")
      return <SessionFirstView session={session} setView={setView} ref={ref} />;
    if (view === "make")
      return (
        <PullTemplateFromSessionView
          session={session}
          setView={setView}
          ref={ref}
        />
      );
    if (view === "update")
      return (
        <UpdateTemplateView session={session} setView={setView} ref={ref} />
      );
    if (view === "remove")
      return (
        <SessionRemoveView session={session} setView={setView} ref={ref} />
      );
    return null;
  }

  if (session)
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
  return null;
});
