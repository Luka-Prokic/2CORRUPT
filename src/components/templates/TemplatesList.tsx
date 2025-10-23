import { useWorkoutStore } from "../../stores/workout";
import { FlatList } from "react-native-gesture-handler";
import { TemplateCard } from "../board-home/widgets/templates-widget/cards/TemplateCard";
import { Fragment } from "react";
import { EmptyFooter } from "../ui/containers/EmptyFooter";
import { EmptyHeader } from "../ui/containers/EmptyHeader";

interface TemplateListProps {
  selectMode: boolean;
}

export function TemplatesList({ selectMode }: TemplateListProps) {
  const { templates } = useWorkoutStore();
  return (
    <FlatList
      data={templates}
      keyExtractor={(item, index) => `${item.createdAt}-${index}`}
      renderItem={({ item }) => (
        <Fragment>
          <TemplateCard template={item} />
        </Fragment>
      )}
      ListHeaderComponent={() => <EmptyHeader />}
      ListFooterComponent={() => <EmptyFooter />}
    />
  );
}
