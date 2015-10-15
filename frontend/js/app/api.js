import fetch from "whatwg-fetch";
import config from "../../../config";

const base = config.app.context + config.api.context + "/" + config.api.version + "/";

// todo: handle errors

export default {
    projects: {
        all(model) {
            return fetch(`${base}Projects`);
        }
    },
    tasks: {
        all(model) {
            return fetch(`${base}Tasks?project=${model.activeProject}`);
        },
        create(item, model) {
            return fetch(`${base}Tasks?project=${model.activeProject}`, {
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
