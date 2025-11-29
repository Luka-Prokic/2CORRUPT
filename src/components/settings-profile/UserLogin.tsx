import { useState, useRef } from "react";
import { View, Text, Alert, TextInput } from "react-native";
import { useSettingsStore } from "../../stores/settingsStore";
import { Input } from "../ui/input/Input";
import { BounceButton } from "../ui/buttons/BounceButton";
import { TextButton } from "../ui/buttons/TextButton";
import { useTranslation } from "react-i18next";
import { CorruptTittle } from "../corrupt/CorruptTittle";
import { BackgroundText } from "../ui/text/BackgroundText";
import { WIDTH } from "../../features/Dimensions";
import Animated, { FadeIn, FadeOut } from "react-native-reanimated";

interface UserLoginProps {
  onLoginSuccess?: () => void;
  onSwitchToRegister?: () => void;
}

export function UserLogin({
  onLoginSuccess,
  onSwitchToRegister,
}: UserLoginProps) {
  const { theme } = useSettingsStore();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { t } = useTranslation();

  // 👇 ref for second input
  const passwordRef = useRef<TextInput>(null);

  const handleLogin = async () => {
    setIsLoading(true);

    if (!email || !password) {
      Alert.alert("Error", "Please fill in all fields");
      setIsLoading(false);
      return;
    }

    try {
      console.log("Login attempt:", { email, password });

      // Fake login delay
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
    <Animated.View
      entering={FadeIn}
      exiting={FadeOut}
      style={{ paddingHorizontal: 16, width: WIDTH }}
    >
      <BackgroundText text={t("auth-form.signIn-description")} />

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
          marginBottom: 36,
        }}
      >
        {t("auth-form.signInToAccount")}
      </Text>

      <View style={{ gap: 16 }}>
        {/* EMAIL INPUT */}
        <Input
          placeholder={t("auth-form.email")}
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
          autoCorrect={false}
          icon="mail-outline"
          // 👇 ENTER moves to password input
          returnKeyType="next"
          blurOnSubmit={false}
          onSubmitEditing={() => passwordRef.current?.focus()}
        />

        {/* PASSWORD INPUT */}
        <Input
          ref={passwordRef} // 👈 attach ref
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
          // 👇 Pressing Enter can submit the form
          returnKeyType="done"
          onSubmitEditing={handleLogin}
        />

        {/* LOGIN BUTTON */}
        <BounceButton
          title={isLoading ? t("auth-form.signingIn") : t("auth-form.signIn")}
          color={theme.accent}
          textColor={theme.secondaryText}
          onPress={handleLogin}
          disabled={isLoading || !email || !password}
          style={{
            height: 44,
            borderRadius: 32,
            marginTop: 16,
          }}
        />

        {/* SWITCH TO REGISTER */}
        <TextButton
          title={`${t("auth-form.dontHaveAccount")} ${t(
            "auth-form.createOne"
          )}...`}
          onPress={onSwitchToRegister}
          style={{ marginTop: 22 }}
        />
      </View>
    </Animated.View>
  );
}
