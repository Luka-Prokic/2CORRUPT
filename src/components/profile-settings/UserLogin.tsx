import React, { useState } from "react";
import { View, Text, Alert } from "react-native";
import { useSettingsStore } from "../../stores/settingsStore";
import Input from "../ui/Input";
import BounceButton from "../ui/buttons/BounceButton";
import TextButton from "../ui/buttons/TextButton";
import { useTranslation } from "react-i18next";
import Container from "../ui/containers/Container";

import CorruptTittle from "../corrupt/CorruptTittle";

interface UserLoginProps {
  onLoginSuccess?: () => void;
  onSwitchToRegister?: () => void;
}

export default function UserLogin({
  onLoginSuccess,
  onSwitchToRegister,
}: UserLoginProps) {
  const { theme } = useSettingsStore();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { t } = useTranslation();

  const handleLogin = async () => {
    setIsLoading(true);
    if (!email || !password) {
      Alert.alert("Error", "Please fill in all fields");
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    try {
      console.log("Login attempt:", { email, password });

      await new Promise((resolve) => setTimeout(resolve, 1000));

      Alert.alert("Success", "Login successful!");
      onLoginSuccess?.();
    } catch (error) {
      Alert.alert("Error", "Login failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Container>
      <Text
        style={{
          color: theme.handle,
          fontSize: 16,
          fontWeight: "600",
          letterSpacing: -0.5,
          lineHeight: 24,
          textAlign: "center",
          width: "90%",
          marginHorizontal: "5%",
          marginVertical: 16,
        }}
      >
        {t("auth-form.signIn-description")}
      </Text>
      <Text
        style={{
          color: theme.text,
          fontSize: 36,
          fontWeight: "600",
          letterSpacing: -0.5,
          lineHeight: 42,
          textAlign: "center",
          marginBottom: 8,
        }}
      >
        {t("dialog.welcome-to")} <CorruptTittle fontSize={26} />.
      </Text>

      <Text
        style={{
          color: theme.grayText,
          fontSize: 16,
          textAlign: "center",
          marginBottom: 40,
        }}
      >
        {t("auth-form.signInToAccount")}
      </Text>

      <View
        style={{
          gap: 20,
        }}
      >
        <Input
          placeholder={t("auth-form.email")}
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
          autoCorrect={false}
          icon="mail-outline"
        />

        <Input
          placeholder={t("auth-form.password")}
          value={password}
          onChangeText={setPassword}
          secureTextEntry={!showPassword}
          autoCapitalize="none"
          autoCorrect={false}
          icon="lock-closed-outline"
          showPasswordToggle={true}
          showPassword={showPassword}
          onTogglePassword={() => setShowPassword(!showPassword)}
        />

        <BounceButton
          title={isLoading ? t("auth-form.signingIn") : t("auth-form.signIn")}
          color={theme.accent}
          textColor={theme.secondaryText}
          onPress={handleLogin}
          disabled={isLoading || !email || !password}
          style={{
            height: 44,
            borderRadius: 22,
            marginTop: 12,
          }}
        />

        <TextButton
          title={`${t("auth-form.dontHaveAccount")} ${t(
            "auth-form.createOne"
          )}...`}
          onPress={onSwitchToRegister}
          style={{
            marginTop: 22,
          }}
        />
      </View>
    </Container>
  );
}
