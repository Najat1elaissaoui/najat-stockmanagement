import { LogoutType } from "../types/LogoutType";
import { LogoutService } from "../services/LogoutService"; // Ensure this path is correct.

export const LogoutSuccess = () => {
    return {
        type: LogoutType.LOGOUT_SUCCESS,
    };
};

export const LogoutFail = (error) => {
    return {
        type: LogoutType.LOGOUT_FAIL,
        payload: error,
    };
};

export const LogoutAction = () => {
    return async (dispatch) => {
        try {
            await LogoutService();

            localStorage.removeItem("accessToken");

            dispatch(LogoutSuccess());
            window.location.href = "/";  // Redirect to home or login page
        } catch (error) {
            dispatch(LogoutFail(error.message || "Logout failed"));
        }
    };
};
