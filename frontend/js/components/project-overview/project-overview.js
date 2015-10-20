import React from "react";
import Projects from "./projects";
import Icon from "react-fontawesome";

export default React.createClass({
    getInitialState() {
        return {
            active: true
        };
    },
    onClick() {
        this.setState({active: !(this.state.active)});
    },
    renderProjects() {
        if (this.state.active) {
            return <Projects app={this.props.app} hideProjects={this.onClick}/>
        }
    },
    render() {
        const {activeProject} = this.props.app.model;
        return <div className="project-overview">
            <button onClick={this.onClick} className="pure-button">{activeProject ? activeProject.title : "select project"} <Icon name={this.state.active ? "chevron-up" : "chevron-down"} /></button>
            {this.renderProjects()}
        </div>;
    },

    render_old() {
        return <button onClick={this.props.app.onTrigger("show:projects")} className="pure-button">show projects</button>;
    }
});
