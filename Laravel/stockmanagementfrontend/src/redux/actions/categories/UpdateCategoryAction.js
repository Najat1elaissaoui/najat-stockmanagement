import UpdateCategoryService from "@/redux/services/categories/UpdateCategoryService";
import UpdateCategoryType from "@/redux/types/categories/UpdateCategoryType";

const updateCategoryRequest = () => ({
  type: UpdateCategoryType.UPDATE_CATEGORY_REQUEST,
});

const updateCategorySuccess = (data) => ({
  type: UpdateCategoryType.UPDATE_CATEGORY_SUCCESS,
  payload: data,
});

const updateCategoryFail = (error) => ({
  type: UpdateCategoryType.UPDATE_CATEGORY_FAIL,
  payload: error,
});

const UpdateCategoryAction = (id, data) => async (dispatch) => {
  dispatch(updateCategoryRequest());

  try {
    const response = await UpdateCategoryService(id, data);
    if (response?.data?.data) {
      dispatch(updateCategorySuccess(response.data.data));
    } else {
      throw new Error("Invalid response from server.");
    }
  } catch (error) {
    const errorMsg = error?.response?.data?.message || "An error occurred. Please try again.";
    dispatch(updateCategoryFail(errorMsg));
  }
};

export default UpdateCategoryAction;
