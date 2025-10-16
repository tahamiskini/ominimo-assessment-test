<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

class PostFactory extends Factory
{
    public function definition(): array
    {
        $titles = [
            'Mastering Laravel for Modern Web Development',
            'Understanding React Hooks: A Complete Guide',
            'Building REST APIs with NestJS',
            'Deploying Applications with Docker and Kubernetes',
            'Top 10 VSCode Extensions for Developers',
            'How to Optimize SQL Queries for Performance',
            'A Deep Dive into TypeScript for JavaScript Developers',
            'Server-Side Rendering with Next.js Explained',
            'CI/CD Pipelines with GitHub Actions',
            'The Power of Tailwind CSS in Modern UI Design',
        ];

        $title = fake()->randomElement($titles);

        return [
            'title' => $title,
            'content' => fake()->paragraphs(3, true),
            'image' => 'https://unsplash.com/s/photos/react',
        ];
    }
}
