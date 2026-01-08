import { BottomSheetModal } from "@gorhom/bottom-sheet";
import { IBottomSheet } from "../../ui/IBottomSheet";
import { IText } from "../../ui/text/IText";

interface SessionPreviewBottomSheetProps {
  ref: React.RefObject<BottomSheetModal>;
}

export function SessionChartBottomSheet({
  ref,
}: SessionPreviewBottomSheetProps) {
  return (
    <IBottomSheet ref={ref}>
      <IText text="Session CHART" />
    </IBottomSheet>
  );
}
