import React from "react";
import Edit from "./item-detail-edit";
import {markdown} from "markdown";

export default React.createClass({
    getInitialState() {
        const {app} = this.props;
        app.on("loaded:item", data => this.setState({data}));
        app.on("select:item", (id, editing) => {
            if (this.state.data && this.state.data.id !== id) {
                // todo: warn when in editing mode
                this.setState({data: null});
            }
            this.setState({editing});
            app.trigger("load:item", id);
        });
        app.on("save:item-detail", item => {
            if (this.state.data && this.state.data.id === item.id) {
                this.setState({editing: false});
            }
        });
        app.on("cancel:item-detail", item => {
            if (this.state.data && this.state.data.id === item.id) {
                this.setState({editing: false});
            }
        });
        app.on("deleted:item-detail", id => {
            if (this.state.data && this.state.data.id === id) {
                this.setState({editing: false, data: null});
            }
        });

        return { 
            data: null,
            editing: false
        };
    },
    descriptionMarkup() {
        return {__html: markdown.toHTML(this.state.data.description) };
    },
    onClickEdit() {
        this.setState({editing: true});
    },
    render() {
        if (!this.state.data) {
            return <div />;
        }
        if (this.state.editing) {
            return <Edit data={this.state.data} app={this.props.app} />;
        }
        const {title, description} = this.state.data;
        return <div className="item-detail">
            <div className="title">{title}</div>
            <div className="description" dangerouslySetInnerHTML={this.descriptionMarkup()} />
            <div className="buttons"><button onClick={this.onClickEdit} className="pure-button">edit</button></div>
        </div>;
    }
});
