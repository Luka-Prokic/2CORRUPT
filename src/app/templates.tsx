import { Stack } from "expo-router";
import { Fragment, useState } from "react";
import { ScreenContent } from "../components/ui/utils/ScreenContent";
import { useTranslation } from "react-i18next";
import { CreateTemplateButton } from "../components/templates/header/CreateTemplateButton";
import { HeaderTemplatesToggle } from "../components/templates/header/HeaderTemplatesToggle";
import { FlatList } from "react-native-gesture-handler";
import { EmptyHeader } from "../components/ui/containers/EmptyHeader";
import { EmptyFooter } from "../components/ui/containers/EmptyFooter";
import { useWorkoutStore, WorkoutTemplate } from "../stores/workout";
import { TemplateSelectCard } from "../components/templates/TemplateSelectCard";
import { SelectAllTemplatesButton } from "../components/templates/header/SelectAllTemplatesButton";
import { Text } from "react-native";
import { useSettingsStore } from "../stores/settings";
import { DeleteSelectedTemplates } from "../components/templates/header/DeleteSelectedTemplates";

export default function TemplatesScreen() {
  const { t } = useTranslation();
  const { theme } = useSettingsStore();
  const { templates } = useWorkoutStore();
  const [selectMode, setSelectMode] = useState<boolean>(false);
  const [selected, setSelected] = useState<WorkoutTemplate[]>([]);

  function headerLeft() {
    if (selectMode)
      return (
        <DeleteSelectedTemplates
          selected={selected}
          setSelected={setSelected}
        />
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
          Selected {selected.length}
        </Text>
      );
    return null;
  }
  function headerRight() {
    return (
      <Fragment>
        <HeaderTemplatesToggle
          mode={selectMode}
          toggleMode={() => {
            setSelectMode(!selectMode);
            setSelected([]);
          }}
        />
        {selectMode ? (
          <SelectAllTemplatesButton
            selected={selected}
            setSelected={setSelected}
          />
        ) : (
          <CreateTemplateButton />
        )}
      </Fragment>
    );
  }

  return (
    <Fragment>
      <Stack.Screen
        options={{
          title: t("navigation.templates"),
          headerLeft: headerLeft,
          headerTitle: headerTitle,
          headerRight: headerRight,
        }}
      />
      <ScreenContent edges={["top"]} scroll={false}>
        <FlatList
          data={templates}
          numColumns={2}
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
          ListHeaderComponent={() => <EmptyHeader />}
          ListFooterComponent={() => <EmptyFooter />}
        />
      </ScreenContent>
    </Fragment>
  );
}
