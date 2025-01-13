<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class PutAutUserRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            "name" => "nullable|string|max:255|min:3",
            "email" => [
                "nullable",
                "string",
                "email",
                "max:255",
                Rule::unique('users')->ignore($this->user()->id),
            ],
            "password" => "nullable|string|min:8",
            'image' => 'nullable',
        ];
    }
}
