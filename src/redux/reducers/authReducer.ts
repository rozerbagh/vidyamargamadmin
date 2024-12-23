import {
  AuthReducersInterface,
  AuthLoadingActions,
  AuthSuccessActions,
  AuthFailedActions,
} from "../../Interfaces/ReduxInterface/ReduxAuthInterface";
import ActionTypes from "../../utils/actionTypes";
type Actions = AuthLoadingActions | AuthSuccessActions | AuthFailedActions;
const authReducer = (
  state: AuthReducersInterface,
  action: Actions
): AuthReducersInterface => {
  switch (action.type) {
    case ActionTypes.AUTH_LOADING:
      state = { ...state, loading: true };
      break;
    case ActionTypes.AUTH_SUCCESS:
      state = {
        ...state,
        loading: false,
        userDetails: action.payload,
        token: action.payload?.token,
      };
      break;
    case ActionTypes.AUTH_FAILED:
      state = { ...state, loading: false, userDetails: null };
      break;
    default:
      break;
  }

  return state;
};

export default authReducer;
