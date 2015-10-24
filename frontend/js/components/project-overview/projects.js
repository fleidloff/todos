import React from "react";
import Project from "./project";

export default React.createClass({
    getInitialState() {
        return {
            title: ""
        };
    },
    onClick(id) {
        return () => {
            this.props.onClick();
            this.props.app.trigger("select:project", id)   
        }
    },
    renderProjects() {
        const {projects} = this.props.app.model;
        return projects.map(p => <Project key={p.id} onClick={this.onClick(p.id)} app={this.props.app} data={p} />);
    },
    save() {
        const {title} = this.state;
        this.props.app.trigger("create:project", {title});
        this.props.onClick();
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
