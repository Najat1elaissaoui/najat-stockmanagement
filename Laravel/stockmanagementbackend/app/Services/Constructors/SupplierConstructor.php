<?php
namespace App\Services\Constructors;

use App\Http\Requests\SupplierRequest;
use App\Http\Resources\SupplierResource;
use App\Models\Supplier;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;

interface SupplierConstructor
{
    /**
     * Display a listing of the resource.
     *
     * @return AnonymousResourceCollection
     */
    public function index() : AnonymousResourceCollection;

    /**
     * Display the specified resource.
     *
     * @param Supplier $supplier
     * @return SupplierResource
     */
    public function show(Supplier $supplier) : SupplierResource;

    /**
     * Store a newly created resource in storage.
     *
     * @param SupplierRequest $request
     * @return SupplierResource
     */
    public function store(SupplierRequest $request) : SupplierResource;

    /**
     * Update the specified resource in storage.
     *
     * @param SupplierRequest $request
     * @param Supplier $supplier
     * @return SupplierResource
     */
    public function update(SupplierRequest $request , Supplier $supplier) : SupplierResource;

    /**
     * Remove the specified resource from storage.
     *
     * @param Supplier $supplier
     * @return boolean
     */
    public function destroy(Supplier $supplier) : SupplierResource;
}
