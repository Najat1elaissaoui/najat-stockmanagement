import DeleteProductService from "@/redux/services/products/DeleteProductService";
import DeleteProductType from "@/redux/types/products/DeleteProductType";

const deleteProductSuccess = (product) => {
    return {
        type: DeleteProductType.DELETE_PRODUCT_SUCCESS,
        payload: product,
    };
};

const deleteProductFail = (error) => {
    return {
        type: DeleteProductType.DELETE_PRODUCT_FAIL,
        payload: error,
    };
};

const DeleteProductAction = (id) => {
    return async (dispatch) => {
        dispatch({ type: DeleteProductType.DELETE_PRODUCT_REQUEST });
        try {
            const response = await DeleteProductService(id);
            if (response?.data) {
                dispatch(deleteProductSuccess(response.data.data));
            } else {
                throw new Error("Invalid response from server.");
            }
        } catch (error) {
            const errorMessage = error.response?.data?.message || "Failed to delete the product.";
            dispatch(deleteProductFail(errorMessage));
        }
    };
};

export default DeleteProductAction;