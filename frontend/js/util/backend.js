import app from "./dispatcher";
import api from "./api";

let id = 0;
let items = [];

function setItems(newItems) {
    items = newItems.map(i => {
        i.id = i._id;
        return i;
    })
    .sort(sortItems);
    return items;
};

function sortItems(a, b) {
    return (a.sort < b.sort ? 1 : a.sort < b.sort ? -1 : 0);
}

app.on("load:items", () => {
    api.tasks.all()
        .then(res => {
            if (res.status !== 200) {
                throw new Error("res.status is not OK:200 but " + res.status);
            }
            return res;
        })
        .then(res => res.text())
        .then(body => JSON.parse(body))
        .then(json => setItems(json))
        .then(json => app.trigger("loaded:items", json))
        .catch(e => app.trigger("app:error", e));
});

app.on("load:item", id => {
    // todo: if item cannot be found, display error message item insteadS
    app.trigger("loaded:item", items.filter(i => i.id === id)[0]);
});

app.on("new:item", () => {
    const itemId = id++;
    const sort = Math.max(...items.map(i => i.sort)) + 1; // todo ?= items.length
    
    const item = {title: "New Item", description: "", sort};
    api.tasks.create(item)
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
            app.trigger("save:item-detail", json);
            app.trigger("select:item", json.id, true);
        })
        .catch(e => app.trigger("app:error", e));
});

app.on("delete:item-detail", id => {
    items = items.filter(i => i.id !== id);
    app.trigger("loaded:items", items);
    app.trigger("deleted:item-detail", id);
    api.tasks.remove(id)
        .then(res => {
            if (res.status !== 204) {
                throw new Error("res.status is not OK:204 but " + res.status);
            }
            return res;
        })
        .catch(e => app.trigger("app:error", e));
});

app.on("save:item-detail", (item, sort) => {
    // todo: save item
    const newItems = items.filter(i => i.id !== item.id);

    newItems.unshift(item);
    items = newItems
        .sort(sortItems)
        .map((item, index) => {
            if (!sort) {
                return item;
            }
            item.sort = newItems.length - index - 1;
            return item;
        });
    app.trigger("loaded:items", items);
    if (!sort) {
        app.trigger("loaded:item", item);
        app.trigger("select:item", item.id);   
        api.tasks.update(item)
        .then(res => {
            if (res.status !== 200) {
                throw new Error("res.status is not OK:200 but " + res.status);
            }
            return res;
        })
        .catch(e => app.trigger("app:error", e));
    } else {
        items.forEach(i => api.tasks.update(i));
    }
});
