import { useEffect, useState } from "react";
import { Keyboard, Platform, KeyboardEvent } from "react-native";

/**
 * Returns combined bottom spacing that accounts for keyboard height
 * and safe area insets. Ideal for BottomSheets, forms, etc.
 *
 * @param extraPadding optional static padding to add on top
 */
export function useKeyboardHeight(extraPadding = 0) {
  const [keyboardHeight, setKeyboardHeight] = useState(0);

  useEffect(() => {
    const onShow = (e: KeyboardEvent) => {
      const h = e?.endCoordinates?.height ?? 0;
      setKeyboardHeight(h);
    };

    const onHide = () => setKeyboardHeight(0);

    const showEvent =
      Platform.OS === "ios" ? "keyboardWillShow" : "keyboardDidShow";
    const hideEvent =
      Platform.OS === "ios" ? "keyboardWillHide" : "keyboardDidHide";

    const showSub = Keyboard.addListener(showEvent, onShow);
    const hideSub = Keyboard.addListener(hideEvent, onHide);

    return () => {
      showSub.remove();
      hideSub.remove();
    };
  }, []);

  // automatically merges keyboard + inset + optional padding
  const bottomSpace =
    keyboardHeight > 0 ? keyboardHeight + extraPadding : 0 + extraPadding;

  return bottomSpace;
}
