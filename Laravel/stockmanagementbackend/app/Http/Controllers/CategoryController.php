<?php

namespace App\Http\Controllers;

use App\Http\Requests\CategoryRequest;
use App\Http\Resources\CategoryResource;
use App\Models\Category;
use App\Services\Facades\CategoryFacade;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;

class CategoryController extends Controller
{

    use  AuthorizesRequests;

    /**
     * Display a listing of the resource.
     *
     * @return AnonymousResourceCollection
     */
    public function index() : AnonymousResourceCollection
    {
        return CategoryFacade::index();
    }

    /**
     * Store a newly created resource in storage.
     *
     * @return CategoryResource
     */
    public function store(CategoryRequest $request) : CategoryResource
    {
        $this->authorize('create', Category::class);

        return CategoryFacade::store($request);
    }

    /**
     * Display the specified resource.
     *
     * @return CategoryResource
     */
    public function show(Category $category) : CategoryResource
    {
        return CategoryFacade::show($category);
    }

    /**
     * Update the specified resource in storage.
     *
     * @return CategoryResource
     */
    public function update(CategoryRequest $request , Category $category) : CategoryResource
    {
        $this->authorize('update', $category);

        return CategoryFacade::update($request , $category);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @return CategoryResource
     */
    public function destroy(Category $category) : CategoryResource
    {
        $this->authorize('delete', $category);

        return CategoryFacade::destroy($category);
    }
}
