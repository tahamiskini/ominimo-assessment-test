<?php

namespace App\Policies;

use App\Models\Comment;
use App\Models\User;
use Illuminate\Auth\Access\HandlesAuthorization;
use Illuminate\Auth\Access\Response;

class CommentPolicy
{
    use HandlesAuthorization;

    /**
     * Determine whether the user can delete the comment.
     */
    public function delete(?User $user, Comment $comment): Response
    {
        if (! $user) {
            return Response::deny('Guests cannot delete comments.');
        }

        if (! $comment->post) {
            return Response::deny('Comment is missing its post.');
        }

        return ($user->id === $comment->user_id || $user->id === $comment->post->user_id)
            ? Response::allow()
            : Response::deny('You cannot delete this comment.');
    }
}
