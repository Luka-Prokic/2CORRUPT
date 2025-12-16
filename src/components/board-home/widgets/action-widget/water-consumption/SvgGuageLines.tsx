import { View } from "react-native";
import Svg, { Line } from "react-native-svg";

interface SvgGaugeLinesProps {
  width: number;
  height: number;

  lines: number;              // total number of ticks
  majorEvery?: number;        // every Nth line is "major"

  minorLineWidth?: number;
  majorLineWidth?: number;

  minorLineLength?: number;
  majorLineLength?: number;

  minorColor?: string;
  majorColor?: string;
}

export function SvgGaugeLines({
  width,
  height,
  lines,
  majorEvery = 5,             // e.g. every 5th = 1L if 0.2L per tick

  minorLineWidth = 2,
  majorLineWidth = 3,

  minorLineLength = 12,
  majorLineLength = 20,

  minorColor = "#8FAFDB",
  majorColor = "#4F86F7",
}: SvgGaugeLinesProps) {
  const step = height / (lines + 1);

  return (
    <View style={{ width, height }}>
      <Svg width={width} height={height}>
        {Array.from({ length: lines }).map((_, i) => {
          const indexFromBottom = lines - i;
          const y = step * (i + 1);

          const isMajor = indexFromBottom % majorEvery === 0;

          const lineLength = isMajor ? majorLineLength : minorLineLength;
          const strokeWidth = isMajor ? majorLineWidth : minorLineWidth;
          const stroke = isMajor ? majorColor : minorColor;

          return (
            <Line
              key={i}
              x1={width - lineLength}
              x2={width}
              y1={y}
              y2={y}
              stroke={stroke}
              strokeWidth={strokeWidth}
              strokeLinecap="round"
            />
          );
        })}
      </Svg>
    </View>
  );
}
