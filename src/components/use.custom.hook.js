import React, { useState, useEffect } from "react";

export const useFormInput = initalValue => {
  const [value, setValue] = useState(initalValue);
  function handleChange(e) {
    setValue(e.currentTarget.value);
  }
  return {
    value,
    onChange: handleChange
  };
};
 

export const useCheckBoxInput = initalValue => {
  const [checked, setChecked] = useState(initalValue);
  function handleChange() {
    setChecked(!checked);
  }
  return {
    checked,
    onChange: handleChange
  };
};

