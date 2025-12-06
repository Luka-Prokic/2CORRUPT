import { SettingConfig } from "../../../config/settings/types";
import { NumberField } from "./NumberField";
import { IncrementField } from "./IncrementField";
import { ToggleField } from "./ToggleField";
import { SegmentedField } from "./SegmentedField";
import { SliderField } from "./SliderField";
import { RangeField } from "./RangeField";
import { SwitchField } from "./SwitchField";
import { Fragment } from "react";

interface SettingsFieldProps {
  setting: SettingConfig;
}

export function SettingsField({ setting }: SettingsFieldProps) {
  return (
    <Fragment>
      {(() => {
        switch (setting.type) {
          case "number":
            return <NumberField setting={setting} />;
          case "increment":
            return <IncrementField setting={setting} />;
          case "slider":
            return <SliderField setting={setting} />;
          case "range":
            return <RangeField setting={setting} />;
          case "toggle":
            return <ToggleField setting={setting} />;
          case "switch":
            return <SwitchField setting={setting} />;
          case "segmented":
            return <SegmentedField setting={setting} />;
          default:
            return null;
        }
      })()}
    </Fragment>
  );
}
