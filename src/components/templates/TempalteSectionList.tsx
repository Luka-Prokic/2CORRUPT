import { Fragment, JSX, useMemo } from "react";
import { FlashList } from "@shopify/flash-list";
import { View } from "react-native";
import { SectionTitle } from "../ui/text/SectionTitle";
import { WorkoutTemplate } from "../../stores/workoutStore";
import { useUserStore } from "../../stores/userStore";
import { useTranslation } from "react-i18next";
import { WIDTH } from "../../utils/Dimensions";
import { IText } from "../ui/text/IText";

interface TemplateSectionListProps {
  templates: WorkoutTemplate[];
  renderCard: (template: WorkoutTemplate) => JSX.Element;
  contentPadding?: number;
}

export function TemplateSectionList({
  templates,
  renderCard,
  contentPadding = 8,
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

  const isSingleSection = DATA?.length < 2;

  console.log(isSingleSection);

  return (
    <View>
      {DATA.map((section, index) => (
        <Fragment key={index}>
          {/* Only render title if there’s more than 1 section */}
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
