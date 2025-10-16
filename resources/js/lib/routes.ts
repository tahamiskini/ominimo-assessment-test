export const routes = {
    dashboard: () => '/posts',
    createPost: () => '/posts/create',
    storePost: () => '/posts',
    showPost: (id: number) => `/posts/${id}`,
};
