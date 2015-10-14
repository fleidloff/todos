import React from "react";
import ConfirmButton from "../shared/confirmButton";
import keyToColor from "../../util/keyToColor";
import {markdown} from "markdown";

export default React.createClass({
    getInitialState() {
        return { 
            data: JSON.parse(JSON.stringify(this.props.app.model.activeItem))
        };
    },
    descriptionMarkup() {
        console.log(this.state.data.description, markdown.toHTML(this.state.data.description));
        return markdown.toHTML(this.state.data.description);
    },
    saveButton() {
        return <button onClick={() => this.save()} className="pure-button pure-button-primary">save</button>;
    },
    deleteButton() {
        return <ConfirmButton onConfirm={this.props.app.onTrigger("delete:item-detail", this.props.app.model.activeItem.id)} className="pure-button button-error" text="delete" />;
    },
    cancelButton() {
        return  <button onClick={this.props.app.onTrigger("cancel:item-detail")} className="pure-button">cancel</button>;
    },
    previewButton() {
        if (this.props.app.model.preview) {
            return  <button onClick={this.props.app.onTrigger("cancel-preview:item-detail-edit")} className="pure-button">cancel preview</button>;
        } else {
            return  <button onClick={this.props.app.onTrigger("preview:item-detail-edit")} className="pure-button">preview</button>;
        }
    },
    description(description) {
        if (this.props.app.model.preview) {
            return <div className="description" dangerouslySetInnerHTML={{__html: "<span></span>" + this.descriptionMarkup()}} />
            
        } else {
            return <div className="description">
                <textarea onChange={this.onChange("description")} value={description} />
            </div>;    
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
        if (e.keyCode === 13) {
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
