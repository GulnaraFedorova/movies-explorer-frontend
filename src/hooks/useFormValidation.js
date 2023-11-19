import { useCallback, useState } from "react";
import isEmail from "validator/es/lib/isEmail";

function useFormValidation() {
  const [values, setValues] = useState({});
  const [errors, setErrors] = useState({});
  const [isFormValid, setFormValid] = useState(false);

  const resetValidation = useCallback(
    (isFormValid = false, values = {}, errors = {}) => {
      setFormValid(isFormValid);
      setValues(values);
      setErrors(errors);
    },
    [setFormValid, setValues, setErrors]
  );
  
  function onChange(e) {
    const target = e.target;
    const { value, name } = target;

    if (name === "name" && target.validity.patternMismatch) {
      target.setCustomValidity(
        "Имя должно состоять из латиницы, кириллицы, пробела или дефиса."
      );
    } else if (name === "email" && !isEmail(value)) {
      target.setCustomValidity(
        "Неправильный формат email"
      );
    } else {
      target.setCustomValidity("");
    }
    setValues({ ...values, [name]: value });
    setErrors({ ...errors, [name]: target.validationMessage });
    setFormValid(target.closest("form").checkValidity());
  }

  return {
    values,
    onChange,
    errors,
    isFormValid,
    resetValidation,
  };
}

export default useFormValidation;