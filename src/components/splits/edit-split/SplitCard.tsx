import { useState } from "react";
import { Text, Switch, View, TouchableOpacity } from "react-native";
import Animated, { FadeOut, FadeIn } from "react-native-reanimated";
import { useSettingsStore } from "../../../stores/settings";
import { useWidgetUnit } from "../../../features/widgets/useWidgetUnit";
import { useWorkoutStore } from "../../../stores/workout";
import { StrobeButton } from "../../ui/buttons/StrobeButton";
import { router } from "expo-router";
import type { SplitPlan } from "../../../stores/workout";
import { CenterCardSlider } from "../../ui/sliders/CenterCardSlider";
import { useTranslation } from "react-i18next";
import { StartDayCard } from "./StartDayCard";
import { EmptyDayCard } from "./EmpyDayCad";
import { DescriptionText } from "../../ui/text/DescriptionText";
import { InfoText } from "../../ui/text/InfoText";

interface SplitCardProps {
  split: SplitPlan;
}

export function SplitCard({ split }: SplitCardProps) {
  const { theme } = useSettingsStore();
  const { widgetUnit, fullWidth } = useWidgetUnit();
  const { t } = useTranslation();
  const { activeSplitPlan, setActiveSplitPlan, endActiveSplitPlan } =
    useWorkoutStore();

  const [selectingStartDay, setSelectingStartDay] = useState(false);

  const isActive = activeSplitPlan?.plan.id === split.id;
  const activeStartDay = activeSplitPlan?.startDay ?? 0;

  const toggleActive = () => {
    if (isActive) {
      endActiveSplitPlan();
      setSelectingStartDay(false);
    } else {
      setActiveSplitPlan(split, 0); // default startDay = 0
      setSelectingStartDay(true);
    }
  };

  function handlePress() {
    router.push({
      pathname: "/splits/[splitId]/edit",
      params: { splitId: `${split.id}` },
    });
  }

  function content() {
    if (selectingStartDay && isActive) {
      return (
        <View
          style={{
            flex: 1,
            justifyContent: "space-evenly",
            alignItems: "center",
          }}
        >
          <View
            style={{
              height: fullWidth / 3,
              width: fullWidth,
            }}
          >
            <CenterCardSlider
              data={split.split}
              card={({ item, index }) => (
                <StartDayCard
                  day={item}
                  dayIndex={index}
                  width={fullWidth / 3}
                  height={fullWidth / 3}
                  setSelectingStartDay={setSelectingStartDay}
                />
              )}
              emptyCard={
                <EmptyDayCard
                  splitId={split.id}
                  width={fullWidth / 3}
                  height={fullWidth / 3}
                />
              }
              cardWidth={fullWidth / 3}
              cardHeight={fullWidth / 3}
              hideDots
              maxDotsShown={split.split.length}
            />
          </View>
          <InfoText
            text={
              split.split.length > 0
                ? t("splits.choose-starting-day")
                : t("splits.add-days-to-split")
            }
          />
        </View>
      );
    }

    return (
      <Animated.View
        entering={FadeIn}
        exiting={FadeOut}
        style={{
          width: fullWidth,
          height: widgetUnit,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {isActive && (
          <TouchableOpacity
            onPress={() => setSelectingStartDay(true)}
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              height: 64,
              padding: 16,
              justifyContent: "center",
            }}
          >
            <Text
              style={{ color: theme.text, fontWeight: "600", fontSize: 18 }}
            >
              ★ {`${t("splits.day")} ${activeStartDay + 1}`}
            </Text>
          </TouchableOpacity>
        )}
        <Text
          style={{
            fontSize: 28,
            fontWeight: "bold",
            color: theme.text,
          }}
          numberOfLines={2}
        >
          {split.name}
        </Text>
        {split.description && (
          <DescriptionText
            text={split.description}
            short
            style={{ color: isActive ? theme.text : theme.handle }}
          />
        )}
      </Animated.View>
    );
  }

  return (
    <StrobeButton
      style={{
        height: widgetUnit,
        width: fullWidth,
        backgroundColor:
          isActive && !selectingStartDay
            ? theme.thirdBackground
            : theme.secondaryBackground,
        borderRadius: 32,
        borderColor:
          isActive && !selectingStartDay ? theme.thirdBackground : theme.border,
        borderWidth: 1,
      }}
      onPress={handlePress}
      strobeDisabled={!isActive || selectingStartDay}
    >
      {content()}
      <View
        style={{
          position: "absolute",
          top: 0,
          right: 0,
          height: 64,
          padding: 16,
          justifyContent: "center",
        }}
      >
        <Switch
          value={isActive}
          onValueChange={toggleActive}
          trackColor={{
            false: theme.handle,
            true: theme.tint,
          }}
          thumbColor={theme.background}
          style={{
            shadowColor: theme.shadow,
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: isActive ? 0.1 : 0,
            shadowRadius: isActive ? 8 : 0,
            elevation: isActive ? 4 : 0,
          }}
        />
      </View>
    </StrobeButton>
  );
}
