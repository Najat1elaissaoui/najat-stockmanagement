<?php

namespace App\Observers;

use App\Models\Product;
use Illuminate\Support\Str;

class ProductObserver
{
    /**
     * Handle the Product "creating" event.
     */
    public function creating(Product $product): void
    {
        $slug = Str::slug($product->title);
        $existingProduct = Product::where('slug', 'like', "$slug%")->orderBy('slug', 'desc')->first();

        $product->slug = $existingProduct ? "{$slug}-" . ((int) last(explode('-', $existingProduct->slug)) + 1) : $slug;
    }

    /**
     * Handle the Product "updating" event.
     */
    public function updating(Product $product): void
    {
        if ($product->isDirty('title')) {
            $slug = Str::slug($product->title);
            $existingProduct = Product::where('slug', 'like', "$slug%")->orderBy('slug', 'desc')->first();

            $product->slug = $existingProduct ? "{$slug}-" . ((int) last(explode('-', $existingProduct->slug)) + 1) : $slug;
        }
    }
}
