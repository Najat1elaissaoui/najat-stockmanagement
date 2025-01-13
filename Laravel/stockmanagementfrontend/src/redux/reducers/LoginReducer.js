import { LoginType } from '../types/LoginType'

const initialState = {
    isLoggedIn: false, 
    user: null,
    error: null,

}

const LoginReducer = (state = initialState, action) => {
    switch (action.type) {
        case LoginType.LOGIN_SUCCESS:
            return {
                ...state,
                isLoggedIn: true,
                user: action.payload,
                error: null
            };
        case LoginType.LOGIN_FAIL:
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

export default LoginReducer;