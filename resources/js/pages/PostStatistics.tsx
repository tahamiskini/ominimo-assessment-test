import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem } from '@/types';
import {
    BarChart3,
    Eye,
    Heart,
    MessageCircle,
    TrendingUp,
    Users,
} from 'lucide-react';
import { routes } from '../lib/routes';

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Home', href: routes.dashboard() },
    { title: 'Post Statistics' },
];

interface PostStatisticsProps {
    posts: {
        id: number;
        title: string;
        content: string;
        likes: { user: { name: string } }[];
        comments: { user: { name: string }; comment: string }[];
    }[];
}

export default function PostStatistics({ posts }: PostStatisticsProps) {
    // Calculate overall stats
    const totalPosts = posts.length;
    const totalLikes = posts.reduce((sum, post) => sum + post.likes.length, 0);
    const totalComments = posts.reduce(
        (sum, post) => sum + post.comments.length,
        0,
    );
    const avgEngagement =
        totalPosts > 0
            ? ((totalLikes + totalComments) / totalPosts).toFixed(1)
            : 0;

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <div className="px-4 py-8">
                {/* Header Section */}
                <div className="mb-8">
                    <div className="mb-3 flex items-center gap-3">
                        <div className="rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 p-3 shadow-lg">
                            <BarChart3 className="h-6 w-6 text-white" />
                        </div>
                        <div>
                            <h1 className="text-3xl font-bold tracking-tight text-gray-900">
                                Post Statistics
                            </h1>
                            <p className="mt-1 text-sm text-gray-600">
                                Comprehensive analytics and engagement metrics
                            </p>
                        </div>
                    </div>
                </div>

                {/* Summary Cards */}
                <div className="mb-8 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                    <div className="group relative overflow-hidden rounded-xl border border-blue-100 bg-gradient-to-br from-blue-50 to-blue-100 p-5 shadow-sm transition-all hover:shadow-lg">
                        <div className="flex items-start justify-between">
                            <div>
                                <p className="text-sm font-medium text-blue-700">
                                    Total Posts
                                </p>
                                <p className="mt-2 text-3xl font-bold text-blue-900">
                                    {totalPosts}
                                </p>
                            </div>
                            <div className="rounded-lg bg-blue-200 p-2.5">
                                <Eye className="h-5 w-5 text-blue-700" />
                            </div>
                        </div>
                        <div className="mt-3 flex items-center gap-1 text-xs text-blue-600">
                            <TrendingUp className="h-3 w-3" />
                            <span>Published content</span>
                        </div>
                    </div>

                    <div className="group relative overflow-hidden rounded-xl border border-red-100 bg-gradient-to-br from-red-50 to-red-100 p-5 shadow-sm transition-all hover:shadow-lg">
                        <div className="flex items-start justify-between">
                            <div>
                                <p className="text-sm font-medium text-red-700">
                                    Total Likes
                                </p>
                                <p className="mt-2 text-3xl font-bold text-red-900">
                                    {totalLikes}
                                </p>
                            </div>
                            <div className="rounded-lg bg-red-200 p-2.5">
                                <Heart className="h-5 w-5 text-red-700" />
                            </div>
                        </div>
                        <div className="mt-3 flex items-center gap-1 text-xs text-red-600">
                            <TrendingUp className="h-3 w-3" />
                            <span>Appreciation received</span>
                        </div>
                    </div>

                    <div className="group relative overflow-hidden rounded-xl border border-green-100 bg-gradient-to-br from-green-50 to-green-100 p-5 shadow-sm transition-all hover:shadow-lg">
                        <div className="flex items-start justify-between">
                            <div>
                                <p className="text-sm font-medium text-green-700">
                                    Total Comments
                                </p>
                                <p className="mt-2 text-3xl font-bold text-green-900">
                                    {totalComments}
                                </p>
                            </div>
                            <div className="rounded-lg bg-green-200 p-2.5">
                                <MessageCircle className="h-5 w-5 text-green-700" />
                            </div>
                        </div>
                        <div className="mt-3 flex items-center gap-1 text-xs text-green-600">
                            <TrendingUp className="h-3 w-3" />
                            <span>Conversations started</span>
                        </div>
                    </div>

                    <div className="group relative overflow-hidden rounded-xl border border-purple-100 bg-gradient-to-br from-purple-50 to-purple-100 p-5 shadow-sm transition-all hover:shadow-lg">
                        <div className="flex items-start justify-between">
                            <div>
                                <p className="text-sm font-medium text-purple-700">
                                    Avg Engagement
                                </p>
                                <p className="mt-2 text-3xl font-bold text-purple-900">
                                    {avgEngagement}
                                </p>
                            </div>
                            <div className="rounded-lg bg-purple-200 p-2.5">
                                <TrendingUp className="h-5 w-5 text-purple-700" />
                            </div>
                        </div>
                        <div className="mt-3 flex items-center gap-1 text-xs text-purple-600">
                            <TrendingUp className="h-3 w-3" />
                            <span>Per post metric</span>
                        </div>
                    </div>
                </div>

                {/* Individual Post Statistics */}
                <div className="space-y-5">
                    {posts.map((post, index) => {
                        const totalLikes = post.likes.length;
                        const totalComments = post.comments.length;
                        const engagementScore = totalLikes + totalComments;
                        const likedBy = post.likes.map(
                            (like) => like.user.name,
                        );
                        const uniqueCommenters = [
                            ...new Set(post.comments.map((c) => c.user.name)),
                        ];

                        return (
                            <div
                                key={post.id}
                                className="group relative overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition-all hover:shadow-xl"
                            >
                                {/* Post Header */}
                                <div className="border-b border-gray-100 bg-gradient-to-r from-gray-50 to-white px-6 py-4">
                                    <div className="flex items-start justify-between gap-4">
                                        <div className="flex-1">
                                            <div className="mb-2 flex items-center gap-2">
                                                <span className="rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold text-blue-700">
                                                    Post #{index + 1}
                                                </span>
                                                <span
                                                    className={`rounded-full px-3 py-1 text-xs font-semibold ${
                                                        engagementScore > 10
                                                            ? 'bg-green-100 text-green-700'
                                                            : engagementScore >
                                                                5
                                                              ? 'bg-yellow-100 text-yellow-700'
                                                              : 'bg-gray-100 text-gray-700'
                                                    }`}
                                                >
                                                    {engagementScore > 10
                                                        ? '🔥 Hot'
                                                        : engagementScore > 5
                                                          ? '📈 Growing'
                                                          : '🌱 New'}
                                                </span>
                                            </div>
                                            <h2 className="text-xl leading-tight font-bold text-gray-900">
                                                {post.title}
                                            </h2>
                                        </div>
                                        <div className="flex gap-2">
                                            <div className="flex items-center gap-1 rounded-lg bg-red-50 px-3 py-1.5">
                                                <Heart className="h-4 w-4 text-red-500" />
                                                <span className="text-sm font-semibold text-red-700">
                                                    {totalLikes}
                                                </span>
                                            </div>
                                            <div className="flex items-center gap-1 rounded-lg bg-blue-50 px-3 py-1.5">
                                                <MessageCircle className="h-4 w-4 text-blue-500" />
                                                <span className="text-sm font-semibold text-blue-700">
                                                    {totalComments}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                    <p className="mt-3 line-clamp-2 text-sm leading-relaxed text-gray-600">
                                        {post.content}
                                    </p>
                                </div>

                                {/* Post Stats */}
                                <div className="grid gap-5 p-6 md:grid-cols-2">
                                    {/* Likes Section */}
                                    <div className="rounded-xl border border-red-100 bg-red-50/50 p-4">
                                        <div className="mb-3 flex items-center gap-2">
                                            <div className="rounded-lg bg-red-100 p-2">
                                                <Heart className="h-4 w-4 text-red-600" />
                                            </div>
                                            <div>
                                                <h3 className="text-sm font-semibold text-gray-900">
                                                    Likes
                                                </h3>
                                                <p className="text-xs text-gray-600">
                                                    {totalLikes} total reactions
                                                </p>
                                            </div>
                                        </div>
                                        {likedBy.length > 0 ? (
                                            <div className="space-y-2">
                                                <div className="flex flex-wrap gap-1.5">
                                                    {likedBy
                                                        .slice(0, 5)
                                                        .map((name, i) => (
                                                            <span
                                                                key={i}
                                                                className="inline-flex items-center gap-1.5 rounded-full bg-white px-3 py-1 text-xs font-medium text-gray-700 shadow-sm"
                                                            >
                                                                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-gradient-to-br from-red-400 to-pink-500 text-xs font-semibold text-white">
                                                                    {name
                                                                        .charAt(
                                                                            0,
                                                                        )
                                                                        .toUpperCase()}
                                                                </span>
                                                                {name}
                                                            </span>
                                                        ))}
                                                </div>
                                                {likedBy.length > 5 && (
                                                    <p className="text-xs text-gray-500">
                                                        +{likedBy.length - 5}{' '}
                                                        more
                                                    </p>
                                                )}
                                            </div>
                                        ) : (
                                            <p className="text-xs text-gray-500 italic">
                                                No likes yet
                                            </p>
                                        )}
                                    </div>

                                    {/* Comments Section */}
                                    <div className="rounded-xl border border-blue-100 bg-blue-50/50 p-4">
                                        <div className="mb-3 flex items-center gap-2">
                                            <div className="rounded-lg bg-blue-100 p-2">
                                                <MessageCircle className="h-4 w-4 text-blue-600" />
                                            </div>
                                            <div>
                                                <h3 className="text-sm font-semibold text-gray-900">
                                                    Comments
                                                </h3>
                                                <p className="text-xs text-gray-600">
                                                    {totalComments} from{' '}
                                                    {uniqueCommenters.length}{' '}
                                                    users
                                                </p>
                                            </div>
                                        </div>
                                        {post.comments.length > 0 ? (
                                            <div className="max-h-40 space-y-2 overflow-y-auto">
                                                {post.comments
                                                    .slice(0, 3)
                                                    .map((comment, i) => (
                                                        <div
                                                            key={i}
                                                            className="rounded-lg bg-white p-3 shadow-sm"
                                                        >
                                                            <div className="mb-1 flex items-center gap-2">
                                                                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-gradient-to-br from-blue-400 to-purple-500 text-xs font-semibold text-white">
                                                                    {comment.user.name
                                                                        .charAt(
                                                                            0,
                                                                        )
                                                                        .toUpperCase()}
                                                                </span>
                                                                <span className="text-xs font-semibold text-gray-900">
                                                                    {
                                                                        comment
                                                                            .user
                                                                            .name
                                                                    }
                                                                </span>
                                                            </div>
                                                            <p className="line-clamp-2 pl-8 text-xs text-gray-700">
                                                                {
                                                                    comment.comment
                                                                }
                                                            </p>
                                                        </div>
                                                    ))}
                                                {post.comments.length > 3 && (
                                                    <p className="text-center text-xs text-gray-500">
                                                        +
                                                        {post.comments.length -
                                                            3}{' '}
                                                        more comments
                                                    </p>
                                                )}
                                            </div>
                                        ) : (
                                            <p className="text-xs text-gray-500 italic">
                                                No comments yet
                                            </p>
                                        )}
                                    </div>
                                </div>

                                {/* Engagement Bar */}
                                <div className="border-t border-gray-100 bg-gray-50 px-6 py-3">
                                    <div className="flex items-center justify-between text-xs">
                                        <div className="flex items-center gap-4">
                                            <span className="flex items-center gap-1 text-gray-600">
                                                <Users className="h-3.5 w-3.5" />
                                                <span className="font-medium">
                                                    {uniqueCommenters.length}
                                                </span>{' '}
                                                engaged users
                                            </span>
                                            <span className="flex items-center gap-1 text-gray-600">
                                                <TrendingUp className="h-3.5 w-3.5" />
                                                <span className="font-medium">
                                                    {engagementScore}
                                                </span>{' '}
                                                total engagement
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* Empty State */}
                {posts.length === 0 && (
                    <div className="flex flex-col items-center justify-center rounded-2xl border-2 border-dashed border-gray-300 bg-gray-50 py-16">
                        <div className="mb-4 rounded-full bg-gray-200 p-4">
                            <BarChart3 className="h-8 w-8 text-gray-400" />
                        </div>
                        <h3 className="mb-1 text-lg font-semibold text-gray-900">
                            No posts yet
                        </h3>
                        <p className="text-sm text-gray-600">
                            Create your first post to see statistics here
                        </p>
                    </div>
                )}
            </div>
        </AppLayout>
    );
}
