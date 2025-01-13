import { applyMiddleware, combineReducers, createStore } from "redux";
import { thunk } from "redux-thunk";
import LoginReducer from "../reducers/LoginReducer";
import LogoutReducer from "../reducers/LogoutReducer";
import ProfileReducer from "../reducers/ProfileReducer";
import CreateUserReducer from "../reducers/users/CreateUserReducer";
import GetUsersReducer from "../reducers/users/GetUsersReducer";
import UserInfoReducer from "../reducers/users/UserInfoReducer";
import UpdateUserReducer from "../reducers/users/UpdateUserReducer";
import DeleteUserReducer from "../reducers/users/DeleteUserReducer";
import CreateProductReducer from "../reducers/products/CreateProductReducer";
import CreateCategoryReducer from "../reducers/categories/CreateCategoryReducer";
import GetCategoriesReducer from "../reducers/categories/GetCategoriesReducer";
import UpdateCategoryAction from "../actions/categories/UpdateCategoryAction";
import deleteCategoryReducer from "../reducers/categories/DeleteCategoryReducer";
import CreateSupplierReducer from "../reducers/suppliers/CreateSupplierReducer";
import GetSuppliersReducer from "../reducers/suppliers/GetSuppliersReducer";
import updateSupplierReducer from "../reducers/suppliers/UpdateSupplierReducer";
import GetProductsReducer from "../reducers/products/GetProductsReducer";
import UpdateProductReducer from "../reducers/products/UpdateProductReducer";
import DeleteProductAction from "../actions/products/DeleteProductAction";
import DeleteSupplierReducer from "../reducers/suppliers/DeleteSupplierReducer";

const rootReducer = combineReducers({
    login: LoginReducer,
    logout: LogoutReducer,
    profile: ProfileReducer,
    /**
     * Users
     */
    createUser : CreateUserReducer,
    getUsers : GetUsersReducer,
    userInfo : UserInfoReducer,
    updateUser : UpdateUserReducer,
    deleteUser : DeleteUserReducer,

    /**
     * Categories
     */
    createCategory : CreateCategoryReducer,
    getCategories : GetCategoriesReducer,
    updateCategory : UpdateCategoryAction,
    deleteCategory : deleteCategoryReducer,

    /**
     * Suppliers
     */
    createSupplier : CreateSupplierReducer,
    getSuppliers : GetSuppliersReducer,
    updateSupplier : updateSupplierReducer,
    deleteSupplier : DeleteSupplierReducer,

    /**
     * Products
     */
    createProduct : CreateProductReducer,
    getProducts : GetProductsReducer,
    updateProduct : UpdateProductReducer,
    deleteProduct : DeleteProductAction,
});


const store = createStore(
    rootReducer,
    applyMiddleware(thunk) 
);


export default store; 