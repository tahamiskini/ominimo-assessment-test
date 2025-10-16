import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem } from '@/types';
import { Link } from '@inertiajs/react';
import {
    Calendar,
    Heart,
    MessageCircle,
    MoreVertical,
    Plus,
} from 'lucide-react';
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
}

export default function Dashboard({ posts }: DashboardProps) {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <div className="mb-6 flex items-center justify-between px-4">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Home</h1>
                    <p className="mt-1 text-sm text-muted-foreground">
                        Discover and engage with the latest posts from the
                        community
                    </p>
                </div>

                <Link
                    href={routes.createPost()}
                    className="flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm transition hover:bg-blue-700"
                >
                    <Plus className="h-4 w-4" />
                    Write a Post
                </Link>
            </div>

            <div className="grid auto-rows-min gap-6 px-4 md:grid-cols-2 lg:grid-cols-3">
                {posts.map((post) => (
                    <Link href={routes.showPost(post.id)}>
                        <article
                            key={post.id}
                            className="group relative overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm transition hover:border-gray-300 hover:shadow-lg"
                        >
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
                                    <button className="rounded-lg p-1.5 text-gray-400 opacity-0 transition group-hover:opacity-100 hover:bg-gray-100 hover:text-gray-600">
                                        <MoreVertical className="h-4 w-4" />
                                    </button>
                                </div>

                                <p className="mb-4 line-clamp-3 text-sm text-muted-foreground">
                                    {post.content}
                                </p>

                                <div className="mb-4 flex items-center gap-3">
                                    <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-purple-600 text-sm font-semibold text-white ring-2 ring-white">
                                        {post.user.name.charAt(0).toUpperCase()}
                                    </div>
                                    <div className="min-w-0 flex-1">
                                        <p className="truncate text-sm font-medium text-gray-900">
                                            {post.user.name}
                                        </p>
                                        <div className="flex items-center gap-1 text-xs text-gray-500">
                                            <Calendar className="h-3 w-3" />
                                            <time dateTime={post.created_at}>
                                                {new Date(
                                                    post.created_at,
                                                ).toLocaleDateString('en-US', {
                                                    month: 'short',
                                                    day: 'numeric',
                                                    year: 'numeric',
                                                })}
                                            </time>
                                        </div>
                                    </div>
                                </div>

                                <div className="flex items-center gap-4 border-y border-gray-100 py-3">
                                    <button className="flex items-center gap-1.5 rounded-md px-2 py-1 text-gray-600 hover:bg-red-50 hover:text-red-600">
                                        <Heart className="h-4 w-4" />
                                        <span className="text-sm font-medium">
                                            {post.likes.length}
                                        </span>
                                    </button>
                                    <button className="flex items-center gap-1.5 rounded-md px-2 py-1 text-gray-600 hover:bg-[#574CF9] hover:text-blue-600">
                                        <MessageCircle className="h-4 w-4" />
                                        <span className="text-sm font-medium">
                                            {post.comments.length}
                                        </span>
                                    </button>
                                </div>
                            </div>
                        </article>
                    </Link>
                ))}
            </div>
        </AppLayout>
    );
}
