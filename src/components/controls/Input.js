import React from 'react';
import { TextField } from '@material-ui/core';

const Input = ({
  name,
  label,
  value,
  onChange,
  error,
  helperText,
  ...other
}) => {
  return (
    <TextField
      variant='outlined'
      label={label}
      name={name}
      value={value}
      onChange={onChange}
      error={error}
      helperText={helperText}
      {...other}
      inputProps={{
        autoComplete: 'new-password',
        form: {
          autoComplete: 'off'
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
