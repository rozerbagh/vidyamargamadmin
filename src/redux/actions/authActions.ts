import axios from "axios";
import ActionTypes from "../../utils/actionTypes";
import {
  UserDetailsType,
  AuthLoadingActions,
  AuthSuccessActions,
  AuthFailedActions,
} from "../../Interfaces/ReduxInterface/ReduxAuthInterface";

const authenticationStart = (): AuthLoadingActions => {
  return {
    type: ActionTypes.AUTH_LOADING,
    payload: null,
  };
};

const authenticationSuccess = (data: UserDetailsType): AuthSuccessActions => {
  return {
    type: ActionTypes.AUTH_SUCCESS,
    payload: data,
  };
};

const authenticationFail = (error: any): AuthFailedActions => {
  return {
    type: ActionTypes.AUTH_FAILED,
    payload: error,
  };
};

export function logout() {
  localStorage.clear();
  return {
    type: ActionTypes.AUTH_LOGOUT,
    path: "/login",
  };
}

// this functions returns a functions which carries an argument as functions.
export const authenticate = (email: string, password: string) => {
  return async (dispatch: any) => {
    dispatch(authenticationStart());
    try {
      const { data } = await axios.post("", { email, password });
      const details: UserDetailsType = {
        username: data.username,
        token: data.token,
        email: data.email,
        phoneno: data.phoneno,
      };
      dispatch(authenticationSuccess(details));
    } catch (error: any) {
      dispatch(authenticationFail(error.message));
    }
  };
};
