const hashParams = {};

export default {
    set(update) {
        Object.keys(update)
            .forEach(it => {
                hashParams[it] = update[it];
            });
        window.location.hash = Object.keys(hashParams)
            .map(it => {
                return `/${it}/${hashParams[it]}`;
            }).join("");
    },
    get() {
        window.location.hash
            .split("/")
            .filter(it => it !== "#")
            .reduce((pv, cv) => {
                if (pv) {
                    hashParams[pv] = cv;
                    return null;
                } else {
                    return cv;
                }
            }, null);

        console.log(hashParams);
        return hashParams;
    }
};
