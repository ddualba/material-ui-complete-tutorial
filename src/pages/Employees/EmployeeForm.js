import React from 'react';
// import  { useEffect } from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { Grid } from '@material-ui/core';
import Controls from '../../components/controls/Controls';
import { Form } from '../../components/controls/Form';
import * as employeeService from '../../services/employeeService';

import Button from '@material-ui/core/Button';

const validationSchema = yup.object({
  fullName: yup
    .string('Enter your full name')
    .required('Full Name is required'),
  email: yup
    .string('Enter your email')
    .email('Enter a valid email')
    .required('Email is required'),
  hireDate: yup.date('Enter hire date').required('Hire date is required')
});

const genderItems = [
  { id: 'male', title: 'Male' },
  { id: 'female', title: 'Female' },
  { id: 'other', title: 'Other' }
];

function EmployeeForm() {
  const formik = useFormik({
    initialValues: {
      id: 0,
      fullName: '',
      email: '',
      mobile: '',
      city: '',
      gender: 'male',
      departmentId: '',
      hireDate: new Date(), // null,
      isPermanent: false
    },
    validationSchema: validationSchema,
    onSubmit: values => {
      alert(JSON.stringify(values, null, 2));
    }
  });

  return (
    <Form onSubmit={formik.handleSubmit}>
      <Grid container>
        <Grid item xs={6}>
          <Controls.Input
            name='fullName'
            label='Full Name'
            value={formik.values.fullName}
            onChange={formik.handleChange}
            error={formik.touched.fullName && Boolean(formik.errors.fullName)}
            helperText={formik.touched.fullName && formik.errors.fullName}
          />

          <Controls.Input
            name='email'
            label='Email'
            value={formik.values.email}
            onChange={formik.handleChange}
            error={formik.touched.email && Boolean(formik.errors.email)}
            helperText={formik.touched.email && formik.errors.email}
          />
        </Grid>
        <Grid item xs={6}>
          <Controls.RadioGroup
            name='gender'
            label='Gender'
            value={formik.values.gender}
            onChange={formik.handleChange}
            items={genderItems}
          />
          <Controls.Select
            name='departmentId'
            label='Department'
            value={formik.values.departmentId}
            onChange={formik.handleChange}
            options={employeeService.getDepartmentCollection()}
          />
          <Controls.DatePicker
            name='hireDate'
            label='Hire Date'
            value={formik.values.hireDate}
            onChange={formik.handleChange}
            error={formik.touched.hireDate && Boolean(formik.errors.hireDate)}
            helperText={formik.touched.hireDate && formik.errors.hireDate}
          />
          <Controls.Checkbox
            name='isPermanent'
            label='Permanent Employee'
            checked={formik.values.isPermanent}
            onChange={formik.handleChange}
            // color='secondary' //if left off, defaults to primary
          />
        </Grid>
      </Grid>
      <Button color='primary' variant='contained' type='submit'>
        Submit
      </Button>
    </Form>
  );
}

export default EmployeeForm;
