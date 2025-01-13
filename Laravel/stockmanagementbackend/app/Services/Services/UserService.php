<?php
namespace App\Services\Services;

use App\Http\Requests\UserRequest;
use App\Http\Resources\UserResource;
use App\Models\User;
use App\Services\Constructors\UserConstructor;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;

class UserService implements UserConstructor
{
    /**
     * Get all users
     *
     * @return AnonymousResourceCollection
     */
    public function index(): AnonymousResourceCollection {
        return UserResource::collection(
            User::where('id', '!=', Auth::id())
                ->orderBy('created_at', 'desc')
                ->get()
        );
    }

    /**
     * Show a user
     *
     *  @return  UserResource
     */
    public function show(User $user) : UserResource {
        return new UserResource($user);
    }

    /**
     * Create a user
     *
     * @return UserResource
     */
    public function store(UserRequest $request) : UserResource {
        $validatedData = $request->validated();

        $role = $validatedData['role'];

        if ($request->hasFile('image')) {
            $path = $request->file('image')->store('profile_images', 'public');
            $validatedData['image'] = $path;
        } else {
            $validatedData['image'] = asset("assets/images/default-image-path.jpg");
        }

        $user = User::create($validatedData);

        $user->assignRole($role);

        return UserResource::make($user);
    }


    /**
     * Update a user
     *
     * @return UserResource
     */
    public function update(UserRequest $request, User $user): UserResource
    {
        $validatedData = $request->validated();

        if ($request->hasFile('image')) {
            if ($user->image) {
                Storage::delete($user->image);
            }

            $validatedData['image'] = $request->file('image')->store('profile_images', 'public');
        }

        $user->update($validatedData);

        return UserResource::make($user->refresh());
    }

    /**
     * Delete a user
     *
     * @return bool
     */
    public function destroy(User $user) : bool
    {
        if ($user->image) {
            Storage::delete($user->image);
        }

        return $user->delete();
    }
}
