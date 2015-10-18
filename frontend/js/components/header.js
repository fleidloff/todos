import React from "react";
import Icon from "react-fontawesome";


export default React.createClass({
    onClickShowProjects() {
        this.props.app.trigger("show:projects");
    },
    render() {
        return <div className="pure-g header">
            <div className="pure-u-2-3">
                <button onClick={this.onClickShowProjects} className="pure-button">show projects</button>
            </div>
            <div className="pure-u-1-4 title align-right title"><Icon size="2x" name="check-square-o" /> froodle - projects</div>
            <div className="pure-u-1-12 title align-right"></div>
        </div>;
    }
});
