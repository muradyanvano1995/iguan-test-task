<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        User::updateOrCreate(
            ["email" => "admin@mail.test"],
            [
                "name" => "Admin",
                "password" => Hash::make("password"),
                "is_admin" => true,
            ]
        );

        foreach (range(1, 100) as $index) {
            $user = User::updateOrCreate(
                ["email" => "user$index@mail.test"],
                [
                    "name" => "User $index",
                    "password" => Hash::make(Str::random(10)),
                    'created_at' => Carbon::now()->subDays(100-$index)->subHours(100-$index)->subMinutes(100-$index)->subSeconds(100-$index),
                ]
            );

            $user->details()->updateOrCreate([
                "phone_number" => "+3747700000$index",
                "address" => "Address $index",
            ]);
        }
    }
}
