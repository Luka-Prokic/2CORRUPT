import { TemplateExerciseList } from "./sheets/exercises/TemplateExerciseList";
import { TagTextLayout } from "../view-template/TagTextLayout";
import { DashBoard } from "../ui/DashBoard";
import { useSettingsStore } from "../../stores/settings";
import { Fragment } from "react";
import { StrobeButton } from "../ui/buttons/StrobeButton";
import { WIDTH } from "../../features/Dimensions";
import { Text } from "react-native";
import { useTranslation } from "react-i18next";
import { router } from "expo-router";

export type TemplateSheetType = "exercises" | "template";
interface TemplateDashboardProps {
  listOpen: boolean;
  listType: TemplateSheetType;
  setListOpen: (listOpen: boolean) => void;
  setListType: (listType: TemplateSheetType) => void;
}

export function TemplateDashboard({
  listOpen,
  listType,
  setListOpen,
  setListType,
}: TemplateDashboardProps) {
  const { theme } = useSettingsStore();
  const { t } = useTranslation();

  function togglePanel() {
    setListOpen(!listOpen);
    setListType("exercises");
  }
  function handlePress() {
    router.push("/add-exercise");
  }

  function upperSection() {
    return (
      <Fragment>
        <StrobeButton
          onPress={handlePress}
          style={{
            width: WIDTH - 32,
            height: 64,
            borderRadius: 32,
            backgroundColor: theme.primaryBackground,
            marginTop: 32,
          }}
        >
          <Text style={{ color: theme.text, fontSize: 24, fontWeight: "bold" }}>
            {t("workout-view.add-exercise")}
          </Text>
        </StrobeButton>
      </Fragment>
    );
  }

  function visibleSheet() {
    if (listType === "exercises")
      return <TemplateExerciseList togglePanel={togglePanel} />;
    if (listType === "template") return <></>;
  }

  return (
    <DashBoard
      listOpen={listOpen}
      togglePanel={togglePanel}
      upperSection={upperSection()}
      lowerSection={listOpen && visibleSheet()}
      colors={[
        theme.secondaryText,
        theme.secondaryText,
        theme.secondaryText,
        theme.secondaryText,
      ]}
    />
  );
}
