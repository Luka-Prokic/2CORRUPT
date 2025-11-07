import { router } from "expo-router";
import { BounceButton } from "../ui/buttons/BounceButton";
import { CorruptTittle } from "./CorruptTittle";

export function CorruptHeader() {
  function handlePress() {
    router.back();
  }
  return (
    <BounceButton color="transparent" onPress={handlePress}>
      <CorruptTittle />
    </BounceButton>
  );
}
