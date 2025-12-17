import { Dimensions } from "react-native";
import { useMemo } from "react";

const { width: WIDTH, height: HEIGHT } = useMemo(
  () => Dimensions.get("window"),
  []
);

export { HEIGHT, WIDTH };
