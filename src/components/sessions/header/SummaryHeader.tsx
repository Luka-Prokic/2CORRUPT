import { BlurView } from "expo-blur";
import { WeekSlider } from "./WeekSlider";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Text, TouchableOpacity, View } from "react-native";
import { WIDTH } from "../../../features/Dimensions";
import { ModalBackButton } from "../../../app/_layout";
import { useSettingsStore } from "../../../stores/settings";
import { Ionicons } from "@expo/vector-icons";
import { BottomSheetModal } from "@gorhom/bottom-sheet";
import { Fragment, useRef } from "react";
import { SummaryCalendarBottomSheet } from "../calendar/SummaryCalendarBottomSheet";
import { useUIStore } from "../../../stores/ui/useUIStore";
import { useFormatFriendlyDate } from "../../../features/format/useFormatDate";

export function SummaryHeader() {
  const insets = useSafeAreaInsets();
  const { theme, themeMode } = useSettingsStore();
  const calendarBottomSheetRef = useRef<BottomSheetModal>(null);
  const {
    selectedDate,
    setIsExpanded,
    isExpanded,
    weeks,
    currentWeekIndex,
    setCurrentWeekIndex,
    setSelectedDate,
  } = useUIStore();
  const formatFriendlyDate = useFormatFriendlyDate();

  const dateTittle = selectedDate ? formatFriendlyDate(selectedDate) : "";

  function handleExpandPress() {
    setIsExpanded(!isExpanded);
  }

  return (
    <Fragment>
      <BlurView
        style={{
          paddingTop: insets.top,
          height: WIDTH / 7 + 34 + insets.top + 8,
        }}
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
          <View
            style={{
              paddingHorizontal: 4,
              width: WIDTH / 4,
            }}
          >
            <ModalBackButton />
          </View>
          <View
            style={{
              width: WIDTH / 2,
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
              paddingHorizontal: 8,
              gap: 8,
              width: WIDTH / 4,
              flexDirection: "row",
              justifyContent: "flex-end",
            }}
          >
            <TouchableOpacity
              onPress={() => {
                calendarBottomSheetRef.current?.present();
              }}
            >
              <Ionicons name="calendar-outline" size={28} color={theme.info} />
            </TouchableOpacity>

            <TouchableOpacity onPress={handleExpandPress}>
              <Ionicons
                name={isExpanded ? "albums-outline" : "chevron-expand-outline"}
                size={28}
                color={theme.info}
              />
            </TouchableOpacity>
          </View>
        </View>
        <WeekSlider
          weeks={weeks}
          currentWeekIndex={currentWeekIndex}
          setCurrentWeekIndex={setCurrentWeekIndex}
          selectedDate={selectedDate}
          setSelectedDate={setSelectedDate}
        />
      </BlurView>
      <SummaryCalendarBottomSheet ref={calendarBottomSheetRef} />
    </Fragment>
  );
}
