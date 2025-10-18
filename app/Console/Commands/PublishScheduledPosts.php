<?php

namespace App\Console\Commands;

use App\Models\Post;
use Illuminate\Console\Command;

class PublishScheduledPosts extends Command
{
    protected $signature = 'posts:publish-scheduled';

    protected $description = 'Publish posts when scheduled time has arrived';

    public function handle()
    {
        $posts = Post::where('is_published', false)
            ->where('scheduled_at', '<=', now())
            ->get();

        foreach ($posts as $post) {
            $post->update(['is_published' => true]);
            $this->info("Published post: {$post->title}");
        }
    }
}
