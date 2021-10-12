import React from "react";
import { FormControl, InputLabel, Select, MenuItem } from "@material-ui/core";

function FormSelectNative({ name, label = null, defaultValue = '', options, valueKey = 'value', labelKey = 'label', ...props }) {

  return (
    <FormControl variant="outlined" size="small" fullWidth>
      <InputLabel id={name}>
        {label || name}
      </InputLabel>
      <Select
        name={name}
        labelId={name}
        label={label || name}
        defaultValue={defaultValue}
        {...props}
      >
        {options.map(option =>
          <MenuItem key={option[valueKey]} value={option[valueKey]}>{option[labelKey]}</MenuItem>
        )}
      </Select>
    </FormControl>
  );
}

export default FormSelectNative;