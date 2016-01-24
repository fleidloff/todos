import React from "react";
import ConfirmLink from "../shared/confirmLink";
import Icon from "react-fontawesome";


export default React.createClass({
    confirmDelete(id) {
        if (!this.props.app.model.activeProject || this.props.app.model.activeProject.id !== id) {
            return;
        }
        const hide = this.props.app.model.items.filter(it => it.project === id).length > 0;
        if (hide) {
            return;
        }
        return <ConfirmLink onConfirm={this.props.app.onTrigger("delete:project", id)} className="delete" text={<Icon name="trash-o" title="delete project" />} confirmText={<Icon name="trash" title="delete project" />} />;
    },
    render() {
        const {id, title} = this.props.data;
        const {activeProject} = this.props.app.model;
        const active = !!(activeProject && activeProject.id === id);
        const check = active ? <Icon name="check" className="icon" /> : null;
        return <div onClick={this.props.onClick} className={"option project" + (active ? " active" : "")}>{check}{this.confirmDelete(id)}<div>{title}</div></div>
    }
});
