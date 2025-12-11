import { JSX, useMemo } from "react";
import { SectionList } from "react-native";
import { ExerciseInfo } from "../../stores/workoutStore";
import { useUserStore } from "../../stores/userStore";
import { useTranslation } from "react-i18next";
import { SectionTitle } from "../ui/text/SectionTitle";

interface ExerciseSectionListProps {
  exercises: ExerciseInfo[];
  renderCard: (exercise: ExerciseInfo) => JSX.Element;
  scrollEnabled?: boolean;
  contentPadding?: number;
  titleMap?: {
    madeByYou?: string;
    favorites?: string;
    rest?: string;
  };
}

export function ExerciseSectionList({
  exercises,
  renderCard,
  scrollEnabled = true,
  contentPadding = 20,
}: ExerciseSectionListProps) {
  const { user } = useUserStore();
  const { t } = useTranslation();

  const titleMap = {
    madeByYou: t("exercise.made-by-you"),
    favorites: t("exercise.your-favorites"),
    rest: t("exercise.rest-of-them"),
  };

  const DATA = useMemo(() => {
    const favorites: ExerciseInfo[] = [];
    const madeByYou: ExerciseInfo[] = [];
    const rest: ExerciseInfo[] = [];

    for (const e of exercises) {
      if (e.metadata?.isFavorite) {
        favorites.push(e);
      } else if (e.userId === user?.id) {
        madeByYou.push(e);
      } else {
        rest.push(e);
      }
    }

    return [
      madeByYou.length > 0 && { title: titleMap.madeByYou, data: madeByYou },
      favorites.length > 0 && { title: titleMap.favorites, data: favorites },
      rest.length > 0 && { title: titleMap.rest, data: rest },
    ].filter(Boolean) as { title: string; data: ExerciseInfo[] }[];
  }, [exercises, user?.id]);

  const isSingleSection = DATA.length === 1;

  return (
    <SectionList
      sections={DATA}
      scrollEnabled={scrollEnabled}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => renderCard(item)}
      renderSectionHeader={({ section: { title } }) =>
        isSingleSection ? null : (
          <SectionTitle
            text={title}
            style={{ paddingHorizontal: 8, paddingVertical: 8 }}
          />
        )
      }
      contentContainerStyle={{ paddingBottom: contentPadding }}
    />
  );
}
