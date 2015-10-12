import React from "react";

export default React.createClass({
    newItemButton() {
        if (this.props.app.model.activeProject) {
            return <button onClick={this.onClickNew} className="pure-button button-success">new item</button>;
        }
    },
    onClickNew() {
        this.props.app.trigger("new:item");
    },
    render() {
        return <div className="item-actions">
            {this.newItemButton()}
        </div>;
    }
});
