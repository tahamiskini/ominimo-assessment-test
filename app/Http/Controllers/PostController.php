<?php

namespace App\Http\Controllers;

use App\Models\Post;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Gate;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class PostController extends Controller
{
    /**
     * Get all posts.
     */
    public function index()
    {
        $posts = Post::with('user', 'comments.user', 'likes.user')
            ->latest()
            ->get();

        return Inertia::render('dashboard', [
            'posts' => $posts,
        ]);

    }

    /*
     * create new Post
     */
    public function create()
    {
        return Inertia::render('create-post');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'content' => 'required|string',
            'image' => 'nullable|image|max:2048',
        ]);

        $imagePath = null;
        if ($request->hasFile('image')) {
            $imagePath = $request->file('image')->store('posts', 'public');
        }
        $post = Post::create([
            'user_id' => Auth::id(),
            'title' => $validated['title'],
            'content' => $validated['content'],
            'image' => $imagePath]);

        return redirect()->route('dashboard')->with('success', 'Post created successfully.');

    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $post = Post::with([
            'user',
            'comments.user',
            'likes.user',
            'comments' => function ($query) {
                $query->latest();
            },
        ])->findOrFail($id);

        return Inertia::render('post-details', [
            'post' => $post,
        ]);

    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Post $post)
    {
        Gate::authorize('update', $post);

        return Inertia::render('edit-post', [
            'post' => $post,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Post $post)
    {
        Gate::authorize('update', $post);

        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'content' => 'required|string',
        ]);

        $post->update([
            'title' => $validated['title'],
            'content' => $validated['content'],
        ]);

        return redirect()->route('posts.show', $post->id)->with('success', 'Post updated successfully.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Post $post)
    {

        Gate::authorize('delete', $post);

        if ($post->image) {
            Storage::disk('public')->delete($post->image);
        }

        $post->delete();

        return redirect()->route('dashboard')->with('success', 'Post deleted successfully.');
    }

    public function schedule(Request $request)
{
    $request->validate([
        'title' => 'required|string|max:255',
        'content' => 'required|string',
        'scheduled_at' => 'required|date|after_or_equal:now',
    ]);

    $post = Post::create([
        'title' => $request->title,
        'content' => $request->content,
        'user_id' => $request->user()->id,
        'scheduled_at' => $request->scheduled_at,
        'is_published' => false,
    ]);

    return redirect()->route('dashboard')->with('success', 'Post scheduled successfully!');
}

}
