import { Fragment, JSX, useMemo } from "react";
import { FlashList } from "@shopify/flash-list";
import { View } from "react-native";
import { WorkoutTemplate } from "../../stores/workoutStore";
import { useUserStore } from "../../stores/userStore";
import { useTranslation } from "react-i18next";
import { WIDTH } from "../../utils/Dimensions";
import { IText } from "../ui/text/IText";
import { EmptyTemplateComponent } from "./EmptyTemplateComponent";

interface TemplateSectionListProps {
  templates: WorkoutTemplate[];
  renderCard: (template: WorkoutTemplate) => JSX.Element;
}

export function TemplateSectionList({
  templates,
  renderCard,
}: TemplateSectionListProps) {
  const { user } = useUserStore();
  const { t } = useTranslation();

  const titleMap = {
    madeByYou: t("exercise.made-by-you"),
    favorites: t("exercise.your-favorites"),
    rest: t("exercise.rest-of-them"),
  };

  const DATA: { title: string; data: WorkoutTemplate[] }[] = useMemo(() => {
    const favorites: WorkoutTemplate[] = [];
    const madeByYou: WorkoutTemplate[] = [];
    const rest: WorkoutTemplate[] = [];

    for (const tmpl of templates) {
      if (tmpl.metadata?.isFavorite) {
        favorites.push(tmpl);
      } else if (tmpl.userId === user?.id) {
        madeByYou.push(tmpl);
      } else {
        rest.push(tmpl);
      }
    }

    return [
      madeByYou.length > 0 && { title: titleMap.madeByYou, data: madeByYou },
      favorites.length > 0 && { title: titleMap.favorites, data: favorites },
      rest.length > 0 && { title: titleMap.rest, data: rest },
    ].filter(Boolean) as { title: string; data: WorkoutTemplate[] }[];
  }, [templates, user?.id]);

  if (!DATA?.length) return <EmptyTemplateComponent />;
  return (
    <View style={{ width: WIDTH }}>
      {DATA.map((section, index) => (
        <Fragment key={index}>
          {DATA.length > 1 && (
            <IText
              text={section.title}
              style={{ paddingHorizontal: 8, paddingVertical: 8 }}
            />
          )}

          <FlashList
            data={section.data}
            numColumns={2}
            scrollEnabled={false}
            showsVerticalScrollIndicator={false}
            keyExtractor={(item) => item.id}
            ItemSeparatorComponent={() => <View style={{ height: 8 }} />}
            renderItem={({ item, index }) => (
              <View
                style={{
                  width: WIDTH / 2,
                  alignItems: "center",
                  paddingRight: index % 2 === 0 ? 4 : 16,
                  paddingLeft: index % 2 === 0 ? 16 : 4,
                }}
              >
                {renderCard(item)}
              </View>
            )}
          />
        </Fragment>
      ))}
    </View>
  );
}
