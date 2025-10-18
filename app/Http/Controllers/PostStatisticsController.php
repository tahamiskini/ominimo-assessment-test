<?php

namespace App\Http\Controllers;

use App\Models\Post;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;


class PostStatisticsController extends Controller
{
    public function index()
    {
        
        $user = Auth::user();

        $posts = Post::with(['likes.user', 'comments.user'])
                     ->where('user_id', $user->id)
                     ->get();

        return Inertia::render('PostStatistics', [
            'posts' => $posts,
        ]);
    }
}
