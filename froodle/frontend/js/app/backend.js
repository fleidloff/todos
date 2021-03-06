import api from "./api";
import dispatcher from "./dispatcher";
import hashParams from "./hashParams";
import session from "../util/session";

let id = 0;

function sortItems(a, b) {
    return (a.sort < b.sort ? 1 : a.sort > b.sort ? -1 : 0);
}

export default {
    showMessage(state, action, message, type, autoDismiss) {
        const notification = {
            content: message,
            type: type || "info",
            id: id++
        };
        if (autoDismiss) {
            setTimeout(() => {
                dispatcher.trigger("dismiss:notification", notification.id);
            }, 2000);
        }
        const notifications = state.model.notifications;
        notifications.push(notification);
        action({notifications});
    },
    loadItems(state, action) {
        if (typeof state.model.activeProject === "undefined") {
            return dispatcher.trigger("app:error", new Error("active project is not set"));
        }
        const cacheKey = `data.items.${state.model.activeProject.id}`;
        if (session.getCache(cacheKey)) {
            action(session.getCache(cacheKey));
        }
        // todo: ensure model.activeProject is set
        api.tasks.all(state.model)
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
            .then(items => action({items}))
            .then(items => session.setCache(cacheKey, items))
            .catch(e => dispatcher.trigger("app:error", e));
    },
    loadProjects(state, action) {
        api.projects.all(state.model)
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
            .then(projects => action({projects}))
            .catch(e => dispatcher.trigger("app:error", e));
    },
    selectItem(state, action, activeItemId, editing=false) {
        if (!activeItemId) {
            return action({activeItem, editing});
        }
        const activeItem = state.model.items.filter(i => i.id === activeItemId)[0];
        if (activeItem) {
            hashParams.set({item: activeItem.id});
            action({activeItem, editing});
        } else {
            dispatcher.trigger("app:error");
        }
    },
    checkItem(state, action, itemId, checked) {
        const items = state.model.items.map(i => {
            if (i.id === itemId) {
                i.checked = checked
                api.tasks.update({id: i.id, checked}).catch(e => dispatcher.trigger("app:error", e));
            }
            return i;
        });
        action({items});
    },
    saveItem(state, action, item, sort) {
        const newItems = state.model.items.filter(i => i.id !== item.id);

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
        action({items});
        if (!sort) {
            dispatcher.trigger("select:item", item.id);
            api.tasks.updateAndThrow(item).catch(e => dispatcher.trigger("app:error", e));
        } else {
            api.tasks.updateAll(items).catch(e => dispatcher.trigger("app:error", e));
        }
    },
    editItem(state, action) {
        action({editing: true, preview: false});
    },
    previewItem(state, action) {
        action({preview: true});
    },
    cancelPreviewItem(state, action) {
        action({preview: false});
    },
    cancelItem(state, action) {
        action({editing: false});
    },
    renameProject(state, action, title) {
        const {activeProject} = state.model;
        activeProject.title = title;
        api.projects.update(activeProject)
            .catch(e => dispatcher.trigger("dispatcher:error", e));
        action({activeProject});
    },
    createProject(state, action, project) {
        const {projects} = state.model;
        api.projects.create(project)
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
                projects.unshift(json);
                action({projects});
                dispatcher.trigger("select:project", json.id).then(() => {
                    dispatcher.trigger("load:items");
                });
            })
            .catch(e => dispatcher.trigger("dispatcher:error", e));
    },
    newItem(state, action) {
        const itemId = id++;
        const {model} = state;
        const {items} = model;
        const sort = (items.length ? Math.max(...items.map(i => i.sort)) : 0) + 1; // todo ?= items.length
        const project = model.activeProject.id;
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
    deleteItem(state, action, id) {
        const items = state.model.items.filter(i => i.id !== id);
        action({items});
        action({activeItem: null});
        api.tasks.remove(id)
            .then(res => {
                if (res.status !== 204) {
                    throw new Error("res.status is not OK:204 but " + res.status);
                }
                return res;
            })
            .catch(e => dispatcher.trigger("app:error", e));
    },
    deleteProject(state, action, id) {
        const projects = state.model.projects.filter(p => p.id !== id);
        action({projects});
        action({activeProject: null});
        action({activeItem: null});
        api.projects.remove(id)
            .then(res => {
                if (res.status !== 204) {
                    throw new Error("res.status is not OK:204 but " + res.status);
                }
                return res;
            })
            .catch(e => dispatcher.trigger("app:error", e));
    },
    clearChecked(state, action) {
        state.model.items
            .filter(i => i.checked)
            .forEach(i => {
                api.tasks.remove(i.id)
                    .then(res => {
                        if (res.status !== 204) {
                            throw new Error("res.status is not OK:204 but " + res.status);
                        }
                        return res;
                    })
                    .catch(e => dispatcher.trigger("app:error", e));
            });
        const items = state.model.items.filter(i => !(i.checked));
        if (state.model.activeItem && state.model.activeItem.checked) {
            action({activeItem: null});
        }
        action({items});
    },
    dismissNotification(state, action, id) {
        const notifications = state.model.notifications.filter(n => n.id !== id);
        action({notifications});
    },
    selectProject(state, action, activeProjectId) {
        const activeProject = state.model.projects.filter(p => p.id === activeProjectId)[0];

        if (activeProject) {
            action({
                items: [],
                activeItem: null,
                activeProject,
                editing: false
            });
            hashParams.set({project: activeProject.id, item: null});
        } else {
            dispatcher.trigger("app:error");
        }
    },
    changeFilter(state, action, filterName, filterState) {
        const {filter} = state.model;
        filter[filterName] = filterState;
        action({filter, activeItem: null});
        dispatcher.trigger("load:items");
    },
    logout(state, action) {
        api.user.logout().catch(e => true);
        session.clear();
        dispatcher.trigger("goto:page", "login");
        dispatcher.trigger("show:message", "logged out.", "info", true);
    },
    gotoPage(state, action, pageName) {
        hashParams.set({page: pageName});
        action({pageName});
    },
    gotoUrl(state, action, url) {
        var win = window.open(url, "_blank").focus();
    },
    startApp(state, action) {
        const {project, item} = hashParams.get();
        dispatcher.trigger("load:projects").then(() => {
            if (!project) { return; }
            if (state.model.projects.filter(it => {
                return it.id === project;
            }).length) {
                dispatcher.trigger("select:project", project).then(() => {
                    return dispatcher.trigger("load:items");
                }).then(() => {
                    if (!item) { return; }
                    if (state.model.items.filter(it => {
                        return it.id === item;
                    }).length) {
                        dispatcher.trigger("select:item", item, false);
                    } else {
                        dispatcher.trigger("show:message", "Selected Item does not exist.");
                    }
                });
            } else {
                dispatcher.trigger("show:message", "Selected Project does not exist.");
            }   
        });
    },
    appError(state, action, e) {
        if (e.public) {
            return dispatcher.trigger("show:message", e.message);
        }
        if (DBG) {
            console.log((e.silent ? "Silent" : "") + e);
        }
        if (!e.silent) {
            dispatcher.trigger("show:message", "Ooops, something went wrong...", "warning");
        }
    }
};
