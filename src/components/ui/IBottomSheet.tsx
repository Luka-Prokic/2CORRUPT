import {
  BottomSheetBackdrop,
  BottomSheetModal,
  BottomSheetModalProps,
  BottomSheetView,
} from "@gorhom/bottom-sheet";

import { useSettingsStore } from "../../stores/settingsStore";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { ViewStyle } from "react-native";

interface IBottomSheetProps extends BottomSheetModalProps {
  ref: React.RefObject<BottomSheetModal>;
  children: React.ReactNode;
  bottomSheetStyle?: ViewStyle;
}

export function IBottomSheet({
  ref,
  children,
  bottomSheetStyle,
  ...props
}: IBottomSheetProps) {
  const { theme } = useSettingsStore();
  const insets = useSafeAreaInsets();

  return (
    <BottomSheetModal
      ref={ref}
      enablePanDownToClose
      enableDismissOnClose
      keyboardBehavior="fillParent"
      keyboardBlurBehavior="restore"
      handleIndicatorStyle={{ backgroundColor: theme.info }}
      backgroundStyle={{ backgroundColor: theme.navBackground }}
      backdropComponent={(props) => (
        <BottomSheetBackdrop
          {...props}
          disappearsOnIndex={-1}
          appearsOnIndex={0}
          pressBehavior="close"
          opacity={0.2}
        />
      )}
      {...props}
    >
      <BottomSheetView
        style={[
          {
            flex: 1,
            padding: 16,
            paddingVertical: 32,
            justifyContent: "flex-start",
            borderTopColor: theme.border,
            borderTopWidth: 1,
            paddingBottom: insets.bottom,
            alignItems: "center",
            ...bottomSheetStyle,
          },
        ]}
      >
        {children}
      </BottomSheetView>
    </BottomSheetModal>
  );
}
