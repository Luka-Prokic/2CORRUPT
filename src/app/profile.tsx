import { Fragment, useState } from "react";
import { useSettingsStore } from "../stores/settingsStore";
import { UserLogin } from "../components/settings-profile/UserLogin";
import { UserRegister } from "../components/settings-profile/UserRegister";
import { Stack } from "expo-router";
import { ScreenContent } from "../components/ui/utils/ScreenContent";
import { useTranslation } from "react-i18next";
import { ModalExitButton } from "./_layout";
import { ModalView } from "../components/ui/containers/ModalView";

export default function ProfileScreen() {
  const { theme } = useSettingsStore();
  const { t } = useTranslation();
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
    <Fragment>
      <Stack.Screen
        options={{
          title: t("navigation.profile"),
          headerRight: () => <ModalExitButton />,
        }}
      />
      <ScreenContent
        style={{ backgroundColor: theme.background }}
        keyboardAvoidingView={{
          enabled: true,
          keyboardVerticalOffset: 88,
        }}
      >
        <ModalView>
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
        </ModalView>
      </ScreenContent>
    </Fragment>
  );
}
