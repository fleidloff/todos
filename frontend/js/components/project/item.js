import React from "react";
import keyToColor from "../../util/keyToColor";
import ConfirmLink from "../shared/confirmLink";

export default React.createClass({
    confirmDelete() {
        return <ConfirmLink onConfirm={this.props.app.onTrigger("delete:item-detail", this.props.data.id)} className="delete" text="x" confirmText = "x?" />;
    },
    render() {
        const {title, description, active, sort, checked, id} = this.props.data;
        const simpleDescription = description.replace(/[^a-zA-Z .,]/g, "");
        const style = {"borderLeft": `4px solid ${keyToColor(title)}`};
        return <div onClick={this.props.app.onTrigger("select:item", id)} style={style} className={"item" + (active ? " active" : "") + (checked ? " checked" : "")}>
            <input onClick={this.props.app.onTrigger("check:item", id, !checked)} type="checkbox" className="checkbox" checked={checked} />
            {this.confirmDelete()}
            <div className="title">{title}</div>
            <div>{(simpleDescription.length > 20) ? (simpleDescription.substring(0, 20) + "...") : simpleDescription}&nbsp;</div>
            <div className="arrow arrow-right"></div>
        </div>;
    }
});
