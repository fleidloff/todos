import dispatcher from "./dispatcher";

const hashParams = {};


window.addEventListener("hashchange", e => {
    const {project, item} = hp.get();

    if (project && hashParams.project !== project) {
        if (item && hashParams.item !== item) {
            dispatcher.once("loaded:items", () => {
                dispatcher.trigger("select:item", item);    
            });
        }
        
        dispatcher.trigger("select:project", project);
    } else if (project) {
        if (item && hashParams.item !== item) {
            dispatcher.trigger("select:item", item);    
        } else if (!item) {
            dispatcher.trigger("select:project", project);        
        }
    }
});

const hp = {
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
