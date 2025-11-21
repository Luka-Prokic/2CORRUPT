import { useEffect, useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { useSettingsStore } from "../../stores/settingsStore";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export const TimerMock = () => {
  const [sessionTime, setSessionTime] = useState(0);
  const [restTime, setRestTime] = useState<number | null>(null);
  const [isResting, setIsResting] = useState(false);
  const { theme } = useSettingsStore();

  const insets = useSafeAreaInsets();

  // Session timer
  useEffect(() => {
    if (!isResting) {
      const interval = setInterval(() => setSessionTime((t) => t + 1), 1000);
      return () => clearInterval(interval);
    }
  }, [isResting]);

  // Rest timer
  useEffect(() => {
    if (isResting && restTime !== null) {
      const interval = setInterval(() => {
        setRestTime((t) => {
          if (t! <= 1) {
            setIsResting(false);
            return null;
          }
          return t! - 1;
        });
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [isResting, restTime]);

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60)
      .toString()
      .padStart(2, "0");
    const s = (seconds % 60).toString().padStart(2, "0");
    return `${m}:${s}`;
  };

  const startRest = () => {
    setRestTime(30);
    setIsResting(true);
  };

  const addRest = () => restTime !== null && setRestTime(restTime + 15);
  const removeRest = () =>
    restTime !== null && setRestTime(Math.max(0, restTime - 15));

  const backgroundColor = theme.text;
  const textColor = theme.background;

  return (
    <View
      style={{
        width: "100%",
        height: 44,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingHorizontal: 16,
        marginTop: insets.top,
        backgroundColor,
      }}
    >
      <Text style={{ fontSize: 20, fontWeight: "700", color: textColor }}>
        {isResting && restTime !== null
          ? formatTime(restTime)
          : formatTime(sessionTime)}
      </Text>

      {isResting ? (
        <View style={{ flexDirection: "row", gap: 10 }}>
          <TouchableOpacity
            onPress={addRest}
            style={{
              paddingHorizontal: 10,
              paddingVertical: 6,
            }}
          >
            <Text style={{ fontSize: 16, fontWeight: "600", color: textColor }}>
              +15s
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={removeRest}
            style={{
              paddingHorizontal: 10,
              paddingVertical: 6,
            }}
          >
            <Text style={{ fontSize: 16, fontWeight: "600", color: textColor }}>
              -15s
            </Text>
          </TouchableOpacity>
        </View>
      ) : (
        <TouchableOpacity
          onPress={startRest}
          style={{
            paddingHorizontal: 10,
            paddingVertical: 6,
          }}
        >
          <Text style={{ fontSize: 16, fontWeight: "600", color: textColor }}>
            Start Rest
          </Text>
        </TouchableOpacity>
      )}
    </View>
  );
};
