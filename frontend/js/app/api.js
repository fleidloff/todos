import fetch from "whatwg-fetch";
import config from "../../../config";

const base = config.app.context + config.api.context + "/" + config.api.version + "/";

// todo: handle errors

export default {
    tasks: {
        all() {
            return fetch(base + "Tasks");
        },
        create(item) {
            return fetch(base + "Tasks", {
                method: "post",
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(item)
            });
        },
        remove(id) {
            return fetch(base + "Tasks" + "/" + id, {
                method: "delete",
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json"
                }
            });    
        },
        update(item) {
            return fetch(base + "Tasks/" + item.id, {
                method: "put",
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(item)
            }); 
        }
    }
};
