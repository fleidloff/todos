import React from "react";

export default React.createClass({
    onClick(id) {
        const {app} = this.props;
        return e => {
            e.preventDefault();
            app.trigger("select:project", id);
        };
    },
    renderProjects() {
        const {projects, activeProject} = this.props.app.model;
        return projects.map((p, i) => {
            const className = "project" + ((p._id === activeProject) ? " active" : "");
            return <a className={className} key={p._id} href="#" onClick={this.onClick(p._id)}>{p.title}</a>;
        });
    },
    render() {
        return <div>available projects: {this.renderProjects()}</div>;
    }
});
