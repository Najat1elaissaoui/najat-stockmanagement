import UpdateProductService from "@/redux/services/products/UpdateProductService";
import UpdateProductType from "@/redux/types/products/UpdateProductType";

const updateProductSuccess = (data) => ({
    type: UpdateProductType.UPDATE_PRODUCT_SUCCESS,
    payload: data,
});

const updateProductFail = (error) => ({
    type: UpdateProductType.UPDATE_PRODUCT_FAIL,
    payload: error,
});

const UpdateProductAction = (id, data) => async (dispatch) => {

    dispatch({ type: UpdateProductType.UPDATE_PRODUCT_REQUEST });
    try {
        const response = await UpdateProductService(id, data);
        if (response?.data) {
            dispatch(updateProductSuccess(response.data.data));
        } else {
            throw new Error("Invalid response from server.");
        }
    } catch (error) {
        const errorMessage = error.response?.data?.message || "Failed to update the product.";
        dispatch(updateProductFail(errorMessage));
    }
};

export default UpdateProductAction;
