<?php

namespace App\Http\Controllers;

use App\Http\Requests\SupplierRequest;
use App\Http\Resources\SupplierResource;
use App\Models\Supplier;
use App\Services\Facades\SupplierFacade;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;

class SupplierController extends Controller
{
    use AuthorizesRequests;

    /**
     * Display a listing of the resource.
     *
     * @return AnonymousResourceCollection
     */
    public function index() : AnonymousResourceCollection
    {
        return SupplierFacade::index();
    }

    /**
     * Store a newly created resource in storage.
     *
     * @return SupplierResource
     */
    public function store(SupplierRequest $request) : SupplierResource
    {
        $this->authorize('create', Supplier::class);

        return SupplierFacade::store($request);
    }

    /**
     * Display the specified resource.
     *
     * @param Supplier $supplier
     * @return SupplierResource
     */
    public function show(Supplier $supplier) : SupplierResource
    {
        return SupplierFacade::show($supplier);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param SupplierRequest $request
     * @param Supplier $supplier
     * @return SupplierResource
     */
    public function update(SupplierRequest $request, Supplier $supplier) : SupplierResource
    {
        $this->authorize('update', $supplier);

        return SupplierFacade::update($request , $supplier);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param Supplier $supplier
     * @return boolean
     */
    public function destroy(Supplier $supplier) : SupplierResource
    {
        $this->authorize('delete', $supplier);

        return SupplierFacade::destroy($supplier);
    }
}
