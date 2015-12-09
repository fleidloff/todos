import fetch from "whatwg-fetch";
import dispatcher from "./dispatcher";

export default function(...params) {
    return fetch(...params).then(res => {

        if (res && res.status === 401) {
            dispatcher.trigger("user:notLoggedIn");
            throw new Error("");
        }

        return res;
    });
};
