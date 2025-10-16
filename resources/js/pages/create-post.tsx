import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem } from '@/types';
import { Link, useForm } from '@inertiajs/react';
import { ArrowLeft, FileText, ImagePlus, Type, X } from 'lucide-react';
import { routes } from '../lib/routes';

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Home', href: routes.dashboard() },
    { title: 'Create Post', href: '#' },
];

export default function CreatePost() {
    const { data, setData, post, processing, errors } = useForm({
        title: '',
        content: '',
        image: null as File | null,
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post(routes.storePost());
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <div className="mx-auto w-full px-4 py-8">
                {/* Header Section */}
                <div className="mb-8">
                    <div className="mb-4 flex items-center justify-between">
                        <div>
                            <h1 className="text-3xl font-bold tracking-tight text-gray-900">
                                Create New Post
                            </h1>
                            <p className="mt-2 text-sm text-gray-600">
                                Share your thoughts and ideas with the community
                            </p>
                        </div>
                        <Link
                            href={routes.dashboard()}
                            className="flex items-center gap-2 rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm transition-all hover:bg-gray-50 hover:shadow"
                        >
                            <ArrowLeft className="h-4 w-4" />
                            Back
                        </Link>
                    </div>
                </div>

                {/* Form Card */}
                <form
                    onSubmit={handleSubmit}
                    className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-lg"
                >
                    {/* Form Header */}
                    <div className="border-b border-gray-100 bg-gradient-to-r from-blue-50 to-indigo-50 px-6 py-4">
                        <div className="flex items-center gap-2">
                            <div className="rounded-lg bg-white p-2 shadow-sm">
                                <FileText className="h-5 w-5 text-blue-600" />
                            </div>
                            <div>
                                <h2 className="font-semibold text-gray-900">
                                    Post Details
                                </h2>
                                <p className="text-xs text-gray-600">
                                    Fill in the information below
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Form Body */}
                    <div className="space-y-6 p-6">
                        {/* Title Field */}
                        <div className="group">
                            <label className="mb-2 flex items-center gap-2 text-sm font-semibold text-gray-700">
                                <Type className="h-4 w-4 text-blue-600" />
                                Title
                                <span className="text-red-500">*</span>
                            </label>
                            <div className="relative">
                                <input
                                    type="text"
                                    value={data.title}
                                    onChange={(e) =>
                                        setData('title', e.target.value)
                                    }
                                    className={`w-full rounded-xl border-2 px-4 py-3 text-sm font-medium shadow-sm transition-all focus:ring-4 focus:outline-none ${
                                        errors.title
                                            ? 'border-red-300 bg-red-50 focus:border-red-500 focus:ring-red-100'
                                            : 'border-gray-200 bg-gray-50 focus:border-blue-500 focus:bg-white focus:ring-blue-100'
                                    }`}
                                    placeholder="Enter a captivating title for your post..."
                                    required
                                />
                                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                                    <span className="text-xs text-gray-400">
                                        {data.title.length}/100
                                    </span>
                                </div>
                            </div>
                            {errors.title && (
                                <p className="mt-2 flex items-center gap-1 text-sm text-red-600">
                                    <span className="font-medium">⚠</span>
                                    {errors.title}
                                </p>
                            )}
                        </div>

                        {/* Content Field */}
                        <div className="group">
                            <label className="mb-2 flex items-center gap-2 text-sm font-semibold text-gray-700">
                                <FileText className="h-4 w-4 text-blue-600" />
                                Content
                                <span className="text-red-500">*</span>
                            </label>
                            <div className="relative">
                                <textarea
                                    value={data.content}
                                    onChange={(e) =>
                                        setData('content', e.target.value)
                                    }
                                    className={`w-full resize-none rounded-xl border-2 px-4 py-3 text-sm leading-relaxed shadow-sm transition-all focus:ring-4 focus:outline-none ${
                                        errors.content
                                            ? 'border-red-300 bg-red-50 focus:border-red-500 focus:ring-red-100'
                                            : 'border-gray-200 bg-gray-50 focus:border-blue-500 focus:bg-white focus:ring-blue-100'
                                    }`}
                                    rows={8}
                                    placeholder="Share your story, ideas, or insights with the community..."
                                    required
                                />
                                <div className="pointer-events-none absolute right-3 bottom-3">
                                    <span className="text-xs text-gray-400">
                                        {data.content.length} characters
                                    </span>
                                </div>
                            </div>
                            {errors.content && (
                                <p className="mt-2 flex items-center gap-1 text-sm text-red-600">
                                    <span className="font-medium">⚠</span>
                                    {errors.content}
                                </p>
                            )}
                        </div>

                        {/* Image Upload Field */}
                        <div className="group">
                            <label className="mb-2 flex items-center gap-2 text-sm font-semibold text-gray-700">
                                <ImagePlus className="h-4 w-4 text-blue-600" />
                                Featured Image
                                <span className="text-xs font-normal text-gray-500">
                                    (Optional)
                                </span>
                            </label>

                            {!data.image ? (
                                <label className="flex cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-gray-300 bg-gray-50 px-6 py-8 transition-all hover:border-blue-400 hover:bg-blue-50">
                                    <div className="mb-3 rounded-full bg-blue-100 p-3">
                                        <ImagePlus className="h-6 w-6 text-blue-600" />
                                    </div>
                                    <span className="mb-1 text-sm font-medium text-gray-700">
                                        Click to upload image
                                    </span>
                                    <span className="text-xs text-gray-500">
                                        PNG, JPG, GIF up to 10MB
                                    </span>
                                    <input
                                        type="file"
                                        className="hidden"
                                        accept="image/*"
                                        onChange={(e) =>
                                            setData(
                                                'image',
                                                e.target.files
                                                    ? e.target.files[0]
                                                    : null,
                                            )
                                        }
                                    />
                                </label>
                            ) : (
                                <div className="flex items-center justify-between rounded-xl border-2 border-green-200 bg-green-50 px-4 py-3">
                                    <div className="flex items-center gap-3">
                                        <div className="rounded-lg bg-green-100 p-2">
                                            <ImagePlus className="h-5 w-5 text-green-600" />
                                        </div>
                                        <div>
                                            <p className="text-sm font-medium text-gray-900">
                                                {data.image.name}
                                            </p>
                                            <p className="text-xs text-gray-600">
                                                {(
                                                    data.image.size / 1024
                                                ).toFixed(2)}{' '}
                                                KB
                                            </p>
                                        </div>
                                    </div>
                                    <button
                                        type="button"
                                        onClick={() => setData('image', null)}
                                        className="rounded-lg p-2 text-gray-500 transition-colors hover:bg-white hover:text-red-600"
                                    >
                                        <X className="h-4 w-4" />
                                    </button>
                                </div>
                            )}

                            {errors.image && (
                                <p className="mt-2 flex items-center gap-1 text-sm text-red-600">
                                    <span className="font-medium">⚠</span>
                                    {errors.image}
                                </p>
                            )}
                        </div>
                    </div>

                    {/* Form Footer */}
                    <div className="border-t border-gray-100 bg-gray-50 px-6 py-4">
                        <div className="flex items-center justify-between">
                            <p className="text-xs text-gray-600">
                                <span className="font-medium text-red-500">
                                    *
                                </span>{' '}
                                Required fields
                            </p>
                            <button
                                type="submit"
                                disabled={processing}
                                className="relative overflow-hidden rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 px-6 py-3 text-sm font-semibold text-white shadow-lg transition-all hover:from-blue-700 hover:to-indigo-700 hover:shadow-xl disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:from-blue-600 disabled:hover:to-indigo-600"
                            >
                                {processing ? (
                                    <span className="flex items-center gap-2">
                                        <svg
                                            className="h-4 w-4 animate-spin"
                                            viewBox="0 0 24 24"
                                        >
                                            <circle
                                                className="opacity-25"
                                                cx="12"
                                                cy="12"
                                                r="10"
                                                stroke="currentColor"
                                                strokeWidth="4"
                                                fill="none"
                                            />
                                            <path
                                                className="opacity-75"
                                                fill="currentColor"
                                                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                            />
                                        </svg>
                                        Publishing...
                                    </span>
                                ) : (
                                    'Publish Post'
                                )}
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </AppLayout>
    );
}
