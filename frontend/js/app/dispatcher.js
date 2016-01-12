const listeners = {
    "app:error": [],
    "cancel-preview:item-detail-edit": [],
    "cancel:item-detail": [],
    "check:item": [],
    "change:filter": [],
    "clear-checked:items": [],
    "create:project": [],
    "delete:item-detail": [],
    "delete:project": [],
    "dismiss:notification": [],
    "edit:item-detail": [],
    "goto:page": [],
    "load:items": [],
    "loaded:items": [],
    "load:projects": [],
    "loaded:projects": [],
    "new:item": [],
    "preview:item-detail-edit": [],
    "save:item-detail": [],
    "select:item": [],
    "select:project": [],
    "show:message": [],
};

const onceListeners = JSON.parse(JSON.stringify(listeners));

export default {
    on(evt, cb) {
        if (!(evt in listeners)) {
            throw new Error(`event ${evt} does not exist.`);
        }
        listeners[evt].push(cb);
    },
    once(evt, cb) {
        if (!(evt in listeners)) {
            throw new Error(`event ${evt} does not exist.`);
        }
        onceListeners[evt].push(cb);
    },
    off(evt, cb) {
        if (!(evt in listeners)) {
            throw new Error(`event ${evt} does not exist.`);
        }
        listeners[evt] = listeners[evt].filter(func => func !== cb);
    },
    trigger(evt, ...rest) {
        if (DBG) {
            console.log("triggered:", evt, rest);
            let err;

            if (!(evt in listeners)) {
                err = new Error(`event ${evt} does not exist.`);
                // err.silent = true;
                throw err;
            }
            if ((listeners[evt].length + onceListeners[evt].length) === 0) {
                err = new Error(`event ${evt} triggered but not cought.`);
                err.silent = true;
                throw err;
            }
        }
        
        listeners[evt].forEach(cb => setTimeout(() => cb(...rest), 0));
        onceListeners[evt].forEach(cb => setTimeout(() => cb(...rest), 0));
        onceListeners[evt] = [];
    }
};
