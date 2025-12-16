import { hexToRGBA } from "../../../../utils/HEXtoRGB";
import { WidgetFlatList } from "../../../ui/sliders/WidgetFlatList";
import { ActionRenderItem } from "./ActionRenderItem";
import { useSettingsStore } from "../../../../stores/settingsStore";
import { useWorkoutStore } from "../../../../stores/workout";
import { useMemo } from "react";

export type ActionItem = {
  id: string;
};

export const ACTION_ITEMS: ActionItem[] = [
  { id: "active-session" },
  { id: "water-consumption" },
  { id: "creatine-consumption" },
];

export function ActionWidget() {
  const { theme } = useSettingsStore();
  const { activeSession } = useWorkoutStore();

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
      renderItem={({ item }) => <ActionRenderItem item={item} />}
      style={{
        backgroundColor: hexToRGBA(theme.thirdBackground, 0.6),
      }}
    />
  );
}
