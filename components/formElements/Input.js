import React, { useReducer, useEffect } from "react";

import { validate } from "./validate";

const inputReducer = (state, action) => {
  switch (action.type) {
    case "CHANGE":
      return {
        ...state,
        value: action.val,
        isValid: validate(action.val, action.rules),
      };
    case "TOUCH":
      return {
        ...state,
        isTouched: true,
      };
    default:
      return state;
  }
};

const Input = (props) => {
  const initialState = {
    value: props.initialValue || "",
    isTouched: false,
    isValid: props.initialValid || false,
  };
  const [inputState, dispatch] = useReducer(inputReducer, initialState);

  const touchHandler = () => {
    dispatch({
      type: "TOUCH",
    });
  };

  const changedHandler = (event) => {
    dispatch({
      type: "CHANGE",
      val: event.target.value,
      rules: props.rules || [],
    });
  };

  const { id, onInput } = props;
  const { value, isValid } = inputState;

  useEffect(() => {
    onInput(id, value, isValid);
  }, [onInput, id, value, isValid]);

  let element = (
    <input
      className={`form-group__input ${
        !inputState.isValid &&
        inputState.isTouched &&
        "form-group__input--invalid"
      }`}
      id={props.id}
      type={props.type || "text"}
      placeholder={props.placeholder}
      value={inputState.value}
      disabled={props.disabled}
      onBlur={touchHandler}
      onChange={changedHandler}
    />
  );
  if (props.element === "textarea") {
    element = (
      <textarea
        className={`form-group__input ${
          !inputState.isValid &&
          inputState.isTouched &&
          "form-group__input--invalid"
        }`}
        id={props.id}
        rows={props.rows || 6}
        placeholder={props.placeholder}
        value={inputState.value}
        disabled={props.disabled}
        onBlur={touchHandler}
        onChange={changedHandler}
      />
    );
  } else if (props.element === "select") {
    const options = props.options.map((opt, index) => {
      return (
        <option key={index} value={opt}>
          {opt}
        </option>
      );
    });
    element = (
      <select
        className={`form-group__input ${
          !inputState.isValid &&
          inputState.isTouched &&
          "form-group__input--invalid"
        }`}
        id={props.id}
        value={inputState.value}
        disabled={props.disabled}
        onBlur={touchHandler}
        onChange={changedHandler}
      >
        {options}
      </select>
    );
  } else {
  }

  return (
    <div className="form-group">
      {element}
      <div className="form-group__details">
        <label className="form-group__label" htmlFor={props.id}>
          {props.label}
        </label>
        {!inputState.isValid && inputState.isTouched && (
          <p className="form-group__error">{props.errorMsg || "Invalid"}</p>
        )}
      </div>
    </div>
  );
};

export default Input;
