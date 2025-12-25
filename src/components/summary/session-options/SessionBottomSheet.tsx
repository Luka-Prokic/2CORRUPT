import { useState } from "react";
import { BottomSheetModal } from "@gorhom/bottom-sheet";
import { WorkoutSession } from "../../../stores/workout";
import { SessionOptionsView } from "./SessionOptionsView";
import { SessionRemoveView } from "./SessionRemoveView";
import { PullTemplateFromSessionView } from "./PullTemplateFromSessionView";
import { UpdateTemplateView } from "./UpdateTemplateView";
import { PreviewSessionView } from "./PreviewSessionView";
import { IBottomSheet } from "../../ui/IBottomSheet";

export type SessionBottomSheetViews =
  | "options"
  | "make"
  | "update"
  | "remove"
  | "preview"
  | "null";

interface SessionBottomSheetProps {
  session: WorkoutSession;
  startView?: SessionBottomSheetViews;
  closeOnCancel?: boolean;
  ref: React.RefObject<BottomSheetModal>;
}

export const SessionBottomSheet = ({
  session,
  startView = "options",
  closeOnCancel = false,
  ref,
}: SessionBottomSheetProps) => {
  const [view, setView] = useState<SessionBottomSheetViews>(startView);

  function visibleView() {
    switch (view) {
      case "options":
        return (
          <SessionOptionsView session={session} setView={setView} ref={ref} />
        );

      case "preview":
        return (
          <PreviewSessionView session={session} setView={setView} ref={ref} />
        );

      case "make":
        return (
          <PullTemplateFromSessionView
            session={session}
            setView={setView}
            ref={ref}
            closeOnCancel={closeOnCancel}
          />
        );

      case "update":
        return (
          <UpdateTemplateView
            session={session}
            setView={setView}
            ref={ref}
            closeOnCancel={closeOnCancel}
          />
        );

      case "remove":
        return (
          <SessionRemoveView
            session={session}
            setView={setView}
            ref={ref}
            closeOnCancel={closeOnCancel}
          />
        );

      default:
        return null;
    }
  }

  if (session)
    return (
      <IBottomSheet
        ref={ref}
        onDismiss={() => setView(startView)}
        bottomSheetStyle={{ paddingTop: 0 }}
      >
        {visibleView()}
      </IBottomSheet>
    );
  return null;
};
