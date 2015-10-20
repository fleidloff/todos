import React from "react";
import ConfirmLink from "../shared/confirmLink";
import Icon from "react-fontawesome";

export default React.createClass({
    getInitialState() {
        return {
            title: ""
        };
    },
    confirmDelete(id) {
        return <ConfirmLink onConfirm={this.props.app.onTrigger("delete:project", id)} className="delete" text={<Icon name="trash-o" title="delete project" />} confirmText={<Icon name="trash" title="delete project" />} />;
    },
    onClick(id) {
        return () => {
            this.props.hideProjects();
            this.props.app.trigger("select:project", id)   
        }
    },
    renderProjects() {
        const {projects, activeProject} = this.props.app.model;
        return projects.map(p => {
            const active = !!(activeProject && activeProject.id === p.id);
            const check = active ? <Icon name="check" className="icon" /> : null;
            return <div key={p.id} onClick={this.onClick(p.id)} className={"project" + (active ? " active" : "")}>{check}{this.confirmDelete(p.id)}<div>{p.title}</div></div>
        });
    },
    save() {
        const {title} = this.state;
        this.props.app.trigger("create:project", {title});
        this.props.hideProjects();
    },
    onKeyDownTitle(e) {
        if (e.keyCode === 13) {
            this.save();
        }
    },
    onChange(what) {
        return e => {
            const data = this.state;
            data[what] = e.target.value;
            this.setState({data});    
        };
    },
    render() {
        return <div className="projects">
            <div className="title">
                <input onKeyDown={this.onKeyDownTitle} onChange={this.onChange("title")} type="text" value={this.state.title} />
            </div>
            {this.renderProjects()}
        </div>;
    }
});
