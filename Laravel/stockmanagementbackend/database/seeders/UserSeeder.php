<?php

namespace Database\Seeders;

use App\enums\RolesEnum;
use App\Models\User;
use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Role;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $role = Role::firstOrCreate(['name' => RolesEnum::ADMIN->value, 'guard_name' => 'api']);

        $user = User::create([
            "name" => "zobir",
            "email" => "zobirofkir19@gmail.com",
            "password" => "zobir123",
            "role" => RolesEnum::ADMIN->value,
            "status" => "active"
        ]);

        $user->assignRole($role);
    }
}
