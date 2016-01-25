import React from "react";
import Projects from "./projects";
import Icon from "react-fontawesome";
import Select from "../shared/customSelect";

export default React.createClass({
    render() {
        const {activeProject} = this.props.app.model;
        return <div className="project-overview">
            <Select key="projectOverview" defaultActive={false} title={activeProject ? activeProject.title : "select project"}>
                <Projects app={this.props.app} />
            </Select>
        </div>;
    }
});
