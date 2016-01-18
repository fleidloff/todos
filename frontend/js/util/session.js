export default {
    setItem(key, value) {
        return sessionStorage.setItem(key, value);
    },

    getItem(key) {
        return sessionStorage.getItem(key);
    },

    removeItem(key) {
        return sessionStorage.removeItem(key);
    },

    clear() {
        return sessionStorage.clear();
    },

    setCache(key, value) {
        this.setItem(key, JSON.stringify(value));
    },

    getCache(key, value) {
        return JSON.parse(this.getItem(key));
    }
};
