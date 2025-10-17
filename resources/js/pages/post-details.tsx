import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem } from '@/types';
import { Link, router, usePage } from '@inertiajs/react';
import { ArrowLeft, Calendar, Heart, MessageCircle } from 'lucide-react';
import { routes } from '../lib/routes';

interface PostDetailProps {
    post: {
        id: number;
        title: string;
        content: string;
        image_url: string | null;
        user: { id: number; name: string };
        created_at: string;
        comments: {
            id: number;
            comment: string;
            created_at: string;
            user: { id: number; name: string };
        }[];
        likes: { id: number; user: { id: number; name: string } }[];
    };
}

export default function PostDetail({ post }: PostDetailProps) {
    const { auth } = usePage().props;

    const breadcrumbs: BreadcrumbItem[] = [
        { title: 'Home', href: routes.dashboard() },
        { title: 'Post Details', href: '#' },
    ];

    const handleLike = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();

        router.post(
            routes.likePost(post.id),
            {},
            {
                preserveScroll: true,
                preserveState: true,
            },
        );
    };

    const isLikedByUser = post.likes.some(
        (like) => like.user.id === auth.user.id,
    );

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <div className="mx-auto max-w-4xl px-4 py-8">
                {/* Header */}
                <div className="mb-6 flex items-center justify-between">
                    <Link
                        href={routes.dashboard()}
                        className="flex items-center gap-2 rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm transition-all hover:bg-gray-50 hover:shadow"
                    >
                        <ArrowLeft className="h-4 w-4" />
                        Back to Posts
                    </Link>
                </div>

                {/* Main Content */}
                <div className="grid gap-8 lg:grid-cols-3">
                    {/* Post Content */}
                    <div className="lg:col-span-2">
                        <article className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-lg">
                            {/* Post Image */}
                            {post.image_url && (
                                <div className="relative h-80 w-full overflow-hidden bg-gradient-to-br from-blue-50 to-indigo-100">
                                    <img
                                        src={post.image_url}
                                        alt={post.title}
                                        className="h-full w-full object-cover"
                                    />
                                </div>
                            )}

                            {/* Post Content */}
                            <div className="p-6">
                                <h1 className="mb-4 text-3xl font-bold text-gray-900">
                                    {post.title}
                                </h1>

                                {/* Author Info */}
                                <div className="mb-6 flex items-center gap-3">
                                    <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-purple-600 text-lg font-semibold text-white shadow-lg ring-2 ring-white">
                                        {post.user.name.charAt(0).toUpperCase()}
                                    </div>
                                    <div className="flex-1">
                                        <p className="font-semibold text-gray-900">
                                            {post.user.name}
                                        </p>
                                        <div className="flex items-center gap-1 text-sm text-gray-500">
                                            <Calendar className="h-4 w-4" />
                                            <time dateTime={post.created_at}>
                                                {new Date(
                                                    post.created_at,
                                                ).toLocaleDateString('en-US', {
                                                    weekday: 'long',
                                                    year: 'numeric',
                                                    month: 'long',
                                                    day: 'numeric',
                                                    hour: '2-digit',
                                                    minute: '2-digit',
                                                })}
                                            </time>
                                        </div>
                                    </div>
                                </div>

                                {/* Post Body */}
                                <div className="prose prose-lg max-w-none">
                                    <p className="leading-relaxed whitespace-pre-wrap text-gray-700">
                                        {post.content}
                                    </p>
                                </div>

                                {/* Engagement Stats */}
                                <div className="mt-6 flex items-center gap-6 border-t border-gray-100 pt-6">
                                    {/* ✅ Like Button */}
                                    <button
                                        className={`flex items-center gap-2 transition ${
                                            isLikedByUser
                                                ? 'text-red-600 hover:text-red-700'
                                                : 'text-gray-600 hover:text-red-600'
                                        }`}
                                        onClick={handleLike}
                                    >
                                        <Heart
                                            className={`h-5 w-5 ${
                                                isLikedByUser
                                                    ? 'fill-red-600 text-red-600'
                                                    : ''
                                            }`}
                                        />
                                        <span className="font-semibold">
                                            {post.likes.length} likes
                                        </span>
                                    </button>

                                    {/* Comments Count */}
                                    <div className="flex items-center gap-2 text-gray-600">
                                        <MessageCircle className="h-5 w-5" />
                                        <span className="font-semibold">
                                            {post.comments.length} comments
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </article>
                    </div>

                    {/* Comments Sidebar */}
                    <div className="lg:col-span-1">
                        <div className="sticky top-8 rounded-2xl border border-gray-200 bg-white shadow-lg">
                            {/* Comments Header */}
                            <div className="border-b border-gray-100 bg-gradient-to-r from-blue-50 to-indigo-50 px-6 py-4">
                                <h2 className="flex items-center gap-2 font-semibold text-gray-900">
                                    <MessageCircle className="h-5 w-5 text-blue-600" />
                                    Comments ({post.comments.length})
                                </h2>
                            </div>

                            {/* Comments List */}
                            <div className="max-h-96 overflow-y-auto p-6">
                                {post.comments.length === 0 ? (
                                    <div className="text-center text-gray-500">
                                        <MessageCircle className="mx-auto h-12 w-12 opacity-50" />
                                        <p className="mt-2 text-sm">
                                            No comments yet. Be the first to
                                            comment!
                                        </p>
                                    </div>
                                ) : (
                                    <div className="space-y-4">
                                        {post.comments.map((comment) => (
                                            <div
                                                key={comment.id}
                                                className="rounded-xl border border-gray-100 bg-gray-50 p-4"
                                            >
                                                <div className="mb-2 flex items-center gap-2">
                                                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-100 text-xs font-semibold text-blue-600">
                                                        {comment.user.name
                                                            .charAt(0)
                                                            .toUpperCase()}
                                                    </div>
                                                    <span className="font-medium text-gray-900">
                                                        {comment.user.name}
                                                    </span>
                                                </div>
                                                <p className="text-sm text-gray-700">
                                                    {comment.comment}
                                                </p>
                                                <time
                                                    className="mt-2 block text-xs text-gray-500"
                                                    dateTime={
                                                        comment.created_at
                                                    }
                                                >
                                                    {new Date(
                                                        comment.created_at,
                                                    ).toLocaleDateString(
                                                        'en-US',
                                                        {
                                                            month: 'short',
                                                            day: 'numeric',
                                                            hour: '2-digit',
                                                            minute: '2-digit',
                                                        },
                                                    )}
                                                </time>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>

                            {/* Add Comment Form */}
                            <div className="border-t border-gray-100 p-6">
                                <form className="space-y-3">
                                    <div>
                                        <label
                                            htmlFor="comment"
                                            className="mb-2 block text-sm font-medium text-gray-700"
                                        >
                                            Add a comment
                                        </label>
                                        <textarea
                                            id="comment"
                                            rows={3}
                                            className="block w-full rounded-lg border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                            placeholder="Share your thoughts..."
                                        />
                                    </div>
                                    <button
                                        type="submit"
                                        className="w-full rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm transition hover:bg-blue-700"
                                    >
                                        Post Comment
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
