import React from "react";
import ConfirmButton from "../shared/confirmButton";
import kc from "../shared/keycodes";
import keyToColor from "../../util/keyToColor";
import {markdown} from "markdown";
import Icon from "react-fontawesome";
import Textarea from "react-textarea-autosize";

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
            return <div className="description" dangerouslySetInnerHTML={{__html: "<span></span>" + this.descriptionMarkup()}} />

        } else {
            return <div className="description">
                <Textarea onKeyDown={this.onKeyDown("description")} onChange={this.onChange("description")} value={description} />
            </div>;
        }
    },
    onKeyDown(what) {
        return e => {
            const {data} = this.state;
            const target = e.target;

            if (e.keyCode === kc.tab) {
                e.preventDefault();
                data[what] = data[what].substring(0, target.selectionStart) + "  " + data[what].substring(target.selectionEnd);
                const pos = target.selectionStart;
                setTimeout(() => {
                    target.selectionStart = target.selectionEnd = pos + 2;
                }, 0);
            }

            if (e.keyCode === kc.s && e.ctrlKey) {
                e.preventDefault();
                this.save();
            }

            if (e.keyCode === kc.enter) {
                const lines = data[what].substring(0, target.selectionStart).split("\n");
                if (lines.length > 0) {
                    if (lines[lines.length - 1].indexOf("* ") === 0) {
                        e.preventDefault();
                        data[what] = data[what].substring(0, target.selectionStart) + "\n* " + data[what].substring(target.selectionEnd)    
                        const pos = target.selectionStart;
                        setTimeout(() => {
                            target.selectionStart = target.selectionEnd = pos + 3;
                        }, 0);
                    };
                } 
            }


            this.setState({data});
        }
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
    render() {
        const {title, description} = this.state.data;
        const style = {"borderLeft": `4px solid ${keyToColor(this.props.app.model.activeItem.title)}`};
        return <div className="item-detail-wrapper">
            <div className="buttons">
                {this.saveButton()}
                {this.deleteButton()}
                {this.previewButton()}
                {this.cancelButton()}
            </div>
            <div className="item-detail" style={style}>
                <div className="title">
                    <input onKeyDown={this.onKeyDownTitle} onChange={this.onChange("title")} type="text" value={title} />
                </div>
                {this.description(description)}
            </div>
        </div>;
    }
});
