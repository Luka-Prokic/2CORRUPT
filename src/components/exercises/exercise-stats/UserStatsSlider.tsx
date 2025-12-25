import { useSettingsStore } from "../../../stores/settingsStore";
import { ExerciseInfo } from "../../../stores/workout/types";
import { WIDTH } from "../../../utils/Dimensions";
import { LabeledValue } from "../../ui/misc/LabeledValue";
import { CenterCardSlider } from "../../ui/sliders/CenterCardSlider";

const USER_STATS_SLIDER_DATA = [
  {
    title: "PR",
    value: 0,
  },
  {
    title: "PR Reps",
    value: 0,
  },
  {
    title: "Max Reps",
    value: 0,
  },
  {
    title: "Total Sets",
    value: 0,
  },
  {
    title: "Total Reps",
    value: 0,
  },
  {
    title: "Times Used",
    value: 0,
  },
];

interface UserStatsSliderProps {
  exercise: ExerciseInfo;
}

export function UserStatsSlider({ exercise }: UserStatsSliderProps) {
  const { theme } = useSettingsStore();

  return (
    <CenterCardSlider
      data={USER_STATS_SLIDER_DATA}
      sliderWidth={WIDTH}
      animationType="flat"
      cardWidth={WIDTH / 3}
      cardHeight={WIDTH / 3}
      selectedIndex={1}
      selectedCardIndex={1}
      initialScrollIndex={1}
      getItemLayout={(_, index) => ({
        length: WIDTH / 3,
        offset: (WIDTH / 3) * index,
        index,
      })}
      hapticFeedback
      hideDots
      card={({ item }) => <UserStatsCard item={item} />}
    />
  );
}

function UserStatsCard({
  item,
}: {
  item: (typeof USER_STATS_SLIDER_DATA)[number];
}) {
  return (
    <LabeledValue
      label={item.title}
      value={item.value}
      align="center"
      style={{
        width: WIDTH / 3,
        height: WIDTH / 3,
        justifyContent: "center",
        alignItems: "center",
      }}
    />
  );
}
