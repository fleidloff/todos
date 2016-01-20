import React from "react";
import Project from "./project";
import Icon from "react-fontawesome";

export default React.createClass({
    getInitialState() {
        return {
            title: "",
            filteredProjects: this.filteredProjects("")
        };
    },
    onClick(id) {
        return () => {
            this.props.onClickParent();
            this.props.app.trigger("select:project", id)   
        }
    },
    createProject() {
        const {title} = this.state;
        this.props.app.trigger("create:project", {title});
        this.props.onClickParent();
    },
    onKeyDownTitle(e) {
        if (e.keyCode === 13) {
            if (this.state.filteredProjects.length) {
                this.onClick(this.state.filteredProjects[0].id)();
            } else {
                this.createProject();
            }
        }
    },
    onChange(what) {
        return e => {
            const data = this.state;
            data[what] = e.target.value;
            if (what === "title") {
                data["filteredProjects"] = this.filteredProjects(e.target.value);
            }
            this.setState({data});    
        };
    },

    filteredProjects(title) {
        return this.props.app.model.projects
            .filter(p => p.title.indexOf(title) > -1)
            .sort((a, b) => {
                return b.id === this.props.app.model.activeProject.id ? 1 : a.title.toLowerCase().localeCompare(b.title.toLowerCase());;
            });
    },

    renderProjects() {
        return this.state.filteredProjects
            .map(p => <Project key={p.id} onClick={this.onClick(p.id)} app={this.props.app} data={p} />);
    },
    renderCreateProject() {
        if (this.state.title) {
            return <div onClick={this.createProject} className={"option project"}><Icon name="plus" className="icon" /><div>create "{this.state.title}"</div></div>
        }
    },
    render() {
        return <div className="projects">
            <div className="title">
                <input onKeyDown={this.onKeyDownTitle} onChange={this.onChange("title")} type="text" value={this.state.title} />
            </div>
            {this.renderProjects()}
            {this.renderCreateProject()}
        </div>;
    }
});
