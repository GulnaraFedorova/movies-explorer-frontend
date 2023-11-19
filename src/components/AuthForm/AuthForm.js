import React from "react";
import "./AuthForm.css";

function AuthForm({ 
    name,
    onSubmit,
    isFormValid,
    ...props
  }) {

    return (
      <form 
      action="#"
      name={`${name}`}
      id={`${name}`}
      className={`form form_type_${name}`}
      noValidate
      onSubmit={onSubmit}
      >
      {props.children}
      </form>
    );
}

export default AuthForm;