import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem } from '@/types';
import { Link, router, useForm } from '@inertiajs/react';
import {
    Calendar,
    Clock,
    Edit,
    FileText,
    Heart,
    MessageCircle,
    MoreVertical,
    Plus,
    Trash2,
    Type,
    X,
} from 'lucide-react';
import { useState } from 'react';
import { routes } from '../lib/routes';

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Home', href: routes.dashboard() },
];

interface DashboardProps {
    posts: {
        id: number;
        title: string;
        content: string;
        image_url: string | null;
        user: { id: number; name: string };
        created_at: string;
        comments: {
            id: number;
            comment: string;
            user: { id: number; name: string };
        }[];
        likes: { id: number; user: { id: number; name: string } }[];
    }[];
    auth: {
        user: {
            id: number;
            name: string;
            email: string;
            role: string;
        };
    };
}

export default function Dashboard({ posts, auth }: DashboardProps) {
    const [openMenu, setOpenMenu] = useState<number | null>(null);
    const [scheduleModalOpen, setScheduleModalOpen] = useState(false);

    const { data, setData, post, reset } = useForm({
        title: '',
        content: '',
        scheduled_at: '',
    });

    const handleScheduleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post(routes.schedulePost(), {
            onSuccess: () => {
                reset();
                setScheduleModalOpen(false);
            },
        });
    };

    const [deleteModal, setDeleteModal] = useState<{
        isOpen: boolean;
        postId: number | null;
        postTitle: string;
    }>({
        isOpen: false,
        postId: null,
        postTitle: '',
    });

    const { delete: destroy } = useForm();

    const handleDeleteClick = (
        postId: number,
        postTitle: string,
        e: React.MouseEvent,
    ) => {
        e.preventDefault();
        e.stopPropagation();
        setDeleteModal({
            isOpen: true,
            postId,
            postTitle,
        });
        setOpenMenu(null);
    };

    const handleDeleteConfirm = () => {
        if (deleteModal.postId) {
            destroy(routes.deletePost(deleteModal.postId), {
                onSuccess: () => {
                    setDeleteModal({
                        isOpen: false,
                        postId: null,
                        postTitle: '',
                    });
                },
            });
        }
    };

    const handleDeleteCancel = () => {
        setDeleteModal({ isOpen: false, postId: null, postTitle: '' });
    };

    const handleLike = (postId: number, e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        router.post(
            routes.likePost(postId),
            {},
            { preserveScroll: true, preserveState: true },
        );
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <div className="mb-6 flex items-center justify-between px-4">
                <div>
                    <p className="mt-1 text-sm text-muted-foreground">
                        Discover and engage with the latest posts from the
                        community
                    </p>
                </div>

                <div className="flex gap-2">
                    <button
                        onClick={() => setScheduleModalOpen(true)}
                        className="mt-4 flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm transition hover:bg-blue-700"
                    >
                        <Clock className="h-4 w-4" />
                        Schedule Post
                    </button>

                    <Link
                        href={routes.createPost()}
                        className="mt-4 flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm transition hover:bg-blue-700"
                    >
                        <Plus className="h-4 w-4" />
                        Write a Post
                    </Link>
                </div>
            </div>

            <div className="grid auto-rows-min gap-6 px-4 md:grid-cols-2 lg:grid-cols-3">
                {posts.map((post) => {
                    const isLiked = post.likes.some(
                        (like) => like.user.id === auth.user.id,
                    );

                    return (
                        <div key={post.id} className="group relative">
                            <Link href={routes.showPost(post.id)}>
                                <article className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm transition hover:border-gray-300 hover:shadow-lg">
                                    {post.image_url && (
                                        <div className="relative h-48 w-full overflow-hidden bg-gradient-to-br from-blue-50 to-indigo-100">
                                            <img
                                                src={post.image_url}
                                                alt={post.title}
                                                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                                            />
                                            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
                                        </div>
                                    )}

                                    <div className="p-5">
                                        <div className="mb-3 flex items-start justify-between gap-2">
                                            <h2 className="line-clamp-2 flex-1 text-lg font-semibold text-gray-900 group-hover:text-blue-600">
                                                {post.title}
                                            </h2>

                                            {(auth.user.role === 'admin' ||
                                                auth.user.id ===
                                                    post.user.id) && (
                                                <div className="relative">
                                                    <button
                                                        className="rounded-lg p-1.5 text-gray-400 opacity-0 transition group-hover:opacity-100 hover:bg-gray-100 hover:text-gray-600"
                                                        onClick={(e) => {
                                                            e.preventDefault();
                                                            e.stopPropagation();
                                                            setOpenMenu(
                                                                openMenu ===
                                                                    post.id
                                                                    ? null
                                                                    : post.id,
                                                            );
                                                        }}
                                                    >
                                                        <MoreVertical className="h-4 w-4" />
                                                    </button>

                                                    {openMenu === post.id && (
                                                        <div className="absolute top-8 right-0 z-10 w-40 rounded-lg border border-gray-200 bg-white py-1 shadow-lg">
                                                            <Link
                                                                href={routes.editPost(
                                                                    post.id,
                                                                )}
                                                                className="flex items-center gap-2 px-3 py-2 text-sm text-gray-700 hover:bg-gray-50"
                                                                onClick={(e) =>
                                                                    e.stopPropagation()
                                                                }
                                                            >
                                                                <Edit className="h-4 w-4" />
                                                                Edit
                                                            </Link>
                                                            <button
                                                                onClick={(e) =>
                                                                    handleDeleteClick(
                                                                        post.id,
                                                                        post.title,
                                                                        e,
                                                                    )
                                                                }
                                                                className="flex w-full items-center gap-2 px-3 py-2 text-sm text-red-600 hover:bg-red-50"
                                                            >
                                                                <Trash2 className="h-4 w-4" />
                                                                Delete
                                                            </button>
                                                        </div>
                                                    )}
                                                </div>
                                            )}
                                        </div>

                                        <p className="mb-4 line-clamp-3 text-sm text-muted-foreground">
                                            {post.content}
                                        </p>

                                        <div className="mb-4 flex items-center gap-3">
                                            <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-purple-600 text-sm font-semibold text-white ring-2 ring-white">
                                                {post.user.name
                                                    .charAt(0)
                                                    .toUpperCase()}
                                            </div>
                                            <div className="min-w-0 flex-1">
                                                <p className="truncate text-sm font-medium text-gray-900">
                                                    {post.user.name}
                                                </p>
                                                <div className="flex items-center gap-1 text-xs text-gray-500">
                                                    <Calendar className="h-3 w-3" />
                                                    <time
                                                        dateTime={
                                                            post.created_at
                                                        }
                                                    >
                                                        {new Date(
                                                            post.created_at,
                                                        ).toLocaleDateString(
                                                            'en-US',
                                                            {
                                                                month: 'short',
                                                                day: 'numeric',
                                                                year: 'numeric',
                                                            },
                                                        )}
                                                    </time>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="flex items-center gap-4 border-y border-gray-100 py-3">
                                            <button
                                                className={`flex items-center gap-1.5 rounded-md px-2 py-1 transition ${
                                                    isLiked
                                                        ? 'text-red-600 hover:bg-red-100'
                                                        : 'text-gray-600 hover:bg-red-50 hover:text-red-600'
                                                }`}
                                                onClick={(e) =>
                                                    handleLike(post.id, e)
                                                }
                                            >
                                                <Heart
                                                    className={`h-4 w-4 ${isLiked ? 'fill-red-600 text-red-600' : ''}`}
                                                />
                                                <span className="text-sm font-medium">
                                                    {post.likes.length}
                                                </span>
                                            </button>

                                            <button
                                                className="flex items-center gap-1.5 rounded-md px-2 py-1 text-gray-600 hover:bg-blue-50 hover:text-blue-600"
                                                onClick={(e) => {
                                                    e.preventDefault();
                                                    e.stopPropagation();
                                                    router.visit(
                                                        routes.showPost(
                                                            post.id,
                                                        ),
                                                        {
                                                            preserveScroll: true,
                                                        },
                                                    );
                                                }}
                                            >
                                                <MessageCircle className="h-4 w-4" />
                                                <span className="text-sm font-medium">
                                                    {post.comments.length}
                                                </span>
                                            </button>
                                        </div>
                                    </div>
                                </article>
                            </Link>
                        </div>
                    );
                })}
            </div>

            {/* Enhanced Schedule Modal */}
            {scheduleModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm">
                    <div
                        className="relative w-full max-w-2xl animate-in duration-200 fade-in zoom-in"
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* Modal Card */}
                        <div className="overflow-hidden rounded-2xl bg-white shadow-2xl">
                            {/* Header with gradient */}
                            <div className="relative overflow-hidden border-b border-gray-100 bg-gradient-to-r from-blue-500 via-purple-500 to-indigo-600 px-6 py-8">
                                <div className="bg-grid-white/10 absolute inset-0" />
                                <div className="relative flex items-center gap-4">
                                    <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/20 shadow-lg backdrop-blur-sm">
                                        <Clock className="h-7 w-7 text-white" />
                                    </div>
                                    <div>
                                        <h3 className="text-2xl font-bold text-white">
                                            Schedule New Post
                                        </h3>
                                        <p className="mt-1 text-sm text-white/90">
                                            Plan ahead and publish at the
                                            perfect time
                                        </p>
                                    </div>
                                </div>

                                {/* Close button */}
                                <button
                                    type="button"
                                    onClick={() => setScheduleModalOpen(false)}
                                    className="absolute top-4 right-4 rounded-full bg-white/20 p-2 text-white backdrop-blur-sm transition hover:bg-white/30"
                                >
                                    <X className="h-5 w-5" />
                                </button>
                            </div>

                            {/* Form Body */}
                            <form
                                onSubmit={handleScheduleSubmit}
                                className="p-6"
                            >
                                <div className="space-y-6">
                                    {/* Title Field */}
                                    <div className="group">
                                        <label className="mb-2 flex items-center gap-2 text-sm font-semibold text-gray-700">
                                            <Type className="h-4 w-4 text-blue-600" />
                                            Post Title
                                            <span className="text-red-500">
                                                *
                                            </span>
                                        </label>
                                        <div className="relative">
                                            <input
                                                type="text"
                                                value={data.title}
                                                onChange={(e) =>
                                                    setData(
                                                        'title',
                                                        e.target.value,
                                                    )
                                                }
                                                className="w-full rounded-xl border-2 border-gray-200 bg-gray-50 px-4 py-3 text-sm font-medium shadow-sm transition-all placeholder:text-gray-400 focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-100 focus:outline-none"
                                                placeholder="Enter an engaging title..."
                                                required
                                            />
                                            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                                                <span className="text-xs text-gray-400">
                                                    {data.title.length}/100
                                                </span>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Content Field */}
                                    <div className="group">
                                        <label className="mb-2 flex items-center gap-2 text-sm font-semibold text-gray-700">
                                            <FileText className="h-4 w-4 text-blue-600" />
                                            Post Content
                                            <span className="text-red-500">
                                                *
                                            </span>
                                        </label>
                                        <div className="relative">
                                            <textarea
                                                value={data.content}
                                                onChange={(e) =>
                                                    setData(
                                                        'content',
                                                        e.target.value,
                                                    )
                                                }
                                                className="w-full resize-none rounded-xl border-2 border-gray-200 bg-gray-50 px-4 py-3 text-sm leading-relaxed shadow-sm transition-all placeholder:text-gray-400 focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-100 focus:outline-none"
                                                rows={6}
                                                placeholder="What's on your mind? Share your thoughts..."
                                                required
                                            />
                                            <div className="pointer-events-none absolute right-3 bottom-3">
                                                <span className="text-xs text-gray-400">
                                                    {data.content.length}{' '}
                                                    characters
                                                </span>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Schedule Date Time Field */}
                                    <div className="group">
                                        <label className="mb-2 flex items-center gap-2 text-sm font-semibold text-gray-700">
                                            <Calendar className="h-4 w-4 text-blue-600" />
                                            Schedule For
                                            <span className="text-red-500">
                                                *
                                            </span>
                                        </label>
                                        <div className="relative">
                                            <input
                                                type="datetime-local"
                                                value={data.scheduled_at}
                                                onChange={(e) =>
                                                    setData(
                                                        'scheduled_at',
                                                        e.target.value,
                                                    )
                                                }
                                                min={new Date()
                                                    .toISOString()
                                                    .slice(0, 16)}
                                                className="w-full rounded-xl border-2 border-gray-200 bg-gray-50 px-4 py-3 text-sm font-medium shadow-sm transition-all focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-100 focus:outline-none"
                                                required
                                            />
                                            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                                                <Clock className="h-4 w-4 text-gray-400" />
                                            </div>
                                        </div>
                                        <p className="mt-2 flex items-center gap-1.5 text-xs text-gray-600">
                                            <svg
                                                className="h-4 w-4 text-blue-500"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                stroke="currentColor"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth={2}
                                                    d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                                                />
                                            </svg>
                                            Your post will be automatically
                                            published at the scheduled time
                                        </p>
                                    </div>

                                    {/* Preview Info Box */}
                                    {data.scheduled_at && (
                                        <div className="rounded-xl border-2 border-blue-100 bg-blue-50 p-4">
                                            <div className="flex items-start gap-3">
                                                <div className="rounded-lg bg-blue-100 p-2">
                                                    <Calendar className="h-5 w-5 text-blue-600" />
                                                </div>
                                                <div className="flex-1">
                                                    <h4 className="text-sm font-semibold text-blue-900">
                                                        Scheduled Summary
                                                    </h4>
                                                    <p className="mt-1 text-xs text-blue-700">
                                                        Your post will be
                                                        published on{' '}
                                                        <span className="font-semibold">
                                                            {new Date(
                                                                data.scheduled_at,
                                                            ).toLocaleDateString(
                                                                'en-US',
                                                                {
                                                                    weekday:
                                                                        'long',
                                                                    year: 'numeric',
                                                                    month: 'long',
                                                                    day: 'numeric',
                                                                },
                                                            )}
                                                        </span>
                                                        {' at '}
                                                        <span className="font-semibold">
                                                            {new Date(
                                                                data.scheduled_at,
                                                            ).toLocaleTimeString(
                                                                'en-US',
                                                                {
                                                                    hour: '2-digit',
                                                                    minute: '2-digit',
                                                                },
                                                            )}
                                                        </span>
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </div>

                                {/* Footer Actions */}
                                <div className="mt-8 flex items-center justify-between border-t border-gray-100 pt-6">
                                    <p className="text-xs text-gray-600">
                                        <span className="font-medium text-red-500">
                                            *
                                        </span>{' '}
                                        Required fields
                                    </p>
                                    <div className="flex gap-3">
                                        <button
                                            type="button"
                                            onClick={() =>
                                                setScheduleModalOpen(false)
                                            }
                                            className="rounded-xl border-2 border-gray-200 bg-white px-6 py-2.5 text-sm font-semibold text-gray-700 shadow-sm transition-all hover:bg-gray-50 hover:shadow"
                                        >
                                            Cancel
                                        </button>
                                        <button
                                            type="submit"
                                            className="group relative overflow-hidden rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 px-6 py-2.5 text-sm font-semibold text-white shadow-lg transition-all hover:from-blue-700 hover:to-indigo-700 hover:shadow-xl"
                                        >
                                            <span className="relative z-10 flex items-center gap-2">
                                                <Clock className="h-4 w-4" />
                                                Schedule Post
                                            </span>
                                            <div className="absolute inset-0 bg-white opacity-0 transition-opacity group-hover:opacity-10" />
                                        </button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            )}

            {/* Delete Modal */}
            {deleteModal.isOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm">
                    <div className="mx-4 w-full max-w-md rounded-2xl bg-white p-6 shadow-xl">
                        <div className="mb-4">
                            <h3 className="text-lg font-semibold text-gray-900">
                                Delete Post
                            </h3>
                            <p className="mt-2 text-sm text-gray-600">
                                Are you sure you want to delete "
                                <span className="font-medium">
                                    {deleteModal.postTitle}
                                </span>
                                "? This action cannot be undone.
                            </p>
                        </div>
                        <div className="flex justify-end gap-3">
                            <button
                                onClick={handleDeleteCancel}
                                className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleDeleteConfirm}
                                className="rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700"
                            >
                                Delete Post
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </AppLayout>
    );
}