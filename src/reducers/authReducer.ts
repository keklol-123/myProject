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
  ADD_LINK_FAIL,
  CHECKING_TOKEN
} from '../actions/types';
import IState from '../interfaces/state'

const initialState: IState = {
  token: localStorage.getItem('token'),
  isAuthenticated: false,
  links: null,
  registerSuccess:false,
  registerFailure: false,
  loginFailure: false,
  addFailure: false,
  checkingToken: false
};

export default function(state = initialState, action: any): IState {
  switch (action.type) {
    case LOGIN_SUCCESS:
      localStorage.setItem('token', action.payload.token);
      return {
        ...state,
        links: action.payload.links,
        token: action.payload.token,
        isAuthenticated: true,
        registerSuccess: false,
        registerFailure: false,
        loginFailure: false,
        addFailure: false,
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
        loginFailure: false,
        addFailure: false
      };
    case CHECKING_TOKEN: 
      return {
        ...state,
        checkingToken: true
      }
    case CHECK_TOKEN_SUCCESS:
        return {
            ...state,
            links: action.payload,
            isAuthenticated: true,
            checkingToken: false
        } 
    case ADD_LINK:
    case DELETE_LINK:
    case LOAD_LINKS: 
        return {
          ...state,
          links: action.payload
        }
    case ADD_LINK_FAIL:
      return{
        ...state,
        addFailure: true
      }
    case LOGOUT: 
        return {
          token: localStorage.getItem('token'),
          isAuthenticated: false,
          links: null,
          registerSuccess:false,
          registerFailure: false,
          loginFailure: false,
          addFailure: false
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
