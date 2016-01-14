export default {
    setItem(key, value) {
        return sessionStorage.setItem(key, value);
    },

    getItem(key) {
        return sessionStorage.getItem(key);
    },

    removeItem(key) {
        return sessionStorage.removeItem(key);
    }
};
