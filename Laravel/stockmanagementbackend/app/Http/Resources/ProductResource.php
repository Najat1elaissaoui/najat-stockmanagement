<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ProductResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        $images = is_array($this->images) ? $this->images : explode(',', $this->images);

        $images = array_filter($images, fn($image) => !empty($image));

        return [
            "id" => $this->id,
            "category" => new CategoryResource($this->category),
            "supplier" => new SupplierResource($this->supplier),
            "title" => $this->title,
            "images" => array_map(fn($image) => asset('storage/' . $image), $images),
            "description" => $this->description,
            "price" => $this->price,
            "quantity" => $this->quantity,
            "slug" => $this->slug,
            "created_at" => $this->created_at,
        ];
    }
}
