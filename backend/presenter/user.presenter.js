const normalize = (user) => {
    return {
        _id: user._id,
        name: user.name,
        email: user.email,
        wishlist: user.wishlist,
        terms: user.terms,
    }
};

const normalizeAll = (users) => {
    return users.map(user => normalize(user));
};

module.exports = {
    normalize,
    normalizeAll,
};