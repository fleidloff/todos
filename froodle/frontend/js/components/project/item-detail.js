import React from "react";
import Edit from "./item-detail-edit";
import keyToColor from "../../util/keyToColor";
import Icon from "react-fontawesome";
import config from "../../../../../config";
import manipulator from "../../util/manipulator";


const baseUrl = config.server.context + config.app.context + config.api.context + "/" + config.api.version;

export default React.createClass({
    descriptionMarkup() {
        return manipulator
            .input(this.props.app.model.activeItem.description)
            .applyAll();
    },
    editButton() {
        return <button onClick={this.props.app.onTrigger("edit:item-detail")} className="pure-button"><Icon name="edit" title="edit" /></button>;   
    },
    renderRawLink() {
        return <a href="#" onClick={this.props.app.onTrigger("goto:page", "raw")}>raw</a>
    },
    renderSharedLink() {
        if (this.props.app.model.activeItem.shared) {
            return <a href={`${baseUrl}/Tasks/${this.props.app.model.activeItem.id}.md?shared=true`}>shared data</a>
        }
    },
    render() {
        const {model} = this.props.app;
        if (!model.activeItem) {
            return <div />;
        }
        if (model.editing) {
            return <Edit key={model.activeItem.id} app={this.props.app} />;
        }
        const {title, description, checked, id} = model.activeItem;
        const style = {"borderLeft": `4px solid ${keyToColor(title)}`};
        return <div key={model.activeItem.id}  className={"item-detail-wrapper" + (checked ? " checked" : "")}>
            <div className="buttons">{this.editButton()}</div>
            <div className="item-detail" style={style}>
                <div className="title">{title}</div>
                <div className="description" dangerouslySetInnerHTML={{__html: this.descriptionMarkup()}} />
            </div>
            <div className="meta">
                {this.renderSharedLink()}
                {this.renderRawLink()}
            </div>
        </div>;
    }
});
