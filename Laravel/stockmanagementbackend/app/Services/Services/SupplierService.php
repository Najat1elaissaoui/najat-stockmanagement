<?php
namespace App\Services\Services;

use App\Http\Requests\SupplierRequest;
use App\Models\Supplier;
use App\Http\Resources\SupplierResource;
use App\Services\Constructors\SupplierConstructor;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;

class SupplierService implements SupplierConstructor
{
    /**
     * Display a listing of the resource.
     *
     * @return AnonymousResourceCollection
     */
    public function index(): AnonymousResourceCollection
    {
        return SupplierResource::collection(
            Supplier::orderBy('created_at', 'desc')->get()
        );
    }

    /**
     * Display the specified resource.
     *
     * @param Supplier $supplier
     * @return SupplierResource
     */
    public function show(Supplier $supplier): SupplierResource
    {
        return SupplierResource::make($supplier);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param SupplierRequest $request
     * @return SupplierResource
     */
    public function store(SupplierRequest $request): SupplierResource
    {
        return SupplierResource::make(
            Supplier::create($request->validated())
        );
    }

    /**
     * Update the specified resource in storage.
     *
     * @param SupplierRequest $request
     * @param Supplier $supplier
     * @return SupplierResource
     */
    public function update(SupplierRequest $request, Supplier $supplier): SupplierResource
    {
        $supplier->update($request->validated());

        return SupplierResource::make(
            $supplier->refresh()
        );
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param Supplier $supplier
     * @return SupplierResource
     */
    public function destroy(Supplier $supplier): SupplierResource
    {
        $supplier->delete();
        return SupplierResource::make($supplier);
    }
}
