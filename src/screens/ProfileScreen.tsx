import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import { useSettingsStore } from "../stores/settingsStore";
import { UserLogin } from "../components/profile-settings/UserLogin";
import { UserRegister } from "../components/profile-settings/UserRegister";

export function ProfileScreen() {
  const { theme } = useSettingsStore();
  const [isLogin, setIsLogin] = useState(true);

  const handleLoginSuccess = () => {
    // TODO: Handle successful login
    console.log("Login successful!");
  };

  const handleRegisterSuccess = () => {
    // TODO: Handle successful registration
    console.log("Registration successful!");
  };

  const handleSwitchToRegister = () => {
    setIsLogin(false);
    // TODO: Switch to register component
    console.log("Switch to register");
  };

  const handleSwitchToLogin = () => {
    setIsLogin(true);
    // TODO: Switch to login component
    console.log("Switch to login");
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      {isLogin ? (
        <UserLogin
          onLoginSuccess={handleLoginSuccess}
          onSwitchToRegister={handleSwitchToRegister}
        />
      ) : (
        <UserRegister
          onRegisterSuccess={handleRegisterSuccess}
          onSwitchToLogin={handleSwitchToLogin}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
