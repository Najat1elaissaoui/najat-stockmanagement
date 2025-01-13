<?php

namespace App\Policies;

use App\enums\RolesEnum;
use App\Models\Product;
use App\Models\User;
use Illuminate\Auth\Access\HandlesAuthorization;

class ProductPolicy
{
    use HandlesAuthorization;

    /**
     * Determine whether the user can create models.
     */
    public function create(User $user): bool
    {
        return $user->hasPermissionTo(RolesEnum::ADMIN->value) || $user->hasPermissionTo(RolesEnum::SUPPLIER->value);
    }

    /**
     * Determine whether the user can update the model.
     */
    public function update(User $user, Product $product): bool
    {
        return $user->hasPermissionTo(RolesEnum::ADMIN->value) || $user->hasPermissionTo(RolesEnum::SUPPLIER->value);
    }

    /**
     * Determine whether the user can delete the model.
     */
    public function delete(User $user, Product $product): bool
    {
        return $user->hasPermissionTo(RolesEnum::ADMIN->value) || $user->hasPermissionTo(RolesEnum::SUPPLIER->value);
    }
}
