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
    getInitialState() {
        dispatcher.on("app:error", backend.appError.bind(this));
        dispatcher.on("cancel:item-detail", backend.cancelItem.bind(this));
        dispatcher.on("delete:item-detail", backend.deleteItem.bind(this));
        dispatcher.on("dismiss:notification", backend.dismissNotification.bind(this));
        dispatcher.on("edit:item-detail", backend.editItem.bind(this));
        dispatcher.on("preview:item-detail-edit", backend.previewItem.bind(this));
        dispatcher.on("cancel-preview:item-detail-edit", backend.cancelPreviewItem.bind(this));
        dispatcher.on("load:items", backend.loadItems.bind(this));
        dispatcher.on("load:projects", backend.loadProjects.bind(this));
        dispatcher.on("new:item", backend.newItem.bind(this));
        dispatcher.on("save:item-detail", backend.saveItem.bind(this));
        dispatcher.on("select:item", backend.selectItem.bind(this))
        dispatcher.on("select:project", backend.selectProject.bind(this));
        dispatcher.on("show:message", backend.showMessage.bind(this));
        dispatcher.on("show:projects", backend.showProjects.bind(this));
       
        return {
            model,
            trigger: dispatcher.trigger,
            onTrigger: (evt, ...rest) => () => dispatcher.trigger(evt, ...rest)
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
