import React from "react";
import Edit from "./item-detail-edit";
import {markdown} from "markdown";
import keyToColor from "../../util/keyToColor";

export default React.createClass({
    descriptionMarkup() {
        return {__html: markdown.toHTML(this.props.app.model.activeItem.description) };
    },
    onClickEdit() {
        this.props.app.trigger("edit:item-detail");
    },
    render() {
        const {model} = this.props.app;
        if (!model.activeItem) {
            return <div />;
        }
        if (model.editing) {
            return <Edit app={this.props.app} />;
        }
        const {title, description} = model.activeItem;
        const style = {"borderLeft": `4px solid ${keyToColor(title)}`};
        return <div className="item-detail" style={style}>
            <div className="title">{title}</div>
            <div className="description" dangerouslySetInnerHTML={this.descriptionMarkup()} />
            <div className="buttons"><button onClick={this.onClickEdit} className="pure-button">edit</button></div>
        </div>;
    }
});
