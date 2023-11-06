import {useState} from "react";

export default function useInputField(defaultValue) {
  const [value, setValue] = useState(defaultValue)

  function onValueChange(e) {
    setValue(e.target.value)
  }

  return [value, onValueChange]
}
