import * as yup from 'yup';
// const phoneRegExp =
//   /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;
const phoneRegExp = /\(?([0-9]{3})\)?([ .-]?)([0-9]{3})\2([0-9]{4})/;

export const validationSchema = yup.object({
  fullName: yup
    .string('Enter your full name')
    .required('Full Name is required'),
  email: yup
    .string('Enter your email')
    .email('Enter a valid email')
    .required('Email is required'),
  mobile: yup
    .string()
    .matches(phoneRegExp, 'Phone number is not valid')
    .required('Phone number required'),
  hireDate: yup.date().required('Required'),
  departmentId: yup.string().required('Department required')
});

export const genderItems = [
  { id: 'male', title: 'Male' },
  { id: 'female', title: 'Female' },
  { id: 'other', title: 'Other' }
];

export const initialValues = {
  id: 0,
  fullName: '',
  email: '',
  mobile: '',
  city: '',
  gender: 'male',
  departmentId: '',
  hireDate: new Date(), // null,
  isPermanent: false
};
