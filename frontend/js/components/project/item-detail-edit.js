import React from "react";
import ConfirmButton from "../shared/confirmButton";
import Checkbox from "../shared/checkbox";
import kc from "../../util/keycodes";
import keyToColor from "../../util/keyToColor";
import {markdown} from "markdown";
import Icon from "react-fontawesome";
import Textarea from "react-textarea-autosize";
import textareaKeyHandler from "../../app/textareaKeyHandler";

export default React.createClass({
    getInitialState() {
        return {
            data: JSON.parse(JSON.stringify(this.props.app.model.activeItem))
        };
    },
    descriptionMarkup() {
        return markdown.toHTML(this.state.data.description);
    },
    saveButton() {
        return <button onClick={() => this.save()} className="pure-button pure-button-primary"><Icon name="save" title="save" /></button>;
    },
    deleteButton() {
        return <ConfirmButton onConfirm={this.props.app.onTrigger("delete:item-detail", this.props.app.model.activeItem.id)} className="pure-button button-error" text={<Icon name="trash-o" title="delete item" />} confirmText={<Icon name="trash" title="delete item" />} />;
    },
    cancelButton() {
        return  <button onClick={this.props.app.onTrigger("cancel:item-detail")} className="pure-button"><Icon name="remove" title="cancel edit" /></button>;
    },
    previewButton() {
        if (this.props.app.model.preview) {
            return  <button onClick={this.props.app.onTrigger("cancel-preview:item-detail-edit")} className="pure-button"><Icon name="eject" title="stop preview" /></button>;
        } else {
            return  <button onClick={this.props.app.onTrigger("preview:item-detail-edit")} className="pure-button"><Icon name="play" title="preview" /></button>;
        }
    },
    description(description) {
        if (this.props.app.model.preview) {
            return <div className="description pure-u-1-1" dangerouslySetInnerHTML={{__html: "<span></span>" + this.descriptionMarkup()}} />

        } else {
            return <div className="description pure-u-1-1">
                <Textarea minRows={7} onKeyDown={this.onKeyDown("description")} onChange={this.onChange("description")} value={description} />
            </div>;
        }
    },
    onKeyDown(what) {
        return textareaKeyHandler.bind(this)(what, this.setState.bind(this));
    },
    onChange(what) {
        return e => {
            const {data} = this.state;
            data[what] = e.target.value;
            this.setState({data});
        };
    },
    save() {
        this.props.app.trigger("save:item-detail", this.state.data);
    },
    onKeyDownTitle(e) {
        if (e.keyCode === kc.enter) {
            this.save();
        }
    },
    componentDidMount: function(){
        const valueLength = this.state.data.title.length;
        this.refs.titleInput.focus();
        this.refs.titleInput.selectionStart = 0;
        this.refs.titleInput.selectionEnd = valueLength;
    },
    render() {
        const {title, description, shared, milestone} = this.state.data;
        const style = {"borderLeft": `4px solid ${keyToColor(this.props.app.model.activeItem.title)}`};
        return <div className="item-detail-wrapper">
            <div className="buttons">
                {this.saveButton()}
                {this.deleteButton()}
                {this.previewButton()}
                {this.cancelButton()}
            </div>
            <div className="item-detail pure-g" style={style}>
                <div className="title pure-u-md-3-5 pure-u-1-1">
                    <input ref="titleInput" onKeyDown={this.onKeyDownTitle} onChange={this.onChange("title")} type="text" value={title} />
                </div>
                <div className="shared pure-u-md-2-5 pure-u-1-1">
                    <Checkbox title="Shared" onClick={this.onChange("shared")} checked={shared} />
                    <Checkbox title="Milestone" onClick={this.onChange("milestone")} checked={milestone} />
                </div>
                {this.description(description)}
            </div>
        </div>;
    }
});
