import React from 'react';

const useFormValidation = (callback, initialValues={}) => {
  const [values, setValues] = React.useState(initialValues);
  const [errors, setErrors] = React.useState({});
  const handleSubmit = (event) => {
    if (event) event.preventDefault();
      callback(event);
  };
  const handleChange = (event) => {
    event.persist();
    const error = !event.target.validity.valid? event.target.validationMessage:'';
    setErrors((errors)=>{
      if(!error){
        delete errors[event.target.name];
        return errors;
      }
      else{
        return  {...errors, [event.target.name]: error};
      }
    })
    setValues(values => ({ ...values, [event.target.name]: event.target.value }));
  };
  React.useEffect(() => {
    //setValues(data);
  });
  return {
    handleChange,
    handleSubmit,
    values,
    errors,
    setValues,
    setErrors
  }
};
export default useFormValidation;
