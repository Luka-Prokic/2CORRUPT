import { useState } from "react";

export const useValidateRepsAndWeight = (initialValue: number) => {
  const [value, setValue] = useState(initialValue);

  const handleChange = (inputValue: string) => {
    const num = Math.abs(Number(inputValue));
    const validValue = isNaN(num) ? 0 : num;
    setValue(validValue);
    return validValue;
  };

  return [value, handleChange] as const;
};
