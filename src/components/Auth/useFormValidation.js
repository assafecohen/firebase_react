import React, { useState, useEffect } from 'react';

function useFormValidation(intialState, validate) {
  const [values, setValues] = useState(intialState);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (isSubmitting) {
      const noErros = Object.keys(errors).length === 0;
      if (noErros) {
        console.log('authenticate');
        setSubmitting(false);
      } else {
        setSubmitting(false);
      }
    }
  }, [errors]);

  function handleChange(event) {
    event.persist();
    setValues((prevValues) => ({
      ...prevValues,
      [event.target.name]: event.target.value,
    }));
  }

  function handleBlur() {
    const validationErrors = validate(values);
    setErrors(validationErrors);
  }
  function handleSubmit(event) {
    event.preventDefault();
    const validationErrors = validate(values);
    setErrors(validationErrors);
    setSubmitting(true);
    console.log({ values });
  }

  return {
    handleChange,
    handleSubmit,
    handleBlur,
    values,
    errors,
    isSubmitting,
  };
}

export default useFormValidation;
