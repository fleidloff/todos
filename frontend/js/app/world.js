import dispatcher from "./dispatcher";
import api from "./api";
import model from "./model";
import backend from "./backend";

export default React.createClass({
    setModel(o) {
        const model = this.state.model;
        Object.keys(o).forEach(k => model[k] = o[k]);
        this.setState({model});
    },
    redux(action) {
        return (...rest) => {
            try {
                action(this.state, this.setModel, ...rest);
            } catch(ex) {
                if (DBG) {
                    dispatcher.trigger("show:message", ex.message, "debug");
                }
            }
        };
    },
    on(event, action) {
        dispatcher.on(event, this.redux(action));
    },
    getInitialState() {
        this.on("app:error", backend.appError);
        this.on("cancel-preview:item-detail-edit", backend.cancelPreviewItem);
        this.on("cancel:item-detail", backend.cancelItem);
        this.on("change:filter", backend.changeFilter);
        this.on("check:item", backend.checkItem);
        this.on("clear-checked:items", backend.clearChecked);
        this.on("create:project", backend.createProject);
        this.on("delete:item-detail", backend.deleteItem);
        this.on("delete:project", backend.deleteProject);
        this.on("dismiss:notification", backend.dismissNotification);
        this.on("edit:item-detail", backend.editItem);
        this.on("load:items", backend.loadItems);
        this.on("load:projects", backend.loadProjects);
        this.on("new:item", backend.newItem);
        this.on("preview:item-detail-edit", backend.previewItem);
        this.on("save:item-detail", backend.saveItem);
        this.on("select:item", backend.selectItem);
        this.on("select:project", backend.selectProject);
        this.on("show:message", backend.showMessage);
        this.on("user:notLoggedIn", backend.userNotLoggedIn);

        return {
            model,
            trigger: dispatcher.trigger,
            onTrigger: (evt, ...rest) => e => { if (e) {e.preventDefault(); e.stopPropagation();} return dispatcher.trigger(evt, ...rest)}
        };
    },
    componentDidMount() {
        window.dispatcher = dispatcher;
        dispatcher.trigger("load:projects");
    },
    render() {
        return <div>
            {React.Children.map(this.props.children, r => React.cloneElement(r, {app: this.state}))}
        </div>;
    }
});
