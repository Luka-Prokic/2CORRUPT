import { forwardRef, useMemo, useState } from "react";
import {
  BottomSheetBackdrop,
  BottomSheetModal,
  BottomSheetView,
} from "@gorhom/bottom-sheet";
import DateTimePicker from "@react-native-community/datetimepicker";
import { useSettingsStore } from "../../../stores/settingsStore";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Pressable } from "react-native";
import { Text } from "react-native";
import { useTranslation } from "react-i18next";

interface TimePickerBottomSheetProps {
  initialTime: Date;
  onConfirm: (d: Date) => void;
}

export const TimePickerBottomSheet = forwardRef<
  BottomSheetModal,
  TimePickerBottomSheetProps
>(({ initialTime, onConfirm }, ref) => {
  const [value, setValue] = useState(initialTime);
  const { theme } = useSettingsStore();
  const insets = useSafeAreaInsets();
  const { t } = useTranslation();
  const { timeFormat } = useSettingsStore();
  const is24Hour = useMemo(() => {
    return timeFormat === "24h";
  }, [timeFormat]);

  return (
    <BottomSheetModal
      ref={ref}
      enablePanDownToClose
      enableDismissOnClose
      handleIndicatorStyle={{ backgroundColor: theme.info }}
      backgroundStyle={{ backgroundColor: theme.navBackground }}
      backdropComponent={(props) => (
        <BottomSheetBackdrop
          {...props}
          disappearsOnIndex={-1}
          appearsOnIndex={0}
          pressBehavior="close"
          opacity={0.2}
        />
      )}
    >
      <BottomSheetView
        style={{
          flex: 1,
          padding: 16,
          paddingBottom: insets.bottom + 16,
          gap: 24,
        }}
      >
        <DateTimePicker
          value={value}
          mode="time"
          display="spinner"
          is24Hour={is24Hour}
          onChange={(e, d) => {
            if (d) setValue(d);
          }}
        />

        <Pressable
          onPress={() => onConfirm(value)}
          style={{
            padding: 12,
            borderRadius: 12,
            backgroundColor: theme.tint,
            alignItems: "center",
          }}
        >
          <Text
            style={{
              color: theme.secondaryText,
              fontSize: 16,
              fontWeight: "600",
            }}
          >
            {t("button.confirm")}
          </Text>
        </Pressable>
      </BottomSheetView>
    </BottomSheetModal>
  );
});
