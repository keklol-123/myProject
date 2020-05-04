import {
  LOGIN_SUCCESS,
  REGISTER_SUCCESS,
  REGISTER_FAILURE,
  CHECK_TOKEN_SUCCESS,
  LOGOUT,
  CLEAR_REGISTRATION_STATUS,
  LOGIN_FAILURE,
  CHECKING_TOKEN,
} from './types';
import { Dispatch } from 'redux';

export const loginUser = ({ email, password }: { email: string; password: string }) => (
  dispatch: Dispatch<any>,
): void => {
  const data = {
    email,
    password,
  };
  fetch('/login', {
    method: 'POST',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })
    .then(res => {
      if (res.status === 200)
        res.json().then(myresponse => {
          dispatch({ type: LOGIN_SUCCESS, payload: myresponse });
        });
      else {
        dispatch({ type: LOGIN_FAILURE });
      }
    })
    .catch(err => {
      console.log(err);
    });
};

export const registerUser = ({ email, password }: { email: string; password: string }) => (
  dispatch: Dispatch<any>,
): void => {
  const data = {
    email: email,
    password: password,
  };

  fetch('/signup', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  }).then(res => {
    res.json().then(myresponse => {
      if (myresponse.success) {
        dispatch({ type: REGISTER_SUCCESS });
      } else {
        dispatch({ type: REGISTER_FAILURE });
      }
    });
  });
};

type CheckTokenType = void | null;

export const checkToken = () => (dispatch: Dispatch<any>): CheckTokenType => {
  if (!localStorage.getItem('token')) {
    return;
  } else {
    dispatch({
      type: CHECKING_TOKEN,
    });
    const data = {
      token: localStorage.getItem('token'),
    };
    fetch('/checkToken', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    }).then(res => {
      if (res.status === 200)
        res.json().then(json => {
          dispatch({ type: CHECK_TOKEN_SUCCESS, payload: json });
        });
    });
  }
};

interface ActionResult {
  type: string;
}

export const clearErrors = (): ActionResult => {
  return { type: CLEAR_REGISTRATION_STATUS };
};

export const logout = (): ActionResult => {
  if (localStorage.getItem('token')) localStorage.removeItem('token');
  return {
    type: LOGOUT,
  };
};
