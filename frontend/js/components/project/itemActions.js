import React from "react";
import ConfirmButton from "../shared/confirmButton";
import Icon from "react-fontawesome";

export default React.createClass({
    newItemButton() {
        if (this.props.app.model.activeProject) {
            return <button onClick={this.onClickNew} className="pure-button button-success"><Icon name="plus" title="new item" /></button>;
        }
    },
    clearCheckedItemsButton() {
        if (this.props.app.model.items.filter(i => i.checked).length > 0) {
            return <ConfirmButton onConfirm={this.props.app.onTrigger("clear-checked:items")} className="pure-button button-error" text={<span><Icon name="trash-o" title="clear checked items" />&nbsp;<Icon name="check-square-o" title="clear checked items" /></span>} confirmText={<span><Icon name="trash" title="clear checked items" />&nbsp;<Icon name="check-square" title="clear checked items" /></span>} />;
        }
    },
    onClickNew() {
        this.props.app.trigger("new:item");
    },
    render() {
        return <div className="item-actions">
            {this.newItemButton()}
            {this.clearCheckedItemsButton()}

        </div>;
    }
});
