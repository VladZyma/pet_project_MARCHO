const baseURL = 'http://localhost:5000';

const urls = {
    register: '/users',
    auth: {
        login: '/auth/login',
        refresh: '/auth/refresh',
        logout: '/auth/logout',
    },
    users: {
        users: '/users',
        wishList: {
            add: '/users/wishList',
            remove: '/users/wishList/remove',
        }
    },
    products: {
        all: '/products',
        promo: '/products/promo',
        wishlist: '/products/wishlist',
    }
};

export {
    baseURL,
    urls,
}
