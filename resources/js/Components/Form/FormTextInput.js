import React from "react";
import { TextField } from "@material-ui/core";
import { useController } from "react-hook-form";

function FormTextInput({ control, name, defaultValue = '', required = false }) {

  const {
    field: { ref, ...inputProps },
    meta: { invalid },
  } = useController({
    name,
    control,
    rules: { required },
    defaultValue
  });

  return (
    <TextField
      {...inputProps}
      inputRef={ref}
      label={name.toUpperCase()}
      name={name}
      variant="outlined"
      size="small"
      error={invalid}
      fullWidth
    />
  );
}

export default FormTextInput;