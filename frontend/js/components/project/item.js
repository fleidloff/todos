import React from "react";
import keyToColor from "../../util/keyToColor";
import ConfirmLink from "../shared/confirmLink";
import Checkbox from "../shared/checkbox";
import Icon from "react-fontawesome";

export default React.createClass({
    confirmDelete() {
        return <ConfirmLink onConfirm={this.props.app.onTrigger("delete:item-detail", this.props.data.id)} className="delete contextLink" text={<Icon name="trash-o" title="delete item" />} confirmText={<Icon name="trash" title="delete item" />} />;
    },
    edit() {
        return <Icon className="edit contextLink" name="edit" title="edit" onClick={this.props.app.onTrigger("select:item", this.props.data.id, true)} />;  
    },
    render() {
        const {title, description, active, sort, checked, id} = this.props.data;
        const style = {"borderLeft": `4px solid ${keyToColor(title)}`};
        return <div onClick={this.props.app.onTrigger("select:item", id)} style={style} className={"item" + (active ? " active" : "") + (checked ? " checked" : "")}>
            <Checkbox onClick={this.props.app.onTrigger("check:item", id, !checked)} checked={checked} />
            {this.confirmDelete()}
            {this.edit()}
            <div className="title">{title}</div>
            <div className="arrow arrow-right"></div>
        </div>;
    }
});
