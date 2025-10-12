import { useState, useEffect } from "react";
import { PlanedSessionSelect } from "./no-exercise/PlanedSessionSelect";
import { QuickStartSelect } from "./no-exercise/QuickStartSelect";
import { CreateTemplateSelect } from "./no-exercise/CreateTemplateSelect";
import { View } from "react-native";
import { useUIStore } from "../../stores/ui";

export type NoExerciseViewSelected =
  | "planed-session"
  | "quick-start"
  | "create-template"
  | "none";

export function NoExerciseView() {
  const [selected, setSelected] = useState<NoExerciseViewSelected>("none");
  const { isWorkoutView } = useUIStore();
  function handleSelect(selected: NoExerciseViewSelected) {
    setSelected(selected);
  }

  useEffect(() => {
    if (!isWorkoutView) {
      setSelected("none");
    }
  }, [isWorkoutView]);

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "flex-end",
        alignItems: "center",
        paddingBottom: 16,
      }}
    >
      <PlanedSessionSelect onSelect={handleSelect} selected={selected} />
      <QuickStartSelect onSelect={handleSelect} selected={selected} />
      <CreateTemplateSelect onSelect={handleSelect} selected={selected} />
    </View>
  );
}
