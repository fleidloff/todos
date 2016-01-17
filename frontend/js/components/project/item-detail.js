import React from "react";
import Edit from "./item-detail-edit";
import {markdown} from "markdown";
import keyToColor from "../../util/keyToColor";
import Icon from "react-fontawesome";
import config from "../../../../config";
const baseUrl = config.server.context + config.app.context + config.api.context + "/" + config.api.version;

const yumlMeRoot = "http://yuml.me/diagram/scruffy;scale:180/class/";
function yumlMeLink(match, capture) {
    const b = `![yuml.me diagram](${yumlMeRoot}${encodeURIComponent(capture.replace(/(?:\r\n|\r|\n)/g, ",")).replace(/\(/g, "%28").replace(/\)/g, "%29")}.png)`;
    console.log(b);
    return b;
} 

export default React.createClass({
    descriptionMarkup() {
        const yumlDescription = this.props.app.model.activeItem.description.replace(/<YUML>((<|>|\*|.|\n)*)<\/YUML>/g, yumlMeLink); 
        return markdown.toHTML(yumlDescription);
    },
    editButton() {
        return <button onClick={this.props.app.onTrigger("edit:item-detail")} className="pure-button"><Icon name="edit" title="edit" /></button>;   
    },
    renderSharedLink() {
        console.log()
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
            </div>
        </div>;
    }
});
