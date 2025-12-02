import { WorkoutSession } from "../../../../stores/workout";
import { TouchableOpacity, View } from "react-native";
import { TextButton } from "../../../ui/buttons/TextButton";
import { useTranslation } from "react-i18next";
import { SessionRecapCardHeader } from "./SessionRecapCardHeader";
import { useRef, useState } from "react";
import { BottomSheetModal } from "@gorhom/bottom-sheet";
import {
  SessionBottomSheet,
  SessionBottomSheetViews,
} from "../../session-options/SessionBottomSheet";
import { Fragment } from "react";
import { Ionicons } from "@expo/vector-icons";
import { useSettingsStore } from "../../../../stores/settings";

interface ExpandedSessionRecapHeaderProps {
  session: WorkoutSession;
}

export function ExpandedSessionRecapHeader({
  session,
}: ExpandedSessionRecapHeaderProps) {
  const { t } = useTranslation();
  const { theme } = useSettingsStore();
  const bottomSheetRef = useRef<BottomSheetModal>(null);
  const [type, setType] = useState<SessionBottomSheetViews>("options");

  function handlePress(type: SessionBottomSheetViews) {
    setType(type);
    bottomSheetRef.current?.present();
  }
  return (
    <Fragment>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          padding: 8,
        }}
      >
        <SessionRecapCardHeader session={session} />
        {/* <TextButton text={t("button.edit")} onPress={handleEditPress} /> */}

        <View style={{ flexDirection: "row" }}>
          <TouchableOpacity
            onPress={() => handlePress("make")}
            style={{
              padding: 4,
            }}
          >
            <Ionicons name="add-circle" size={32} color={theme.accent} />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => handlePress("remove")}
            style={{
              padding: 4,
            }}
          >
            <Ionicons name="remove-circle" size={32} color={theme.error} />
          </TouchableOpacity>

          {session.templateId && (
            <TouchableOpacity
              onPress={() => handlePress("update")}
              style={{
                padding: 4,
              }}
            >
              <Ionicons name="sync-circle" size={32} color={theme.info} />
            </TouchableOpacity>
          )}
        </View>
      </View>

      <SessionBottomSheet
        session={session}
        ref={bottomSheetRef}
        startView={type}
        closeOnCancel
      />
    </Fragment>
  );
}
