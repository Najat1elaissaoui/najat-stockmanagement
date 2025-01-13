<?php

namespace App\Http\Controllers;

use App\Http\Requests\AuthRequest;
use App\Http\Requests\PutAutUserRequest;
use App\Http\Resources\AuthResource;
use App\Http\Resources\LoginResource;
use App\Http\Resources\PutAutUserResource;
use App\Models\User;
use App\Services\Facades\AuthFacade;
use Illuminate\Http\Request;

class AuthController extends Controller
{
    /**
     * Login A User
     *
     * @param AuthRequest $request
     * @return AuthResource
     */
    public function login(AuthRequest $request) : AuthResource
    {
        return AuthFacade::login($request);
    }

    /**
     * Current Authenticated User
     *
     * @param User $user
     * @return AuthResource
     */
    public function current(User $user) : AuthResource
    {
        return AuthFacade::current($user);
    }

    /**
     * Update Current Authenticated User
     *
     * @param PutAutUserRequest $request
     * @return PutAutUserResource
     */
    public function update(PutAutUserRequest $request): PutAutUserResource
    {
        return AuthFacade::update($request);
    }

    /**
     * Logout A User
     *
     * @return boolean
     */
    public function logout() : bool
    {
        return AuthFacade::logout();
    }
}
