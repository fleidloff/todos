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
            action(this.state, this.setModel, ...rest);
        };
    },
    on(event, action) {
        dispatcher.on(event, this.redux(action));
    },
    getInitialState() {
        this.on("app:error", backend.appError);
        this.on("cancel:item-detail", backend.cancelItem);
        this.on("delete:item-detail", backend.deleteItem);
        this.on("dismiss:notification", backend.dismissNotification);
        this.on("edit:item-detail", backend.editItem);
        this.on("preview:item-detail-edit", backend.previewItem);
        this.on("cancel-preview:item-detail-edit", backend.cancelPreviewItem);
        this.on("load:items", backend.loadItems);
        this.on("load:projects", backend.loadProjects);
        this.on("new:item", backend.newItem);
        this.on("check:item", backend.checkItem);
        this.on("save:item-detail", backend.saveItem);
        this.on("select:item", backend.selectItem);
        this.on("select:project", backend.selectProject);
        this.on("show:projects", backend.showProjects);
        this.on("show:message", backend.showMessage);
        this.on("clear-checked:items", backend.clearChecked);

        return {
            model,
            trigger: dispatcher.trigger,
            onTrigger: (evt, ...rest) => e => { if (e) {e.preventDefault(); e.stopPropagation();} return dispatcher.trigger(evt, ...rest)}
        };
    },
    componentDidMount() {
        window.dispatcher = dispatcher;
        dispatcher.trigger("load:projects");
        dispatcher.trigger("show:projects");
        dispatcher.trigger("select:project", "56031cda3e520fcb508f01ee");
    },
    render() {
        return <div>
            {this.props.children.map(r => React.cloneElement(r, {app: this.state}))} 
        </div>; 
    }
});
