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
    "load:items": [],
    "load:projects": [],
    "new:item": [],
    "preview:item-detail-edit": [],
    "save:item-detail": [],
    "select:item": [],
    "select:project": [],
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
        if (DBG) {
            console.log("triggered:", evt, rest);
        }
        if (!(evt in listeners)) {
            throw new Error(`event ${evt} does not exist.`);
        }
        if (listeners[evt].length === 0) {
            throw new Error(`event ${evt} triggered but not catched.`);
        }
        listeners[evt].forEach(cb => setTimeout(() => cb(...rest), 0));
    }
};
