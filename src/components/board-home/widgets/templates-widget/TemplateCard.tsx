import { useWorkoutStore, WorkoutTemplate } from "../../../../stores/workout";
import { View, Text, TouchableOpacity } from "react-native";
import { useSettingsStore } from "../../../../stores/settingsStore";
import { router } from "expo-router";
import { useUIStore } from "../../../../stores/ui";

interface TemplateCardProps {
  template: WorkoutTemplate;
}

export function TemplateCard({ template }: TemplateCardProps) {
  const { theme } = useSettingsStore();
  const { setTypeOfView } = useUIStore();
  const { startSession } = useWorkoutStore();

  const tags = template.tags?.map((tag, i) => {
    if (template.tags.length > i + 1) return `${tag}, `;
    return `${tag}`;
  });

  function handleTemplatePress() {
    router.back();
    setTypeOfView("workout");
    startSession(template);
  }

  return (
    <TouchableOpacity
      style={{
        padding: 8,
        flex: 1,
        justifyContent: "space-between",
        backgroundColor: theme.fifthBackground,
        borderColor: theme.border,
        borderRadius: 16,
        borderWidth: 1,
      }}
      onPress={handleTemplatePress}
      activeOpacity={0.7}
    >
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          gap: 2,
        }}
      >
        <Text
          style={{
            fontSize: 16,
            fontWeight: "bold",
            flex: 1,
            color: theme.secondaryBackground,
          }}
          numberOfLines={2}
        >
          {template.name}
        </Text>
      </View>
      <Text
        style={{
          fontSize: 12,
          fontWeight: "500",
          color: theme.border,
        }}
        adjustsFontSizeToFit
        numberOfLines={3}
        minimumFontScale={0.5}
      >
        {tags}
      </Text>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            width: "100%",
            justifyContent: "flex-end",
          }}
        >
          <Text
            style={{
              fontSize: 8,
              fontWeight: "bold",
              color: theme.secondaryText,
            }}
          >
            {template.layout?.length} exercises
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}
