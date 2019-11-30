import {
  LOGIN_SUCCESS,
  REGISTER_SUCCESS,
  REGISTER_FAILURE,
  CLEAR_REGISTRATION_STATUS,
  CHECK_TOKEN_SUCCESS,
} from '../actions/types';

interface ILink {
  link: string;
  price: number;
}

interface IState {
  token: string | null;
  isAuthenticated: boolean;
  links: [ILink] | null | undefined;
  registerSuccess: boolean;
  registerFailure: boolean;
}

const initialState: IState = {
  token: localStorage.getItem('token'),
  isAuthenticated: false,
  links: null,
  registerSuccess:false,
  registerFailure: false,
};

export default function(state = initialState, action: any): IState {
  switch (action.type) {
    case LOGIN_SUCCESS:
      localStorage.setItem('token', action.payload.token);
      return {
        links: action.payload.links,
        token: action.payload.token,
        isAuthenticated: true,
        registerSuccess: false,
        registerFailure: false,
      };
    case REGISTER_SUCCESS:
      return {
        ...state,
        registerSuccess: true,
      };
    case REGISTER_FAILURE:
      return {
        ...state,
        registerFailure: true,
      };
    case CLEAR_REGISTRATION_STATUS:
      return {
        ...state,
        registerSuccess: false,
        registerFailure: false,
      };
    case CHECK_TOKEN_SUCCESS:
        return {
            ...state,
            links: action.payload,
            isAuthenticated: true
        }   
    default: 
        return {
            ...state
        }
  }
}
