import UpdateSupplierService from "@/redux/services/suppliers/UpdateSupplierService";
import UpdateSupplierType from "@/redux/types/suppliers/UpdateSupplierType";

const updateSupplierSuccess = (data) => ({
    type: UpdateSupplierType.UPDATE_SUPPLIER_SUCCESS,
    payload: data,
});

const updateSupplierFail = (error) => ({
    type: UpdateSupplierType.UPDATE_SUPPLIER_FAIL,
    payload: error,
});

const UpdateSupplierAction = (id, data) => async (dispatch) => {
    dispatch({ type: UpdateSupplierType.UPDATE_SUPPLIER_REQUEST });
    try {
        const response = await UpdateSupplierService(id, data);
        const responseData = response?.data?.data;

        if (responseData) {
            dispatch(updateSupplierSuccess(responseData));
        } else {
            throw new Error("Invalid response from server.");
        }
    } catch (error) {
        const errorMsg = error?.response?.data?.message || error.message || "An error occurred. Please try again.";
        dispatch(updateSupplierFail(errorMsg));
    }
};

export default UpdateSupplierAction;
