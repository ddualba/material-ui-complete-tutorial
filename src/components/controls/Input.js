import React from 'react';
import { TextField } from '@material-ui/core';

const Input = ({ name, label, value, onChange, error, helperText }) => {
  return (
    <TextField
      variant='outlined'
      label={label}
      name={name}
      value={value}
      onChange={onChange}
      error={error}
      helperText={helperText}
      inputProps={{
        autocomplete: 'new-password',
        form: {
          autocomplete: 'off'
        }
      }}
    />
  );
};

export default Input;

// {...other}

// const {
//   name,
//   label,
//   value,
//   onChange
//   // onChange
//   // error = null,
//   // helperText = '',
//   // ...other
// } = props;
