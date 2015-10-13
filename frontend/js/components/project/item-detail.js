import React from "react";
import Edit from "./item-detail-edit";
import {markdown} from "markdown";
import keyToColor from "../../util/keyToColor";

export default React.createClass({
    descriptionMarkup() {
        return markdown.toHTML(this.props.app.model.activeItem.description);
    },
    editButton() {
        return <button onClick={this.props.app.onTrigger("edit:item-detail")} className="pure-button">edit</button>;   
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
        return <div className="item-detail-wrapper">
            <div className="buttons">{this.editButton()}</div>
            <div className="item-detail" style={style}>
                <div className="title">{title}</div>
                <div className="description" dangerouslySetInnerHTML={{__html: this.descriptionMarkup()}} />
            </div>
        </div>;
    }
});
