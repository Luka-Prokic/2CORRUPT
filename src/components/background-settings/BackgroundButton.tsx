import { Ionicons } from "@expo/vector-icons";
import React, { Fragment, useState } from "react";
import { useTheme } from "../../config/ThemeContext";
import IButton from "../ui/buttons/IButton";
import { Modal, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import BackgroundSettings from "./BackgroundSettings";
import hexToRGBA from "../../hooks/HEXtoRGB";
import { LinearGradient } from "expo-linear-gradient";

interface BackgroundButtonProps {
  onPress?: () => void;
}

export default function BackgroundButton({ onPress }: BackgroundButtonProps) {
  const { theme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);

  const handlePress = () => {
    if (onPress) {
      onPress();
    } else {
      setIsOpen(!isOpen);
    }
  };

  return (
    <Fragment>
      <View
        style={{
          position: "absolute",
          bottom: 22,
          right: 88,
          width: 44,
          height: 44,
          backgroundColor: theme.text,
          alignItems: "center",
          justifyContent: "center",
          shadowColor: theme.shadow || "#000",
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.3,
          shadowRadius: 8,
          elevation: 5,
          borderRadius: 100,
        }}
      >
        <IButton
          onPress={handlePress}
          style={{
            width: 44,
            height: 44,
            borderRadius: 100,
            backgroundColor: theme.accent,
            borderWidth: 1,
            borderColor: theme.border,
          }}
        >
          <Ionicons name="color-fill-outline" size={24} color={theme.border} />
        </IButton>
        <Modal
          visible={isOpen}
          onRequestClose={() => setIsOpen(false)}
          transparent
          animationType="slide"
          style={{
            flex: 1,
            backgroundColor: "rgba(0, 0, 0, 0.5)",
          }}
        >
          <SafeAreaView
            style={{
              flex: 1,
            }}
          >
            <LinearGradient
              colors={[
                hexToRGBA(theme.border, 0),
                hexToRGBA(theme.border, 0.4),
              ]}
              start={{ x: 0, y: 0 }}
              end={{ x: 0, y: 1 }}
              style={{
                height: "100%",
                width: "100%",
              }}
            >
              <TouchableOpacity
                onPress={() => setIsOpen(false)}
                style={{
                  width: "100%",
                  height: "100%",
                  paddingTop: 88,
                  paddingHorizontal: "5%",
                }}
              >
                <BackgroundSettings />
              </TouchableOpacity>
            </LinearGradient>
          </SafeAreaView>
        </Modal>
      </View>
    </Fragment>
  );
}
