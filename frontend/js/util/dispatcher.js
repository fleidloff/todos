const listeners = {
    "load:items": [],
    "loaded:items": [],
    "select:item": [],
    "load:item": [],
    "loaded:item": [],
    "save:item-detail": [],
    "cancel:item-detail": [],
    "new:item": [],
    "delete:item-detail": [],
    "deleted:item-detail": [],
    "show:message": [],
    "app:error": [],
};

export default {
    on(evt, cb) {
        this.off(evt, cb);
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
        console.log("triggered:", evt, rest);
        if (!(evt in listeners)) {
            throw new Error(`event ${evt} does not exist.`);
        }
        listeners[evt].forEach(cb => cb(...rest));
    }
};
