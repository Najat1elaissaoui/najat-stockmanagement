<?php

namespace App\Http\Requests;

use App\enums\RolesEnum;
use Illuminate\Foundation\Http\FormRequest;

class UserRequest extends FormRequest
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
            "name" => "required|string|max:255|min:3",
            "email" => "nullable|string|email|max:255|unique:users,email,",
            "password" => "required|string|min:8",
            "role" => "required|in:" . implode(",", array_map(fn($role) => $role->value, RolesEnum::cases())),
            "status" => "nullable|string|in:active,inactive",
            "image" => "nullable",
        ];
    }

    public function messages()
    {
        return [
            "email.unique" => "The email already exists.",
        ];
    }
}
