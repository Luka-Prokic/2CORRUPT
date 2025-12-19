import { Stack } from "expo-router";
import { Fragment, useState } from "react";
import { ScreenContent } from "../components/ui/utils/ScreenContent";
import { useTranslation } from "react-i18next";
import { CreateTemplateButton } from "../components/templates/header/CreateTemplateButton";
import { HeaderTemplatesToggle } from "../components/templates/header/HeaderTemplatesToggle";
import { useWorkoutStore, WorkoutTemplate } from "../stores/workout";
import { TemplateSelectCard } from "../components/templates/cards/TemplateSelectCard";
import { SelectAllTemplatesButton } from "../components/templates/header/SelectAllTemplatesButton";
import { IText } from "../components/ui/text/IText";
import { useSettingsStore } from "../stores/settings";
import { DeleteSelectedTemplates } from "../components/templates/header/DeleteSelectedTemplates";
import { CloneSelectedTemplates } from "../components/templates/header/CloneSelectedTemplates";
import { AddToSplitSelectedTemplates } from "../components/templates/header/AddToSplitSelectedTemplates";
import { TemplateFilter } from "../components/templates/TemplateFilter";
import { TemplateSectionList } from "../components/templates/TempalteSectionList";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { EmptyTemplateComponent } from "../components/templates/EmptyTemplateComponent";

export default function TemplatesScreen() {
  const { t } = useTranslation();
  const { theme } = useSettingsStore();
  const insets = useSafeAreaInsets();
  const { templates } = useWorkoutStore();
  const [selectMode, setSelectMode] = useState<boolean>(false);
  const [selected, setSelected] = useState<WorkoutTemplate[]>([]);
  const [filteredTemplates, setFilteredTemplates] = useState<WorkoutTemplate[]>(
    []
  );

  function headerLeft() {
    if (selectMode && templates?.length)
      return (
        <Fragment>
          <DeleteSelectedTemplates
            selected={selected}
            setSelected={setSelected}
            setMode={setSelectMode}
          />
          <CloneSelectedTemplates
            selected={selected}
            setSelected={setSelected}
            setMode={setSelectMode}
          />
          <AddToSplitSelectedTemplates
            selected={selected}
            setSelected={setSelected}
            setMode={setSelectMode}
          />
        </Fragment>
      );
    return null;
  }

  function headerTitle() {
    const text = selectMode
      ? `${t("button.selected")} ${selected.length}`
      : t("navigation.templates");

    const color = !selected.length && selectMode ? theme.handle : theme.text;

    return <IText text={text} size={18} color={color} />;
  }

  function headerRight() {
    if (templates?.length)
      return (
        <Fragment>
          {selectMode ? (
            <SelectAllTemplatesButton
              selected={selected}
              setSelected={setSelected}
            />
          ) : (
            <CreateTemplateButton />
          )}
          <HeaderTemplatesToggle
            mode={selectMode}
            toggleMode={() => {
              setSelectMode(!selectMode);
              setSelected([]);
            }}
          />
        </Fragment>
      );
    return null;
  }

  return (
    <Fragment>
      <Stack.Screen
        options={{
          headerLeft: headerLeft,
          headerTitle: headerTitle,
          headerRight: headerRight,
          headerBlurEffect: "none",
        }}
      />
      <ScreenContent edges={["top"]}>
        <TemplateFilter
          setFilteredTemplates={setFilteredTemplates}
          style={{ marginTop: insets.top }}
        />
        <TemplateSectionList
          templates={filteredTemplates}
          renderCard={(template) => (
            <TemplateSelectCard
              template={template}
              selectMode={selectMode}
              onSelect={setSelected}
              selected={selected}
            />
          )}
        />
      </ScreenContent>
    </Fragment>
  );
}
