import GetCategoriesService from "@/redux/services/categories/GetCategoriesService";
import GetCategoriesType from "@/redux/types/categories/GetCategoriesType";

export const getCategories = () => ({
    type: GetCategoriesType.GET_CATEGORIES,
    payload: null,
});

export const getCategoriesSuccess = (data) => ({
    type: GetCategoriesType.GET_CATEGORIES_SUCCESS,
    payload: data,
});

export const getCategoriesFail = (error) => ({
    type: GetCategoriesType.GET_CATEGORIES_FAIL,
    payload: error,
});

export const GetCategoriesAction = () => {
    return async (dispatch) => {
        dispatch(getCategories());
        try {
            const response = await GetCategoriesService();
            dispatch(getCategoriesSuccess(response.data.data));
        } catch (error) {
            const errorMsg =
                error.response?.data?.message || "An error occurred. Please try again.";
            dispatch(getCategoriesFail(errorMsg));
        }
    };
};

export default GetCategoriesAction;