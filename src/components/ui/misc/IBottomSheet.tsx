import React, { useRef, useCallback } from "react";
import { View, StyleSheet } from "react-native";
import BottomSheet from "@gorhom/bottom-sheet";
import { useSettingsStore } from "../../../stores/settings";

type IBottomSheetProps = {
  isVisible: boolean;
  onClose: () => void;
  children: React.ReactNode;
  snapTo?: "bot" | "low" | "mid" | "high" | "top";
  glow?: boolean;
};

const IBottomSheet: React.FC<IBottomSheetProps> = ({
  isVisible,
  onClose,
  children,
  snapTo = "mid",
  glow = true,
}) => {
  const { themeName, theme } = useSettingsStore();
  const bottomSheetRef = useRef<BottomSheet>(null);

  const snapPoints = {
    bot: "20%",
    low: "30%",
    mid: "50%",
    high: "80%",
    top: "90%",
  };

  const handleSheetChanges = useCallback(
    (index: number) => {
      if (index === -1) {
        onClose();
      }
    },
    [onClose]
  );

  return (
    <BottomSheet
      ref={bottomSheetRef}
      index={isVisible ? 0 : -1}
      snapPoints={[snapPoints[snapTo]]}
      onChange={handleSheetChanges}
      enablePanDownToClose
      backgroundStyle={[
        {
          borderTopLeftRadius: 24,
          borderTopRightRadius: 24,
          borderWidth: 1,
          borderColor: "#ccc",
          paddingVertical: 10,
          alignItems: "center",
          justifyContent: "flex-start",
          gap: 10,
          backgroundColor: theme.navBackground,
        },
        glow && styles.glowEffect,
      ]}
    >
      <View style={{ alignItems: "center", marginBottom: 8 }}>
        <View
          style={{
            width: 40,
            height: 4,
            borderRadius: 2,
            backgroundColor: theme.info,
          }}
        />
      </View>
      {children}
    </BottomSheet>
  );
};

const styles = StyleSheet.create({
  glowEffect: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 5,
  },
});

export default IBottomSheet;
