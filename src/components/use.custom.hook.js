import { useState } from "react";

export const useFormInput = initialValue => {
  const [value, setValue] = useState(initialValue);
  function handleChange(e) {
    setValue(e.currentTarget.value);
  }
  return {
    value,
    onChange: handleChange
  };
};
 

export const useCheckBoxInput = initialValue => {
  const [checked, setChecked] = useState(initialValue);
  function handleChange() {
    setChecked(!checked);
  }
  return {
    checked,
    onChange: handleChange
  };
};

