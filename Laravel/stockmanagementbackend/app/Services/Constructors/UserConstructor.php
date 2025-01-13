<?php

namespace App\Services\Constructors;

use App\Http\Requests\UserRequest;
use App\Http\Resources\UserResource;
use App\Models\User;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;

interface UserConstructor
{
    /**
     * Get all users
     *
     * @return AnonymousResourceCollection
     */
    public function index() : AnonymousResourceCollection;

    /**
     * Show a user
     *
     * @return UserResource
     */
    public function show(User $user) : UserResource;

    /**
     * Create a user
     *
     * @return UserResource
     */
    public function store(UserRequest $request) : UserResource;

    /**
     * Update a user
     *
     * @return UserResource
     */
    public function update (UserRequest $request , User $user) : UserResource;

    /**
     * Delete a user
     *
     * @return bool
     */
    public function destroy(User $user) : bool;
}
