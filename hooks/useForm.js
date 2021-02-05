import { useReducer, useCallback } from "react";

const formReducer = (state, action) => {
  switch (action.type) {
    case "INPUT_CHANGED":
      let formValidity = true;
      for (const id in state.inputs) {
        if (id === action.id) {
          formValidity = formValidity && action.isValid;
        } else {
          formValidity = formValidity && state.inputs[id].isValid;
        }
      }
      return {
        ...state,
        inputs: {
          ...state.inputs,
          [action.id]: {
            value: action.value,
            isValid: action.isValid
          }
        },
        isFormValid: formValidity
      };

    default:
      return state;
  }
};

export const useForm = initialFormInputs => {
  const initialFormState = {
    inputs: initialFormInputs,
    isFormValid: false
  };
  const [formState, dispatch] = useReducer(formReducer, initialFormState);

  const inputHandler = useCallback(
    (inputId, inputValue, isInputValid) => {
      dispatch({
        type: "INPUT_CHANGED",
        id: inputId,
        value: inputValue,
        isValid: isInputValid
      });
    },
    [dispatch]
  );

  return [formState, inputHandler];
};
