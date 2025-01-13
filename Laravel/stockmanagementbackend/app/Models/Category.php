<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;

class Category extends Model
{
    protected $fillable = [
        'title',
        'description',
        'slug',
    ];

    protected static function boot()
    {
        parent::boot();

        static::saving(function ($category) {
            $slug = str($category->title)->slug();

            $originalSlug = $slug;
            $counter = 1;

            while (Category::where('slug', $slug)->exists()) {
                $slug = $originalSlug . '-' . $counter;
                $counter++;
            }

            $category->slug = $slug;
        });
    }

    public function products()
    {
        return $this->hasMany(Product::class);
    }
}
