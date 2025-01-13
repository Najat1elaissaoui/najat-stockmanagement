<?php

namespace App\Http\Controllers;

use App\Http\Requests\ProductRequest;
use App\Http\Resources\ProductResource;
use App\Models\Product;
use App\Services\Facades\ProductFacade;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;

class ProductController extends Controller
{
    use AuthorizesRequests;

    /**
     * Display a listing of the resource.
     *
     * @return AnonymousResourceCollection
     */
    public function index() : AnonymousResourceCollection
    {
        return ProductFacade::index();
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param ProductRequest $request
     * @return ProductResource
     */
    public function store(ProductRequest $request) : ProductResource
    {
        $this->authorize('create', Product::class);

        return ProductFacade::store($request);
    }

    /**
     * Display the specified resource.
     *
     * @param Product $product
     * @return ProductResource
     */
    public function show(Product $product) : ProductResource
    {
        return ProductFacade::show($product);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param ProductRequest $request
     * @param Product $product
     * @return ProductResource
     */
    public function update(ProductRequest $request, Product $product) : ProductResource
    {
        $this->authorize('update', $product);
        return ProductFacade::update($request, $product);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param Product $product
     * @return boolean
     */
    public function destroy(Product $product) : bool
    {
        $this->authorize('delete', $product);
        return ProductFacade::destroy($product);
    }
}
