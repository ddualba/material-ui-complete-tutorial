import React from 'react';
// import  { useEffect } from 'react';
import { useFormik } from 'formik';
import { Grid } from '@material-ui/core';
import { Form } from '../../components/controls/Form';
import Controls from '../../components/controls/Controls';
import * as employeeService from '../../services/employeeService';
import {
  validationSchema,
  genderItems,
  initialValues
} from './EmployeeFormValidation';

function EmployeeForm() {
  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: validationSchema,
    onSubmit: (values, { setSubmitting, resetForm }) => {
      employeeService.insertEmployee(values);
      resetForm(initialValues);
      setSubmitting(false);
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
          <Controls.Input
            name='mobile'
            label='Mobile'
            value={formik.values.mobile}
            onChange={formik.handleChange}
            error={formik.touched.mobile && Boolean(formik.errors.mobile)}
            helperText={formik.touched.mobile && formik.errors.mobile}
          />
          <Controls.Input
            name='city'
            label='City'
            value={formik.values.city}
            onChange={formik.handleChange}
            error={formik.touched.city && Boolean(formik.errors.city)}
            helperText={formik.touched.city && formik.errors.city}
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
            error={
              formik.touched.departmentId && Boolean(formik.errors.departmentId)
            }
            helperText={
              formik.touched.departmentId && formik.errors.departmentId
            }
          />
          <Controls.DatePicker
            name='hireDate'
            label='Hire Date'
            value={formik.values.hireDate}
            onChange={formik.handleChange}
            error={formik.touched.hireDate && Boolean(formik.errors.hireDate)}
            helperText={formik.touched.hireDate && 'Valid Date Required'}
          />
          <Controls.Checkbox
            name='isPermanent'
            label='Permanent Employee'
            checked={formik.values.isPermanent}
            onChange={formik.handleChange}
            // color='secondary' //if left off, defaults to primary
          />

          <div>
            <Controls.Button type='submit' text='Submit' />
            <Controls.Button
              text='Reset'
              color='default'
              type='reset'
              onClick={formik.handleReset}
            />
          </div>
        </Grid>
      </Grid>
    </Form>
  );
}

export default EmployeeForm;
