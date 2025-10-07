import { Fragment } from "react";
import { View, Text, TouchableOpacity, Animated } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useSettingsStore } from "../../../../stores/settingsStore";
import { BounceButton } from "../../../ui/buttons/BounceButton";
import { useDayLabels } from "../../../../features/Labels";
import { IButton } from "../../../ui/buttons/IButton";

interface DayPickerProps {
  currentWeek: Date[];
  selectedIndex: number;
  buttonSize: number;
  animatedBackgroundStyle: any;
  onDayPress: (date: Date, index: number) => void;
  onPreviousWeek: () => void;
  onNextWeek: () => void;
  isNextWeekDisabled: () => boolean;
  isFutureDate: (date: Date) => boolean;
  isToday: (date: Date) => boolean;
}

export function DayPicker({
  currentWeek,
  selectedIndex,
  buttonSize,
  animatedBackgroundStyle,
  onDayPress,
  onPreviousWeek,
  onNextWeek,
  isNextWeekDisabled,
  isFutureDate,
  isToday,
}: DayPickerProps) {
  const { theme } = useSettingsStore();
  const dayLabels = useDayLabels();

  return (
    <Fragment>
      {/* Week Navigation */}
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 16,
          paddingHorizontal: 8,
          paddingTop: 8,
        }}
      >
        <BounceButton
          style={{
            width: 32,
            height: 32,
            borderRadius: "50%",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: theme.grayText,
          }}
          onPress={onPreviousWeek}
        >
          <Ionicons name="chevron-back" size={20} color={theme.secondaryText} />
        </BounceButton>

        <IButton onPress={() => {}}>
          <Text
            style={{
              fontSize: 18,
              fontWeight: "bold",
              textAlign: "center",
              color: theme.fifthBackground,
            }}
          >
            {currentWeek[0]
              ? currentWeek[0].toLocaleDateString("en-US", {
                  month: "long",
                  year: "numeric",
                })
              : "Loading..."}
          </Text>
        </IButton>

        <BounceButton
          style={{
            width: 34,
            height: 34,
            borderRadius: "50%",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: theme.grayText,
            opacity: isNextWeekDisabled() ? 0.4 : 1,
          }}
          onPress={isNextWeekDisabled() ? undefined : onNextWeek}
        >
          <Ionicons
            name="chevron-forward"
            size={20}
            color={isNextWeekDisabled() ? theme.grayText : theme.secondaryText}
          />
        </BounceButton>
      </View>

      {/* Day Navigator */}
      {currentWeek.length > 0 && (
        <View
          key={`week-container-${currentWeek[0]?.toDateString()}`}
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            position: "relative",
          }}
        >
          {/* Select Circle */}
          <Animated.View
            key={`background-${currentWeek[0]?.toDateString()}`}
            style={[
              {
                position: "absolute",
                borderRadius: "50%",
                zIndex: 1,
                width: buttonSize,
                height: buttonSize,
                backgroundColor: theme.accent,
              },
              animatedBackgroundStyle,
            ]}
          />

          {/* Day Buttons */}
          {currentWeek.map((date: any, index: any) => {
            const isSelected = index === selectedIndex;
            const isFuture = isFutureDate(date);
            const isTodayDate = isToday(date);

            return (
              <TouchableOpacity
                key={`week-${currentWeek[0]?.toDateString()}-day-${date.toDateString()}-${index}`}
                style={{
                  justifyContent: "center",
                  alignItems: "center",
                  borderRadius: 25,
                  zIndex: 2,
                  width: buttonSize,
                  height: buttonSize,
                }}
                onPress={() => onDayPress(date, index)}
                disabled={isFuture}
                activeOpacity={0.7}
              >
                <Text
                  style={{
                    fontSize: 12,
                    marginBottom: 2,
                    color: isFuture
                      ? theme.grayText
                      : isSelected
                      ? theme.background
                      : isTodayDate
                      ? theme.accent
                      : theme.text,
                    fontWeight: isTodayDate ? "bold" : "normal",
                  }}
                >
                  {dayLabels[index]}
                </Text>
                <Text
                  style={{
                    fontSize: 14,
                    color: isFuture
                      ? theme.grayText
                      : isSelected
                      ? theme.background
                      : isTodayDate
                      ? theme.accent
                      : theme.text,
                    fontWeight: isSelected || isTodayDate ? "bold" : "normal",
                  }}
                >
                  {date.getDate()}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
      )}
    </Fragment>
  );
}
