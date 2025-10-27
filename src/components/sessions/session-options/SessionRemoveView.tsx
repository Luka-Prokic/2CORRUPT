import { forwardRef, Fragment } from "react";
import { useWorkoutStore, WorkoutSession } from "../../../stores/workout";
import { BottomSheetModal } from "@gorhom/bottom-sheet";
import { useSettingsStore } from "../../../stores/settings";
import { SessionBottomSheetViews } from "./SessionBottomSheet";
import { Text, View } from "react-native";
import { WIDTH } from "../../../features/Dimensions";
import { BounceButton } from "../../ui/buttons/BounceButton";
import { StrobeBlur } from "../../ui/misc/StrobeBlur";
import { useTranslation } from "react-i18next";
import { Ionicons } from "@expo/vector-icons";

interface SessionRemoveViewProps {
  session: WorkoutSession;
  setView: (view: SessionBottomSheetViews) => void;
}

export const SessionRemoveView = forwardRef<
  BottomSheetModal,
  SessionRemoveViewProps
>(({ session, setView }, ref) => {
  const { theme } = useSettingsStore();
  const { t } = useTranslation();
  const { removeSession } = useWorkoutStore();

  function closeSheet() {
    (ref as React.RefObject<BottomSheetModal>)?.current?.close();
  }

  const handleRemoveSession = () => {
    removeSession(session.id);
    closeSheet();
  };

  const handleCancel = () => {
    setView("first");
  };

  if (session)
    return (
      <Fragment>
        <Text
          style={{
            marginVertical: 16,
            color: theme.error,
            fontWeight: "500",
            fontSize: 28,
            textAlign: "center",
          }}
        >
          {t("button.remove")}{" "}
          <Text
            style={{
              color: theme.text,
              fontWeight: "bold",
            }}
          >
            {session.name}
          </Text>{" "}
          ?
        </Text>
        <View
          style={{
            width: WIDTH - 32,
            height: 68,
            paddingVertical: 2,
            flexDirection: "row",
            gap: 8,
          }}
        >
          <BounceButton
            style={{
              width: WIDTH / 2 - 20,
              height: 64,
              backgroundColor: theme.handle,
              borderTopLeftRadius: 32,
              borderBottomLeftRadius: 32,
              borderTopRightRadius: 8,
              borderBottomRightRadius: 8,
              overflow: "hidden",
            }}
            onPress={handleCancel}
          >
            <StrobeBlur
              tint="light"
              style={{
                width: WIDTH / 2 - 20,
                height: 64,
              }}
            >
              <Text
                style={{ fontSize: 24, fontWeight: "bold", color: theme.text }}
              >
                {t("button.cancel")}
              </Text>
            </StrobeBlur>
          </BounceButton>
          <BounceButton
            style={{
              width: WIDTH / 2 - 20,
              height: 64,
              backgroundColor: theme.error,
              borderTopLeftRadius: 8,
              borderBottomLeftRadius: 8,
              borderTopRightRadius: 32,
              borderBottomRightRadius: 32,
              overflow: "hidden",
            }}
            onPress={handleRemoveSession}
          >
            <StrobeBlur
              colors={[
                theme.caka,
                theme.primaryBackground,
                theme.accent,
                theme.tint,
              ]}
              style={{
                width: WIDTH / 2 - 20,
                height: 64,
              }}
            >
              <Text
                style={{ fontSize: 24, fontWeight: "bold", color: theme.text }}
              >
                {t("button.remove")}
              </Text>
            </StrobeBlur>
          </BounceButton>
        </View>
        <Text
          style={{
            marginVertical: 16,
            color: theme.info,
            fontSize: 14,
            fontWeight: "500",
            textAlign: "justify",
          }}
        >
          <Ionicons name="alert-circle" color={theme.error} size={14} />{" "}
          {t("sessions.remove-info")}
        </Text>
      </Fragment>
    );
  return null;
});
