import dispatcher from "./dispatcher";
import api from "./api";
import m from "./model";
let model = m;

let id = 0;

function sortItems(a, b) {
    return (a.sort < b.sort ? 1 : a.sort > b.sort ? -1 : 0);
}

export default React.createClass({
    showMessage(m, t) {
        const notification = {
            content: m,
            type: t || "info",
            id: id++
        }; 
        const model = this.state.model;
        model.notifications.push(notification);
        this.setState({model});
    },
    appError(e) {
        console.log(e);
        dispatcher.trigger("show:message", "Ooops, something went wrong...", "warning");
    },
    loadItems() {
        api.tasks.all()
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
    selectItem(activeItemId) {
        const activeItem = this.state.model.items.filter(i => i.id === activeItemId)[0];
        this.setModel({activeItem, editing: false});
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
            items.forEach(i => api.tasks.update(i).catch(e => dispatcher.trigger("app:error", e)));
        }
    },
    editItem() {
        this.setModel({editing: true});
    },
    cancelItem() {
        this.setModel({editing: false});
    },
    newItem() {
        const itemId = id++;
        const {items} = this.state.model;
        const sort = (items.length ? Math.max(...items.map(i => i.sort)) : 0) + 1; // todo ?= items.length
        
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
                dispatcher.trigger("save:item-detail", json);
                dispatcher.trigger("select:item", json.id);
                this.setModel({editing: true});
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
    setModel(o) {
        const model = this.state.model;
        Object.keys(o).forEach(k => model[k] = o[k]);
        this.setState({model});  
    },
    getInitialState() {
        dispatcher.on("app:error", this.appError);
        dispatcher.on("cancel:item-detail", this.cancelItem);
        dispatcher.on("delete:item-detail", this.deleteItem);
        dispatcher.on("dismiss:notification", this.dismissNotification);
        dispatcher.on("edit:item-detail", this.editItem);
        dispatcher.on("load:items", this.loadItems);
        dispatcher.on("new:item", this.newItem);
        dispatcher.on("save:item-detail", this.saveItem);
        dispatcher.on("select:item", this.selectItem)
        dispatcher.on("show:message", this.showMessage);
       
        return {
            model,
            trigger: dispatcher.trigger
        };
    },
    componentDidMount() {
        dispatcher.trigger("load:items");
        dispatcher.trigger("show:message", "Hello, World!");
    },
    render() {
        return <div>
            {this.props.children.map(r => React.cloneElement(r, {app: this.state}))} 
        </div>; 
    }
});
