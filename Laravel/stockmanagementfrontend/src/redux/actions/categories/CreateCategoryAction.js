import CreateCategoryService from "@/redux/services/categories/CreateCategoryService";
import CreateCategoryType from "@/redux/types/categories/CreateCategoryType";

export const setLoading = (isLoading) => ({
    type: CreateCategoryType.SET_LOADING,
    payload: isLoading,
});

export const createCategorySuccess = (data) => ({
    type: CreateCategoryType.CATEGORIES_CREATE_SUCCESS,
    payload: data,
});

export const createCategoryFail = (error) => ({
    type: CreateCategoryType.CATEGORIES_CREATE_FAILURE,
    payload: error,
});

const CreateCategoryAction = (data) => async (dispatch) => {
    dispatch(setLoading(true));
    try {
        const response = await CreateCategoryService(data);
        if (response?.data) {
            dispatch(createCategorySuccess(response.data));
        } else {
            throw new Error("Invalid response from server.");
        }
    } catch (error) {
        const errorMsg = error?.response?.data?.message || error.message || "An error occurred. Please try again.";
        dispatch(createCategoryFail(errorMsg));
    } finally {
        dispatch(setLoading(false));
    }
};

export default CreateCategoryAction;
