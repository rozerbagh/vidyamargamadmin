import { UnknownAction } from "redux";
import ActionTypes from "../../utils/actionTypes";
export type UserDetailsType = {
  username: string;
  email: string;
  phoneno: string;
  token: string;
};
export interface AuthReducersInterface {
  loading: boolean;
  isAuth: boolean;
  token: string;
  userDetails: UserDetailsType | null;
}

export interface AuthLoadingActions extends UnknownAction {
  type: ActionTypes.AUTH_LOADING;
  payload: null;
}

export interface AuthSuccessActions extends UnknownAction {
  type: ActionTypes.AUTH_SUCCESS;
  payload: UserDetailsType;
}

export interface AuthFailedActions extends UnknownAction {
  type: ActionTypes.AUTH_FAILED;
  payload: null;
}