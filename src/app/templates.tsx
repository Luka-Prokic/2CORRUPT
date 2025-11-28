import { Stack } from "expo-router";
import { Fragment, useState } from "react";
import { ScreenContent } from "../components/ui/utils/ScreenContent";
import { useTranslation } from "react-i18next";
import { CreateTemplateButton } from "../components/templates/header/CreateTemplateButton";
import { HeaderTemplatesToggle } from "../components/templates/header/HeaderTemplatesToggle";
import { FlatList } from "react-native-gesture-handler";
import { useWorkoutStore, WorkoutTemplate } from "../stores/workout";
import { TemplateSelectCard } from "../components/templates/cards/TemplateSelectCard";
import { SelectAllTemplatesButton } from "../components/templates/header/SelectAllTemplatesButton";
import { Text } from "react-native";
import { useSettingsStore } from "../stores/settings";
import { DeleteSelectedTemplates } from "../components/templates/header/DeleteSelectedTemplates";
import { EmptyTemplateComponent } from "../components/templates/EmptyTemplateComponent";
import { CloneSelectedTemplates } from "../components/templates/header/CloneSelectedTemplates";
import { AddToSplitSelectedTemplates } from "../components/templates/header/AddToSplitSelectedTemplates";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { TemplateFilter } from "../components/templates/TemplateFilter";
import { EmptyFooter } from "../components/ui/containers/EmptyFooter";

export default function TemplatesScreen() {
  const { t } = useTranslation();
  const { theme } = useSettingsStore();
  const { templates } = useWorkoutStore();
  const [selectMode, setSelectMode] = useState<boolean>(false);
  const [selected, setSelected] = useState<WorkoutTemplate[]>([]);
  const [filteredTemplates, setFilteredTemplates] = useState<WorkoutTemplate[]>(
    []
  );
  const insets = useSafeAreaInsets();

  function footerComponent() {
    if (filteredTemplates.length === 0 && templates.length > 0) {
      return null;
    } else return <EmptyTemplateComponent />;
  }

  function headerLeft() {
    if (selectMode)
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
    if (selectMode)
      return (
        <Text
          style={{
            fontSize: 18,
            fontWeight: "bold",
            color: selected.length ? theme.text : theme.handle,
          }}
        >
          {t("button.selected")} {selected.length}
        </Text>
      );
    return null;
  }
  function headerRight() {
    if (templates.length)
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
      <ScreenContent
        HeaderComponent={
          <TemplateFilter
            setFilteredTemplates={setFilteredTemplates}
            style={{ marginTop: insets.top }}
          />
        }
      >
        <FlatList
          data={filteredTemplates}
          numColumns={2}
          showsVerticalScrollIndicator={false}
          scrollEnabled={false}
          keyExtractor={(item, index) => `${item.createdAt}-${index}`}
          renderItem={({ item }) => (
            <TemplateSelectCard
              template={item}
              selectMode={selectMode}
              onSelect={setSelected}
              selected={selected}
            />
          )}
          contentContainerStyle={{
            paddingHorizontal: 16,
            gap: 8,
          }}
          columnWrapperStyle={{
            gap: 8,
          }}
          ListEmptyComponent={footerComponent}
          ListFooterComponent={<EmptyFooter />}
        />
      </ScreenContent>
    </Fragment>
  );
}
