<?php

namespace App\Http\Controllers;

use App\Models\Like;
use App\Models\Post;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class LikeController extends Controller
{
    /**
     * Like or unlike a post.
     */
    public function store(Request $request, Post $post)
    {

        $existingLike = Like::where('user_id', Auth::id())
            ->where('post_id', $post->id)
            ->first();

        if ($existingLike) {
            $existingLike->delete();
        } else {
            Like::create([
                'user_id' => Auth::id(),
                'post_id' => $post->id,
            ]);
        }

        return redirect()->back();
    }

    /**
     * Explicit unlike (optional).
     */
    public function destroy(Post $post)
    {
        if (!Auth::check()) {
            return redirect()->route('login');
        }

        Like::where('user_id', Auth::id())
            ->where('post_id', $post->id)
            ->delete();

        return redirect()->back();
    }
}
