import { LogoutType } from "../types/LogoutType";

const initialState = {
    isLoggedIn: false,
    user: null,
    error: null,
};

const LogoutReducer = (state = initialState, action) => {
    switch (action.type) {
        case LogoutType.LOGOUT_SUCCESS:
            return {
                ...state,
                isLoggedIn: false,
                user: null,
                error: null
            };
        case LogoutType.LOGOUT_FAIL:
            return {
                ...state,
                isLoggedIn: false,
                user: null,
                error: action.payload
            };
        default:
            return state;
    }
};

export default LogoutReducer;
