import dispatcher from "./dispatcher";

let hashParams = {};


window.addEventListener("hashchange", e => {
    const {project, item, page} = hp.get();

    if (project && hashParams.project !== project) {
        if (item && hashParams.item !== item) {
            dispatcher.once("loaded:items", () => {
                dispatcher.trigger("select:item", item);    
            });
        }
        
        dispatcher.trigger("select:project", project);
    } else if (project) {
        if (hashParams.item !== item) {
            if (item) {
                dispatcher.trigger("select:item", item);    
            } else {
                dispatcher.trigger("select:item", null);
                delete hashParams.item;
            }
        } 
    }

    if (page && hashParams.page !== page) {
        dispatcher.trigger("goto:page", page);
    }
});

const hp = {
    removeAll() {
        hashParams = {};
        this.set(hashParams);
    },
    set(update) {
        Object.keys(update)
            .forEach(it => {
                hashParams[it] = update[it];

                if (update[it] === null) {
                    delete hashParams[it];
                }
            });
        window.location.hash = Object.keys(hashParams)
            .map(it => {
                return `/${it}/${hashParams[it]}`;
            }).join("");
    },
    get() {
        const hashParams = {};
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

        return hashParams;
    }
};

export default hp;
