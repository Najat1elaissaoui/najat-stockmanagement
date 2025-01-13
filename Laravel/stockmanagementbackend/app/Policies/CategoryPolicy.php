<?php

namespace App\Policies;

use App\enums\RolesEnum;
use App\Models\Category;
use App\Models\User;
use Illuminate\Auth\Access\HandlesAuthorization;

class CategoryPolicy
{
    use HandlesAuthorization;

    /**
     * Determine whether the user can create a category.
     */
    public function create(User $user): bool
    {
        return $user->hasPermissionTo(RolesEnum::ADMIN->value) ||
               $user->hasPermissionTo(RolesEnum::SUPPLIER->value);
    }

    /**
     * Determine whether the user can update the category.
     */
    public function update(User $user, Category $category): bool
    {
        return $user->hasPermissionTo(RolesEnum::ADMIN->value) ||
               $user->hasPermissionTo(RolesEnum::SUPPLIER->value);
    }

    /**
     * Determine whether the user can delete the category.
     */
    public function delete(User $user, Category $category): bool
    {
        return $user->hasPermissionTo(RolesEnum::ADMIN->value) ||
               $user->hasPermissionTo(RolesEnum::SUPPLIER->value);
    }
}
