import { View, Pressable, Text } from "react-native";
import { useSettingsStore } from "../../../stores/settingsStore";
import { SessionListType } from "../SessionDashboard";
import { useMemo } from "react";
import { useWorkoutStore } from "../../../stores/workout/useWorkoutStore";

interface ListHeaderProps {
    listOpen: boolean;
    listType: SessionListType;
    setListType: (listType: SessionListType) => void;
    togglePanel: () => void;
}

export function ListHeader({
    listOpen,
    listType,
    setListType,
    togglePanel,
}: ListHeaderProps) {

  const { activeSession } = useWorkoutStore();
  const { theme } = useSettingsStore();

  const areThereSupersets = useMemo(() => {
    return activeSession?.layout.some((item) => item.type === "superset");
  }, [activeSession]);

  const areThereCircuits = useMemo(() => {
    return activeSession?.layout.some((item) => item.type === "circuit");
  }, [activeSession]);

  function handleSessionPress() {
    if (listType === "session") {
      togglePanel();
    }
    if (!listOpen) {
      togglePanel();
    }
    setListType("session");
  }

  function handleSupersetPress() {
    if (listType === "superset") {
      togglePanel();
    }
    if (!listOpen) {
      togglePanel();
    }
    setListType("superset");
  }

  function handleCircuitPress() {
    if (listType === "circuit") {
      togglePanel();
    }
    if (!listOpen) {
      togglePanel();
    }
    setListType("circuit");
  }

    return (
        <View
        style={{
          position: "absolute",
          height: 88,
          padding: 10,
          bottom: 0,
          right: 0,
          left: 0,
          flexDirection: "row",
          backgroundColor: theme.background,
          borderTopLeftRadius: 32,
          borderTopRightRadius: 32,
        }}
      >
        <Pressable
          onPress={handleSessionPress}
          style={{
            flex: 1,
            alignItems: "center",
          }}
        >
          <Text
            style={{
              fontSize: 18,
              fontWeight: "bold",
              color:
                listOpen && listType === "session"
                  ? theme.text
                  : theme.grayText,
            }}
          >
            {listOpen && listType === "session" ? `BACK` : `UP NEXT`}
          </Text>
        </Pressable>
        {areThereSupersets && (
          <Pressable
            onPress={handleSupersetPress}
            style={{
              flex: 1,
              alignItems: "center",
            }}
            disabled={!areThereSupersets}
          >
            <Text
              style={{
                fontSize: 18,
                fontWeight: "bold",
                color: areThereSupersets
                  ? listType === "superset"
                    ? theme.text
                    : theme.tint
                  : theme.handle,
              }}
            >
              {listOpen && listType === "superset" ? `BACK` : `SUPERSET`}
            </Text>
          </Pressable>
        )}
        {areThereCircuits && (
          <Pressable
            onPress={handleCircuitPress}
            style={{
              flex: 1,
              alignItems: "center",
            }}
            disabled={!areThereCircuits}
          >
            <Text
              style={{
                fontSize: 18,
                fontWeight: "bold",
                color: areThereCircuits
                  ? listType === "circuit"
                    ? theme.text
                    : theme.tint
                  : theme.handle,
              }}
            >
              {listOpen && listType === "circuit" ? `BACK` : `CIRCUIT`}
            </Text>
          </Pressable>
        )}
      </View>
    );
}
