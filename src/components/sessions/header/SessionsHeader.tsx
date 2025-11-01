import { BlurView } from "expo-blur";
import { DayPicker } from "./DayPicker";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Text, TouchableOpacity, View } from "react-native";
import { WIDTH } from "../../../features/Dimensions";
import { ModalBackButton } from "../../../app/_layout";
import { useSettingsStore } from "../../../stores/settings";
import { Ionicons } from "@expo/vector-icons";

interface SessionsHeaderProps {
  dateTittle: string;
  currentWeek: Date[];
  weeks: Date[][]; // all weeks
  currentWeekIndex: number; // visible week index
  selectedDate: Date; // currently selected day
  buttonSize: number;
  animatedBackgroundStyle: any;
  onDayPress: (date: Date, dayIndex: number) => void;
  setCurrentWeekIndex: (index: number) => void; // to handle swipe
  isFutureDate: (date: Date) => boolean;
  isToday: (date: Date) => boolean;
}

export function SessionsHeader({
  dateTittle,
  currentWeek,
  weeks,
  currentWeekIndex,
  selectedDate,
  buttonSize,
  animatedBackgroundStyle,
  onDayPress,
  setCurrentWeekIndex,
  isFutureDate,
  isToday,
}: SessionsHeaderProps) {
  const insets = useSafeAreaInsets();
  const { theme, themeMode } = useSettingsStore();

  return (
    <BlurView
      style={{ paddingTop: insets.top, height: WIDTH / 7 + 34 + insets.top }}
      tint={themeMode}
    >
      <View
        style={{
          width: WIDTH,
          flexDirection: "row",
          height: 34,
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <View style={{ paddingHorizontal: 10, width: WIDTH * 0.25 }}>
          <ModalBackButton />
        </View>
        <View
          style={{
            width: WIDTH * 0.5,
            alignItems: "center",
          }}
        >
          <Text
            style={{ fontSize: 18, fontWeight: "600", color: theme.text }}
            adjustsFontSizeToFit
            numberOfLines={1}
          >
            {dateTittle}
          </Text>
        </View>
        <View
          style={{
            paddingHorizontal: 10,
            width: WIDTH * 0.25,
            flexDirection: "row",
            justifyContent: "flex-end",
          }}
        >
          <TouchableOpacity>
            <Ionicons name="calendar-outline" size={28} color={theme.info} />
          </TouchableOpacity>
        </View>
      </View>
      <DayPicker
        key={`${currentWeek}`}
        currentWeek={currentWeek}
        weeks={weeks}
        currentWeekIndex={currentWeekIndex}
        selectedDate={selectedDate}
        buttonSize={buttonSize}
        animatedBackgroundStyle={animatedBackgroundStyle}
        onDayPress={onDayPress}
        setCurrentWeekIndex={setCurrentWeekIndex}
      />
    </BlurView>
  );
}
