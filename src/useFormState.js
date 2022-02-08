import { useReducer } from 'react';

const SET_FIELD = 'form/set_field';
const RESET_FORM = 'form/reset_form';

function formReducer(state, action) {
  switch (action.type) {
    case SET_FIELD:
      return {
        ...state,
        [action.payload.name]: action.payload.value
      }
    case RESET_FORM:
      return action.payload;
    default:
      return state;
  }
}

export default function useFormState(initialState, onSubmit) {
  const [state, dispatch] = useReducer(formReducer, initialState)

  const inputProps = {};
  for (const input of Object.keys(state)) {
    inputProps[input] = {
      name: input,
      value: state[input],
      onChange: (e) => {
        dispatch({
          type: SET_FIELD,
          payload: {
            name: e.target.name,
            value: e.target.value,
          },
        });
      },
    };
  }

  return {
    inputProps,
    formProps: {
      onSubmit: e => {
        e.preventDefault();
        onSubmit(state);
      }
    },
    reset(e) {
      e.preventDefault();
      dispatch({
        type: RESET_FORM,
        payload: initialState
      });
    }
  };
}