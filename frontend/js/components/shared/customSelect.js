import React from "react";
import Icon from "react-fontawesome";
import dispatcher from "../../app/dispatcher";


export default React.createClass({
    getInitialState() {
        dispatcher.on("click:world", e => {
            if ((e.target !== this.refs.button) && (e.target.parentElement !== this.refs.button)) {
                this.setState({
                    active: false
                });
            }
        });
        return {
            active: this.props.defaultActive || false,
            title: "select"
        };
    },
    onClick(e) {        
        this.setState({active: !(this.state.active)});
    },
    renderChildren() {
        if(this.state.active) {
            return <div className="options">
                {React.Children.map(this.props.children, r => {
                    let props = {onClickParent: this.onClick};
                    if (this.props.active !== undefined && r.props.activeValue === this.props.active) {
                        props.className = r.props.className + " active";
                    }
                    if (r.props.onClick) {
                        props.onClick = e => {
                            r.props.onClick(e);
                            this.onClick(e);
                        }
                    }
                    return React.cloneElement(r, props);
                })}
            </div>
        }
    },
    render() {
        return <div className={"custom-select " + (this.props.className ? this.props.className : "")}>
            <button ref="button" onClick={this.onClick} className="pure-button">{this.props.title || this.state.title} <Icon name={this.state.active ? "chevron-up" : "chevron-down"} /></button>
            {this.renderChildren()}
        </div>;
    }
});
