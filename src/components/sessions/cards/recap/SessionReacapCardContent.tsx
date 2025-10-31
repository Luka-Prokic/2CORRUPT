import { Fragment } from "react";
import { useWorkoutStore, WorkoutSession } from "../../../../stores/workout";
import { Text } from "react-native";
import { useSettingsStore } from "../../../../stores/settings";

interface SessionRecapCardContentProps {
  session: WorkoutSession;
}

export function SessionRecapCardContent({
  session,
}: SessionRecapCardContentProps) {
  const { theme } = useSettingsStore();
  const { getTemplateById } = useWorkoutStore();

  const template = getTemplateById(session.templateId ?? "");

  return (
    <Fragment>
      <Text
        style={{
          fontSize: 14,
          color: theme.text,
          marginTop: 4,
        }}
      >
        {session.layout?.length ?? 0}{" "}
        {session.layout?.length === 1 ? "exercise" : "exercises"}
      </Text>
      <Text
        style={{
          fontSize: 14,
          color: theme.text,
          marginTop: 4,
        }}
      >
        Template used: {template?.name}
      </Text>
    </Fragment>
  );
}
