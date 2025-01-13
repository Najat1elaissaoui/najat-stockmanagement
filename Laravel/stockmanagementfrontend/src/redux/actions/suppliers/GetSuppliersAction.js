import GetSuppliersType from "@/redux/types/suppliers/GetSuppliersType";
import GetSuppliersService from "@/redux/services/suppliers/GetSuppliersService";

export const getSuppliersSuccess = (data) => ({
    type: GetSuppliersType.GET_SUPPLIERS_SUCCESS,
    payload: data,
});

export const getSuppliersFail = (data) => ({
    type: GetSuppliersType.GET_SUPPLIERS_FAIL,
    payload: data,
});

export const getSuppliersRequest = () => ({
    type: GetSuppliersType.GET_SUPPLIERS_REQUEST,
});

const GetSuppliersAction = () => async (dispatch) => {
    dispatch(getSuppliersRequest());
    try {
        const response = await GetSuppliersService();
        const suppliersData = response?.data?.data;

        if (suppliersData) {
            dispatch(getSuppliersSuccess(suppliersData));
        } else {
            throw new Error("Invalid response from server.");
        }
    } catch (error) {
        const errorMsg = error?.response?.data?.message || "An error occurred. Please try again.";
        dispatch(getSuppliersFail(errorMsg));
    }
};

export default GetSuppliersAction;
