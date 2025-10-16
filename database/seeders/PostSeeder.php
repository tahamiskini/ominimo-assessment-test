<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\User;
use App\Models\Post;

class PostSeeder extends Seeder
{
    public function run(): void
    {
        // Creating 5 users
        User::factory(5)->create()->each(function ($user) {
            // For each user, we are creating 3 posts
            Post::factory(3)->create([
                'user_id' => $user->id,
            ]);
        });
    }
}
