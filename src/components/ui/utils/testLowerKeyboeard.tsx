import { useState, useEffect } from "react";
import {
  View,
  Text,
  Keyboard,
  TouchableOpacity,
  TextInput,
  Platform,
} from "react-native";
import { KeyboardAvoidingView } from "react-native";

export function CreateTemplateBoard() {
  const [keyboardVisible, setKeyboardVisible] = useState(false);

  useEffect(() => {
    const showSub = Keyboard.addListener("keyboardDidShow", () =>
      setKeyboardVisible(true)
    );
    const hideSub = Keyboard.addListener("keyboardDidHide", () =>
      setKeyboardVisible(false)
    );
    return () => {
      showSub.remove();
      hideSub.remove();
    };
  }, []);

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : undefined}
      style={{ flex: 1 }}
    >
      <View style={{ flex: 1, padding: 16 }}>
        <TextInput
          style={{
            flex: 1,
            backgroundColor: "#eee",
            borderRadius: 12,
            padding: 12,
            textAlignVertical: "top",
            fontSize: 16,
          }}
          multiline
          placeholder="Type something..."
        />
      </View>

      {keyboardVisible && (
        <View
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            backgroundColor: "#fff",
            padding: 12,
            borderTopColor: "#ccc",
            borderTopWidth: 1,
          }}
        >
          <TouchableOpacity
            style={{
              backgroundColor: "#007AFF",
              paddingVertical: 12,
              borderRadius: 12,
              alignItems: "center",
            }}
            onPress={() => Keyboard.dismiss()}
          >
            <Text style={{ color: "white", fontWeight: "bold" }}>Done</Text>
          </TouchableOpacity>
        </View>
      )}
    </KeyboardAvoidingView>
  );
}
