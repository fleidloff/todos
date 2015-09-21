const listeners = {
    "app:error": [],
    "cancel:item-detail": [],
    "delete:item-detail": [],
    "dismiss:notification": [],
    "edit:item-detail": [],
    "load:items": [],
    "new:item": [],
    "save:item-detail": [],
    "select:item": [],
    "show:message": [],
};

export default {
    on(evt, cb) {
        //this.off(evt, cb);
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
