const baseURL = 'http://localhost:5000';

const urls = {
    register: '/users',
    auth: {
        login: '/auth/login',
        refresh: '/auth/refresh',
        logout: '/auth/logout',
    },
    users: '/users',
    products: {
        all: '/products',
        promo: '/products/promo',
    }
};

export {
    baseURL,
    urls,
}
