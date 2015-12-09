import whatwg from "whatwg-fetch";
import dispatcher from "./dispatcher";

export default function(...params) {
    return new Promise((resolve, reject) => {
        whatwg(...params).then(res => {
            if (res && res.status == 401) {
                var e = new Error("user is not logged in.");
                e.public = true;
                reject(e);
            }

            return resolve(res);
        });
    });
};
