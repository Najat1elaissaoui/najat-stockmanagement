<?php
namespace App\Services\Constructors;

use App\Http\Requests\CategoryRequest;
use App\Http\Resources\CategoryResource;
use App\Models\Category;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;

interface CategoryConstructor {

    /**
     * Display a listing of the resource.
     *
     * @return AnonymousResourceCollection
     */
    public function index() : AnonymousResourceCollection;

    /**
     * Display the specified resource.
     *
     * @return CategoryResource
     */
    public function show(Category $category) : CategoryResource;

    /**
     * Store a newly created resource in storage.
     *
     * @param CategoryRequest $request
     * @return CategoryResource
     */
    public function store(CategoryRequest $request) : CategoryResource;

    /**
     * Update the specified resource in storage.
     *
     * @param CategoryRequest $request
     * @param Category $category
     * @return CategoryResource
     */
    public function update(CategoryRequest $request , Category $category) : CategoryResource;

    /**
     * Remove the specified resource from storage.
     *
     * @param Category $category
     * @return boolean
     */
    public function destroy(Category $category) : CategoryResource;
}
