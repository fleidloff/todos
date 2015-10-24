import React from "react";
import Icon from "react-fontawesome";


export default React.createClass({
    getInitialState() {
        return {
            active: true,
            title: "select"
        };
    },
    onClick() {
        this.setState({active: !(this.state.active)});
    },
    renderChildren() {
        if(this.state.active) {
            return <div className="options">
                {React.Children.map(this.props.children, r => React.cloneElement(r, {onClick: this.onClick}))}
            </div>
        }
    },
    render() {
        return <div className="custom-select">
            <button onClick={this.onClick} className="pure-button">{this.props.title || this.state.title} <Icon name={this.state.active ? "chevron-up" : "chevron-down"} /></button>
            {this.renderChildren()}
        </div>;
    }
});
