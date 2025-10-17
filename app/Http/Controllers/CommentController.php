<?php

namespace App\Http\Controllers;

use App\Models\Comment;
use App\Models\Post;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Gate;

class CommentController extends Controller
{
    public function store(Request $request, $id)
    {
        $post = Post::findOrFail($id);

        $validated = $request->validate([
            'comment' => 'required|string|max:2000',
        ]);

        Comment::create([
            'post_id' => $post->id,
            'user_id' => Auth::id(), // if its guest --> null
            'comment' => $validated['comment'],
        ]);

        return back()->with('success', 'Comment added successfully.');
    }

    public function destroy($id)
    {
        $comment = Comment::with('post')->findOrFail($id);

        Gate::authorize('delete', $comment);

        $comment->delete();

        return back()->with('success', 'Comment deleted successfully.');
    }
}
