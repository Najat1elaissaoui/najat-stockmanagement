<?php
namespace App\Services\Services;

use App\Http\Requests\ProductRequest;
use App\Models\Product;
use App\Http\Resources\ProductResource;
use App\Services\Constructors\ProductConstructor;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;

class ProductService implements ProductConstructor
{
    /**
     * Display a listing of the resource.
     *
     * @return AnonymousResourceCollection
     */
    public function index(): AnonymousResourceCollection
    {
        return ProductResource::collection(
            Product::latest()->get()
        );
    }

    /**
     * Display the specified resource.
     *
     * @param Product $product
     * @return ProductResource
     */
    public function show(Product $product): ProductResource
    {
        return ProductResource::make($product);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param ProductRequest $request
     * @return ProductResource
     */
    public function store(ProductRequest $request): ProductResource
    {
        $validatedData = $request->validated();

        if ($request->hasFile('images')) {
            $images = $request->file('images');

            $validatedData['images'] = is_array($images)
                ? array_map(fn($image) => $image->store('products', 'public'), $images)
                : [$images->store('products', 'public')];
        }

        return ProductResource::make(
            Product::create($validatedData)
        );
    }

    /**
     * Update the specified resource in storage.
     *
     * @param ProductRequest $request
     * @param Product $product
     * @return ProductResource
     */
    public function update(ProductRequest $request, Product $product): ProductResource
    {
        $validatedData = $request->validated();

        if ($request->hasFile('images')) {
            $images = $request->file('images');

            $validatedData['images'] = is_array($images)
                ? array_map(fn($image) => $image->store('products', 'public'), $images)
                : [$images->store('products', 'public')];
        }

        $product->update($validatedData);

        return ProductResource::make($product);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param Product $product
     * @return boolean
     */
    public function destroy(Product $product): bool
    {
        $product->delete();

        return true;
    }
}
