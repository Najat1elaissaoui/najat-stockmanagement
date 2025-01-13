// redux/actions/userInfoActions.js
import UserInfoService from "@/redux/services/users/UserInfoService";
import UserInfoType from "@/redux/types/users/UserInfoType";

export const UserInfoSuccess = (data) => ({
  type: UserInfoType.GET_USER_INFO_SUCCESS,
  payload: data,
});

export const UserInfoFail = (error) => ({
  type: UserInfoType.GET_USER_INFO_FAIL,
  payload: error,
});

const UserInfoAction = (id) => async (dispatch) => {
  dispatch({ type: "SET_LOADING", isLoading: true });
  try {
    const response = await UserInfoService(id);
    if (response?.data?.data) {
      dispatch(UserInfoSuccess(response.data.data));
    } else {
      throw new Error("Invalid response from server.");
    }
  } catch (error) {
    const errorMsg = error?.response?.data?.message || "An error occurred. Please try again.";
    dispatch(UserInfoFail(errorMsg));
  } finally {
    dispatch({ type: "SET_LOADING", isLoading: false });
  }
};

export default UserInfoAction;
