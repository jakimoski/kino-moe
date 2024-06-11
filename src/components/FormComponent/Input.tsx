import React from "react";

type InputProps = {
  label: string;
  value: string;
  error: string;
  type: string;
  id: string;
  changeHandler: (value: string) => void;
};

const Input = ({
  id,
  type,
  label,
  value,
  error,
  changeHandler,
}: InputProps) => {
  return (
    <div className="form__group">
      <input
        className="form__input"
        value={value}
        onChange={(e) => changeHandler(e.target.value)}
        type={type}
        id={id}
      />
      <label
        className={`form__label ${value.length > 0 && "form__label--active"}`}
        htmlFor={id}
      >
        {label}
      </label>
      <p className={`${error ? `form__error--active` : `form__error`}`}>
        {error}
      </p>
    </div>
  );
};

export default Input;
