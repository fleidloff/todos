import React from "react";
import ConfirmButton from "../shared/confirmButton";
import Icon from "react-fontawesome";

export default React.createClass({
    newItemButton() {
        if (this.props.app.model.activeProject) {
            return <button onClick={this.onClickNew} className="pure-button button-success">new item</button>;
        }
    },
    clearCheckedItemsButton() {
        if (this.props.app.model.items.filter(i => i.checked).length > 0) {
            return <ConfirmButton onConfirm={this.props.app.onTrigger("clear-checked:items")} className="pure-button button-error" text="clear checked" />;
        }
    },
    onClickNew() {
        this.props.app.trigger("new:item");
    },
    render() {
        return <div className="item-actions">
            {this.newItemButton()}
            {this.clearCheckedItemsButton()}
            <Icon name="rocket" />
        </div>;
    }
});
