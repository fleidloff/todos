import fetch from "whatwg-fetch";
import config from "../../../config";

const base = config.app.context + config.api.context + "/" + config.api.version + "/";

// todo: handle errors

export default {
    projects: {
        all(model) {
            return fetch(`${base}Projects?sort=title`);
        },
        create(project) {
            return fetch(`${base}Projects`, {
                method: "post",
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(project)
            });
        },
        remove(id) {
            return fetch(base + "Projects" + "/" + id, {
                method: "delete",
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json"
                }
            });    
        },
    },
    tasks: {
        all(model) {
            return fetch(`${base}Tasks?project=${model.activeProject.id}`);
        },
        create(item, model) {
            return fetch(`${base}Tasks?project=${model.activeProject.id}`, {
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
