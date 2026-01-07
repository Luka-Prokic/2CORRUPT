import { View } from "react-native";
import { FlashList } from "@shopify/flash-list";
import { ExerciseTip } from "../../stores/workout";
import { InfoText } from "../ui/text/InfoText";
import { MidText } from "../ui/text/MidText";

interface ExerciseTipsListProps {
  tips: ExerciseTip[];
}

export function ExerciseTipsList({ tips }: ExerciseTipsListProps) {
  return (
    <FlashList
      style={{ width: "100%" }}
      data={tips}
      renderItem={({ item }) => <ExerciseTipItem item={item} />}
    />
  );
}

function ExerciseTipItem({ item }: { item: ExerciseTip }) {
  return (
    <View>
      <MidText text={item.title} />
      <InfoText text={item.tip} />
    </View>
  );
}
