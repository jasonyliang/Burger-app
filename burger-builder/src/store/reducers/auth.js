import * as actionTypes from "../actions/actionTypes";
import { updateObject } from "../utility";
// import { auth } from "../actions";

const initialState = {
  token: null,
  userID: null,
  error: null,
  loading: false,
  authRedirect: "/"
};

const authStart = state => {
  return updateObject(state, { error: null, loading: true });
};

const authSuccess = (state, action) => {
  return updateObject(state, {
    token: action.token,
    userID: action.userID,
    error: null,
    loading: false
  });
};

const authFail = (state, action) => {
  return updateObject(state, {
    error: action.error,
    loading: false
  });
};

const authLogout = state => {
  return updateObject(state, {
    token: null,
    userID: null
  });
};

const setAuthRedirectPath = (state, action) => {
  return updateObject(state, { authRedirect: action.path });
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.AUTH_START:
      return authStart(state);
    case actionTypes.AUTH_SUCCESS:
      return authSuccess(state, action);
    case actionTypes.AUTH_FAIL:
      return authFail(state, action);
    case actionTypes.AUTH_LOGOUT:
      return authLogout(state);
    case actionTypes.SET_AUTH_REDIRECT_PATH:
      return setAuthRedirectPath(state, action);
    default:
      return state;
  }
};

export default reducer;
