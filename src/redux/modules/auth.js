import axios from 'axios';

const LOGIN = 'famly-signin/auth/LOGIN';
const LOGIN_SUCCESS = 'famly-signin/auth/LOGIN_SUCCESS';
const LOGIN_FAIL = 'famly-signin/auth/LOGIN_FAIL';
export const LOGOUT = 'famly-signin/auth/LOGOUT';

const initialState = {
  accessToken: "",
  loggingIn: false
};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case LOGIN:
      return {
        ...state,
        loggingIn: true
      };
    case LOGIN_SUCCESS:
      return {
        ...state,
        loggingIn: false,
        accessToken: action.accessToken
      };
    case LOGIN_FAIL:
      return {
        ...state,
        loggingIn: false,
        error: action.error
      };
    case LOGOUT:
      return {
        ...state,
        accessToken: ""
      };
    default:
      return state;
  }
}

// action creators
export const login = (password) => (dispatch) => {

  dispatch({ type: LOGIN });

  axios.post('https://tryfamly.co/api/daycare/tablet/login', { 
    password
  })
  .then(({data}) => {
    dispatch({ 
      type: LOGIN_SUCCESS, 
      accessToken: data.accessToken 
    });
  })
  .catch((error) => {
    dispatch({
      type: LOGIN_FAIL,
      error: {
        ...error,
        message: 'Failed to log in.'
      }
    });
  });
}

export const logout = () => {
  return {
    type: LOGOUT
  }
}

// selectors
export const checkIfLogged = (state) => {
  return state.accessToken ? true : false;
}