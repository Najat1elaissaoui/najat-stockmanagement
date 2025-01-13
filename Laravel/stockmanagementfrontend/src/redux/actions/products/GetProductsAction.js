import GetProductsService from "@/redux/services/products/GetProductsService";
import GetProductsType from "@/redux/types/products/GetProductsType";

const getProductsSuccess = (data) => ({
    type: GetProductsType.GET_PRODUCTS_SUCCESS,
    payload: data,
});

const getProductsFailure = (error) => ({
    type: GetProductsType.GET_PRODUCTS_FAILURE,
    payload: error,
});

const GetProductsAction = () => async (dispatch) => {
    dispatch({ type: GetProductsType.SET_LOADING, isLoading: true });

    try {
        const response = await GetProductsService();

        if (response?.data?.data) {
            dispatch(getProductsSuccess(response.data.data));
        } else {
            throw new Error("Invalid response from server.");
        }
    } catch (error) {
        const errorMsg = error?.response?.data?.message || "An error occurred. Please try again.";
        dispatch(getProductsFailure(errorMsg));
    } finally {
        dispatch({ type: GetProductsType.SET_LOADING, isLoading: false });
    }
};

export default GetProductsAction;
