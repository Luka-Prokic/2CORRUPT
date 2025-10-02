import React from "react";
import { View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useThemeStore } from "../../stores/themeStore";
import Colors from "../../config/constants/Colors";
import { useNavigation } from "@react-navigation/native";
import IButton from "../ui/buttons/IButton";

interface ProfileButtonProps {
  onPress?: () => void;
}

export default function ProfileButton({ onPress }: ProfileButtonProps) {
  const { themeName } = useThemeStore();
  const theme = Colors[themeName];
  const navigation = useNavigation();

  const handlePress = () => {
    if (onPress) {
      onPress();
    } else {
      navigation.navigate("Profile" as never);
    }
  };

  return (
    <IButton
      onPress={handlePress}
      style={{
        margin: 10,
        marginRight: 0,
        width: 64,
        height: 64,
        backgroundColor: theme.glow,
        borderRadius: "50%",
        padding: 0,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <View
        style={{
          width: 80,
          height: 82,
          borderRadius: "50%",
          backgroundColor: "transparent",
          justifyContent: "flex-start",
          alignItems: "flex-start",
        }}
      >
        <Ionicons name="person-circle" size={80} color={theme.grayText} />
      </View>
    </IButton>
  );
}
