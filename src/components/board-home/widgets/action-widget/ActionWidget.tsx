import { WidgetFlatList } from "../../../ui/sliders/WidgetFlatList";
import { ActionRenderItem } from "./ActionRenderItem";
import { useWorkoutStore } from "../../../../stores/workout";
import { useMemo, useState } from "react";

export type ActionItem = {
  id: string;
};

export const ACTION_ITEMS: ActionItem[] = [
  { id: "active-session" },
  { id: "water-consumption" },
  { id: "creatine-consumption" },
];

export function ActionWidget() {
  const { activeSession } = useWorkoutStore();

  const [focusedIndex, setFocusedIndex] = useState(0);

  const actionItems = useMemo(() => {
    return ACTION_ITEMS.filter(
      (item) =>
        item.id !== "active-session" ||
        (item.id === "active-session" && activeSession)
    );
  }, [activeSession]);

  return (
    <WidgetFlatList
      data={actionItems}
      onSelect={(index) => {
        setFocusedIndex(index);
      }}
      renderItem={({ item, index }) => (
        <ActionRenderItem item={item} focused={index === focusedIndex} />
      )}
    />
  );
}
