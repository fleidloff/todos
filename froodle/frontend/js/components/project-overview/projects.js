import React from "react";
import Project from "./project";
import Icon from "react-fontawesome";
import kc from "../../util/keycodes";

export default React.createClass({
    getInitialState() {
        return {
            title: ""
        };
    },
    onClick(id) {
        return () => {
            this.props.onClickParent();
            this.props.app.trigger("select:project", id);  
        }
    },
    createProject() {
        const {title} = this.state;
        this.props.app.trigger("create:project", {title});
        this.props.onClickParent();
    },
    onKeyDownTitle(e) {
        if (e.keyCode === kc.enter) {
            const filteredProjects = this.filteredProjects();
            console.debug(filteredProjects);
            if (filteredProjects.length) {
                this.onClick(filteredProjects[0].id)();
            } else {
                this.createProject();
            }
        }
    },
    onChange(what) {
        return e => {
            const data = this.state;
            data[what] = e.target.value;
            this.setState({data});    
        };
    },

    filteredProjects() {
        const title = this.state.title.toLowerCase();
        const activeProjectId = this.props.app.model.activeProject ? this.props.app.model.activeProject.id : -1;
        return this.props.app.model.projects
            .filter(p => p.title.toLowerCase().indexOf(title) > -1)
            .sort((a, b) => {
                return b.id === activeProjectId ? 1 : a.title.toLowerCase().localeCompare(b.title.toLowerCase());;
            });
    },
    componentDidMount() {
        this.refs.titleInput.focus();
    },
    renderProjects() {
        return this.filteredProjects()
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
                <input ref="titleInput" onKeyDown={this.onKeyDownTitle} onChange={this.onChange("title")} type="text" value={this.state.title} />
            </div>
            {this.renderProjects()}
            {this.renderCreateProject()}
        </div>;
    }
});
