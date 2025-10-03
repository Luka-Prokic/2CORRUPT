import React, { useState } from "react";
import { View, Text, Alert } from "react-native";
import { useSettingsStore } from "../../stores/settingsStore"; import Colors from "../../config/constants/Colors";
import Input from "../ui/Input";
import BounceButton from "../ui/buttons/BounceButton";
import CenterContainer from "../ui/containers/CenterContainer";
import TextButton from "../ui/buttons/TextButton";
import { useTranslation } from "react-i18next";

interface UserRegisterProps {
  onRegisterSuccess?: () => void;
  onSwitchToLogin?: () => void;
}

export default function UserRegister({
  onRegisterSuccess,
  onSwitchToLogin,
}: UserRegisterProps) {
  const { themeName } = useSettingsStore(); const theme = Colors[themeName];
  const { t } = useTranslation();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleRegister = async () => {
    setIsLoading(true);
    if (!name || !email || !password || !confirmPassword) {
      Alert.alert("Error", "Please fill in all fields");
      setIsLoading(false);
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert("Error", "Passwords do not match");
      setIsLoading(false);
      return;
    }

    if (password.length < 6) {
      Alert.alert("Error", "Password must be at least 6 characters long");
      setIsLoading(false);
      return;
    }

    try {
      // TODO: Implement actual registration logic
      console.log("Registration attempt:", { name, email, password });

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      Alert.alert("Success", "Account created successfully!");
      onRegisterSuccess?.();
    } catch (error) {
      Alert.alert("Error", "Registration failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <CenterContainer>
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
        {t("dialog.lets-get-started")}.
      </Text>
      <Text
        style={{
          color: theme.grayText,
          fontSize: 16,
          textAlign: "center",
          marginBottom: 40,
        }}
      >
        {t("auth-form.signUpToGetStarted")}
      </Text>

      <View
        style={{
          gap: 20,
        }}
      >
        <Input
          placeholder={t("form.name")}
          value={name}
          onChangeText={setName}
          autoCapitalize="words"
          autoCorrect={false}
          icon="person-outline"
        />

        <Input
          placeholder={t("form.email")}
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
          title={
            isLoading
              ? t("auth-form.creatingAccount")
              : t("auth-form.createAccount")
          }
          color={theme.accent}
          textColor={theme.secondaryText}
          onPress={handleRegister}
          disabled={
            isLoading || !name || !email || !password || !confirmPassword
          }
          style={{
            height: 44,
            borderRadius: 22,
            marginTop: 12,
          }}
        />

        <TextButton
          title={`${t("auth-form.haveAccount")} ${t(
            "auth-form.signIn"
          )}...`}
          onPress={onSwitchToLogin}
          style={{
            marginTop: 22,
          }}
        />
      </View>
    </CenterContainer>
  );
}
