<?php
namespace App\Services\Constructors;

use App\Http\Requests\AuthRequest;
use App\Http\Requests\PutAutUserRequest;
use App\Http\Resources\AuthResource;
use App\Http\Resources\PutAutUserResource;
use App\Http\Resources\UserResource;
use App\Models\User;

interface AuthConstructor
{
    /**
     * Login A User
     *
     * @param AuthRequest $request
     * @return AuthResource
     */
    public function login(AuthRequest $request) : AuthResource;

    /**
     * Current Authenticated User
     *
     * @param User $user
     * @return AuthResource
     */
    public function current(User $user) : AuthResource;

    /**
     * Update Current Authenticated User
     *
     * @param PutAutUserRequest $request
     * @return PutAutUserResource
     */
    public function update(PutAutUserRequest $request): PutAutUserResource;

    /**
     * Logout A User
     *
     * @return boolean
     */
    public function logout() : bool;
}
