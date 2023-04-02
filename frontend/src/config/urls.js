const baseURL = 'http://localhost:5000';

const urls = {
    register: '/users',
    auth: {
        login: '/auth/login',
        refresh: '/auth/refresh',
    },
    users: '/users',
    products: '/products',
};

export {
    baseURL,
    urls,
}
