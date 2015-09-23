import React from "react";


export default React.createClass({
    onClickNew() {
        this.props.app.trigger("new:item");
    },
    onClickShowProjects() {
        this.props.app.trigger("show:projects");
    },
    render() {
        return <div className="pure-g header">
            <div className="pure-u-2-3">
                {(() => {
                    if (this.props.app.model.activeProject) {
                        return <button onClick={this.onClickNew} className="pure-button button-success">new item</button>;
                    }
                })()}
                <button onClick={this.onClickShowProjects} className="pure-button">show projects</button>
            </div>
            <div className="pure-u-1-4 title align-right title">froodle - projects</div>
            <div className="pure-u-1-12 title align-right"></div>
        </div>;
    }
});
