import React from "react";

const FormInput = ({
  label,
  id,
  type = "text",
  value,
  onChange,
  required = false,
  placeholder = "",
  min,
  max,
}) => {
  const inputProps = {
    id,
    name: id,
    type,
    value,
    onChange,
    required,
    placeholder,
    ...(type === "number" && { min, max }),
  };

  return (
    <div className="form-group">
      <label htmlFor={id}>{label}</label>
      {type === "textarea" ? (
        <textarea {...inputProps} />
      ) : (
        <input {...inputProps} />
      )}
    </div>
  );
};

export default FormInput;
