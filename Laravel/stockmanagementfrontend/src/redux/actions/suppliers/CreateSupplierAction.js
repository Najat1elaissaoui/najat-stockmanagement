import CreateSupplierService from "@/redux/services/suppliers/CreateSupplierService";
import CreateSupplierType from "@/redux/types/suppliers/CreateSupplierType";

export const createSupplierSuccess = (supplier) => ({
    type: CreateSupplierType.CREATE_SUPPLIER_SUCCESS,
    payload: supplier,
});

export const createSupplierFail = (error) => ({
    type: CreateSupplierType.CREATE_SUPPLIER_FAIL,
    payload: error,
});

const CreateSupplierAction = (data) => async (dispatch) => {
    dispatch({ type: CreateSupplierType.CREATE_SUPPLIER_REQUEST });
    try {
        const response = await CreateSupplierService(data);
        if (response?.data?.data) {
            dispatch(createSupplierSuccess(response.data.data));
        } else {
            throw new Error("Invalid response from server.");
        }
    } catch (error) {
        const errorMsg = error?.response?.data?.message || "An error occurred. Please try again.";
        dispatch(createSupplierFail(errorMsg));
    }
};

export default CreateSupplierAction;