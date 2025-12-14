import { View } from "react-native";
import { SegmentDigit } from "./SegmentDigit";
import { SegmentDots } from "./SegmentDots";
import { Fragment } from "react";
import { SegmentWeight } from "./types";

interface TimeOptions {
  size?: number;
  color?: string;
  activeOpacity?: number;
  inactiveOpacity?: number;
  weight?: SegmentWeight;
}

interface SegmentTimeProps {
  hours?: number;
  minutes: number;
  seconds: number;
  size?: number;
  hoursOptions?: TimeOptions;
  minutesOptions?: TimeOptions;
  secondsOptions?: TimeOptions;
  color?: string;
  activeOpacity?: number;
  inactiveOpacity?: number;
  blink?: boolean;
  height?: number;
  width?: number;
  gap?: number;
  weight?: SegmentWeight;
}

export function SegmentTime({
  hours,
  minutes,
  seconds,
  size,
  hoursOptions,
  minutesOptions,
  secondsOptions,
  color = "white",
  activeOpacity = 1,
  inactiveOpacity = 0.1,
  blink = true,
  gap = 8,
  weight = "normal",
}: SegmentTimeProps) {
  const hasHours = hours !== undefined;

  const hrsTens = hours ? Math.floor(hours / 10) : 0;
  const hrsOnes = hours ? hours % 10 : 0;

  const minTens = Math.floor(minutes / 10);
  const minOnes = minutes % 10;

  const secTens = Math.floor(seconds / 10);
  const secOnes = seconds % 10;

  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        gap,
      }}
    >
      {hasHours && (
        <Fragment>
          <SegmentDigit
            digit={hrsTens}
            eightOptions={{ size, ...hoursOptions }}
            color={color || hoursOptions?.color}
            activeOpacity={activeOpacity || hoursOptions?.activeOpacity}
            inactiveOpacity={inactiveOpacity || hoursOptions?.inactiveOpacity}
            weight={weight || hoursOptions?.weight}
          />
          <SegmentDigit
            digit={hrsOnes}
            eightOptions={{ size, ...hoursOptions }}
            color={color || hoursOptions?.color}
            activeOpacity={activeOpacity || hoursOptions?.activeOpacity}
            inactiveOpacity={inactiveOpacity || hoursOptions?.inactiveOpacity}
            weight={weight || hoursOptions?.weight}
          />
          <SegmentDots
            size={size}
            color={color || hoursOptions?.color}
            activeOpacity={activeOpacity || hoursOptions?.activeOpacity}
            inactiveOpacity={inactiveOpacity || hoursOptions?.inactiveOpacity}
            active={blink}
            weight={weight || hoursOptions?.weight}
          />
        </Fragment>
      )}

      <SegmentDigit
        digit={minTens}
        eightOptions={{ size, ...minutesOptions }}
        color={color || minutesOptions?.color}
        activeOpacity={activeOpacity || minutesOptions?.activeOpacity}
        inactiveOpacity={inactiveOpacity || minutesOptions?.inactiveOpacity}
        weight={weight || minutesOptions?.weight}
      />
      <SegmentDigit
        digit={minOnes}
        eightOptions={{ size, ...minutesOptions }}
        color={color || minutesOptions?.color}
        activeOpacity={activeOpacity || minutesOptions?.activeOpacity}
        inactiveOpacity={inactiveOpacity || minutesOptions?.inactiveOpacity}
        weight={weight || minutesOptions?.weight}
      />
      <SegmentDots
        size={size}
        color={color || minutesOptions?.color}
        activeOpacity={activeOpacity || minutesOptions?.activeOpacity}
        inactiveOpacity={inactiveOpacity || minutesOptions?.inactiveOpacity}
        active={blink}
        weight={weight || minutesOptions?.weight}
      />
      <SegmentDigit
        digit={secTens}
        eightOptions={{ size, ...secondsOptions }}
        color={color || secondsOptions?.color}
        activeOpacity={activeOpacity || secondsOptions?.activeOpacity}
        inactiveOpacity={inactiveOpacity || secondsOptions?.inactiveOpacity}
        weight={weight || secondsOptions?.weight}
      />
      <SegmentDigit
        digit={secOnes}
        eightOptions={{ size, ...secondsOptions }}
        color={color || secondsOptions?.color}
        activeOpacity={activeOpacity || secondsOptions?.activeOpacity}
        inactiveOpacity={inactiveOpacity || secondsOptions?.inactiveOpacity}
        weight={weight || secondsOptions?.weight}
      />
    </View>
  );
}
