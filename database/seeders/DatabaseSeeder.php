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
        // Create admin user FIRST with unique email
        User::factory()->create([
            'name' => 'Admin User',
            'email' => 'admin@blog.com',
            'password' => bcrypt('password123'),
            'role' => 'admin',
        ]);

        // Create 5 regular users with unique emails
        $users = User::factory(5)->create();

        // Each user gets 3 posts
        $users->each(function ($user) use ($users) {
            $posts = Post::factory(3)->create([
                'user_id' => $user->id,
            ]);

            $posts->each(function ($post) use ($users) {
                // Create comments
                $post->comments()->createMany(
                    \App\Models\Comment::factory(2)->make([
                        'user_id' => $users->random()->id
                    ])->toArray()
                );

                // Create likes from random users
                $randomUsers = $users->shuffle()->take(rand(1, 3));
                foreach ($randomUsers as $likeUser) {
                    $post->likes()->create([
                        'user_id' => $likeUser->id
                    ]);
                }
            });
        });

        $this->command->info('Database seeded successfully!');
        $this->command->info('Admin login: admin@blog.com / password123');
    }
}
