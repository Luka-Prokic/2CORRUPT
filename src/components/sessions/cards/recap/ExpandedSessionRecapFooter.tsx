import { WorkoutSession } from "../../../../stores/workout";
import { TextButton } from "../../../ui/buttons/TextButton";
import { useTranslation } from "react-i18next";
import { useSettingsStore } from "../../../../stores/settings";
import { View, ViewStyle } from "react-native";
import { Fragment, useRef, useState } from "react";
import { SessionBottomSheetViews } from "../../session-options/SessionBottomSheet";
import { BottomSheetModal } from "@gorhom/bottom-sheet";
import { WIDTH } from "../../../../features/Dimensions";
import { SessionBottomSheet } from "../../session-options/SessionBottomSheet";

interface ExpandedSessionRecapFooterProps {
  session: WorkoutSession;
  style?: ViewStyle | ViewStyle[];
}

const BUTTON_HEIGHT = 64;

export function ExpandedSessionRecapFooter({
  session,
  style,
}: ExpandedSessionRecapFooterProps) {
  const { t } = useTranslation();
  const { theme } = useSettingsStore();
  const [type, setType] = useState<SessionBottomSheetViews>("options");
  const bottomSheetRef = useRef<BottomSheetModal>(null);

  function handlePress(type: SessionBottomSheetViews) {
    setType(type);
    setTimeout(() => {
      bottomSheetRef.current?.present();
    }, 10);
  }

  return (
    <Fragment>
      <View
        style={{
          height: BUTTON_HEIGHT,
          width: WIDTH,
          flexDirection: "row",
          alignItems: "center",
          ...style,
        }}
      >
        <TextButton
          text={t("button.remove")}
          onPress={() => {
            handlePress("remove");
          }}
          color={theme.error}
          style={{ flex: 1, height: BUTTON_HEIGHT, justifyContent: "center" }}
        />
        <TextButton
          text={t("button.add")}
          onPress={() => handlePress("make")}
          color={theme.accent}
          style={{ flex: 1, height: BUTTON_HEIGHT, justifyContent: "center" }}
        />
        {session.templateId && (
          <TextButton
            text={t("button.sync")}
            onPress={() => handlePress("update")}
            color={theme.text}
            style={{ flex: 1, height: BUTTON_HEIGHT, justifyContent: "center" }}
          />
        )}
      </View>
      <SessionBottomSheet
        key={type.toString()}
        session={session}
        ref={bottomSheetRef}
        startView={type}
        closeOnCancel
      />
    </Fragment>
  );
}
