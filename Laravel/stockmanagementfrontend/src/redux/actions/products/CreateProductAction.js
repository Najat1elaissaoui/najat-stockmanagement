import CreateProductService from "@/redux/services/products/CreateProductService";
import CreateProductType from "@/redux/types/products/CreateProductType";

const createProductSuccess = (data) => ({
  type: CreateProductType.CREATE_PRODUCT_SUCCESS,
  payload: data,
});

const createProductFail = (error) => ({
  type: CreateProductType.CREATE_PRODUCT_FAIL,
  payload: error,
});

const CreateProductAction = (data) => async (dispatch) => {
  dispatch({ type: CreateProductType.SET_LOADING, isLoading: true });

  const formData = new FormData();
  formData.append('title', data.title);
  formData.append('category_id', data.category_id);
  formData.append('supplier_id', data.supplier_id);
  formData.append('quantity', data.quantity);
  formData.append('description', data.description);
  formData.append('price', data.price);

  if (data.images && data.images.length) {
    data.images.forEach((image) => {
      formData.append('images[]', image);
    });
  }

  try {
    const response = await CreateProductService(formData);
    if (response?.data?.data) {
      dispatch(createProductSuccess(response.data.data));
    } else {
      throw new Error("Invalid response from server.");
    }
  } catch (error) {
    const errorMsg = error?.response?.data?.message || "An error occurred. Please try again.";
    dispatch(createProductFail(errorMsg));
  }
};

export default CreateProductAction;
