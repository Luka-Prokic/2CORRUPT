import { Fragment } from "react";
import { ActionItem } from "./ActionWidget";
import { WaterConsumptionCard } from "./water-consumption/WaterConsumptionCard";
import { CreatineConsumptionCard } from "./creatine-consumption/CreatineConsumptionCard";
import { ActiveSessionCard } from "./active-session/ActiveSesseionCard";

interface ActionRenderItemProps {
  item: ActionItem;
}

export function ActionRenderItem({ item }: ActionRenderItemProps) {
  return (
    <Fragment>
      {(() => {
        switch (item.id) {
          case "active-session":
            return <ActiveSessionCard />;
          case "creatine-consumption":
            return <CreatineConsumptionCard />;
          case "water-consumption":
            return <WaterConsumptionCard />;
          default:
            return null;
        }
      })()}
    </Fragment>
  );
}
