import React, { useState } from "react";

export default function useValidateForm(input) {
  const [errors, setErrors] = useState(null);

  const validateFormInputs = async (e) => {
    console.log("validation");
    let re = "/^[^s@]+@[^s@]+.[^s@]+$/";
    const validationErrors = {};
    if (!input.username.trim()) {
      // check if empty
      validationErrors.username = "username is required.";
    }
    if (!input.email.trim()) {
      validationErrors.email = "email is required.";
    } else if (/^[^s@]+@[^s@]+.[^s@]+$/.test(input.email)) {
      validationErrors.email = "email is not valid.";
    }
    if (!input.password.trim()) {
      validationErrors.password = "password is required.";
    } else if (input.password.length < 6) {
      validationErrors.password = "password should be at least 6 char.";
    }
    if (input.password !== input.confirmPassword) {
      validationErrors.confirmPassword = "password not matched.";
    }

    setErrors(validationErrors);
  };

  validateFormInputs();
  return { errors };
}
