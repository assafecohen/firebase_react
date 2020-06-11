export default function validateLogin(values) {
  let errors = {};

  //Emails Error
  if (!values.email) {
    errors.email = 'Email required';
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
    errors.email = 'Invalid email address';
  }

  //Password Errors
  if (!values.password) {
    errors.password = 'Password requried';
  } else if (values.password.length < 6) {
    errors.password = 'Password need to be atleast 6 characters';
  }
  return errors;
}
