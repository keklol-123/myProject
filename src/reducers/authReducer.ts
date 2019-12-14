import {
  LOGIN_SUCCESS,
  REGISTER_SUCCESS,
  REGISTER_FAILURE,
  CLEAR_REGISTRATION_STATUS,
  CHECK_TOKEN_SUCCESS,
  ADD_LINK,
  DELETE_LINK,
  LOAD_LINKS,
  LOGOUT,
  LOGIN_FAILURE,
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
  loginFailure: boolean;
}

const initialState: IState = {
  token: localStorage.getItem('token'),
  isAuthenticated: false,
  links: null,
  registerSuccess:false,
  registerFailure: false,
  loginFailure: false
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
        loginFailure: false
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
        loginFailure: false
      };
    case CHECK_TOKEN_SUCCESS:
        return {
            ...state,
            links: action.payload,
            isAuthenticated: true
        } 
    case ADD_LINK:
    case DELETE_LINK:
    case LOAD_LINKS: 
        return {
          ...state,
          links: action.payload
        }
    case LOGOUT: 
        return {
          token: localStorage.getItem('token'),
          isAuthenticated: false,
          links: null,
          registerSuccess:false,
          registerFailure: false,
          loginFailure: false
        }
    case LOGIN_FAILURE:
      return {
        ...state,
        loginFailure: true
      }
    default: 
        return {
            ...state
        }
  }
}
