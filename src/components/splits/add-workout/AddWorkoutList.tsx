import React, { useEffect, useState } from "react";
import { FlatList } from "react-native";
import { WorkoutTemplate } from "../../../stores/workout/types";
import { AddSplitWorkoutCard } from "./AddSplitWorkoutCard";
import { EmptyFooter } from "../../ui/containers/EmptyFooter";
import { NoSearchMatchTempaltes } from "../../templates/NoSearchMatchTempaltes";

const PAGE_SIZE = 20;

interface AddSplitWorkoutListProps {
  filteredTemplates: WorkoutTemplate[];
  selectedTemplates: WorkoutTemplate[];
  setSelectedTemplates: (templates: WorkoutTemplate[]) => void;
  maxSelection?: number;
}

export function AddSplitWorkoutList({
  filteredTemplates,
  selectedTemplates,
  setSelectedTemplates,
  maxSelection,
}: AddSplitWorkoutListProps) {
  const [page, setPage] = useState(1);

  const pagedWorkouts = React.useMemo(
    () => filteredTemplates.slice(0, page * PAGE_SIZE),
    [filteredTemplates, page]
  );

  function handleLoadMore() {
    if (page * PAGE_SIZE < filteredTemplates.length) {
      setPage((prev) => prev + 1);
    }
  }

  function handleSelectWorkout(template: WorkoutTemplate) {
    if (maxSelection && selectedTemplates.length >= maxSelection) {
      // If max selection reached, replace the first selected template
      setSelectedTemplates([template]);
    } else {
      setSelectedTemplates([...selectedTemplates, template]);
    }
  }

  function handleUnselectTemplate(template: WorkoutTemplate) {
    setSelectedTemplates(selectedTemplates.filter((t) => t.id !== template.id));
  }

  useEffect(() => {
    setPage(1);
  }, [filteredTemplates.length]);

  function footerComponent() {
    if (filteredTemplates.length === 0) {
      return <NoSearchMatchTempaltes />;
    }
    return <EmptyFooter />;
  }

  return (
    <FlatList
      data={pagedWorkouts}
      keyExtractor={(item) => item.id}
      numColumns={2}
      renderItem={({ item }) => (
        <AddSplitWorkoutCard
          template={item}
          onSelect={handleSelectWorkout}
          unSelect={handleUnselectTemplate}
          selectedTemplates={selectedTemplates}
        />
      )}
      contentContainerStyle={{
        paddingHorizontal: 16,
        gap: 8,
        paddingTop: 16,
        paddingBottom: 24,
        flexGrow: filteredTemplates.length === 0 ? 1 : undefined,
      }}
      columnWrapperStyle={{
        gap: 8,
      }}
      onEndReached={handleLoadMore}
      onEndReachedThreshold={0.5}
      initialNumToRender={PAGE_SIZE}
      maxToRenderPerBatch={PAGE_SIZE}
      windowSize={10}
      removeClippedSubviews
      ListEmptyComponent={footerComponent}
      ListFooterComponent={<EmptyFooter />}
    />
  );
}
