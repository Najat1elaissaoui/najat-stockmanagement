import DeleteSupplierType from "@/redux/types/suppliers/DeleteSupplierType";
import DeleteSupplierService from "@/redux/services/suppliers/DeleteSupplierService";

const deleteSupplierRequest = () => {
    return {
        type: DeleteSupplierType.DELETE_SUPPLIER_REQUEST,
    };
};

const deleteSupplierSuccess = (id) => {
    return {
        type: DeleteSupplierType.DELETE_SUPPLIER_SUCCESS,
        payload: id,
    };
};

const deleteSupplierFail = (error) => {
    return {
        type: DeleteSupplierType.DELETE_SUPPLIER_FAIL,
        payload: error,
    };
};

const DeleteSupplierAction = (id) => async (dispatch) => {
    dispatch(deleteSupplierRequest());
    try {
        const response = await DeleteSupplierService(id);
        console.log(response.data.data);

        if (response?.data?.data) {
            dispatch(deleteSupplierSuccess(response.data.data));
        } else {
            throw new Error("Invalid response from server.");
        }
    } catch (error) {
        const errorMsg = error?.response?.data?.message || error.message || "An error occurred. Please try again.";
        dispatch(deleteSupplierFail(errorMsg));
    }
};

export default DeleteSupplierAction;
