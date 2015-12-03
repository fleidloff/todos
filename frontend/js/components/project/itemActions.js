import React from "react";
import ConfirmButton from "../shared/confirmButton";
import Icon from "react-fontawesome";
import Select from "../shared/customSelect";

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
    getActiveFilter() {
        switch(this.props.app.model.filter.checked) {
            case null:
                return ": all";
            case true:
                return ": checked";
            case false:
                return ": active";
            default:
                return "";
        }
    },
    filterItems() {
        if (this.props.app.model.activeProject) {
            return <Select key="filter" className="filter" title={"filter" + this.getActiveFilter()} active={"" + this.props.app.model.filter.checked}>
                <div className="option" activeValue="null" onClick={this.props.app.onTrigger("change:filter", "checked", null)}><Icon name="check" className="icon if-active" /> all</div>
                <div className="option" activeValue="false" onClick={this.props.app.onTrigger("change:filter", "checked", false)}><Icon name="check" className="icon if-active" /> active</div>
                <div className="option" activeValue="true" onClick={this.props.app.onTrigger("change:filter", "checked", true)}><Icon name="check" className="icon if-active" /> checked</div>
            </Select>;
        }
    },
    onClickNew() {
        this.props.app.trigger("new:item");
    },
    render() {
        return <div className="item-actions">
            {this.newItemButton()}
            {this.clearCheckedItemsButton()}
            {this.filterItems()}
        </div>;
    }
});
