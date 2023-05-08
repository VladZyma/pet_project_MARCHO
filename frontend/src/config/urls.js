const baseURL = process.env.REACT_APP_API;

const urls = {
    register: '/users',
    auth: {
        login: '/auth/login',
        refresh: '/auth/refresh',
        logout: '/auth/logout',
        forgotPassword: '/auth/password/forgot',
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
