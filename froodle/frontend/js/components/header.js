import React from "react";
import Icon from "react-fontawesome";
import Projects from "./project-overview/project-overview";


export default React.createClass({
    renderProjects() {
        if ((this.props.app.model.pageName || "default") === "default") {
            return <Projects app={this.props.app} />;
        }
    },
    render() {
        return <div className="pure-g header">
            <div className="pure-u-2-3">
                {this.renderProjects()}
            </div>
            <div className="pure-u-1-4 title align-right title"><Icon size="2x" name="check-square-o" /> froodle </div>
            <div className="pure-u-1-12 title align-right"></div>
        </div>;
    }
});
