import React from "react";
import { FormControl, InputLabel, Select, MenuItem } from "@material-ui/core";
import { useController } from "react-hook-form";

function FormSelect({ control, name, label = null, defaultValue = '', required = false, options, valueKey = 'value', labelKey = 'label' }) {
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
    <FormControl variant="outlined" size="small" fullWidth error={invalid}>
      <InputLabel id={name}>
        {label || name}
      </InputLabel>
      <Select
        labelId={name}
        {...inputProps}
        label={label || name}
        ref={ref}
      >
        {options.map(option =>
          <MenuItem key={option[valueKey]} value={option[valueKey]}>{option[labelKey]}</MenuItem>
        )}
      </Select>
    </FormControl>
  );
}

export default FormSelect;