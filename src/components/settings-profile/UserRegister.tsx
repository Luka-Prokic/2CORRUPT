import { useState, useRef } from "react";
import { View, Alert, TextInput } from "react-native";
import { useSettingsStore } from "../../stores/settingsStore";
import { Input } from "../ui/input/Input";
import { BounceButton } from "../ui/buttons/BounceButton";
import { TextButton } from "../ui/buttons/TextButton";
import { useTranslation } from "react-i18next";
import { WIDTH } from "../../utils/Dimensions";
import Animated, { FadeIn, FadeOut } from "react-native-reanimated";
import { IText } from "../ui/text/IText";
import { DescriptionText } from "../ui/text/DescriptionText";

interface UserRegisterProps {
  onRegisterSuccess?: () => void;
  onSwitchToLogin?: () => void;
}

export function UserRegister({
  onRegisterSuccess,
  onSwitchToLogin,
}: UserRegisterProps) {
  const { theme } = useSettingsStore();
  const { t } = useTranslation();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // 👇 refs for sequential focusing
  const emailRef = useRef<TextInput>(null);
  const passwordRef = useRef<TextInput>(null);

  const handleRegister = async () => {
    setIsLoading(true);

    if (!name || !email || !password) {
      Alert.alert("Error", "Please fill in all fields");
      setIsLoading(false);
      return;
    }

    if (password.length < 6) {
      Alert.alert("Error", "Password must be at least 6 characters long");
      setIsLoading(false);
      return;
    }

    try {
      console.log("Registration attempt:", { name, email, password });

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
    <Animated.View
      entering={FadeIn}
      exiting={FadeOut}
      style={{ padding: 16, width: WIDTH, gap: 16 }}
    >
      <IText
        text={t("dialog.lets-get-started")}
        style={{ textAlign: "center" }}
      />

      <DescriptionText
        text={t("auth-form.signUpToGetStarted")}
        style={{ marginTop: 16 }}
      />

      {/* NAME */}
      <Input
        placeholder={t("form.name")}
        value={name}
        onChangeText={setName}
        autoCapitalize="words"
        autoCorrect={false}
        icon="person-outline"
        returnKeyType="next"
        blurOnSubmit={false}
        onSubmitEditing={() => emailRef.current?.focus()}
      />

      {/* EMAIL */}
      <Input
        ref={emailRef}
        placeholder={t("form.email")}
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
        autoCorrect={false}
        icon="mail-outline"
        returnKeyType="next"
        blurOnSubmit={false}
        onSubmitEditing={() => passwordRef.current?.focus()}
      />

      {/* PASSWORD */}
      <Input
        ref={passwordRef}
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
        returnKeyType="done"
        blurOnSubmit={false}
        onSubmitEditing={handleRegister}
      />
      {/* BUTTON */}
      <BounceButton
        title={
          isLoading
            ? t("auth-form.creatingAccount")
            : t("auth-form.createAccount")
        }
        color={theme.accent}
        textColor={theme.secondaryText}
        onPress={handleRegister}
        disabled={isLoading || !name || !email || !password}
        style={{
          height: 44,
          borderRadius: 22,
          marginTop: 16,
        }}
      />

      <TextButton
        text={`${t("auth-form.haveAccount")} ${t("auth-form.signIn")}...`}
        onPress={onSwitchToLogin}
        style={{ marginTop: 16 }}
      />
    </Animated.View>
  );
}
