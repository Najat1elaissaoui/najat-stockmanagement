<?php
namespace App\Services\Services;

use App\Http\Requests\CategoryRequest;
use App\Http\Resources\CategoryResource;
use App\Models\Category;
use App\Services\Constructors\CategoryConstructor;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;

class CategoryService implements CategoryConstructor
{
    public function index() : AnonymousResourceCollection
    {
        return CategoryResource::collection(
            Category::orderBy('created_at', 'desc')->get()
        );
    }

    public function show(Category $category) : CategoryResource
    {
        return CategoryResource::make($category);
    }

    public function store(CategoryRequest $request) : CategoryResource
    {
        return CategoryResource::make(
            Category::create(
                $request->validated()
            )
        );
    }

    public function update(CategoryRequest $request , Category $category) : CategoryResource
    {
        $category->update($request->validated());

        return CategoryResource::make(
            $category->refresh()
        );
    }

    public function destroy(Category $category) : CategoryResource
    {
        $category->delete();

        return CategoryResource::make($category);
    }
}
