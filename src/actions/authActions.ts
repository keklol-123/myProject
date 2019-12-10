import {
  USER_LOADED,
  LOGIN_SUCCESS,
  REGISTER_SUCCESS,
  REGISTER_FAILURE,
  CHECK_TOKEN_SUCCESS,
  LOGOUT
} from './types';

export const loginUser: any = ({ email, password }: { email: string; password: string }): any => (
  dispatch: any,
): any => {
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
    })
    .catch(err => {
      console.log(err);
    });
};

export const registerUser: any = ({
  email,
  password,
}: {
  email: string;
  password: string;
}): any => (dispatch: any): any => {
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

export const checkToken: any = (): any => (dispatch: any) => {
  if (!localStorage.getItem('token')) {
    return;
  } else {
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

export const logout = () => {
  if (localStorage.getItem('token'))
    localStorage.removeItem('token');
  return {
    type: LOGOUT
  }
}
