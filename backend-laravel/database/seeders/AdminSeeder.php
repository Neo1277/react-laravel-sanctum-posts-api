<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\User;

class AdminSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $admin = User::create([
            'name'=>'Admin',
            'email'=>'admin@test.com',
            'password'=>bcrypt('123456'),
            'phone_number'=>'123456789'
        ]);

        $admin->assignRole('admin');
    }
}
