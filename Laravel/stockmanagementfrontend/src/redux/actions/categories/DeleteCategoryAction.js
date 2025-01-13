import DeleteCategoryService from "@/redux/services/categories/DeleteCategoryService";

export const deleteCategorySuccess = (id) => {
    return {
        type: "DELETE_CATEGORY_SUCCESS",
        payload: id,
    };
};

export const deleteCategoryFail = (error) => {
    return {
        type: "DELETE_CATEGORY_FAIL",
        payload: error,
    };
};

export const deleteCategoryRequest = () => {
    return {
        type: "DELETE_CATEGORY_REQUEST",
    };
};

export const deleteCategoryAction = (id) => async (dispatch) => {
    dispatch(deleteCategoryRequest());
    try {
        const response = await DeleteCategoryService(id);
        if (response?.data?.data) {
            dispatch(deleteCategorySuccess(response.data.data));
        } else {
            throw new Error("Invalid response from server.");
        }
    } catch (error) {
        const errorMsg = error?.response?.data?.message || "An error occurred. Please try again.";
        dispatch(deleteCategoryFail(errorMsg));
    }
};