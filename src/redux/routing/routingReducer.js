import { RoutingActionTypes } from "./routing.types";
import { UserActionTypes } from "../user/user.types";

const INITIAL_STATE = {
    currentRoute: null,
    lastAttemptedRoute: null,
    resumeSavedRoute: false
}

const routingReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case RoutingActionTypes.SET_RESUME_SAVED_ROUTE:
            return {
                ...state,
                resumeSavedRoute: true
            }
        case RoutingActionTypes.SET_CURRENT_ROUTE:
            return {
                ...state,
                currentRoute: action.payload
            }
        case RoutingActionTypes.SET_LAST_ATTEMPTED_ROUTE:
            return {
                ...state,
                lastAttemptedRoute: action.payload
            }
        case UserActionTypes.SIGN_OUT_SUCCESS:
            return {
                ...state,
                lastAttemptedRoute: null,
            }
        default:
            return state;
    }
}

export default routingReducer;