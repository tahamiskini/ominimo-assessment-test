<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Comment>
 */
class CommentFactory extends Factory
{
    public function definition(): array
    {
        $comments = [
            'Great explanation, helped me a lot!',
            'Could you share your project structure?',
            'Thanks for the insights!',
            'I had the same issue with Docker, this fixed it!',
            'Amazing content, keep it up!',
            'Very informative article on TypeScript!',
            'React hooks are a game changer indeed!',
        ];

        return [
            'comment' => $this->faker->randomElement($comments),
        ];
    }
}
