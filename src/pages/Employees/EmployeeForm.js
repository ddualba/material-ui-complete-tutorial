import React, { useEffect } from 'react';
import { useFormik } from 'formik';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  root: {
    '& .MuiFormControl-root': {
      width: '80%',
      margin: theme.spacing(1)
    }
  }
}));

// const initialFormValues = {
//   id: 0,
//   fullName: '',
//   email: '',
//   mobile: '',
//   city: '',
//   gender: 'male',
//   departmentId: '',
//   hireDate: new Date(),
//   isPermanent: false
// };

function EmployeeForm() {
  const classes = useStyles();
  // const [values, setValues] = useState(initialFormValues);

  // UseFormik instead of componentState, handleInputChange

  const formik = useFormik({
    initialValues: {
      id: 0,
      fullName: '',
      email: '',
      mobile: '',
      city: '',
      gender: 'male',
      departmentId: '',
      hireDate: new Date(),
      isPermanent: false
    }
  });

  // const handleInputChange = e => {
  //   const { name, value } = e.target;
  //   setValues({
  //     ...values,
  //     [name]: value
  //   });
  // };

  return (
    <form className={classes.root}>
      <Grid container>
        <Grid item xs={6}>
          <TextField
            variant='outlined'
            label='Full Name'
            name='fullName'
            value={formik.values.fullName}
            // onChange={handleInputChange} // replaced with formik
            onChange={formik.handleChange}
          />
          <TextField
            variant='outlined'
            label='Email'
            name='email'
            value={formik.values.email}
            onChange={formik.handleChange}
          />
        </Grid>
        <Grid item xs={6}></Grid>
      </Grid>
    </form>
  );
}

export default EmployeeForm;
