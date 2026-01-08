import { BottomSheetModal } from "@gorhom/bottom-sheet";
import { IBottomSheet } from "../../ui/IBottomSheet";
import { IText } from "../../ui/text/IText";
import { WorkoutSession } from "../../../stores/workout";

interface SessionPreviewBottomSheetProps {
  ref: React.RefObject<BottomSheetModal>;
  session: WorkoutSession;
}

export function SessionPreviewBottomSheet({
  ref,
  session,
}: SessionPreviewBottomSheetProps) {
  return (
    <IBottomSheet ref={ref}>
      <IText text={session.name} />
    </IBottomSheet>
  );
}
