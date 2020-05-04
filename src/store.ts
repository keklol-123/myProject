import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './reducers/authReducer';
import IState from './interfaces/state';

const initialState: IState = {
  token: localStorage.getItem('token'),
  isAuthenticated: false,
  links: null,
  registerSuccess: false,
  registerFailure: false,
  loginFailure: false,
  addFailure: false,
};

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
  }
}

const middleWare = [thunk];

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
  rootReducer,
  initialState,
  composeEnhancers(applyMiddleware(...middleWare)),
);

export default store;
