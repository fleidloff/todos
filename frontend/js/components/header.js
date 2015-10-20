import React from "react";
import Icon from "react-fontawesome";
import Projects from "./project-overview/project-overview";


export default React.createClass({
    render() {
        return <div className="pure-g header">
            <div className="pure-u-2-3">
                <Projects app={this.props.app} />
            </div>
            <div className="pure-u-1-4 title align-right title"><Icon size="2x" name="check-square-o" /> froodle - projects</div>
            <div className="pure-u-1-12 title align-right"></div>
        </div>;
    }
});
