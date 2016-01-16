import React from "react";
import keyToColor from "../../util/keyToColor";
import ConfirmLink from "../shared/confirmLink";
import Checkbox from "../shared/checkbox";
import Icon from "react-fontawesome";

let t;
let recentlyClicked = false;

export default React.createClass({
    confirmDelete() {
        return <ConfirmLink onConfirm={this.props.app.onTrigger("delete:item-detail", this.props.data.id)} className="delete contextLink" text={<Icon name="trash-o" title="delete item" />} confirmText={<Icon name="trash" title="delete item" />} />;
    },
    select() {
        clearTimeout(t);
        t = setTimeout(() => {
            recentlyClicked = false;
        }, 500);

        this.props.app.trigger("select:item", this.props.data.id, recentlyClicked);
        recentlyClicked = true;
    },
    render() {
        const {title, description, active, sort, checked, id, milestone} = this.props.data;
        const style = {"borderLeft": `4px solid ${keyToColor(title)}`};
        return <div onClick={this.select} style={style} className={"item" + (active ? " active" : "") + (checked ? " checked" : "") + (milestone ? " milestone" : "")}>
            <Checkbox onClick={this.props.app.onTrigger("check:item", id, !checked)} checked={checked} />
            {this.confirmDelete()}
            <div className="title">{title}</div>
            <div className="arrow arrow-right"></div>
        </div>;
    }
});
