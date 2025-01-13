<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\LoginController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\SupplierController;
use App\Http\Controllers\UserController;
use Illuminate\Support\Facades\Route;


/**
 * Login User
 */
Route::post('auth/login', [AuthController::class, 'login']);


/**
 * Authenticated Routes
 */
Route::middleware('auth:api')->group(function () {

    /**
     * User Management
     */
    Route::apiResource('users', UserController::class);

    /**
     * Category Management
     */
    Route::apiResource('categories', CategoryController::class);

    /**
     * Supplier Management
     */
    Route::apiResource('suppliers', SupplierController::class);


    /**
     * Product Management
     */
    Route::apiResource('products', ProductController::class);

    /**
     * Current Authenticated User
     */
    Route::get('auth/current', [AuthController::class, 'current']);

    /**
     * Update Current Authenticated User
     */
    Route::put('auth/update', [AuthController::class, 'update']);

    /**
     * Logout User
     */
    Route::post('auth/logout', [AuthController::class, 'logout']);
});
