<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\User;
use App\Models\Post;
use App\Models\Like;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        // Create 5 users
        $users = User::factory(5)->create();

        User::factory()->create([
            'name' => 'Admin User',
            'email' => 'admin@example.com',
            'password' => bcrypt('password'),
            'role' => 'admin',
        ]);
        

        // Each user gets 3 posts
        $users->each(function ($user) use ($users) {
            $posts = Post::factory(3)->create([
                'user_id' => $user->id,
            ]);

            
            $posts->each(function ($post) use ($users) {
                $post->comments()->saveMany(
                    \App\Models\Comment::factory(2)->make([
                        'user_id' => $users->random()->id
                    ])
                );

                $randomUsers = $users->shuffle()->take(rand(1, 3));
                foreach ($randomUsers as $likeUser) {
                    $post->likes()->create([
                        'user_id' => $likeUser->id
                    ]);
                }
            });
        });
    }
}
