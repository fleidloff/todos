import api from "./api";
import dispatcher from "./dispatcher";
import Projects from "../components/project/projects";


let id = 0;

function sortItems(a, b) {
    return (a.sort < b.sort ? 1 : a.sort > b.sort ? -1 : 0);
}

export default {
    showMessage(m, t) {
        return new Promise(resolve => {
            const notification = {
                content: m,
                type: t || "info",
                id: id++
            }; 
            const notifications = this.state.model.notifications;
            notifications.push(notification);
            this.setModel({notifications}); 
        });
    },
    loadItems() {
        // todo: ensure model.activeProject is set
        api.tasks.all(this.state.model)
            .then(res => {
                if (res.status !== 200) {
                    throw new Error("res.status is not OK:200 but " + res.status);
                }
                return res;
            })
            .then(res => res.text())
            .then(body => JSON.parse(body))
            .then(json => {
                const items = json.map(i => {
                    i.id = i._id;
                    return i;
                })
                .sort(sortItems);
                return items;
            })
            .then(items => this.setModel({items}))
            .catch(e => dispatcher.trigger("app:error", e));
    },
    loadProjects() {
        api.projects.all(this.state.model)
            .then(res => {
                if (res.status !== 200) {
                    throw new Error("res.status is not OK:200 but " + res.status);
                }
                return res;
            })
            .then(res => res.text())
            .then(body => JSON.parse(body))
            .then(json => {
                const projects = json.map(i => {
                    i.id = i._id;
                    return i;
                })
                return projects;
            })
            .then(projects => this.setModel({projects}))
            .catch(e => dispatcher.trigger("app:error", e));
    },
    selectItem(activeItemId, editing=false) {
        const activeItem = this.state.model.items.filter(i => i.id === activeItemId)[0];
        this.setModel({activeItem, editing});
    },
    checkItem(itemId, checked) {

        const items = this.state.model.items.map(i => {
            if (i.id === itemId) {
                i.checked = checked
                api.tasks.update({id: i.id, checked}).catch(e => dispatcher.trigger("app:error", e));
            }
            return i;
        });
        this.setModel({items});  
    },
    saveItem(item, sort) {
        const newItems = this.state.model.items.filter(i => i.id !== item.id);

        newItems.unshift(item);
        const items = newItems
            .sort(sortItems)
            .map((item, index) => {
                if (!sort) {
                    return item;
                }
                item.sort = newItems.length - index - 1;
                return item;
            });
        this.setModel({items});
        if (!sort) {
            dispatcher.trigger("select:item", item.id);   
            api.tasks.update(item)
            .then(res => {
                if (res.status !== 200) {
                    throw new Error("res.status is not OK:200 but " + res.status);
                }
                return res;
            })
            .catch(e => dispatcher.trigger("app:error", e));
        } else {
            items.forEach(i => api.tasks.update(i).then(res => {
                if (res.status !== 200) {
                    throw new Error("res.status is not OK:200 but " + res.status);
                }
                return res;
            })
            .catch(e => dispatcher.trigger("app:error", e)));
        }
    },
    editItem() {
        this.setModel({editing: true, preview: false});
    },
    previewItem() {
        this.setModel({preview: true});
    },
    cancelPreviewItem() {
        this.setModel({preview: false});
    },
    cancelItem() {
        this.setModel({editing: false});
    },
    newItem() {
        const itemId = id++;
        const {model} = this.state;
        const {items} = model;
        const sort = (items.length ? Math.max(...items.map(i => i.sort)) : 0) + 1; // todo ?= items.length
        const project = model.activeProject;
        const item = {title: "New Item", description: "", sort, project};
        api.tasks.create(item, model)
            .then(res => {
                if (res.status !== 201) {
                    throw new Error("res.status is not OK:201 but " + res.status);
                }
                return res;
            })
            .then(res => res.text())
            .then(body => JSON.parse(body))
            .then(json => {
                json.id = json._id;
                dispatcher.trigger("save:item-detail", json, true);
                dispatcher.trigger("select:item", json.id, true);
            })
            .catch(e => dispatcher.trigger("dispatcher:error", e));
    },
    deleteItem(id) {
        const items = this.state.model.items.filter(i => i.id !== id);
        this.setModel({items});
        this.setModel({activeItem: null});
        api.tasks.remove(id)
            .then(res => {
                if (res.status !== 204) {
                    throw new Error("res.status is not OK:204 but " + res.status);
                }
                return res;
            })
            .catch(e => dispatcher.trigger("dispatcher:error", e));
    },
    dismissNotification(id) {
        const notifications = this.state.model.notifications.filter(n => n.id !== id);
        this.setModel({notifications});
    },
    selectProject(activeProject) {
        this.setModel({
            items: [],
            activeItem: null,
            activeProject,
            editing: false
        });
        if (activeProject) {
            dispatcher.trigger("load:items");
        } else {
            dispatcher.trigger("app:error");
        }
    },
    appError(e) {
        console.log(e);
        dispatcher.trigger("show:message", "Ooops, something went wrong...", "warning");
    },
    showProjects() {
        dispatcher.trigger("show:message", <Projects app={this.state} />);
    }
};
