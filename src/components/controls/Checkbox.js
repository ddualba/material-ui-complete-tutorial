import React from 'react';
import {
  FormControl,
  FormControlLabel,
  Checkbox as MuiCheckbox
} from '@material-ui/core';

const Checkbox = ({ name, label, checked, onChange, color = 'primary' }) => {
  return (
    <FormControl>
      <FormControlLabel
        control={
          <MuiCheckbox
            name={name}
            color={color}
            checked={checked}
            onChange={onChange}
          />
        }
        label={label}
      />
    </FormControl>
  );
};

export default Checkbox;
