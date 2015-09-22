import React from "react";
import ConfirmButton from "../shared/confirmButton";
import keyToColor from "../../util/keyToColor";

export default React.createClass({
    getInitialState() {
        return { 
            data: JSON.parse(JSON.stringify(this.props.app.model.activeItem))
        };
    },
    onClickSave() {
        this.save();
    },
    onClickDelete() {
        this.props.app.trigger("delete:item-detail", this.props.app.model.activeItem.id);
    },
    onClickCancel() {
        this.props.app.trigger("cancel:item-detail");
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
        return <div className="item-detail" style={style}>
            <div className="title">
                <input onKeyDown={this.onKeyDownTitle} onChange={this.onChange("title")} type="text" value={title} />
            </div>
            <div className="description">
                <textarea onChange={this.onChange("description")} value={description} />
            </div>
            <div className="buttons">
                <button onClick={this.onClickSave} className="pure-button pure-button-primary">save</button>
                <ConfirmButton onConfirm={this.onClickDelete} className="pure-button button-error" text="delete" />
                <button onClick={this.onClickCancel} className="pure-button">cancel</button>
            </div>
        </div>;
    }
});
