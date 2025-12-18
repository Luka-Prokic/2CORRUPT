import { BottomSheetModal } from "@gorhom/bottom-sheet";
import { ChangeCreatineGoal } from "../../../../../settings-app/goals/ChangeCreatineGoal";
import { IBottomSheet } from "../../../../../ui/IBottomSheet";
import { ChangeCreatineFrequency } from "../../../../../settings-app/goals/ChangeCreatineFrequency";
import { useState } from "react";
import { CreatineBottomSheetHeader } from "./CreatineBottomSheetHeader";
import { IText } from "../../../../../ui/text/IText";

export type CreatineBottomSheetMode = "frequency" | "goal" | "label";

interface CreatineBottomSheetProps {
  ref: React.RefObject<BottomSheetModal>;
}

export function CreatineBottomSheet({ ref }: CreatineBottomSheetProps) {
  const [mode, setMode] = useState<CreatineBottomSheetMode>("goal");

  function viewMode() {
    switch (mode) {
      case "frequency":
        return <ChangeCreatineFrequency />;
      case "goal":
        return <ChangeCreatineGoal />;
      case "label":
        return <IText text="100% monohydrate" />;
    }
  }
  return (
    <IBottomSheet ref={ref} onDismiss={() => setMode("goal")}>
      <CreatineBottomSheetHeader mode={mode} setMode={setMode} />
      {viewMode()}
    </IBottomSheet>
  );
}
