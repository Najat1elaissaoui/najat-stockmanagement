<?php

namespace App\Policies;

use App\enums\RolesEnum;
use App\Models\User;
use App\Models\Supplier;
use Illuminate\Auth\Access\HandlesAuthorization;

class SupplierPolicy
{
    use HandlesAuthorization;

    /**
     * Determine whether the user can create a supplier.
     */
    public function create(User $user): bool
    {
        return $user->hasRole(RolesEnum::ADMIN->value) || $user->hasRole(RolesEnum::SUPPLIER->value);
    }

    /**
     * Determine whether the user can update the supplier.
     */
    public function update(User $user, Supplier $supplier): bool
    {
        return $user->hasRole(RolesEnum::ADMIN->value) || $user->hasRole(RolesEnum::SUPPLIER->value);
    }

    /**
     * Determine whether the user can delete the supplier.
     */
    public function delete(User $user, Supplier $supplier): bool
    {
        return $user->hasRole(RolesEnum::ADMIN->value) || $user->hasRole(RolesEnum::SUPPLIER->value);
    }
}
