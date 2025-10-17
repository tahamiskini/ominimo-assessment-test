export const routes = {
    dashboard: () => '/posts',
    createPost: () => '/posts/create',
    storePost: () => '/posts',
    showPost: (id: number) => `/posts/${id}`,
    editPost: (id: number) => `/posts/${id}/edit`,
    updatePost: (id: number) => `/posts/${id}`,
    deletePost: (id: number) => `/posts/${id}`,
    likePost: (id: number) => `/posts/${id}/like`,
};
