import React from 'react';
import {
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select as MuiSelect
} from '@material-ui/core';

function Select({ name, label, value, onChange, options, error, helperText }) {
  return (
    <FormControl variant='outlined' error={error}>
      <InputLabel>{label}</InputLabel>
      <MuiSelect label={label} name={name} value={value} onChange={onChange}>
        <MenuItem value=''>None</MenuItem>
        {options.map(item => (
          <MenuItem key={item.id} value={item.id}>
            {item.title}
          </MenuItem>
        ))}
      </MuiSelect>
      {error && <FormHelperText>{helperText}</FormHelperText>}
    </FormControl>
  );
}

export default Select;
