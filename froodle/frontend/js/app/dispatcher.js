const listeners = {
    "app:error": [],
    "cancel-preview:item-detail-edit": [],
    "cancel:item-detail": [],
    "check:item": [],
    "change:filter": [],
    "clear-checked:items": [],
    "click:world": [],
    "create:project": [],
    "delete:item-detail": [],
    "delete:project": [],
    "dismiss:notification": [],
    "edit:item-detail": [],
    "goto:page": [],
    "goto:url": [],
    "load:items": [],
    "load:projects": [],
    "new:item": [],
    "preview:item-detail-edit": [],
    "rename:project": [],
    "save:item-detail": [],
    "select:item": [],
    "select:project": [],
    "start:app": [],
    "show:message": [],
    "user:logout":[],
};

const onceListeners = JSON.parse(JSON.stringify(listeners));

export default {
    on(evt, cb) {
        if (!(evt in listeners)) {
            throw new Error(`event ${evt} does not exist.`);
        }
        listeners[evt].push(cb);
    },
    off(evt, cb) {
        if (!(evt in listeners)) {
            throw new Error(`event ${evt} does not exist.`);
        }
        listeners[evt] = listeners[evt].filter(func => func !== cb);
    },
    trigger(evt, ...rest) {
        return new Promise((resolve, reject) => {
            if (DBG) {
                console.log("triggered:", evt, rest);
                let err;

                if (!(evt in listeners)) {
                    err = new Error(`event ${evt} does not exist.`);
                    throw err;
                }
                if ((listeners[evt].length + onceListeners[evt].length) === 0) {
                    err = new Error(`event ${evt} triggered but not cought.`);
                    throw err;
                }
            }

            listeners[evt].forEach(cb => setTimeout(() => cb(resolve, ...rest), 0));
            onceListeners[evt].forEach(cb => setTimeout(() => cb(resolve, ...rest), 0));
            onceListeners[evt] = [];
        });
    }
};
