import { useSessionsByDateRange } from "../../features/workout";
import { useTranslation } from "react-i18next";
import Animated, { FadeIn, FadeOut } from "react-native-reanimated";
import { CardSlider } from "../ui/sliders/CardSlider";
import { WIDTH } from "../../utils/Dimensions";
import { useWidgetUnit } from "../../features/widgets/useWidgetUnit";
import { SpiderSessionCard } from "../sessions/cards/SpiderSessionCard";
import { useState } from "react";
import { BackgroundText } from "../ui/text/BackgroundText";
import { PreviewSession } from "../sessions/PreviewSession";

export function WorkoutsThisWeek() {
  const { t } = useTranslation();
  const { fullWidth } = useWidgetUnit();

  const today = new Date();
  const day = today.getDay();
  const diffToMonday = (day + 6) % 7;

  const startOfWeek = new Date(today);
  startOfWeek.setDate(today.getDate() - diffToMonday);
  startOfWeek.setHours(0, 0, 0, 0);

  const endOfWeek = new Date(startOfWeek);
  endOfWeek.setDate(startOfWeek.getDate() + 6);
  endOfWeek.setHours(23, 59, 59, 999);

  const sessions = useSessionsByDateRange(startOfWeek, endOfWeek);

  const [index, setIndex] = useState<number | null>(0);
  if (sessions.length === 0) return null;

  const selectedSession = sessions[index];

  return (
    <Animated.View entering={FadeIn} exiting={FadeOut}>
      <BackgroundText
        text={t("all.workouts-this-week-description")}
        style={{ margin: 8 }}
      />
      <CardSlider
        data={sessions}
        onSelect={setIndex}
        card={({ item }) => <SpiderSessionCard session={item} />}
        cardWidth={WIDTH}
        cardHeight={fullWidth * 0.5}
        styleSlider={{
          paddingHorizontal: 16,
        }}
        styleDots={{
          alignItems: "center",
        }}
        maxDotsShown={sessions.length > 15 ? 15 : sessions.length}
      />
      {selectedSession && (
        <PreviewSession
          session={selectedSession}
          style={{ paddingHorizontal: 16 }}
          hideSessionName
        />
      )}
    </Animated.View>
  );
}
